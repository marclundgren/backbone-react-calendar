/**
 * @jsx React.DOM
 */

// todo: split this out
app.CalendarSource = React.createClass({displayName: 'CalendarSource',
  onClick: function() {
    console.log('toggle these events', this);
  },

  render: function() {
    return (
      React.DOM.div({className: "calendar-source", onClick: this.onClick}, 
        "Name: ", this.props.name
      )
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