export function cicleSlider() {

    var slider_fotos = [
        "url('../images/cover-slider/3.jpg')",
        "url('../images/cover-slider/4.jpg')",
        "url('../images/cover-slider/5.jpg')",
        "url('../images/cover-slider/7.jpg')"
    ];

    var slider_text = [
        `<h2>Viaja, Disfruta, Explora</h2>
        <h2>Disfruta de tu viaje</h2>
        <p>Hacemos que tu seguridad este 100% Cubierta</p>`,
        `<h2>Los mejores descuentos</h2>
        <h2>Por que tu te lo mereces</h2>
        <p>Ingresa un cupón de descuento y viaje</p>`,
        `<h2>Tu viaje de aventura</h2>
        <h2>Tu solo Disfruta de tu viaje</h2>
        <p>Nosotros te cubrimos</p>`,
        `<h2>Plan para estudiantes</h2>
        <h2>Para que logres tus metas</h2>
        <p>Te damos la mejor oferta para ti</p>`
    ];

    // Obtener background dom
    var $background_image_template = $('.CoverForm');
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
            
            var $background_image_template = $('.CoverForm');
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

            eventCiclicle(number_position, 3500);

        })
        
    }

    eventCiclicle(1, 3500);

}