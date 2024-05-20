
const success = (statusCode, result) => {
    return {
        statusCode,
        status: 'ok',
        result
    }
}

const error = (statusCode, message) => {
    return {
        statusCode,
        status: 'error',
        message
    }
}

module.exports = {
    success,
    error
}