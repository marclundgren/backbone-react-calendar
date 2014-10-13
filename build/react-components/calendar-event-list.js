/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarEventItem = React.createClass({displayName: 'CalendarEventItem',
  getDefaultProps: function() {
    return {
      eventLink: function() {},
      date: null,
      duration: '',
      id: '',
      sortKey: '',
      subtitle: '',
      location: '',
      startMoment: moment(),
      starts: '',
      title: ''
    };
  },

  onClick: function() {
    this.props.eventLink(this.props.id);
  },

  render: function() {
    var sortKey = this.props.sortKey;

    if (sortKey === 'date') {
      return (
        React.DOM.div({className: "event event-fixed-height-temp-className", onClick: this.onClick}, 
          React.DOM.div({className: "sortKey"}, 
            this.props.startMoment.format('hh:mm a')
          ), 
          React.DOM.div({className: "event-content"}, 

            React.DOM.h4({className: "title"}, this.props.title), 

            React.DOM.div({className: "subtitle"}, 
              this.props.location
            )
          ), 
          React.DOM.div({className: "arrow"}, 
            React.DOM.i({className: "glyphicon glyphicon-chevron-right"})
          )
        )
      );
    }
    else if (sortKey === 'location') {
      return (
        React.DOM.div({className: "event event-fixed-height-temp-className", onClick: this.onClick}, 
          React.DOM.div({className: "sortKey"}, 
            this.props.location
          ), 
          React.DOM.div({className: "event-content"}, 

            React.DOM.h4({className: "title"}, this.props.title), 

            React.DOM.div({className: "subtitle"}, 
              this.props.startMoment.format('hh:mm a')
            )
          ), 
          React.DOM.div({className: "arrow"}, 
            React.DOM.i({className: "glyphicon glyphicon-chevron-right"})
          )
        )
      );
    }
    else if (sortKey === 'title') {
      return (
        React.DOM.div({className: "event event-fixed-height-temp-className", onClick: this.onClick}, 
          React.DOM.div({className: "event-content no-sortKey"}, 
            React.DOM.h4({className: "title"}, this.props.title), 

            React.DOM.div({className: "subtitle-primary"}, 
              this.props.location
            ), 

            React.DOM.div({className: "subtitle-secondary"}, 
              this.props.startMoment.format('hh:mm a')
            )
          ), 
          React.DOM.div({className: "arrow"}, 
            React.DOM.i({className: "glyphicon glyphicon-chevron-right"})
          )
        )
      );
    }
    else {
      return (
        React.DOM.div({className: "event event-fixed-height-temp-className", onClick: this.onClick}, 
          React.DOM.div({className: "sortKey"}, 
            this.props.startMoment.format('hh:mm a')
          ), 
          React.DOM.div({className: "event-content"}, 

            React.DOM.h4({className: "title"}, this.props.title), 

            React.DOM.div({className: "subtitle"}, 
              this.props.location
            )
          ), 
          React.DOM.div({className: "arrow"}, 
            React.DOM.i({className: "glyphicon glyphicon-chevron-right"})
          )
        )
      );
    }
  }
});

// React Component
app.CalendarEventList = React.createClass({displayName: 'CalendarEventList',
    getDefaultProps: function() {
      return {
        containerClassName: 'col-xs-12 col-sm-6 col-md-6 col-lg-9 event-list-container',
        className: 'calendar-event-list',
        events: [],
        title: 'All Events'
      };
    },

    getInitialState: function() {
      return {
        collection: [],
        sortValue: 'startTime',
        visible: true
      };
    },

    title: function() {
      var title;
      if (this.props.date) {
        title = this.props.date.format('MMMM DD');
      }
      else if(this.props.calendar) {
        title = this.props.calendar;
      }
      else {
        title = this.props.title;
      }

      return title;
    },

    createEntry: function (entry) {
      // console.log('entry: ', entry);
      return (
        app.CalendarEventItem({
          duration: entry.duration(), 
          eventLink: this.props.eventLink, 
          id: entry.get('id'), 
          sortKey: this.state.sortValue, 
          location: entry.get('location'), 
          startMoment: entry.startMoment(), 
          starts: entry.starts(), 
          title: entry.get('title')})
      );
    },

    onChange: function(e) {
      var sortValue = this.refs.sortValue.getDOMNode().value;

      this.setState({sortValue: sortValue});
    },

    render: function () {
      var sortValue = this.state.sortValue;

      var eventsSorted = this.props.events.sortBy(sortValue);
      // console.log('eventsSorted: ', eventsSorted.length);

      var noEvents = '';

      if (eventsSorted.length === 0) {
         noEvents = 'I could not find any events.';
      }

      return (
        React.DOM.div({className: this.props.containerClassName}, 
          React.DOM.div({className: "event-list-header"}, 
            React.DOM.h3({className: "events-title"}, this.title()), 

            React.DOM.select({ref: "sortValue", value: sortValue, name: "sortvalue", onChange: this.onChange}, 
              React.DOM.option({value: "startTime"}, "Date"), 
              React.DOM.option({value: "title"}, "Title"), 
              React.DOM.option({value: "location"}, "Location")
            )
          ), 

          React.DOM.div({className: this.props.className}, eventsSorted.map(this.createEntry)), 

          React.DOM.div({className: "no-events"}, noEvents)
        )
      );
    }
});