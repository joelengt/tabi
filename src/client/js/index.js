
import { sendFormCotizar } from './formCotizar/index.js';
import { eventClickItems } from './plataform/index.js';

console.log('OK');

$('#btnFormCotizar').on('click', sendFormCotizar);

// Event input date listener

$('#input_salida').on('input', function () {
    calDays();
});

 $('#input_regreso').on('input', function (){
    calDays();
});

function calDays() {
   if($('#input_salida').val() !== '' && $('#input_regreso').val() !== '') {
        var value_salida = moment($('#input_salida').val());
        var value_regreso = moment($('#input_regreso').val());
        console.log(value_regreso.diff(value_salida, 'days'), ' dias de diferencia');

        $('#input_dias').val(value_regreso.diff(value_salida, 'days'));
   }
 
 }

eventClickItems();