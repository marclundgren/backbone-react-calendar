/**
 * @jsx React.DOM
 */

app.CalendarSourceOption = React.createClass({displayName: 'CalendarSourceOption',
  render: function() {
    return (
      React.DOM.option({value: this.props.name}, this.props.name)
    );
  }
});