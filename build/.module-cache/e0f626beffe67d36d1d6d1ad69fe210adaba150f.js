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

  onChange: function() {
    this.refs.calendarGrid
    console.log('this.refs.calendarGrid: ', this.refs.calendarGrid);
    this.refs.calendarEventList
    console.log('this.refs.calendarEventList: ', this.refs.calendarEventList);
  },

  render: function() {
    // var events = this.props.collection;
    var events = this.props.collection;
    var eventscollection = this.props.eventscollection;


    var clonedModels = eventscollection.map(function(model) {
      // clonedCollection.add(new Backbone.Model(model.toJSON()));
      return model.toJSON();
    });

    var clonedCollection = new Backbone.GoogleEvents(clonedModels);

    //   <app.CalendarSources
    //     clonedCollection={clonedCollection}
    //     eventscollection={this.props.eventscollection}
    //     sources={this.props.sources} />
    // </div>

    // var names = this.props.sources.pluck('name');
    debugger;

    // return (
    //   <div></div>
    // );

    return (
      React.DOM.div({className: "container-fluid"}, 
        React.DOM.div({className: "row"}, 
          React.DOM.div({className: "col-md-12"}, 
            React.DOM.div({className: "calendar-source-filter"}, 
              React.DOM.select({
                multiple: true, 
                name: "source-filter", 
                id: "calendarSourceFilter", 
                onChange: this.onChange, 
                defaultValue: this.props.sources.pluck('name')}, 
                this.props.sources.map(this.createOption)
              )
            )
          )
        ), 

        React.DOM.div({className: "row"}, 
          React.DOM.div({className: "col-xs-12 col-md-8"}, 
            app.CalendarGrid({
              ref: "calendarGrid", 
              collection: events, 
              eventscollection: eventscollection, 
              date: this.state.date})
          ), 

          React.DOM.div({className: "col-xs-12 col-md-4"}, 
            app.CalendarEventList({
              ref: "calendarEventList", 
              collection: events, 
              eventscollection: eventscollection})
          )
        )
      )
    );
  }
});