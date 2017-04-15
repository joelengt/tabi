import $ from './jquery-2.2.4.min.js';

function index() {
    $.ajax({
        'url': '/',
        'method': 'get',
        'success': function () {
            return console.log('Get hello');
        }
    })
}

index();
