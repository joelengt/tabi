
import { sendFormCotizar } from './formCotizar/index.js';
import { eventClickItems } from './plataform/index.js';
import { pay } from './payment/index.js';
import { sendFormContact } from './sendFormContact/index.js';
import { getPdf } from './formGetPdf/index.js';
import { EventScrollSections } from './eventSections/index.js';
import { polyfillInputs } from './eventOpenLink/index.js';
import { cicleSlider } from './homeSlider/index.js';

/* Admin */
var currentView = 'customer'

cicleSlider();

$('#btnFormCotizar').on('click', sendFormCotizar);
$('#btnFormContactSend').on('click', sendFormContact);
$('#btnSendToGetPdf').on('click', getPdf);

/* Admin */
$('#btnAdminFormCotizar').on('click', () => {
    currentView = 'admin'
    sendFormCotizar(currentView)
});

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
        console.log(String(Number(value_regreso.diff(value_salida, 'days')) + 1), ' dias de diferencia');

        $('#input_dias').val(String(Number(value_regreso.diff(value_salida, 'days')) + 1));
   }

 }

eventClickItems();
pay();
// sendFormContact();


/* button create */
$('#btnCreateNewOrder').click(() => {
    /* Create store state */
    localStorage.setItem('currentView', 'admin')
})

