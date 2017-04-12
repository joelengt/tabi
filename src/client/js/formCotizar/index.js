export function sendFormCotizar() {

    // Obtener datos del formulario
    var $input_origen = $('#input_origen');
    var $input_destino = $('#input_destino');
    var $input_tipo_viaje = $('#input_tipo_viaje');

    var $input_salida = $('#input_salida');
    var $input_regreso = $('#input_regreso');
    var $input_dias = $('#input_dias');

    var $input_pasajero = $('#input_pasajero');
    var $input_adulto_mayor = $('#input_adulto_mayor');
    var $input_code_promocion = $('#input_code_promocion');

    var $email = $('#email');

    var $msg_error = $('#message_error');

    $msg_error.css('display', 'none');
    $msg_error[0].innerHTML = '';

    var data = {
        origen: $input_origen.val(),
        destino: $input_destino.val(),
        tipo_viaje: $input_tipo_viaje.val(),
        salida: $input_salida.val(),
        regreso: $input_regreso.val(),
        dias: $input_dias.val(),
        pasajero: $input_pasajero.val(),
        adulto_mayor: $input_adulto_mayor.val(),
        promocion: $input_code_promocion.val(),
        email: $email.val()
    }

    // Validando parametros
    console.log('Datos a enviar');
    console.log(data);

    // reset inputs border
    $input_origen.css('border', '1px solid transparent');
    $input_destino.css('border', '1px solid transparent');
    $input_tipo_viaje.css('border', '1px solid transparent');

    $input_salida.css('border', '1px solid transparent');
    $input_regreso.css('border', '1px solid transparent');
    $input_dias.css('border', '1px solid transparent');

    $input_pasajero.css('border', '1px solid transparent');
    $input_adulto_mayor.css('border', '1px solid transparent');
    $input_code_promocion.css('border', '1px solid transparent');

    $email.css('border', '1px solid transparent');

    if(data.origen !== '' &&
       data.destino !== '' &&
       data.tipo_viaje !== '' &&
       data.salida !== '' &&
       data.regreso !== '' &&
       data.dias !== '' &&
       Number(data.dias) > 0 &&
       data.pasajero !== '' &&
       Number(data.pasajero) >= 0 &&
       data.adulto_mayor !== '' &&
       Number(data.adulto_mayor) >= 0 &&
       data.email !== '' &&
       data.email.indexOf('@') !== -1) {

       if(Number(data.pasajero) === 0 &&
       Number(data.adulto_mayor) === 0) {

            msg = 'Debe seleccionar algun viajero';
            $input_pasajero.css('border', '1px solid #F3182B');
            $input_adulto_mayor.css('border', '1px solid #F3182B');

            $msg_error.css('display', 'block');
            $msg_error[0].innerHTML = msg;

       } else {
            $.ajax({
                url: '/plataform-pricing/validate',
                method: 'POST',
                data: data,
                success: function (result) {
                    console.log(result);

                    if(result.status === 'ok') {
                        window.location.href = `/plataform-pricing/${ result.code }`

                    } else {
                        console.log('error');
                    }
                },
                error: function (err) {
                    console.log('error', err);
                }
            })
       }

    } else {
        
        // Mensaje de error por campo

        var msg = '';

        if(data.origen === '') {
            msg = 'El campo origen es obligatorio';
            $input_origen.css('border', '1px solid #F3182B')

        } else if(data.destino === '') {
            msg = 'El campo destino es obligatorio';
            $input_destino.css('border', '1px solid #F3182B');

        } else if(data.tipo_viaje === '') {
            msg = 'El campo tipo de viaje es obligatorio';
            $input_tipo_viaje.css('border', '1px solid #F3182B');

        } else if(data.salida === '') {
            msg = 'El campo salida es obligatorio';
            $input_salida.css('border', '1px solid #F3182B');

        } else if(data.regreso === '') {
            msg = 'El campo regreso es obligatorio';
            $input_regreso.css('border', '1px solid #F3182B');

        } else if(data.dias === '') {
            msg = 'El campo dias es obligatorio';
            $input_dias.css('border', '1px solid #F3182B');

        } else if(Number(data.dias) < 1) {
            msg = 'Escoge una fecha valida';
            $input_dias.css('border', '1px solid #F3182B');

        } else if(data.pasajero === '') {
            msg = 'El campo pasajero es obligatorio';
            $input_pasajero.css('border', '1px solid #F3182B');

        } else if(Number(data.pasajero) < 0) {
            msg = 'El campo pasajero no es valido';
            $input_pasajero.css('border', '1px solid #F3182B');

        } else if(data.adulto_mayor === '') {
            msg = 'El campo adulto mayor es obligatorio';
            $input_adulto_mayor.css('border', '1px solid #F3182B');

        } else if(Number(data.adulto_mayor) < 0) {
            msg = 'El campo adulto mayor no es valido';
            $input_adulto_mayor.css('border', '1px solid #F3182B');

        } else if(data.email === '') {
            msg = 'El campo email es obligatorio';
            $email.css('border', '1px solid #F3182B');

        } else if(data.email.indexOf('@') === -1) {
            msg = 'El campo email no es valido';
            $email.css('border', '1px solid #F3182B');

        } else {
            msg = 'Los campos son obligatorios';
        }

        $msg_error.css('display', 'block');
        $msg_error[0].innerHTML = msg;

    }

}