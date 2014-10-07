/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarControls = React.createClass({displayName: 'CalendarControls',
  getDefaultProps: function() {
    return {
      date: moment()
    };
  },

  next: function() {
    var date = this.props.date.clone();

    this.props.onNext(date.startOf('month').add(1, 'month').format('YYYY-MM'));
  },

  prev: function() {
    var date = this.props.date.clone();

    this.props.onPrev(date.startOf('month').subtract(1, 'month').format('YYYY-MM'));
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