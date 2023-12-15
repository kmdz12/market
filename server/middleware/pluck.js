function pluck(array, key) {
    return array.map(function (item) { return item[key]; });
}

module.exports = { pluck }