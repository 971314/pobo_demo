/**
 * Created by pobo on 2017/2/13.
 */
var qs = require('querystring');

exports.sendHtml = function (res,html) {//发送HTML响应
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(html);
};

exports.parseReceivedData = function (req,cb) {//解析HTTP POST数据
    var body = '';
    req.setEncoding('utf8');
    req.on('data',function (chunk) {
        body += chunk;
    });
    req.on('end',function () {
        var data = qs.parse(body);
        cb(data);
    })
};

exports.actionForm = function (id,path,label) {//渲染简单的表单
    var html = '<form method="POST" action="'+ path +'">' +
        '<input type="hidden" name="id" value="'+id+'"/>' +
        '<input type="submit" value="'+label+'"/>' +
        '</form>';
    return html;
};

// 用MySQL添加数据
exports.add = function (db,req,res) {//添加工作记录
    exports.parseReceivedData(req,function (work) {//解析HTTP POST数据
        db.query(
            'INSERT INTO work (hours,date,description)' +//添加工作记录的SQL
            'VALUES (?,?,?)',
            [work.hours,work.date,work.description],//添加工作记录的SQL
            function (err) {
                if(err) throw err;
                exports.show(db,res);//给用户显示工作记录清单
            }
        );
    });
};

// 删除MySQL数据
exports.delete = function (db,req,res) {//删除工作记录
    exports.parseReceivedData(req,function (work) {//解析HTTP POST数据
        db.query(
            'DELETE FROM work WHERE id=?',//删除工作记录的SQ
            [work.id],//工作记录ID
            function (err) {
                if (err) throw err;
                exports.show(db,res);//给用户显示工作记录清单
            }
        );
    });
};

// 更新MySQL数据
exports.archive = function (db,req,res) {//归档一条工作记录
    exports.parseReceivedData(req,function (work) {//解析HTTP POST数据
        db.query(
            'UPDATE work SET archived=1 WHERE id=?',//更新工作记录的SQL
            [work.id],//工作记录ID
            function (err) {
                if(err) throw err;
                exports.show(db,res);//给用户显示工作记录清单
            }
        );
    });
};

// 获取MySQL数据
exports.show = function (db,res,showArchived) {//获取工作记录
    var query = 'SELECT * FROM work' +//获取工作记录的SQL
        'WHERE archived=? ' +
        'ORDER BY date DESC',
        archiveValue = (showArchived) ? 1:0;
    db.query(
        query,
        [archiveValue],//获取工作记录的SQL
        function (err,rows) {
            if(err) throw err;
            html = (showArchived) ? '': '<a href="/archived">Archived Work</a><br/>';
            html += exports.workHitlistHtml(rows);
            html += exports.workFormHtml();//将结果格式化为HTML表格
            exports.sendHtml(res,html);//给用户发送HTML响应
        }
    );
};

exports.showArchived = function (db,res) {
    exports.show(db,res,true);//只显示归档的工作记录
};

// 渲染MySQL记录
exports.workHitlistHtml = function (rows) {//将工作记录渲染为HTML表格
    var html = '<table>';
    for(var i in rows){//将每条工作记录渲染为\HTML表格中的一行
        html += '<tr>';
        html += '<td>' + rows[i].date + '</td>';
        html += '<td>' + rows[i].hours + '</td>';
        html += '<td>' +rows[i].description + '</td>';
        if(!rows[i].archived){//如果工作记录还没归档，显示归档按钮
            html += '<td>' + exports.workArchiveForm(rows[i].id) + '</td>';
        }
        html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>';
        html += '</tr>';
    }
    html += '</table>';
    return html;
};

// 渲染HTML表单
exports.workFormHtml = function () {
    var html = '<form method="POST" action="/">' +//渲染用来输入新工作记录的空白HTML表单
        '<p>Date (YYYY-MM-DD): <br/><input name="date" type="text"/></p>' +
        '<p>Hours worked: <br/><input name="hours" type="text"/></p>' +
        '<p>Description:<br/>' +
        '<textarea name="description"></textarea></p>' +
        '<input type="submit" value="Add"/>' +
        '</form>';
    return html;
};
exports.workArchiveForm = function (id) {//渲染归档按钮表单
    return exports.actionForm(id,'/archive','Archive');
};
exports.workDeleteForm = function (id) {
    return exports.actionForm(id,'/delete','Delete');//渲染删除按钮表单
};