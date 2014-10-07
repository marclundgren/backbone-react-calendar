/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.CalendarListView = React.createClass({
  getDefaultProps: function() {
    return {
      className: 'col-md-12 calendar-list'
    }
  },

  createCalendar: function(item) {
    var selected = item === this.props.selected;

    return (
      <app.CalendarItemView selected={selected} navigateToCalendar={this.props.navigateToCalendar} name={item} />
    );
  },

  render: function() {
    return (
      <div className={this.props.className}>
        {this.props.calendars.map(this.createCalendar)}
      </div>
    );
  }
});