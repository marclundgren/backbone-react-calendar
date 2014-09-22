/** @jsx React.DOM */

// app namespace
var app = app || {};

app.Calendar = React.createClass({displayName: 'Calendar',
  getInitialState: function() {
    return {date: new Date()};
  },

  render: function() {
    return (
      React.DOM.div({className: "container-fluid"}, 
        React.DOM.div({className: "row"}, 
          React.DOM.div({className: "col-xs-12 col-md-8"}, 
            app.CalendarGrid({date: this.state.date})
          ), 
          React.DOM.div({className: "col-xs-12 col-md-4"}, 
            app.EventList({collection: this.props.events})
          )
        )
      )
    );
  }
});