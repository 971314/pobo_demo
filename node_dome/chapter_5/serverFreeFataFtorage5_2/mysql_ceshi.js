/**
 * Created by pobo on 2017/2/14.
 */
var mysql = require('mysql'),
    TEST_DATABASE = 'ceshi',
    TEST_TABLE = 'user',
    client = mysql.createConnection({
        user:'root',
        password:'971314wq'
    });
client.connect();
client.query('use' + TEST_DATABASE);

client.query(
    'SELECT * FROM ' + TEST_TABLE,
    function selectCb(err,results,fields) {
        if (err) throw err;

        if (results){
            for(var i = 0; i < results.length;i++){
                console.log('%d\t%s\t%s',results[i].i,results[o].name,results[i].age);
            }
        }
        client.end();
    }
);

// 3、运行结果
//
// D:\nodejs\mysql>node mysql.js
// 1 　　 u1 　　 23
// 2 　　 u2 　　 24
// 3 　　 u3 　　 25