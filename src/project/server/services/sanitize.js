module.exports = function sanitize(value) {
    return value.replace(/^\s+|\s+$/g,"");
}