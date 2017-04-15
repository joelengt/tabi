export function getPdf() {

    console.log('pdf get');
    var data = {
        dni: $('#dni').val()
    }
    
    $('#msgBox').css('display', 'block');
    $('#msgBox')[0].innerHTML = `<p> Buscando...</p>`;

    $.ajax({
        url: '/plataform-pricing/forget-pdf-access',
        method: 'POST',
        data: data,
        success: function (result) {
            console.log(result);

            if(result.status === 'ok') {
                $('#msgBox')[0].innerHTML = `<p>Cargando...</p>`;

                window.location.href = `/plataform-pricing/${ result.code }/key-pdf?numero_pedido=${ result.data.numero_pedido }&ticket=${ result.data.charge_id }`

            } else {
                $('#msgBox')[0].innerHTML = `<p>Numero de Documento no valido</p>`;
            }
        },
        statusCode: {
            404: function (err) {
                $('#msgBox')[0].innerHTML = `<p>Numero de Documento no registrado</p>`;
            }
        }
    })

}