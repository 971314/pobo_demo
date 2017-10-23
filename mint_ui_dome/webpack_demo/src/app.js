/**
 * Created by pobo on 2017/2/23.
 */
import 'babel-polyfill';
import cats from './cats.js';
import $ from 'jquery';

$('<h1></h1>').appendTo('body');
const ul = $('<ul></ul>').appendTo('body');

for(const cat of cats){
    $('<li></li>').text(cat).appendTo(ul);
}