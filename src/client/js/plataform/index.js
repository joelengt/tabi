import { modalMessage } from '../modalMessage/index.js';

export function eventClickItems() {
    $('.btnBuy').on('click', function() {
        console.log(this.dataset.pack);

        var id = $('.PricingElements').data('id');

        var data2 = {
            pack_title: this.dataset.pack,
            pack_selected_price: this.dataset.price
        }

        // Pixel facebook AddToCart
        fbq('track', 'AddToCart', {
          content_name: data2.pack_title,
          content_category: 'Pack Travel Card',
          content_ids: [String(id)],
          content_type: 'product',
          value: data2.pack_selected_price,
          currency: 'USD'
        });

        // event ajax
        $.ajax({
            url: `/plataform-pricing/${ id }/purchare/buy-form`,
            method: 'POST',
            data: data2,
            success: function (result) {
                console.log(result);

                if(result.status === 'ok') {
                    fbq('track', 'InitiateCheckout');
                    window.location.href = `/plataform-pricing/${ result.code }/purchare-form`

                } else {
                    console.log('error');
                }
            }
        })

    })

    $('.btnSeeBeneficios').on('click', function() {
        console.log(this.dataset.pack);

        var id = $('.PricingElements').data('id');

        var data3 = {
            pack_title: this.dataset.pack
        }

        // event ajax
        $.ajax({
            url: `/plataform-pricing/${ id }/pack-beneficios`,
            method: 'POST',
            data: data3,
            success: function (result) {
                console.log(result);

                $('#ModalBoxContent').css('max-width','900px');
                modalMessage(`<div class="ContentBoxTable" style="height: 300px;overflow: scroll;">${ result.template_pack }</div>`);

            }
        })
    })
}
