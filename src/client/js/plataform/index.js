export function eventClickItems() {
    $('.btnBuy').on('click', function() {
        console.log(this.dataset.pack);

        var id = $('.PricingElements').data('id');

        var data2 = {
            pack_title: this.dataset.pack
        }

        // event ajax
        $.ajax({
            url: `/plataform-pricing/${ id }/purchare/buy-form`,
            method: 'POST',
            data: data2,
            success: function (result) {
                console.log(result);

                if(result.status === 'ok') {
                    window.location.href = `/plataform-pricing/${ result.code }/purchare-form`

                } else {
                    console.log('error');
                }
            }
        })

    })
}