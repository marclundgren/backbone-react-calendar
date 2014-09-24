/** @jsx React.DOM */

// app namespace
var app = app || {};

app.Calendar = React.createClass({displayName: 'Calendar',
  // mixins: [Backbone.React.Component.mixin],

  componentWillMount: function() {
    this.props.eventscollection.on('change', this.forceUpdate);
    this.props.eventscollection.on('add', this.forceUpdate);
    this.props.eventscollection.on('remove', this.forceUpdate);
    this.props.eventscollection.on('reset', this.forceUpdate);
    this.props.eventscollection.on('sort', this.forceUpdate);

    // todo: test adding thse as an array like ['add', 'remove', 'reset']
    this.props.sources.on('add', this.forceUpdate);
    this.props.sources.on('remove', this.forceUpdate);
    this.props.sources.on('change', this.forceUpdate);
    this.props.sources.on('reset', this.forceUpdate);
  },

  getInitialState: function() {
    return {date: new Date() };
  },

  onSourceToggle: function() {
    // remove add some events

    // this.setState(events)
  },

  onChange: function(event) {
    var self = this;

    var vals = $(event.currentTarget).val();

    var filteredEvents = vals.map(function(name) {
      // return self.props.clonedCollection.where({calendarName: name})
      return self.props.eventscollection.where({calendarName: name})
    });

    // filteredEvents
    var flatFilteredEvents = _.flatten(filteredEvents);
    console.log('flatFilteredEvents: ', flatFilteredEvents.length);

    this.refs.calendarGrid
    console.log('this.refs.calendarGrid: ', this.refs.calendarGrid.setState({collection: flatFilteredEvents}));
    this.refs.calendarEventList
    console.log('this.refs.calendarEventList: ', this.refs.calendarEventList.setState({collection: flatFilteredEvents}));
  },

  createOption: function(item) {
    // <option value=""></option>
    return app.CalendarSourceOption({
      name: item.get('name')
    });
  },

  render: function() {
    var names = this.props.sources.pluck('name');
    console.log('names: ', names);

    // debugger;

    // defaultValue={names}

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
              ref: "calendarGrid", 
              collection: this.props.collection, 
              eventscollection: this.props.eventscollection, 
              date: this.state.date})
          ), 

          React.DOM.div({className: "col-xs-12 col-md-4"}, 
            app.CalendarEventList({
              ref: "calendarEventList", 
              collection: this.props.collection, 
              eventscollection: this.props.eventscollection})
          )
        )
      )
    );
  }
});