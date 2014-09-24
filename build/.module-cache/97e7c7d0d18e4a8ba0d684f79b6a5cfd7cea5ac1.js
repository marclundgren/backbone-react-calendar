/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarDate = React.createClass({displayName: 'CalendarDate',
  onClick: function() {
    // console.log('hello there!');
    // this.props.events
    console.log('this.props.events: ', this.props.events);
  },

  render: function() {
    return (
      React.DOM.div({className: this.props.className}, 
        React.DOM.div({className: "date-number"}, this.props.moment.date(), " onClick=", this.props.onClick)
      )
    );
  }
});