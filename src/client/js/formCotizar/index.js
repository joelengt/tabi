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
    console.log('DATOS ENVIADOS');
    console.log(data);

    if(data.origen !== '') {

        $.ajax({
            url: '/plataform-pricing/validate',
            method: 'POST',
            data: data,
            success: function (result) {
                console.log(result);

                if(result.status === 'ok') {
                    window.open(`/plataform-pricing/${ result.code }`);

                } else {
                    console.log('error');
                }
            }
        })

    } else {
        console.log('ERROR');
    }

}