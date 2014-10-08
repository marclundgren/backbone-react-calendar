/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.InvalidDate = React.createClass({
  getDefaultProps: function() {
    return {
      message: 'Invalid Date.'
    }
  },

  render: function() {
    // debugger;
    return (<div>{this.props.message}</div>);
  }
});