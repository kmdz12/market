const pool = require('../../database/db.js');
const { dec2hex } = require('../../middleware/dec2hex.js');
const { pluck } = require('../../middleware/pluck.js');
const crypto = require('crypto');
const mercadopago = require('mercadopago');

const client = new mercadopago.MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

const orderController = {

    createOrder: async (req, res) => {

        try {

            const { pickup, currentAddress, cart, info_id } = req.body;

            // Generate timestamp
            let currentDate = new Date();
            // Seattle
            // currentDate.setHours(currentDate.getHours() + 5);
            currentDate.setHours(currentDate.getHours() - 3);
            let localizedDate = currentDate.toISOString();

            // Generate Order Number
            let timestamp = localizedDate.slice(0, 10).replaceAll('-', '') + '-' + localizedDate.slice(11, 19).replaceAll(':', '');
            let arr = new Uint8Array(10 / 2);
            crypto.getRandomValues(arr);
            let code = Array.from(arr, dec2hex).join('');
            let orderNumber = timestamp + '-' + code;

            // Check cart against DB
            // Sort cart items, otherwise we will assign wrong values
            cart.items.sort((a, b) => a.title.localeCompare(b.title));

            // Get all the names of the products from our cart
            const productsNames = pluck(cart.items, 'title');

            // Find these products using the names as query
            const checkCart = await pool.query('SELECT * FROM "productsView" WHERE name = ANY ($1) ORDER BY name', [productsNames]);

            // Build a new object saving title and quantity from our cart, and price from our DB.
            const verifiedCart = cart.items.map((item, index) => {
                return {
                    id: item.id,
                    title: item.title,
                    sku: item.sku,
                    unit_price: Number(checkCart.rows[index].price),
                    quantity: item.quantity
                }
            });

            // Replace verifiedCart with Request Cart, apply discount for paymentType selected, and replace value in request total.
            cart.items = verifiedCart;
            let discount = cart.total * 5 / 100;
            cart.total -= discount;

            let newPickup = Object.values(pickup).join(' ');

            if (typeof currentAddress === 'number') {

                // Save new Address of type integer as FK for direction
                const query = await pool.query('INSERT INTO orders (order_number, created, cart, reason, directions_users_fk, payment_fk, status_fk, info_users_fk, pickup, mp_transaction_order, temp_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [
                    orderNumber, localizedDate, cart, null, currentAddress, cart.paymentType, 1, info_id, newPickup, null, null
                ]);

            } else {

                // Save new Address of type object as json as temp direction
                const query = await pool.query('INSERT INTO orders (order_number, created, cart, reason, directions_users_fk, payment_fk, status_fk, info_users_fk, pickup, mp_transaction_order, temp_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [
                    orderNumber, localizedDate, cart, null, null, cart.paymentType, 1, info_id, newPickup, null, currentAddress
                ]);
            }

            res.status(200).json({ order: orderNumber });

        } catch (e) {
            console.log(e);
        }
    },

    createMPOrder: async (req, res) => {

        try {

            const { pickup, currentAddress, cart, info_id } = req.body;

            // Generate timestamp
            let currentDate = new Date();
            // Seattle
            // currentDate.setHours(currentDate.getHours() + 5);
            currentDate.setHours(currentDate.getHours() - 3);
            let localizedDate = currentDate.toISOString();

            // Generate Order Number
            let timestamp = localizedDate.slice(0, 10).replaceAll('-', '') + '-' + localizedDate.slice(11, 19).replaceAll(':', '');
            let arr = new Uint8Array(10 / 2);
            crypto.getRandomValues(arr);
            let code = Array.from(arr, dec2hex).join('');
            let orderNumber = timestamp + '-' + code;

            // Check cart against DB
            // Sort cart items, otherwise we will assign wrong values
            cart.items.sort((a, b) => a.title.localeCompare(b.title));

            // Get all the names of the products from our cart
            const productsNames = pluck(cart.items, 'title');

            // Find these products using the names as query
            const checkCart = await pool.query('SELECT * FROM "productsView" WHERE name = ANY ($1) ORDER BY name', [productsNames]);

            // Build a new object with the structure required for Mercado Pago API, saving title and quantity from our cart, and price from our DB.
            const verifiedCart = cart.items.map((item, index) => {
                return {
                    id: item.id,
                    title: item.title,
                    unit_price: Number(checkCart.rows[index].price),
                    quantity: item.quantity,
                    currency_id: "ARS"
                }
            });

            let newPickup = Object.values(pickup).join(' ');

            // Mercado Pago
            const preference = new mercadopago.Preference(client);

            preference.create({
                body: {
                    items: verifiedCart,
                    back_urls: {
                        success: process.env.MP_SUCCESS_URL,
                    },
                    notification_url: process.env.MP_WEBHOOK_URL,
                    metadata: {
                        orderNumber: orderNumber,
                        localizedDate: localizedDate,
                        cart: cart,
                        currentAddress: currentAddress,
                        info_id,
                        newPickup
                    },
                    payment_methods: {
                        installments: 1,
                        excluded_payment_types: [
                            {
                                id: "ticket"
                            },
                            {
                                id: "credit_card"
                            }
                        ]
                    },
                    statement_descriptor: "Kilometro 12"
                }
            }).then((response) => {

                res.status(200).json(({
                    mp: response,
                    orderNumber: orderNumber
                }));

            }).finally(async () => {

                // const query = await pool.query('INSERT INTO orders (order_number, created, cart, reason, directions_users_fk, payment_fk, status_fk, info_users_fk, pickup, mp_transaction_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [
                //     orderNumber, localizedDate, cart, null, currentAddress, cart.paymentType, 1, info_id, newPickup, null
                // ])

            }).catch(console.log);

        } catch (e) {
            console.log(e);
        }
    },

    recieveWebhook: async (req, res) => {

        try {

            const payment = new mercadopago.Payment(client);
            const clientPayment = req.query;

            if (clientPayment.type === 'payment') {

                const data = await payment.get({ id: clientPayment['data.id'] });

                if (data.status === 'approved') {
                    // Query in orders table with order metadata, update mp_transaction_order with transaction id recieved
                    // const query = await pool.query('UPDATE orders SET mp_transaction_order = $1 WHERE order_number = $2', [data.id, data.metadata.order_number])
                    // const query = await pool.query('INSERT INTO orders (order_number, created, cart, reason, directions_users_fk, payment_fk, status_fk, info_users_fk, pickup, mp_transaction_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [
                    //     data.metadata.order_number, data.metadata.localized_date, data.metadata.cart, null, data.metadata.current_address, data.metadata.cart.payment_type, 1, data.metadata.info_id, data.metadata.new_pickup, data.id
                    // ]);

                    if (typeof data.metadata.currentAddress === 'number') {

                        // Save new Address of type integer as FK for direction
                        const query = await pool.query('INSERT INTO orders (order_number, created, cart, reason, directions_users_fk, payment_fk, status_fk, info_users_fk, pickup, mp_transaction_order, temp_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [
                            data.metadata.order_number, data.metadata.localized_date, data.metadata.cart, null, data.metadata.current_address, data.metadata.cart.payment_type, 1, data.metadata.info_id, data.metadata.new_pickup, data.id, null
                        ]);
        
                    } else {
        
                        // Save new Address of type object as json as temp direction
                        const query = await pool.query('INSERT INTO orders (order_number, created, cart, reason, directions_users_fk, payment_fk, status_fk, info_users_fk, pickup, mp_transaction_order, temp_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [
                            data.metadata.order_number, data.metadata.localized_date, data.metadata.cart, null, null, data.metadata.cart.payment_type, 1, data.metadata.info_id, data.metadata.new_pickup, data.id, data.metadata.current_address
                        ]);
                    }
                }
            }

            res.sendStatus(204);

        } catch (e) {

            console.log(e);
            return res.status(500).json({ message: 'Something broke' });
        }
    }
}

module.exports = { orderController }