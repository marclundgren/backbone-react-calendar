/** @jsx React.DOM */

alert('test ie8!');

var UserView = React.createBackboneClass({
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.h1(null, this.getModel().get("name"))
      )
    );
  }
});

var user = new Backbone.Model({
  name: 'Carl Poppa'
});

var userView = UserView({model: user});

// Mount your component directly
React.renderComponent(userView, document.getElementById('test'));