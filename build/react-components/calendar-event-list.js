/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

// React Component
app.CalendarEventList = React.createClass({displayName: 'CalendarEventList',
    getDefaultProps: function() {
      return {
        title: 'All Events'
      };
    },

    getInitialState: function() {
      return {
        collection: [],
        sortValue: 'date',
        visible: true
      };
    },

    toggleVisible: function() {
      this.setState({visible: !this.state.visible});
    },

    createEntry: function (entry) {
      return (
        React.DOM.div({className: "event"}, 
          React.DOM.h5({className: "title"}, 
            React.DOM.a({href: entry.get('link')}, entry.get('title'))
          ), 
          React.DOM.div({className: "when"}, 
            React.DOM.div({className: "starts"}, 
              "Starts: ", entry.starts()
            ), 
            React.DOM.div({className: "duration"}, 
              "Duration: ", entry.duration()
            )
          ), 
          React.DOM.div({className: "location"}, 
            "Location: ", entry.get('location')
          )
        )
      );
    },

    onChange: function(e) {
      var sortValue = this.refs.sortValue.getDOMNode().value;
      console.log('sortValue: ', sortValue);

      this.setState({sortValue: sortValue});
    },

    render: function () {
      var googleEvents = this.state.collection;

      if (googleEvents.length && !(googleEvents instanceof Backbone.GoogleEvents)) {
        googleEvents = new Backbone.GoogleEvents(googleEvents);
      }

      // todo clean this up!
      var events = googleEvents.length && googleEvents.sortBy(this.state.sortValue) || [];

      var classNameEventsList = 'events-list';

      if (!this.state.visible) {
        classNameEventsList += ' hide';
      }

      return (
        React.DOM.div({className: "eventListContainer"}, 
          React.DOM.div({className: "event-list-header"}, 
            React.DOM.h3({className: "events-title"}, this.props.title), 

            React.DOM.select({ref: "sortValue", value: this.state.sortValue, name: "sortvalue", onChange: this.onChange}, 
              React.DOM.option({value: "date"}, "Date"), 
              React.DOM.option({value: "title"}, "Title"), 
              React.DOM.option({value: "location"}, "Location")
            ), 

            React.DOM.div({class: "toggleVisible", onClick: this.toggleVisible}, 
              "toggle visible"
            )
          ), 

          React.DOM.div({className: classNameEventsList}, events.map(this.createEntry))
        )
      );
    }
});