export function sendFormContact() {

    // Obtener datos del formulario
    var $FormContactName = $('#FormContactName');
    var $FormContactEmail = $('#FormContactEmail');
    var $FormContactMessage = $('#FormContactMessage');

    var $FormContactError = $('#FormContactError');

    $FormContactError.css('display', 'none');
    $FormContactError[0].innerHTML = '';

    var data = {
        name:     $FormContactName.val(),
        email:    $FormContactEmail.val(),
        message:  $FormContactMessage.val()
    }

    // Validando parametros
    console.log('Datos a enviar');
    console.log(data);

    // reset inputs border
    $FormContactName.css('border', '1px solid transparent');
    $FormContactEmail.css('border', '1px solid transparent');
    $FormContactMessage.css('border', '1px solid transparent');
    
    if(data.name !== '' &&
       data.email !== '' &&
       data.email.indexOf('@') !== -1) {

        $.ajax({
            url: '/contact',
            method: 'POST',
            data: data,
            success: function (result) {
                console.log(result);

                if(result.status === 'ok') {
                    console.log('MENSAJE OK');

                    $FormContactError.css('display', 'block');
                    $FormContactError[0].innerHTML = result.message;

                } else {
                    console.log('error');
                }
            }
        })

    } else {
        
        // Mensaje de error por campo

        var msg = '';

        if(data.name === '') {
            msg = 'El campo nombre es obligatorio';
            $FormContactName.css('border', '1px solid #F3182B')

        } else if(data.email === '') {
            msg = 'El campo email es obligatorio';
            $FormContactEmail.css('border', '1px solid #F3182B');

        } else if(data.email.indexOf('@') === -1) {
            msg = 'El campo email no es valido';
            $FormContactEmail.css('border', '1px solid #F3182B');

        } else {
            msg = 'Los campos son obligatorios';
        }

        $FormContactError.css('display', 'block');
        $FormContactError[0].innerHTML = msg;

    }

}