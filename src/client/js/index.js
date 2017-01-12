import $ from './vendor/jquery-2.2.4.min.js';
import test from './vendor/test.js';

import naming from './date/index.js';
import { data, info, get } from './date/items.js';
import infoController from './date/infoController';

import index from './react/app.js';

naming();
data();
info();
get();

var name = 'AAA2020100';
console.log(name);

var infoData = new infoController();
infoData.getInfo('/path/dist/numberZeroToOne');


index();

function index2() {
    $.ajax({
        'url': '/',
        'method': 'get',
        'success': function () {
            return console.log('Get hello main');
        }
    })
}

index2();
