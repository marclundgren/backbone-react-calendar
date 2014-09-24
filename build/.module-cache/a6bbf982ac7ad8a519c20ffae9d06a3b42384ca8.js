/**
 * @jsx React.DOM
 */

app.CalendarSources = React.createClass({displayName: 'CalendarSources',
  render: function() {


    return (
      React.DOM.div({className: "calendar-sources"}, 
        this.props.sources.map(this.createEntry)
      )
    );
  }
});