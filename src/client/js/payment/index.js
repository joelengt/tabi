import { modalMessage } from '../modalMessage/index.js';

export function pay() {

    // Tipos de servicio
    var material = {
        premium: 'premium'
    }

    var user_id = document.querySelector('#user_id_plataforma').value

    var type_service = ''

    var $btnFormComprar = document.querySelector('#btnFormComprar')

    function ConnectCulqi(user_send_id, type_send_service) {
        console.log('Comprando servicio: ' + type_send_service)
        $('#message_error')[0].innerHTML = 'Enviando...'

        $.ajax({
            method: 'post',
            url: `http://localhost:5000/payment/${user_send_id}/${type_send_service}`,
            success: function (resultado) {
                console.log('RESULTADO DE LA CREACION DE VENTAS')
                console.log(resultado)
                if(resultado.status === 'venta_registrada') {
                    // Resultado cuando la venta fue 
                    $('#message_error')[0].innerHTML = ''

                    console.log('Resultado: ' + type_send_service)
                    console.log(resultado.status)
                    console.log(resultado.message)
                    console.log(resultado.help)

                    console.log('SI ocurrio algun problema, contactanos con este numero de pedido: ' + resultado.data.numero_pedido + ' a mario@ascent.pe')
                    console.log('ticket de proceso: ' + resultado.data.ticket)

                    var checkout = {
                        codigo_comercio: resultado.data.codigo_comercio,
                        informacion_venta: resultado.data.informacion_venta, 
                        respuesta: "",
                        abrir: function () {
                            if (checkout.informacion_venta == "") {
                                alert("Intente nuevamente. Si el problema persiste, contáctese con el Comercio.")
                            
                            } else {
                                if ( document.querySelector('.culqi_checkout') == null ) { 
                                    var product = "web"
                                    var url = "/api/v1/form/" + product + "/" + checkout.codigo_comercio + "/" + checkout.informacion_venta
                                    var iframe = document.createElement("IFRAME")
                                    iframe.setAttribute("src", "https://integ-pago.culqi.com" + url)
                                    iframe.setAttribute("id", "culqi_checkout_frame")
                                    iframe.setAttribute("name", "checkout_frame")
                                    iframe.setAttribute("class", "culqi_checkout")
                                    iframe.setAttribute("allowtransparency", "true")
                                    iframe.setAttribute("frameborder", "0")
                                    iframe.style.zIndex = 99999
                                    iframe.style.display = "block"
                                    iframe.style.backgroundColor = "rgba(0,0,0,0)"
                                    iframe.style.border = "0px none trasparent"
                                    iframe.style.overflowX = "hidden"
                                    iframe.style.overflowY = "auto"
                                    iframe.style.visibility = "visible"
                                    iframe.style.margin = "0px"
                                    iframe.style.position = "fixed"
                                    iframe.style.left = "0px"
                                    iframe.style.top = "0px"
                                    iframe.style.width = "100%"
                                    iframe.style.height = "100%"
                                    iframe.style.backgroundPosition = "initial initial"
                                    iframe.style.backgroundRepeat = "initial initial"
                                    document.body.appendChild(iframe)

                                } else { 
                                    alert("Ha ocurrido un problema, contáctese con el comercio.")
                                    checkout.cerrar() 
                                } 
                            } 
                        }, 
                        autorizado: function () {
                            iframe = document.getElementById('culqi_checkout_frame')
                            iframe.contentWindow.postMessage("autorizado", "*")
                        },
                        denegado: function () {
                            iframe = document.getElementById('culqi_checkout_frame')
                            iframe.contentWindow.postMessage("denegado", "*")
                        },
                        cerrar: function (){
                            var element = document.getElementById("culqi_checkout_frame")
                            if (element == null) {

                            } else { 
                                element.parentNode.removeChild(element)
                            }
                        }
                    }

                    function receiveMessage(event) {
                        if (event.data == "checkout_cerrado") { 
                            checkout.respuesta = event.data
                            culqi_front(checkout, 'La caja de pago fue cerrada.')
                            checkout.cerrar()

                        } else if (event.data == "parametro_invalido") { 
                            checkout.respuesta = event.data
                            culqi_front(checkout, 'Los parametros ingresados son invalidos, Ingrese los campos correctamente.')
                            checkout.cerrar()

                        } else if (event.data == "venta_expirada") { 
                            checkout.respuesta = event.data
                            culqi_front(checkout, 'Tiempo limite concluido, Venta expirada.') 
                            checkout.cerrar()

                        } else if (event.data == "error") { 
                            checkout.respuesta = event.data
                            culqi_front(checkout, 'Error en el envio de datos de la caja.')
                            checkout.cerrar()

                        } else {
                            var obj = JSON.parse(event.data)
                            var venta_id = obj["id"]
                            var venta = obj["venta"]

                            if (venta_id == "Culqi") { 
                                console.log("Se completó el proceso de pago, respuesta enviada al comercio.")
                                checkout.respuesta = venta
                                culqi(checkout)
                            
                            } else {
                                console.log("No es de CULQI" + event.data) 
                            }

                        }
                    }

                    window.addEventListener("message", receiveMessage, false)

                    function culqi (checkout) {
                        console.log('RESPUESTA de culqi sobre el proceso de pago')
                        console.log(checkout.respuesta)

                        // Mandar el resultado al servidor 
                        $.ajax({
                            method: 'post',
                            url: `http://localhost:5000/payment/check/${user_send_id}/${type_send_service}?_method=put`, // URI del server
                            contentType: 'application/json',
                            data: JSON.stringify({
                                'respuesta' : checkout.respuesta
                            }),
                            success: function(data) {
                                console.log('DATA UPGRADE ??')
                                console.log(data)
                                if(data.process_messages === 'check_not_pass') {
                                    console.log(data.status)

                                } else {
                                    var obj = data

                                    console.log('Respuesta del usuario. Pago?, Error?')

                                    var tipo_respuesta_venta = obj.process_messages.codigo_respuesta

                                    if (tipo_respuesta_venta == "venta_exitosa") {
                                        
                                        checkout.cerrar()

                                        $('.FormToPay__box')[0].innerHTML = 'Cargando PDF ...';

                                        window.location.href = `/plataform-pricing/${ obj.user._id }/key-pdf`

                                    } else if (tipo_respuesta_venta == "venta_expirada") {
                                        
                                        
                                        checkout.cerrar()

                                        modalMessage(`<div>
                                                        <h3>${ obj.process_messages.codigo_respuesta }</h3>
                                                        <p>${ obj.process_messages.mensaje_respuesta_usuario }</p>
                                                        <p>Si el error continua, conctanos a hola@assistabi.com, con estos datos</p>
                                                        <p><strong>Numero de pedido:</strong> ${ obj.process_messages.numero_pedido }</p>
                                                        <p><strong>Ticket:</strong> ${ obj.process_messages.ticket }</p>
                                                    </div>`);

                                    } else if (tipo_respuesta_venta == "error") {
                                       
                                        
                                        checkout.cerrar()

                                        modalMessage(`<div>
                                                        <h3>${ obj.process_messages.codigo_respuesta }</h3>
                                                        <p>${ obj.process_messages.mensaje_respuesta_usuario }</p>
                                                        <p>Si el error continua, conctanos a hola@assistabi.com, con estos datos</p>
                                                        <p><strong>Numero de pedido:</strong>: ${ obj.process_messages.numero_pedido }</p>
                                                        <p><strong>Ticket:</strong> ${ obj.process_messages.ticket }</p>
                                                    </div>`);

                                    } else if (tipo_respuesta_venta == "parametro_invalido") {
                                        

                                        checkout.cerrar()

                                        modalMessage(`<div>
                                                        <h3>${ obj.process_messages.codigo_respuesta }</h3>
                                                        <p>${ obj.process_messages.mensaje_respuesta_usuario }</p>
                                                        <p>Si el error continua, conctanos a hola@assistabi.com, con estos datos</p>
                                                        <p><strong>Numero de pedido:</strong>: ${ obj.process_messages.numero_pedido }</p>
                                                        <p><strong>Ticket:</strong> ${ obj.process_messages.ticket }</p>
                                                    </div>`);
                                        
                                    } else if (tipo_respuesta_venta == "error_procesamiento") {
                                       

                                        checkout.cerrar()

                                        modalMessage(`<div>
                                                        <h3>${ obj.process_messages.codigo_respuesta }</h3>
                                                        <p>${ obj.process_messages.mensaje_respuesta_usuario }</p>
                                                        <p>Si el error continua, conctanos a hola@assistabi.com, con estos datos</p>
                                                        <p><strong>Numero de pedido:</strong>: ${ obj.process_messages.numero_pedido }</p>
                                                        <p><strong>Ticket:</strong> ${ obj.process_messages.ticket }</p>
                                                    </div>`);
                                        
                                    } else {
                                        
                                        checkout.cerrar()

                                        modalMessage(`<div>
                                                        <h3>${ obj.process_messages.codigo_respuesta }</h3>
                                                        <p>${ obj.process_messages.mensaje_respuesta_usuario }</p>
                                                        <p>Si el error continua, conctanos a hola@assistabi.com, con estos datos</p>
                                                        <p><strong>Numero de pedido:</strong>: ${ obj.process_messages.numero_pedido }</p>
                                                        <p><strong>Ticket:</strong> ${ obj.process_messages.ticket }</p>
                                                    </div>`);
                                    }

                                }
                            },
                            error:function(err) {
                                console.log('Error al obtener resultado: ' + err)
                            }

                        })

                    }

                    function culqi_front(checkout, message) {
                        console.log(checkout.respuesta)
                        console.log('message: ' + message)
                    }

                    checkout.abrir()

                } else {

                    $('#message_error')[0].innerHTML = resultado.message;

                    // Resultado cuando la venta no fue creada

                    modalMessage(`<div>
                                    <h3>${ resultado.status }</h3>
                                    <p>${ resultado.message }</p>
                                    <p>Si el error continua, conctanos a hola@assistabi.com, con estos datos</p>
                                    <p><strong>Numero de pedido:</strong>: ${ resultado.data.numero_pedido }</p>
                                    <p><strong>Ticket:</strong> ${ resultado.data.ticket }</p>
                                </div>`);

                }
            }
        })
    }

    function sendForm(data) {
        var code_id = $('.FormToPay').data('id');

        $.ajax({
            url: `/plataform-pricing/${ code_id }/purchare-buy/save`,
            method: 'POST',
            data: data,
            success: function (result) {
                console.log(result);

                if(result.status === 'ok') {
                    
                    type_service = ''
                    type_service = material.premium
                    ConnectCulqi(user_id, type_service)

                } else {
                    console.log('error');
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
               data.contact_emergencia.nombres !== '' &&
               data.contact_emergencia.apellidos !== '' &&
               data.contact_emergencia.telefono !== '' &&
               data.contact_emergencia.email !== '' &&
               data.contact_emergencia.email.indexOf('@') !== -1
               ) {

                console.log('PASO');

                if($inputCheckTerms[0].checked === true) {
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

}