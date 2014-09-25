/** @jsx React.DOM */

// app namespace
var app = app || {};

app.Calendar = React.createClass({displayName: 'Calendar',
  getDefaultProps: function() {
    return {
      params: {},
      sources: []
    };
  },

  getInitialState: function() {
    return {
      date: new Date(),
      collection: new Backbone.GoogleCalendar
    };
  },

  componentDidMount: function() {
    var self = this;

    var googleCalendar = new Backbone.GoogleCalendar({
      params: this.props.params,
      sources: this.props.sources
    });

    googleCalendar.fetchSources().done(function(results) {
      var collection = googleCalendar.get('events');

      if (!(collection instanceof Backbone.GoogleEvents)) {
        collection = new Backbone.GoogleEvents(collection);
      }

      self.setState({collection: collection});

      self.refs.calendarGrid.setState({collection: collection});
      self.refs.calendarEventList.setState({collection: collection});

      console.log('collection: ', collection);
    });
  },

  onChange: function(event) {
    var self = this;

    var vals = $(event.currentTarget).val();

    var filteredEvents = vals.map(function(name) {
      return self.state.collection.where({calendarName: name})
    });

    var flatFilteredEvents = _.flatten(filteredEvents);

    this.refs.calendarGrid.setState({collection: flatFilteredEvents});
    this.refs.calendarEventList.setState({collection: flatFilteredEvents});
  },

  createOption: function(item) {
    return app.CalendarSourceOption({name: item.name});
  },

  render: function() {
    var sources = new Backbone.Collection(this.props.sources);

    var names = sources.pluck('name');

    return (
      React.DOM.div({className: "container-fluid"}, 
        React.DOM.div({className: "row"}, 
          React.DOM.div({className: "col-md-12"}, 
            React.DOM.div({className: "calendar-source-filter"}, 
              React.DOM.select({multiple: true, name: "source-filter", id: "calendarSourceFilter", onChange: this.onChange, defaultValue: names}, 
                this.props.sources.map(this.createOption)
              )
            )
          )
        ), 

        React.DOM.div({className: "row"}, 
          React.DOM.div({className: "col-xs-12 col-md-4"}, 
            app.CalendarGrid({
              date: this.state.date, 
              collection: this.props.collection, 
              ref: "calendarGrid"})
          ), 

          React.DOM.div({className: "col-xs-12 col-md-8"}, 
            app.CalendarEventList({
              collection: this.props.collection, 
              ref: "calendarEventList"})
          )
        )
      )
    );
  }
});