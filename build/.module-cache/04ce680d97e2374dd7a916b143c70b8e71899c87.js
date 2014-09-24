/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

// React Component
app.CalendarEventList = React.createClass({displayName: 'CalendarEventList',
    // mixins: [Backbone.React.Component.mixin],

    getInitialState: function() {
      return {
        collection: [], // Backbone Models,
        sortValue: 'date'
      };
    },


    createEntry: function (entry) {
      return (
        React.DOM.div({className: "event"}, 
          React.DOM.h3({className: "title"}, 
            React.DOM.a({href: entry.get('href')}, entry.get('title'))
          ), 
          React.DOM.div({className: "when"}, 
            React.DOM.div({className: "starts"}, 
              "Starts: ", entry.starts()
            ), 
            React.DOM.div({className: "duration"}, 
              "Duration: ", entry.duration()
            )
          ), 
          React.DOM.div({className: "where"}, 
            "Location: ", entry.get('location')
          ), 
          React.DOM.div({className: "entry-content"}, entry.get('content'))
        )
      );
    },

    onChange: function(e) {
      var sortValue = this.refs.sortValue.getDOMNode().value;

      this.setState({sortValue: sortValue});
    },

    render: function () {
      // test
      // this.props.collection = [];

      // debugger;

      // var googleEventList = new Backbone.GoogleEvents(this.props.collection);
      // var googleEventList = this.props.eventscollection;
      var googleEvents = this.state.collection;

      if (googleEvents.length && !(googleEvents instanceof Backbone.GoogleEvents)) {
        googleEvents = new Backbone.GoogleEvents(googleEvents);
      }

      var events = googleEvents.sortBy(this.state.sortValue);

      return (
        React.DOM.div({className: "eventListContainer"}, 
          React.DOM.div({className: "event-list-header"}, 
            React.DOM.h2({className: "events-title"}, "Events"), 

            React.DOM.select({ref: "sortValue", value: this.state.sortValue, name: "sortvalue", onChange: this.onChange}, 
              React.DOM.option({value: "date"}, "Date"), 
              React.DOM.option({value: "title"}, "Title"), 
              React.DOM.option({value: "location"}, "Location")
            )
          ), 

          React.DOM.div({className: "events-list"}, events.map(this.createEntry))
        )
      );
    }
});