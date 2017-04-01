export function modalMessage(message) {

    $('#ModalBox').css('display', 'inline-flex');
    $('#ContentMessage')[0].innerHTML = message;

    var $btnClose = $('#btnClose');

    $btnClose.on('click', function () {
        $('#ModalBox').css('display', 'none');

    })
}