
function routes(app) {
    var admin = require('./admin/index.js');
    var admin_plataform = require('./admin/plataform/index.js');
    var users = require('./admin/users/index.js');
    var items = require('./items/index.js');

    var payment = require('./payment/index.js');
    
    var home = require('./home/index.js');
    var plataform = require('./plataform/index.js');

    app.use('/info', admin);
    app.use('/admin', admin_plataform);
    app.use('/users', users);
    app.use('/items', items);

    app.use('/plataform-pricing', plataform);
    app.use('/payment', payment);

    // Viewers
    app.use('/', home);

}

module.exports = routes;
