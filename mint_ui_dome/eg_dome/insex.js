/**
 * Created by pobo on 2017/2/22.
 */
Vue.component('bp-toast', {
    template: '<div class="toast"><span>{{mes}}</span></div>',
    props:['mes']
});

Vue.prototype.toastopen = function (mes) {
    let app = document.getElementById('app'),
        html = document.createElement("bp-toast");
    html.setAttribute('mes',mes);
    app.appendChild(html);
};