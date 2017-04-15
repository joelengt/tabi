import { mainMobile } from './mainMobile/index.js';
import { sendFormCotizar } from './formCotizar/index.js';
import { eventClickItems } from './plataform/index.js';
import { pay } from './payment/index.js';
import { sendFormContact } from './sendFormContact/index.js';
import { getPdf } from './formGetPdf/index.js';
import { EventScrollSections } from './eventSections/index.js';
import { polyfillInputs } from './eventOpenLink/index.js';
import { cicleSlider } from './homeSlider/index.js';

cicleSlider();

console.log('OK');

$('#btnFormCotizar').on('click', sendFormCotizar);

$('#btnFormContactSend').on('click', sendFormContact);

$('#btnSendToGetPdf').on('click', getPdf);


$('#left_counter_plus').on('click', function() {
    if(Number($('#input_pasajero').val()) >= 0) {
        $('#input_pasajero').val( Number($('#input_pasajero').val()) + 1)
    }
})

$('#left_counter_minus').on('click', function() {
    if(Number($('#input_pasajero').val()) > 0) {
        $('#input_pasajero').val( Number($('#input_pasajero').val()) - 1)
    }
})

$('#right_counter_plus').on('click', function() {
    if(Number($('#input_adulto_mayor').val()) >= 0) {
        $('#input_adulto_mayor').val( Number($('#input_adulto_mayor').val()) + 1)
    }
})

$('#right_counter_minus').on('click', function() {
    if(Number($('#input_adulto_mayor').val()) > 0) {
        $('#input_adulto_mayor').val( Number($('#input_adulto_mayor').val()) - 1)
    }
})

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
// sendFormContact();




