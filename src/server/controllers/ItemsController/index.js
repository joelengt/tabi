
var PostgreSQL = require('../../database/index.js').PostgreSQL;
var MySQL = require('../../database/index.js').MySQL;

class ItemsController {
    list(req, res) {
       // PostgreSQL
       PostgreSQL.query('socios', 'SELECT * FROM socios').make(function(builder) {
           // parametros de filtrado
           builder.where('id', 23);
           builder.where('dni', '76123131');
       });

       PostgreSQL.exec(function(err, response) {
           console.log(response.socios);
           // console.log(response.afiliado_socio);

           return res.status(200).json({
              status: 'ok Pg',
              list: response.socios
           })

       });
    }

    getInfo(req, res) {
        // Mysql
        MySQL.query('items', 'SELECT * FROM items').make(function(builder) {
            // parametros de filtrado
            builder.where('author', 'someone');
            // builder.where('color', 'orange');
        });

        MySQL.exec(function(err, response) {
            console.log(response.items);
            // console.log(response.items[0].id);

            return res.status(200).json({
                status: 'ok',
                list: response.items
            })

        });
         
    }
}

module.exports = ItemsController;
