修改element-ui.common.js以满足项目需求，具体如下
1、增加menu打开路由配置，原来路由只可以push，加入routerReplace属性，以便可以用路由replace方式打开页面，例如this.$router.replace(route);
2、增加tree通过 key 获取已选择节点配置，
原来通过 key 获取已选择节点时候，如果该节点的子节点没有全部选中，则不能获取该节点的key，
现在改为传参containParent是否包含父节点，containParent为true的时候，表示就算该节点的子节点没有全部选中，也可以获取到该节点的key，为false则表示不能

使用方法：
在项目安装依赖后，替换PBManagement\node_modules\element-ui\lib下的element-ui.common.js后即可使用