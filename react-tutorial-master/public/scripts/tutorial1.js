/**
 * Created by pobo on 2016/9/22.
 */


// var data = [
//   {id: 1, author: "Pete Hunt", text: "This is one comment"},
//   {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
// ];

// var CommentBox = React.createClass({
//   render: function() {
//     return (
//       <div className="commentBox">
//       Hello, world! I am a CommentBox.
//     </div>
//     );
//   }
// });
// var CommentBox = React.createClass({
//   render: function() {
//     return (
//       <div className="commentBox">
//       <h1>Comments</h1>
//       <CommentList />
//       <CommentForm />
//       </div>
//     );
//   }
// });
// var CommentBox = React.createClass({
//   render: function() {
//     return (
//       <div className="commentBox">
//       <h1>Comments</h1>
//       <CommentList data={this.props.data} />
//     <CommentForm />
//     </div>
//     );
//   }
// });
// var CommentBox = React.createClass({
//   getInitialState: function() {
//     return {data: []};
//   },
//   render: function() {
//     return (
//       <div className="commentBox">
//       <h1>Comments</h1>
//       <CommentList data={this.state.data} />
//     <CommentForm />
//     </div>
//     );
//   }
// });
// var CommentBox = React.createClass({
//   getInitialState: function() {
//     return {data: []};
//   },
//   componentDidMount: function() {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       cache: false,
//       success: function(data) {
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },
//   render: function() {
//     return (
//       <div className="commentBox">
//       <h1>Comments</h1>
//       <CommentList data={this.state.data} />
//     <CommentForm />
//     </div>
//     );
//   }
// });
// var CommentBox = React.createClass({
//   loadCommentsFromServer: function() {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       cache: false,
//       success: function(data) {
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },
//   getInitialState: function() {
//     return {data: []};
//   },
//   componentDidMount: function() {
//     this.loadCommentsFromServer();
//     setInterval(this.loadCommentsFromServer, this.props.pollInterval);
//   },
//   render: function() {
//     return (
//       <div className="commentBox">
//       <h1>Comments</h1>
//       <CommentList data={this.state.data} />
//     <CommentForm />
//     </div>
//     );
//   }
// });
// var CommentBox = React.createClass({
//   loadCommentsFromServer: function() {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       cache: false,
//       success: function(data) {
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },
//   handleCommentSubmit: function(comment) {
//     // TODO: submit to the server and refresh the list
//   },
//   getInitialState: function() {
//     return {data: []};
//   },
//   componentDidMount: function() {
//     this.loadCommentsFromServer();
//     setInterval(this.loadCommentsFromServer, this.props.pollInterval);
//   },
//   render: function() {
//     return (
//       <div className="commentBox">
//       <h1>Comments</h1>
//       <CommentList data={this.state.data} />
//     <CommentForm onCommentSubmit={this.handleCommentSubmit} />
//     </div>
//     );
//   }
// });
// var CommentBox = React.createClass({
//   loadCommentsFromServer: function() {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       cache: false,
//       success: function(data) {
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },
//   handleCommentSubmit: function(comment) {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       type: 'POST',
//       data: comment,
//       success: function(data) {
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },
//   getInitialState: function() {
//     return {data: []};
//   },
//   componentDidMount: function() {
//     this.loadCommentsFromServer();
//     setInterval(this.loadCommentsFromServer, this.props.pollInterval);
//   },
//   render: function() {
//     return (
//       <div className="commentBox">
//       <h1>Comments</h1>
//       <CommentList data={this.state.data} />
//     <CommentForm onCommentSubmit={this.handleCommentSubmit} />
//     </div>
//     );
//   }
// });
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
      <h1>Comments</h1>
      <CommentList data={this.state.data} />
    <CommentForm onCommentSubmit={this.handleCommentSubmit} />
    </div>
    );
  }
});

// var CommentList = React.createClass({
//   render: function() {
//     return (
//       <div className="commentList">
//       Hello, world! I am a CommentList.
//     </div>
//     );
//   }
// });
// var CommentList = React.createClass({
//   render: function() {
//     return (
//       <div className="commentList">
//       <Comment author="Pete Hunt">This is one comment</Comment>
//     <Comment author="Jordan Walke">This is *another* comment</Comment>
//     </div>
//     );
//   }
// });
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
      {comment.text}
      </Comment>
      );
    });
    return (
      <div className="commentList">
      {commentNodes}
      </div>
    );
  }
});

// var CommentForm = React.createClass({
//   render: function() {
//     return (
//       <div className="commentForm">
//       Hello, world! I am a CommentForm.
//     </div>
//     );
//   }
// });
// var CommentForm = React.createClass({
//   render: function() {
//     return (
//       <form className="commentForm">
//       <input type="text" placeholder="Your name" />
//       <input type="text" placeholder="Say something..." />
//       <input type="submit" value="Post" />
//       </form>
//     );
//   }
// });
// var CommentForm = React.createClass({
//   getInitialState: function() {
//     return {author: '', text: ''};
//   },
//   handleAuthorChange: function(e) {
//     this.setState({author: e.target.value});
//   },
//   handleTextChange: function(e) {
//     this.setState({text: e.target.value});
//   },
//   render: function() {
//     return (
//       <form className="commentForm">
//       <input
//     type="text"
//     placeholder="Your name"
//     value={this.state.author}
//     onChange={this.handleAuthorChange}
//     />
//     <input
//     type="text"
//     placeholder="Say something..."
//     value={this.state.text}
//     onChange={this.handleTextChange}
//     />
//     <input type="submit" value="Post" />
//       </form>
//     );
//   }
// });
// var CommentForm = React.createClass({
//   getInitialState: function() {
//     return {author: '', text: ''};
//   },
//   handleAuthorChange: function(e) {
//     this.setState({author: e.target.value});
//   },
//   handleTextChange: function(e) {
//     this.setState({text: e.target.value});
//   },
//   handleSubmit: function(e) {
//     e.preventDefault();//阻止浏览器提交表单的默认行为
//     var author = this.state.author.trim();
//     var text = this.state.text.trim();
//     if (!text || !author) {
//       return;
//     }
//     // TODO: send request to the server
//     this.setState({author: '', text: ''});
//   },
//   render: function() {
//     return (
//       <form className="commentForm" onSubmit={this.handleSubmit}>
//     <input
//     type="text"
//     placeholder="Your name"
//     value={this.state.author}
//     onChange={this.handleAuthorChange}
//     />
//     <input
//     type="text"
//     placeholder="Say something..."
//     value={this.state.text}
//     onChange={this.handleTextChange}
//     />
//     <input type="submit" value="Post" />
//       </form>
//     );
//   }
// });
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});//增加
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
    <input
    type="text"
    placeholder="Your name"
    value={this.state.author}
    onChange={this.handleAuthorChange}
    />
    <input
    type="text"
    placeholder="Say something..."
    value={this.state.text}
    onChange={this.handleTextChange}
    />
    <input type="submit" value="Post" />
      </form>
    );
  }
});

// var Comment = React.createClass({
//   render: function() {
//     return (
//       <div className="comment">
//       <h2 className="commentAuthor">
//       {this.props.author}
//     </h2>
//     {this.props.children}
//     </div>
//     );
//   }
// });
// var Comment = React.createClass({
//   render: function() {
//     var md = new Remarkable();
//     return (
//       <div className="comment">
//       <h2 className="commentAuthor">
//       {this.props.author}
//     </h2>
//     {md.render(this.props.children.toString())}
//     </div>
//     );
//   }
// });
var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
      <h2 className="commentAuthor">
      {this.props.author}
    </h2>
    <span dangerouslySetInnerHTML={this.rawMarkup()} />
    </div>
    );
  }
});


// ReactDOM.render(
// <CommentBox />,
//   document.getElementById('content')
// );
// ReactDOM.render(
// <CommentBox data={data} />,
//   document.getElementById('content')
// );
// ReactDOM.render(
// <CommentBox url="/api/comments" />,
//   document.getElementById('content')
// );
ReactDOM.render(
<CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
