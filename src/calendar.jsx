/** @jsx React.DOM */

// app namespace
var app = app || {};

app.Calendar = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  getInitialState: function() {
    return {date: new Date() };
  },

  render: function() {
    var events = this.props.collection;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <app.CalendarGrid collection={events} date={this.state.date} />
          </div>
          <div className="col-xs-12 col-md-4">
            <app.CalendarEventList collection={events} />
          </div>
        </div>
      </div>
    );
  }
});