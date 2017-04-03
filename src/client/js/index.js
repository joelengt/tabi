
import { sendFormCotizar } from './formCotizar/index.js';
import { eventClickItems } from './plataform/index.js';
import { pay } from './payment/index.js';
import { sendFormContact } from './sendFormContact/index.js';
import { getPdf } from './formGetPdf/index.js';
import { EventScrollSections } from './eventSections/index.js';
import { polyfillInputs } from './eventOpenLink/index.js';

console.log('OK');

$('#btnFormCotizar').on('click', sendFormCotizar);

$('#btnFormContactSend').on('click', sendFormContact);

$('#btnSendToGetPdf').on('click', getPdf);

// $('#input_salida').on('click', polyfillInputs);
// $('#input_regreso').on('click', polyfillInputs);


EventScrollSections();
polyfillInputs();

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
pay();
sendFormContact();
