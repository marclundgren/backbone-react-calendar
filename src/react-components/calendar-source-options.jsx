/**
 * @jsx React.DOM
 */

app.CalendarSourceOption = React.createClass({
  render: function() {
    return (
      <option value={this.props.name}>{this.props.name}</option>
    );
  }
});