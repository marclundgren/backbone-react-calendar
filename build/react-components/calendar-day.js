/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarDate = React.createClass({displayName: 'CalendarDate',
  onClick: function() {

    // todo: show these events

    console.log('this.props.events: ', this.props.events);
  },

  render: function() {
    return (
      React.DOM.div({className: this.props.className, onClick: this.props.onClick}, 
        React.DOM.div({className: "date-number"}, this.props.moment.date())
      )
    );
  }
});