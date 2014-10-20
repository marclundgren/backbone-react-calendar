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
      selected: ''
    }
  },

  createCalendarOption: function(item) {
    return (
      <option value={item}>{item}</option>
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
        <select className="form-control" value={this.props.selected} ref="select" onChange={this.onChange}>
          <option value="">All</option>
          {this.props.calendars.map(this.createCalendarOption)}
        </select>
      </div>
    );
  }
});