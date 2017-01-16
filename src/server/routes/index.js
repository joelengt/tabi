
function routes(app) {
    var admin = require('./admin/index.js');
    var users = require('./admin/users/index.js');
    var items = require('./items/index.js');
    
    app.use('/info', admin);
    app.use('/users', users);
    app.use('/items', items);

}

module.exports = routes;
