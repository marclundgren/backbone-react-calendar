/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.EventIndicator = React.createClass({
  render: function() {
    var className = 'event-indicator';

    if (this.props.hasEvents) {
      className += ' has-events';
    }

    return (
      <div className={className}></div>
    );
  }
});