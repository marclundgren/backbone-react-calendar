/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarGridBody = React.createClass({
  getDefaultProps: function() {
    return {
      events: [],
      dates: [],
      weekLength: 7,

      onGridSelect: function() {}
    };
  },

  createWeek: function(item) {
    return (
      <app.CalendarGridBodyRow dates={item} onGridSelect={this.props.onGridSelect} />
    );
  },

  weeks: function() {
    var weeks = [];

    var dates = this.props.dates;

    var weeksInMonth = (dates.length / this.props.weekLength);

    var daysOfMonthCollection = new Backbone.Collection(dates);

    for (var index = 0; index < weeksInMonth; index++) {
      weeks[index] = daysOfMonthCollection.where({week: index + 1});
    }

    return weeks;
  },

  render: function() {
    var weeks = this.weeks(); // ~2ms

    return (
      <div className='week-body'>
        {weeks.map(this.createWeek)}
      </div>
    );
  }
});