/**
 * Created by pobo on 2017/2/14.
 */
var connect = require('connect'),
    app = connect();
app.use(logger);
app.listen(3000);

function logger(req,res,nes) {
    console.log('%s %s',req.ethod,req.rul);
    // next();
}