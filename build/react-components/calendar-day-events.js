/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarDayEvents = React.createClass({displayName: 'CalendarDayEvents',
  getInitialState: function() {
    return {
      collection: []
    };
  },

  getDefaultProps: function() {
    return {
      title: 'Detailed View'
    };
  },

  createEvent: function(item) {
    return (
      React.DOM.div({className: "event"}, 
        React.DOM.h4({className: "event-title"}, 
          React.DOM.a({href: item.get('link')}, item.get('title'))
        ), 

        React.DOM.div({className: "when"}, 
          React.DOM.div({className: "starts"}, 
            "Starts: ", item.starts()
          ), 
          React.DOM.div({className: "duration"}, 
            "Duration: ", item.duration()
          )
        ), 
        React.DOM.div({className: "where"}, 
          "Location: ", item.get('location')
        ), 

        React.DOM.div({className: "content"}, 
          React.DOM.div(null, item.get('content'))
        )
      )
    );
  },

  render: function() {
    var events;

    if (this.state.collection.length) {
      events = this.state.collection.map(this.createEvent);
    }
    else {
      events = 'There are no events.';
    }

    return (
      React.DOM.div({className: "selected-events-list"}, 
        React.DOM.div({className: "selected-events-list-header"}, 
          React.DOM.h3({className: "title"}, this.props.title)
        ), 
        events
      )
    );
  }
});