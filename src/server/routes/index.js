
function routes(app) {
    var admin = require('./admin/index.js');
    var users = require('./admin/users/index.js');
    var items = require('./items/index.js');
    
    var home = require('./home/index.js');


    app.use('/info', admin);
    app.use('/users', users);
    app.use('/items', items);

    // Viewers
    app.use('/', home);

}

module.exports = routes;
