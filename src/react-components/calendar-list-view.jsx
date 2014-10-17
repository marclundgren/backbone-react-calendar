/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.CalendarListView = React.createClass({
  getDefaultProps: function() {
    return {
      active: false,
      calendars: [],
      className: 'col-md-12 calendar-list',
      defaultValue: ''
    }
  },

  createCalendarOption: function(item) {
    return (
      <app.CalendarItemOptionView
        name={item}
        selected={this.props.selected} />
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