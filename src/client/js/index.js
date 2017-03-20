
import naming from './date/index.js';
import { data, info, get } from './date/items.js';

console.log('OK');


function formCotizar() {

    var $btnFormCotizar = $('#btnFormCotizar');

    $.ajax({
        url: 'plataform-pricing',
        method: 'post',
        data: {},
        success: function (result) {
            return console.log(result);
        }
    })

}



