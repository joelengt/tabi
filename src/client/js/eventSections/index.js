export function EventScrollSections() {
    var $bodyT = document.querySelectorAll('body section');
    var $spanCircle = document.querySelectorAll('.MainVerticalBar a');

    var scrollNow = 0;
    
    $('.HeaderMain__NavMain__Container ul li span').click(function(e){               
        // e.preventDefault();     //evitar el eventos del enlace normal
        var strAncla=$(this).attr('href'); //id del ancla
        $('body,html').stop(true,true).animate({                
            scrollTop: $(strAncla).offset().top
        },1400);
        
    });

    //header

    $(window).scroll(function (event) {

        var e = $(this).scrollTop(); //set position from top when to change style in pixels
        
        console.log(e);

        if (e >= 128) {
            $('.HeaderMain').css('position','fixed');
            $('.HeaderMain').css('background','rgb(0, 110, 150)');

        } else {

           $('.HeaderMain').css('position','absolute');
           $('.HeaderMain').css('background','transparent');

        }

        $('.HeaderMain__NavMain__Container ul li a')[1].style.borderBottomColor = 'transparent';
        $('.HeaderMain__NavMain__Container ul li a')[2].style.borderBottomColor = 'transparent'; 
        $('.HeaderMain__NavMain__Container ul li a')[3].style.borderBottomColor = 'transparent';
        $('.HeaderMain__NavMain__Container ul li a')[4].style.borderBottomColor = 'transparent';

        if(e >= 20 && e <= 500) {

            $('.HeaderMain__NavMain__Container ul li a')[1].style.borderBottomColor = 'white'; 

        }

        if(e >= 500 && e <= 1070) {

            // Marcando la posicion del menu nav
            $('.HeaderMain__NavMain__Container ul li a')[2].style.borderBottomColor = 'white'; 

        }

        if(e >= 1070 && e <= 1600) {

            // Marcando la posicion del menu nav
            $('.HeaderMain__NavMain__Container ul li a')[3].style.borderBottomColor = 'white'; 

        }

        if(e >= 1600) {

            // Marcando la posicion del menu nav
            $('.HeaderMain__NavMain__Container ul li a')[4].style.borderBottomColor = 'white'; 

        }

    });
}
