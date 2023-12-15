function dec2hex(dec) {
    return dec.toString(16).padStart(2, "0");
}

module.exports = { dec2hex }