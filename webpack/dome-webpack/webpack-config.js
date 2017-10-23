/**
 * Created by pobo on 2016/12/12.
 */
module.exports = {
entry:'./entry.js',
    output:{
    path:__dirname,
    filename:'bundle.js'
    },
    module:{
    loadera:[
        {text:/\.css$/,loader:'style!css'}
        ]
    }
};