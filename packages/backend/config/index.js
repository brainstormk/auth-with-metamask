const config = {
    secret: 'secret',
    mongoUri: "mongodb://127.0.0.1:27017/testdb?retryWrites=true&w=majority",
    port: 5000,
};

module.exports = config;
