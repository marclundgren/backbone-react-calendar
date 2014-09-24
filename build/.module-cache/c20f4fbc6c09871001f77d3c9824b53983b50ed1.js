/** @jsx React.DOM */

// app namespace
var app = app || {};

app.Calendar = React.createClass({displayName: 'Calendar',
  mixins: [Backbone.React.Component.mixin],

  componentWillMount: function() {
    this.props.eventscollection.on('change', this.forceUpdate);
    this.props.eventscollection.on('add', this.forceUpdate);
    this.props.eventscollection.on('remove', this.forceUpdate);
    this.props.eventscollection.on('reset', this.forceUpdate);
    this.props.eventscollection.on('sort', this.forceUpdate);
  },

  getInitialState: function() {
    return {date: new Date() };
  },

  onSourceToggle: function() {
    // remove add some events

    // this.setState(events)
  },

  render: function() {
    // var events = this.props.collection;
    var events = this.props.collection;
    var eventscollection = this.props.eventscollection;

    // this.props.collection
    // debugger;

    console.log('Calendar this: ', this);

    return (
      React.DOM.div({className: "container-fluid"}, 
        React.DOM.div({className: "row"}, 
          React.DOM.div({className: "col-md-12"}, 
            app.CalendarSources({sources: this.props.sources})
          )
        ), 

        React.DOM.div({className: "row"}, 
          React.DOM.div({className: "col-xs-12 col-md-8"}, 

            app.CalendarGrid({
              collection: events, 
              eventscollection: eventscollection, 
              date: this.state.date})

          ), 
          React.DOM.div({className: "col-xs-12 col-md-4"}, 
            app.CalendarEventList({
              collection: events, 
              eventscollection: eventscollection})
          )
        )
      )
    );
  }
});