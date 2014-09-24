/** @jsx React.DOM */

// app namespace
var app = app || {};

app.Calendar = React.createClass({displayName: 'Calendar',
  getInitialState: function() {
    return {date: new Date()};
  },

  onChange: function(event) {
    var self = this;

    var vals = $(event.currentTarget).val();

    var filteredEvents = vals.map(function(name) {
      return self.props.eventscollection.where({calendarName: name})
    });

    var flatFilteredEvents = _.flatten(filteredEvents);

    this.refs.calendarGrid.setState({collection: flatFilteredEvents});
    this.refs.calendarEventList.setState({collection: flatFilteredEvents});
  },

  createOption: function(item) {
    return app.CalendarSourceOption({name: item.get('name')});
  },

  render: function() {
    var names = this.props.sources.pluck('name');

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
          React.DOM.div({className: "col-xs-12 col-md-8"}, 
            app.CalendarGrid({
              date: this.state.date, 
              collection: this.props.collection, 
              ref: "calendarGrid"})
          ), 

          React.DOM.div({className: "col-xs-12 col-md-4"}, 
            app.CalendarEventList({
              collection: this.props.collection, 
              ref: "calendarEventList"})
          )
        )
      )
    );
  }
});