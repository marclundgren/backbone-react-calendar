/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarGridHeaderCell = React.createClass({displayName: 'CalendarGridHeaderCell',
  render: function() {
    return (
      React.DOM.div({className: "grid-cell"}, 
        React.DOM.div(null, 
          React.DOM.div(null, 
            React.DOM.span(null, this.props.name)
          )
        )
      )
    );
  }
});