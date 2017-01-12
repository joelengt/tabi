
function routes(app) {
    var admin = require('./admin/index.js');
    var users = require('./admin/users/index.js');
    
    app.use('/info', admin);
    app.use('/users', users);

}

module.exports = routes;
