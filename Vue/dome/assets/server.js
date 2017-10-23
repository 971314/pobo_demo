/**
 * Created by pobo on 2017/1/13.
 */
'user strict'
var fs = require('fs'),
    path = require('path');
    global.Vue = require('vue');
var layout = fs.readFileSync('./index.html','utf-8'),
    renderer = require('vue-server-renderer').createRenderer(),
    express = require('express'),
    server = express();

server.use('/assets',express.static(
    path.resolve(__dirname,'assets')
));

server.get('*',function (request,response) {
    renderer.renderToString(
        request('./assets/app')(),
        function (error,html) {
            if(error){
                console.error(error);
                return response.status(500).send('Server Error')
            }
            response.send(layout.replace('<div id="app"></div>',html))
        }
    )
});
server.listen(5000,function (error) {
    if(error) throw error;
    console.log('Server is running at localhost:5000 ')
});