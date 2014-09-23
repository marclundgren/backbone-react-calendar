/** @jsx React.DOM */

// app namespace
var app = app || {};

app.Calendar = React.createClass({displayName: 'Calendar',
  mixins: [Backbone.React.Component.mixin],

  getInitialState: function() {
    return {date: new Date() };
  },

  render: function() {
    var events = this.props.collection;

    return (
      React.DOM.div({className: "container-fluid"}, 
        React.DOM.div({className: "row"}, 
          React.DOM.div({className: "col-xs-12 col-md-8"}, 
            app.CalendarGrid({collection: events, date: this.state.date})
          ), 
          React.DOM.div({className: "col-xs-12 col-md-4"}, 
            app.CalendarEventList({collection: events})
          )
        )
      )
    );
  }
});