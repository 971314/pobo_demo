<template>
<div id="secondcomponent">
    <h1>I am another page</h1>
    <a>written by {{author}}</a>
    <P>感谢 <a href="https://github.com/showonne">showonne</a>大神的技术指导</P>
    <ul>
        <li v-for="article in articles">{{article.title}}</li>
    </ul>
</div>
</template>
<script>
export default{
    data(){
        return {
            author:"微信公众号 jinkey-love",
            articles:[]
        }
    },
    mounted:function () {
        this.$http.jsonp('https://api.douban.cmo/v2/movie/top250?count=10',{},{
            headers:{

            },
            emulateJSON:true
        }).then(function (response) {
            this.articles = response.data.subjects
        },function (response) {
            console.log(response)
        })
    }
}
</script>
<style>

</style>