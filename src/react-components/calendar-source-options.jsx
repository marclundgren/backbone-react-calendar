/**
 * @jsx React.DOM
 */

// todo: rename this file

app.CalendarSourceOption = React.createClass({
  getInitialState: function() {
    return {selected: true}
  },

  render: function() {
    var className = 'calendar-source';

    if (this.state.selected) {
      className += ' selected';
    }

    return (
      <option selected={this.state.selected} value={this.props.name}>{this.props.name}</option>
    );
  }
});