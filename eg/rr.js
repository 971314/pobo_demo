/**
 * Created by pobo on 2016/9/19.
 */
var HelloMessage = React.createClass({

    render: function() {
        // return React.createElement('div',{className:'item'},React.createElement('img',{src:this.props.src}))
        return React.createElement('div',{className:'item'},React.createElement('img',{src:'111.png'}))
    }
});
// var HelloMessage = this.props.Links.map(function(linkValue,index){
//     return (
//         <div className={ $that.props.currentIndex==index?"active":""}
//     onTouchStart = {$that.TabTo.bind($that, index)}
//     onTouchEnd = {$that.TabEnd.bind($that, index)}>{linkValue}</div>
//     );
// });

ReactDOM.render(
<HelloMessage src='top.png' />,document.getElementById('img-lb')
);