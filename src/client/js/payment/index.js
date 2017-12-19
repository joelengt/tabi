import { pay2, culqi2 } from '../payment2/index.js';

function UpdateOrder(user_send_id, type_send_service) {
    var URI = `${ window.location.protocol }//${ window.location.host }`;
    
    $.ajax({
        method: 'post',
        url: `${ URI }/payment/admin/${user_send_id}/${type_send_service}`,
        success: function (resultado) {
            console.log('RESULTADO DE LA CREACION DE VENTAS')
            console.log(resultado)

            $('#ModalBox').css('display', 'none');

            // Mandar el resultado al servidor

            if(resultado.status === 'Success') {

               $('.FormToPay__box')[0].innerHTML = 'Cargando PDF ...';

               window.location.href = `/plataform-pricing/${ resultado.user_id }/key-pdf?numero_pedido=${ resultado.data.numero_pedido }&ticket=${ resultado.data.charge_id }`

            } else {

                // Resultado cuando la venta no fue creada
                modalMessage(`<div>
                                <h3>${ resultado.status }</h3>
                                <p>${ resultado.message }</p>
                                <p>Si el error continua, conctanos a hola@assistabi.com, con estos datos</p>
                                <p><strong>Numero de pedido:</strong>: ${ resultado.data.numero_pedido }</p>
                                <p><strong>Ticket:</strong> ${ resultado.data.charge_id }</p>
                            </div>`);

            }

        },
        error: function(err) {
            modalMessage(`<div>
                            <h3>Upss Algo paso!</h3>
                            <p>${ err }</p>
                            <p>Si el error continua, conctanos a hola@assistabi.com, con estos datos</p>
                            <p><strong>Numero de pedido:</strong>: ${ resultado.data.numero_pedido }</p>
                            <p><strong>Ticket:</strong> ${ resultado.data.charge_id }</p>
                        </div>`);
        }
    })
}

export function pay() {

    // Get localStore
    let currentView = localStorage.getItem('currentView')

    var $btnFormComprar = document.querySelector('#btnFormComprar')

    var URI = `${ window.location.protocol }//${ window.location.host }`;

    function sendForm(data) {
        var code_id = $('.FormToPay').data('id');

        $('#btnFormComprar')[0].innerHTML ='Enviando...';

        $.ajax({
            url: `${ URI }/plataform-pricing/${ code_id }/purchare-buy/save`,
            method: 'POST',
            data: data,
            success: function (result) {
                console.log(result);

                $('#btnFormComprar')[0].innerHTML ='Comprar';

                if(result.status === 'ok') {

                    type_service = ''
                    type_service = material.premium

                    switch(currentView) {
                        case 'admin':
                            
                            modalMessage(`<div>
                                            <h3>Cargando...</h3>
                                        </div>`);


                            localStorage.setItem('currentView', 'customer')

                            // setTimeout(function(){
                                // window.location.href = `/admin/plataforma/orders`
                            // }, 5000);

                            /* Update Order */
                            var current_user_id = $('#user_id_plataforma').val()
                            UpdateOrder(current_user_id, 'premium')

                            break;

                        default:
                            pay2(result.pack.title, result.pack.tarifa);
                    }

                } else {

                    modalMessage(`<div>
                                    <h3>Ocurrio un error</h3>
                                    <p>No pudimos guardar tus datos, porfavor intenta de nuevo</p>
                                    <p>Si el error continua contactanos a hola@assistabi.com</p>
                                </div>`);
                }
            }
        })
    }

    // Evento click para btnFormComprar
    if($btnFormComprar !== null) {
        $btnFormComprar.addEventListener("click", function () {

            $('#input_nombres').css('border','1px solid transparent');
            $('#input_apellidos').css('border','1px solid transparent');
            $('#input_tipo_doc').css('border','1px solid transparent');
            $('#input_doc_number').css('border','1px solid transparent');
            $('#input_fecha_nacimiento').css('border','1px solid transparent');
            $('#input_email').css('border','1px solid transparent');
            $('#input_email').css('border','1px solid transparent');
            $('#input_domicilio').css('border','1px solid transparent');
            $('#input_telefono').css('border','1px solid transparent');
            $('#input_emergencia_nombres').css('border','1px solid transparent');
            $('#input_emergencia_apellidos').css('border','1px solid transparent');
            $('#input_emergencia_telefono').css('border','1px solid transparent');
            $('#input_emergencia_email').css('border','1px solid transparent');
            $('#input_emergencia_email').css('border','1px solid transparent');


            // Validar los campos
            var data = {
                user: {
                    nombres:      $('#input_nombres').val(),
                    apellidos:    $('#input_apellidos').val(),
                    tipo_doc:     $('#input_tipo_doc').val(),
                    doc_number:   $('#input_doc_number').val(),
                    fecha_nacimiento: $('#input_fecha_nacimiento').val(),
                    email:      $('#input_email').val(),
                    domicilio:  $('#input_domicilio').val(),
                    telefono:   $('#input_telefono').val()
                },
                contact_emergencia: {
                    nombres:   $('#input_emergencia_nombres').val(),
                    apellidos: $('#input_emergencia_apellidos').val(),
                    telefono:  $('#input_emergencia_telefono').val(),
                    email:     $('#input_emergencia_email').val()
                }
            }

            var $inputCheckTerms = $('#inputCheckTerms');

            var $messageError = $('#message_error');

            if(data.user.nombres !== '' &&
               data.user.apellidos !== '' &&
               data.user.tipo_doc !== '' &&
               data.user.doc_number !== '' &&
               data.user.fecha_nacimiento !== '' &&
               data.user.email !== '' &&
               data.user.email.indexOf('@') !== -1 &&
               data.user.domicilio !== '' &&
               data.user.telefono !== '' &&
               data.contact_emergencia.nombres !== '' &&
               data.contact_emergencia.apellidos !== '' &&
               data.contact_emergencia.telefono !== '' &&
               data.contact_emergencia.email !== '' &&
               data.contact_emergencia.email.indexOf('@') !== -1
               ) {

                console.log('PASO');

                if($inputCheckTerms[0].checked === true) {

                    fbq('track', 'AddPaymentInfo');
                    sendForm(data);

                } else {
                    $messageError.css('display','block');
                    $messageError[0].innerHTML = 'Debes Aceptar los terminos y condiciones';
                }

            } else {

                console.log('PASO');

                var msg = '';
                if(data.user.nombres === '') {
                    msg = 'El campo nombre es obligatorio';
                    $('#input_nombres').css('border','1px solid red');

                } else if(data.user.apellidos === '') {
                    msg = 'El campo apellidos es obligatorio';
                    $('#input_apellidos').css('border','1px solid red');

                } else if(data.user.tipo_doc === '') {
                    msg = 'El campo tipo de documento es obligatorio';
                    $('#input_tipo_doc').css('border','1px solid red');

                } else if(data.user.doc_number === '') {
                    msg = 'El campo numero de documento es obligatorio';
                    $('#input_doc_number').css('border','1px solid red');

                } else if(data.user.fecha_nacimiento === '') {
                    msg = 'El campo fecha de nacimiento es obligatorio';
                    $('#input_fecha_nacimiento').css('border','1px solid red');

                } else if(data.user.email === '') {
                    msg = 'El campo email es obligatorio';
                    $('#input_email').css('border','1px solid red');

                } else if(data.user.email.indexOf('@') === -1) {
                    msg = 'El campo email no es correcto';
                    $('#input_email').css('border','1px solid red');

                } else if(data.user.domicilio === '') {
                    msg = 'El campo domiciolio es obligatorio';
                    $('#input_domicilio').css('border','1px solid red');

                } else if(data.user.telefono === '') {
                    msg = 'El campo telefono es obligatorio';
                    $('#input_telefono').css('border','1px solid red');

                } else if(data.contact_emergencia.nombres === '') {
                    msg = 'El nombre del contacto de emergencia es obligatorio';
                    $('#input_emergencia_nombres').css('border','1px solid red');

                } else if(data.contact_emergencia.apellidos === '') {
                    msg = 'El apellido del contacto de emergencia es obligatorio';
                    $('#input_emergencia_apellidos').css('border','1px solid red');

                } else if(data.contact_emergencia.telefono === '') {
                    msg = 'El telefono del contacto de emergencia obligatorio';
                    $('#input_emergencia_telefono').css('border','1px solid red');

                } else if(data.contact_emergencia.email === '') {
                    msg = 'El email del contacto de emergencia es obligatorio';
                    $('#input_emergencia_email').css('border','1px solid red');

                } else if(data.contact_emergencia.email.indexOf('@') === -1) {
                    msg = 'El email del contacto de emergencia no es correcto';
                    $('#input_emergencia_email').css('border','1px solid red');

                } else {
                    msg = 'Debes llenar los campos obligatorios';
                }

                $messageError.css('display','block');
                $messageError[0].innerHTML = msg;
            }

        })
    }

    // Evento de tipeo
    $('#input_nombres').on('input', function() {

        $('#lector_name')[0].innerHTML = `${ $('#input_nombres').val() }, ${ $('#input_apellidos').val() }`

    })

    $('#input_apellidos').on('input', function() {

        $('#lector_name')[0].innerHTML = `${ $('#input_nombres').val() }, ${ $('#input_apellidos').val() }`

    })

    $('#input_tipo_doc').on('input', function() {

        $('#lector_tip_doc')[0].innerHTML = `${ $('#input_tipo_doc').val() }`

    })

    $('#input_doc_number').on('input', function() {

        $('#lector_doc')[0].innerHTML = `${ $('#input_doc_number').val() }`

    })

    $('#input_fecha_nacimiento').on('input', function() {

        $('#lector_nacimiento')[0].innerHTML = `${ $('#input_fecha_nacimiento').val() }`

    })

    $('#input_email').on('input', function() {

        $('#lector_email')[0].innerHTML = `${ $('#input_email').val() }`

    })

    $('#input_domicilio').on('input', function() {

        $('#lector_domicilio')[0].innerHTML = `${ $('#input_domicilio').val() }`

    })

    $('#input_telefono').on('input', function() {

        $('#lector_telefono')[0].innerHTML = `${ $('#input_telefono').val() }`

    })

    $('#input_emergencia_nombres').on('input', function() {

        $('#lector_contact_name')[0].innerHTML = `${ $('#input_emergencia_nombres').val() }, ${ $('#input_emergencia_apellidos').val() }`


    })

    $('#input_emergencia_apellidos').on('input', function() {

        $('#lector_contact_name')[0].innerHTML = `${ $('#input_emergencia_nombres').val() }, ${ $('#input_emergencia_apellidos').val() }`


    })

    $('#input_emergencia_telefono').on('input', function() {

        $('#lector_contact_phone')[0].innerHTML = `${ $('#input_emergencia_telefono').val() }`

    })

    $('#input_emergencia_email').on('input', function() {

        $('#lector_contact_email')[0].innerHTML = `${ $('#input_emergencia_email').val() }`

    })

}
