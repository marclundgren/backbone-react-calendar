/** @jsx React.DOM */

alert('test ie8');

var UserView = React.createClass({displayName: 'UserView',
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.h1(null, this.props.name)
      )
    );
  }
});

var userView = UserView({});

// Mount your component directly
React.renderComponent(
  UserView({name: 'Carl Poppa'}),
  document.getElementById('test')
);

// var UserView = React.createBackboneClass({
//   render: function() {
//     return (
//       <div>
//         <h1>{this.getModel().get("name")}</h1>
//       </div>
//     );
//   }
// });

// var user = new Backbone.Model({
//   name: 'Carl Poppa'
// });

// var userView = UserView({model: user});

// // Mount your component directly
// React.renderComponent(userView, document.getElementById('test'));