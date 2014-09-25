/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarControls = React.createClass({displayName: 'CalendarControls',
  next: function() {
    this.props.onNext();
  },

  prev: function() {
    this.props.onPrev();
  },

  render: function() {
    return (
      React.DOM.nav({className: "calendar-controls"}, 
        React.DOM.div({className: "arrow arrow-previous", onClick: this.prev}), 
        React.DOM.h3({className: "title"}, this.props.date.format('MMMM YYYY')), 
        React.DOM.div({className: "arrow arrow-next", onClick: this.next})
      )
    );
  }
});