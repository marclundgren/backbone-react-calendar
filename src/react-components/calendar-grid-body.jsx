/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarGridBody = React.createClass({
  getDefaultProps: function() {
    return {
      dates: [],
      weeks: new Backbone.Collection()
    };
  },

  createWeek: function(item) {
    return (
      <app.CalendarGridBodyRow dates={item} onGridSelect={this.props.onGridSelect} />
    );
  },

  render: function() {
    return (
      <div className='week-body'>
        {this.props.weeks.map(this.createWeek)}
      </div>
    );
  }
});