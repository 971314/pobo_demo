var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
if (isAndroid) {
  document.write('<style>body{padding-top: 48px;} .navbar-fixed-top{min-height: 48px;} .navbar .navbar-brand{height: 48px; padding: 15px;} .navbar .navbar-text{line-height: 48px;}</style>');
}