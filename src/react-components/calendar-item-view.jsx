/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.CalendarItemView = React.createClass({
  getDefaultProps: function() {
    return {
      className: 'calendar-view',
      selected: false
    };
  },

  onClick: function() {
    this.props.navigateToCalendar(this.props.name);
  },

  render: function() {
    var classNameSelected = this.props.selected ? 'selected' : '';

    return (
      <div className={this.props.className} onClick={this.onClick}>
        <div className={classNameSelected}>{this.props.name}</div>
      </div>
    );
  }
});