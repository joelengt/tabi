// Tipos de servicio
var material = {
    premium: 'premium'
}

var user_id = document.querySelector('#user_id_plataforma').value

var type_service = material.premium;

var URI = `${ window.location.protocol }//${ window.location.host }`;

function culqi() {
    console.log('EVENTO');
    if (Culqi.token !== undefined) { // Token creado exitosamente!

        // Obtener el token ID
        var token = Culqi.token.id;
        console.log('TOKEN LISTO')
        console.log(token);

        ConnectCulqi(user_id, type_service, token);

    } else { // Hubo algun problema!
        // Mostramos JSON de objeto error en consola
        console.log(Culqi.error);
    }
};


function ConnectCulqi(user_send_id, type_send_service, token) {
    console.log('Comprando servicio: ' + type_send_service)
    $('#message_error')[0].innerHTML = 'Enviando...'

    modalMessage(`<div>
                    <h3>Enviando...</h3>
                </div>`);

    $.ajax({
        method: 'post',
        data: {
            token: token
        },
        url: `${ URI }/payment/${user_send_id}/${type_send_service}`,
        success: function (resultado) {
            console.log('RESULTADO DE LA CREACION DE VENTAS')
            console.log(resultado)

            $('#ModalBox').css('display', 'none');

            // Mandar el resultado al servidor

            if(resultado.status === 'Success') {

              // Pixel Facebook Purchase
              fbq('track', 'Purchase', {
                content_name: `PEDIDO: ${resultado.data.numero_pedido} - Ticket ${resultado.data.charge_id}`,
                content_category: 'Pack Travel Card',
                content_ids: [`${ resultado.user_id }`],
                content_type: 'product'
              });

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

        }
    })
}

function modalMessage(message) {

    $('#ModalBox').css('display', 'inline-flex');
    $('#ContentMessage')[0].innerHTML = message;

    var $btnClose = $('#btnClose');

    $btnClose.on('click', function () {
        $('#ModalBox').css('display', 'none');

    })
}
