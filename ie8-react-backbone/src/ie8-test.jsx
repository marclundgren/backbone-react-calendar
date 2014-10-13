/** @jsx React.DOM */

if (typeof React == 'undefined') {
  alert('could not find React.')
}
else {
  var UserView = React.createClass({
    render: function() {
      return (
        <div>
          <h1>{this.props.name}</h1>
        </div>
      );
    }
  });

  // Mount your component directly
  React.renderComponent(
    <UserView name={'Carl Poppa'} />,
    document.getElementById('test')
  );
}


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