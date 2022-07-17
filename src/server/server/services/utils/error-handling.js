module.exports = function errorHandler(value, code) {
    const error = new Error(`Invalid to ${value} item`)
    error.statusCode = code
    throw error
}