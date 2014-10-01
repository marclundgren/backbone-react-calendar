/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarFilter = React.createClass({
  getDefaultProps: function() {
    return {
      sources: []
    };
  },

  createEntry: function(item) {
    return (
      <app.FilterEntry model={item} name={item.get('name')} filter={this.props.filter} />
    );
  },

  render: function() {
    return (
      <div className="col-md-12 calendar-filter">
        {this.props.sources.map(this.createEntry)}
      </div>
    );
  }
});