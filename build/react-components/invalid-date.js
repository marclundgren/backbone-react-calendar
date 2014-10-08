/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.InvalidDate = React.createClass({displayName: 'InvalidDate',
  getDefaultProps: function() {
    return {
      message: 'Invalid Date.'
    }
  },

  render: function() {
    // debugger;
    return (React.DOM.div(null, this.props.message));
  }
});