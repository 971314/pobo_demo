(function(){
    var time = new Date(), timeout, queue = [], qIndex = 0, pbSys, localIndex = localStorage.localIndex||-1;
    if(typeof pbE != "undefined") {
        pbSys = pbE.SYS();
        !pbSys.writeH5Log && (pbSys=null); 
    }
    function f2(m){
        return m < 10 ? "0" + m : m;
    }
    function formatMsg(m) {
        time.setTime(Date.now());
        return time.getFullYear() + "-" + f2(time.getMonth()+1) + "-" + f2(time.getDate())
        + " " + f2(time.getHours()) + ":" + f2(time.getMinutes()) + ":" + f2(time.getSeconds())
        + " " + (typeof m == "object" ? JSON.stringify(m) : m);
    }
    function addQueue(m) {
        queue.push(m);
        if(!timeout)
            timeout = setInterval(function(){
                var end = queue.length;
                if(qIndex < end){ 
                    qIndex = end;
                }
            }, 1000);
    }
    window.pblog = {
        local:true,
        remote:false,
        file:true,
        info: function(text){
            var msg = formatMsg(text);
            if(this.file && pbSys) {
                pbSys.writeH5Log(msg+"\n");
            }
            if(this.local) {
                localStorage.setItem(++localIndex, msg);
                localStorage.setItem("localIndex", localIndex);
            }
            if(this.remote) 
                addQueue(msg);
            return this;
        },
        clear:function(){
            while(localIndex>=0) {
                localStorage.removeItem(localIndex);
                --localIndex;
            }   
            localStorage.removeItem("localIndex");
        },
        readFile: function(){
            if(pbSys)
                return pbSys.readH5Log()||"";
            return "";
        },
        readLocal: function(){
            var i = -1, logs = "";
            while(++i in localStorage)
                logs += localStorage[i] + "\n";
            return logs;
        }
    }

    var div = document.createElement("div");
    div.innerHTML = "<div id='_pblogs' style='position:fixed;top:0;left:0;color:#000;background:#fff;width:100%;height:100%;z-index:9999;overflow-y:auto;margin:0;display:none;'><span style='text-decoration:underline'>file</span> <span>localStorage</span>  <span>clear</span><pre></pre><pre style='display:none'></pre></div><div style='position:fixed;right:5px;bottom:5px;color:#000;background:yellow;z-index:9999'>logs</div>";
    document.body.appendChild(div);
    var logsCon = document.getElementById('_pblogs'), spans = logsCon.getElementsByTagName("span"), pres = logsCon.getElementsByTagName("pre");
    logsCon.nextSibling.onclick = function(){
        if(logsCon.style.display=='none'){
            pres[0].innerHTML = pblog.readFile();
            pres[1].innerHTML = pblog.readLocal();
            logsCon.style.display = 'block';
        }else
            logsCon.style.display = 'none';
    }
    for(var i =0;i<2;i++) {
        spans[i].onclick = function(){
            if(this.style.textDecoration=="underline")
                return;
            var j = spans[0] == this ? 1 : 0;
            this.style.textDecoration = "underline";
            spans[j].style.textDecoration = "none";
            pres[j].style.display = "none";
            pres[(++j)%2].style.display = "block";
        }
    }
    spans[2].onclick = function(){
        pblog.clear();
        pres[1].innerHTML = "";    
    }
})()