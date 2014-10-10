/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarEventItem = React.createClass({displayName: 'CalendarEventItem',
  getDefaultProps: function() {
    return {
      click: function() {},
      date: null,
      duration: '',
      id: '',
      subtitle: 'Lorem ipsum Ut id commodo cillum sit fugiat adipisicing laboris dolore do pariatur exercitation.',
      location: '',
      starts: '',
      title: ''
    };
  },

  onClick: function() {
    this.props.click(this.props.id);
  },

  render: function() {
    return (
      React.DOM.div({className: "event event-fixed-height-temp-className", onClick: this.onClick}, 
        React.DOM.div({className: "event-content"}, 
          React.DOM.h3({className: "title"}, this.props.title), 
          React.DOM.div({className: "subtitle"}, 
            this.props.subtitle
          )
        ), 
        React.DOM.i({className: "glyphicon glyphicon-chevron-right"})
      )
    );
  },

  __render: function() {
    return (
      React.DOM.div({className: "event", onClick: this.onClick}, 
        React.DOM.div({className: "event-content"}, 
          React.DOM.h5({className: "title"}, 
            this.props.title
          ), 
          React.DOM.div({className: "when"}, 
            React.DOM.div({className: "starts"}, 
              "Starts: ", this.props.starts
            ), 
            React.DOM.div({className: "duration"}, 
              "Duration: ", this.props.duration
            )
          ), 
          React.DOM.div({className: "location"}, 
            "Location: ", this.props.location
          )
        )
      )
    );
  }
});

// React Component
app.CalendarEventList = React.createClass({displayName: 'CalendarEventList',
    getDefaultProps: function() {
      return {
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
      var title = this.props.date ? this.props.date.format('MMMM DD') : 'placeholder';

      return title;
    },

    createEntry: function (entry) {
      return (
        app.CalendarEventItem({
          click: this.props.click, 
          duration: entry.duration(), 
          location: entry.get('location'), 
          id: entry.get('id'), 
          starts: entry.starts(), 
          title: entry.get('title')})
      );
    },

    onChange: function(e) {
      var sortValue = this.refs.sortValue.getDOMNode().value;

      this.setState({sortValue: sortValue});
    },

    render: function () {
      var events = this.props.events;
      console.log('events: ', events);

      var sortValue = this.state.sortValue;

      // events = new Backbone.CalendarEvents(events);

      var eventsSorted = events.sortBy(this.state.sortValue);

      var eventsView;

      if (eventsSorted.length) {
        eventsView = eventsSorted.map(this.createEntry);
      }
      else {
        eventsView = 'I could not find any events.';
      }

      return (
        React.DOM.div({className: "col-xs-12 col-sm-6 col-md-6 col-lg-9 event-list-container"}, 
          React.DOM.div({className: "event-list-header"}, 
            React.DOM.h3({className: "events-title"}, this.title()), 

            React.DOM.select({ref: "sortValue", value: sortValue, name: "sortvalue", onChange: this.onChange}, 
              React.DOM.option({value: "startTime"}, "Date"), 
              React.DOM.option({value: "title"}, "Title"), 
              React.DOM.option({value: "location"}, "Location")
            )
          ), 

          React.DOM.div({className: this.props.className}, eventsView)
        )
      );
    }
});