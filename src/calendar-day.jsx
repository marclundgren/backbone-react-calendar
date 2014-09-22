/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarDay = React.createClass({
  render: function() {
    return (
      <div className={this.props.className}>
        <div className='day-number'>{this.props.moment.date()}</div>
      </div>
    );
  }
});