/**
 * Created by pobo on 2017/2/13.
 */
//程序设置及数据库连接初始化
var http = require('http'),
    work = require('./lib/timetrack'),
    mysql = require('mysql'),
    db = mysql.createConnection({
        host:'localhost',
        user:'wangqian',
        password:'123456wq',
        database:'timetrack'
    }),
    server = http.createServer(function (req,res) {//HTTP请求路由
        switch(req.method){
            case 'POST':
                switch(req.url){
                    case '/':
                        work.add(db,req,res);
                        break;
                    case '/archive':
                        work.archive(db,req,res);
                        break;
                    case '/delete':
                        work.delete(db,req,res);
                        break;
                }
                break;
            case 'GET':
                switch(req.url){
                    case '/':
                        work.show(db,res);
                        break;
                    case '/archived':
                        work.showArchived(db,res);
                        break;
                }
        }
    });

// 创建数据库表
db.query(
    'CREATE TABLE IF NOT EXISTS work ('//建表SQL
    + 'id INT(10) NOT NULL AUTO_INCREMENT, '
    + 'hours DECIMAL(5,2) DEFAULT 0, '
    + 'date DATE, '
    + 'archived INT(1) DEFAULT 0, '
    + 'description LONGTEXT,'
    + 'PRIMARY KEY(id))',
    function (err) {
        if (err) throw err;
        console.log('Server started...');
        server.listen(3000,'127.0.0.1');//启动HTTP服务器
    }
);

