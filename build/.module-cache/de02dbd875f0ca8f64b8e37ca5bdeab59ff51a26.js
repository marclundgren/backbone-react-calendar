/**
 * @jsx React.DOM
 */

app.CalendarSource = React.createClass({displayName: 'CalendarSource',
  render: function() {
    return (
      React.DOM.div({className: "calendar-source"})
    );
  }
});

app.CalendarSources = React.createClass({displayName: 'CalendarSources',
  createEntry: function(item) {
    return app.CalendarSource(item);
  },

  render: function() {


    return (
      React.DOM.div({className: "calendar-sources"}, 
        this.props.sources.map(this.createEntry)
      )
    );
  }
});