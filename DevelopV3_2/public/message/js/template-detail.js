var TEMPLATES_DETAIL = {
    DEFAULT: {
        created: function(){
            this.item.cont = this.item.cont.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                .replace(/(https?:\/\/[\w\-]+(\.[\w\-]+)+(:\d+)?(\/[\w\-%\.\/\?#!=&\$]*)?)/g, '<a href="pobo:pageId=900003&url=$1">$1</a>');
        },
        template:"<div class='pre' v-html='item.cont'></div>"
    }
}