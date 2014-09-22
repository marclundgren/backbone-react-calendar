/** @jsx React.DOM */

// app namespace
var app = app || {};

app.Calendar = React.createClass({
  getInitialState: function() {
    return {date: new Date()};
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <app.CalendarGrid date={this.state.date} />
          </div>
          <div className="col-xs-12 col-md-4">
            <app.EventList collection={this.props.events} />
          </div>
        </div>
      </div>
    );
  }
});