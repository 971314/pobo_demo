module.exports = {
    devPort: 8082,
    projectConfig: [{
        //项目名称
        projectName: "consult",
        //项目根路径
        projectPrefix: "consult",
        //开发代理服务地址
        proxyServer: "http://static.yunyesoft.com",
        // 生产请求服务地址
        productionServer: "http://static.yunyesoft.com",
    }, {
        //项目名称
        projectName: "info",
        //项目根路径
        projectPrefix: "info",
        //开发代理服务地址
        proxyServer: "http://static.yunyesoft.com",
        // proxyServer: "http://172.168.1.112:8080",
        // 生产请求服务地址
        productionServer: "http://static.yunyesoft.com",
    }],
    //图片服务器前缀
    // PrefixImg: "https://static.yunyesoft.com/fsimg",
    PrefixImg: "https://pbsq.pobo.net.cn/fsimg",
    //微信项目菜单栏配置
    WxMenuConf: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx638babfb858e32f8&redirect_uri=http%3a%2f%2fservice.yunyesoft.com%2fjifen%2findex.html%3fpath%3d${path}%26params%3d${params}%26merchantNum%3d${merchantNum}&response_type=code&scope=snsapi_base&state=mineauth#wechat_redirect"
}
