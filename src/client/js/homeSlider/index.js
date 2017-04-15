export function cicleSlider() {

    var slider_fotos = [
        "url('../images/cover-slider/Slider--1.jpg')",
        "url('../images/cover-slider/Slider--2.jpg')",
        "url('../images/cover-slider/Slider--3.jpg')",
        "url('../images/cover-slider/Slider--4.jpg')"
    ];

    var slider_text = [
        `<h2>Más que un Seguro de Viaje,</h2>
        <h2>Una Tarjeta de Asistencia</h2>
        <p>Una asistencia médica a tu alcance</p>`,

        `<h2>Viaja, vive, explora</h2>
        <h2>Disfruta de tu viaje</h2>
        <p>Tu seguridad, nuestra responsabilidad</p>`,

        `<h2>No pagues más</h2>
        <h2>Cómprala en minutos</h2>
        <p>A cualquier hora y en cualquier lugar</p>`,

        `<h2>¿Viajes de Estudios?</h2>
        <h2>Work and Travel</h2>
        <p>Te damos el mejor precio para ti</p>`
    ];

    // Obtener background dom
    var $background_image_template = $('.CoverForm__box');
    var $content_text_template = $('.CoverForm__title--Content');
    var $circles = $('.CoverForm__title--circles');

    var cicleEventSlider = null;

    function eventCiclicle(positionInitial, time) {
        var i = positionInitial;

        var timer = time;

        cicleEventSlider = setInterval(function() {

            if(i > slider_fotos.length - 1) {
                i = 0;
            }
            
            $background_image_template.css("background-image", slider_fotos[i]);
            $content_text_template[0].innerHTML = slider_text[i];

            // pintar a todos de blanco
            for(var u = 0; u <=  $circles.children().length - 1; u++) {
                $circles.children()[u].childNodes[0].style.background = 'transparent';
            }

            $circles.children()[i].childNodes[0].style.background = 'white';

            i++;

        }, timer);

        $('.CoverForm__title--circlesItem').click(function() {
            
            var $background_image_template = $('.CoverForm__box');
            var $content_text_template = $('.CoverForm__title--Content');
            var $circles = $('.CoverForm__title--circles');

            clearInterval(cicleEventSlider);

            var number_position = Number($(this)[0].dataset.position)

            $background_image_template.css("background-image", slider_fotos[number_position]);
            $content_text_template[0].innerHTML = slider_text[number_position];

            // pintar a todos de blanco
            for(var u = 0; u <=  $circles.children().length - 1; u++) {
                $circles.children()[u].childNodes[0].style.background = 'transparent';
            }

            $circles.children()[number_position].childNodes[0].style.background = 'white';

            cicleEventSlider = null;

            eventCiclicle(number_position, 3700);

        })
        
    }

    eventCiclicle(1, 3700);

}