/**
 * @jsx React.DOM
 */

var simpleToggle  = React.createClass({displayName: 'simpleToggle',
  getDefaultProps: function() {
    return {
      message: 'Tap Me'
    };
  },

  getInitialState: function() {
    return {
      active: true,
      count: 0
    };
  },

  onClick: function() {
    this.setState({
      active: !this.state.active,
      count: this.state.count + 1
    });
  },

  render: function () {
    console.log('simple toggle render');
    var className = this.state.active ? 'item active' : 'item';

    return (
      React.DOM.div({onClick: this.onClick, className: className}, this.state.count || this.props.message)
    );
  }
});

React.renderComponent(
  simpleToggle({}),
  document.getElementById('simpleToggle')
);