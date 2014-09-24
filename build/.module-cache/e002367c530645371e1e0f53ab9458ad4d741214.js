/**
 * @jsx React.DOM
 */

// todo: split this out

// todo: fix this.props.attributes

app.CalendarSource = React.createClass({displayName: 'CalendarSource',
  getInitialState: function() {
    return {
      selected: true
    }
  },

  onClick: function() {
    console.log('toggle: ', this.props.attributes.name);
  },

  render: function() {
    return (
      React.DOM.a({href: "#", className: "calendar-source", onClick: this.onClick}, 
        "Name: ", this.props.attributes.name
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
      React.DOM.div({className: "calendar-source-filter"}, 
        this.props.sources.map(this.createEntry)
      )
    );
  }
});