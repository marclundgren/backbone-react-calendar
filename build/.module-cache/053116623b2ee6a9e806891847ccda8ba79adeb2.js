/** @jsx React.DOM */

// app namespace
var app = app || {};

app.Calendar = React.createClass({displayName: 'Calendar',
  mixins: [Backbone.React.Component.mixin],

  componentWillMount: function() {
    // For collections:
    this.props.collection.on("change", this.forceUpdate);
    this.props.collection.on("add", this.forceUpdate);
    this.props.collection.on("remove", this.forceUpdate);
    this.props.collection.on("reset", this.forceUpdate);

    // i may only need this...
    this.props.collection.on("sort", this.forceUpdate);
    this.props.eventscollection.on("sort", this.forceUpdate);
  },

  getInitialState: function() {
    return {date: new Date() };
  },

  onSourceToggle: function() {
    // remove add some events

    // this.setState(events)
  },

  render: function() {
    var events = this.props.collection;

    // this.props.collection
    // debugger;

    console.log('Calendar this: ', this);

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