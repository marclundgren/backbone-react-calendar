/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarGridHeader = React.createClass({displayName: 'CalendarGridHeader',
  getDefaultProps: function() {
    return {
      // to-do, build these with moment's locale
      names: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    }
  },

  render: function() {
    return (
      React.DOM.div({className: "week-header"}, 
        app.CalendarGridHeaderRow({names: this.props.names})
      )
    );
  }
});