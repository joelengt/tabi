export function eventFormBuy () {
    console.log('FORM TO BUY');

    var code_id = $('.FormToPay').data('id');
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



    $.ajax({
        url: `/plataform-pricing/${ code_id }/purchare-buy/save`,
        method: 'POST',
        data: data,
        success: function (result) {
            console.log(result);

            if(result.status === 'ok') {
                window.location.href = `/plataform-pricing/${ result.code }/key-pdf`

            } else {
                console.log('error');
            }
        }
    })

}