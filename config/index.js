var config = {
    'production': require('./env/production.js'),
    'development': require('./env/development.js')
};

module.exports = config['development'];
