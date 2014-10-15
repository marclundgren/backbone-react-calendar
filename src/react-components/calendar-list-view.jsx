/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.CalendarListView = React.createClass({
  getDefaultProps: function() {
    return {
      active: false,
      className: 'col-md-12 calendar-list',
      defaultValue: ''
    }
  },

  createCalendar: function(item) {
    var selected = item === this.props.selected;

    return (
      <app.CalendarItemView selected={selected} changeCalendar={this.props.changeCalendar} name={item} />
    );
  },

  createCalendarOption: function(item) {
    var selected = item === this.props.selected;

    return (
      <app.CalendarItemOptionView selected={selected} name={item} />
    );
  },

  onChange: function() {
    var val = this.refs.select.getDOMNode().value;

    this.props.changeCalendar(val);
  },

  render: function() {
    var className = this.props.className;

    if (this.props.active) {
      className += ' active';
    }

    window.logTime();

    return (
      <div>
        <h4>Filter by</h4>
        <select defaultValue={this.props.defaultValue} ref="select" className="form-control" onChange={this.onChange}>
          <option value="">All</option>
          {this.props.calendars.map(this.createCalendarOption)}
        </select>
      </div>
    );
  }
});