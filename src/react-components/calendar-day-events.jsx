/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarDayEvents = React.createClass({
  getInitialState: function() {
    return {
      collection: []
    };
  },

  getDefaultProps: function() {
    return {
      title: 'Detailed View'
    };
  },

  createEvent: function(item) {
    return (
      <div className="event">
        <h4 className="event-title">
          <a href={item.get('link')}>{item.get('title')}</a>
        </h4>

        <div className="when">
          <div className="starts">
            Starts: {item.starts()}
          </div>
          <div className="duration">
            Duration: {item.duration()}
          </div>
        </div>
        <div className="where">
          Location: {item.get('location')}
        </div>

        <div className="content">
          <div>{item.get('content')}</div>
        </div>
      </div>
    );
  },

  render: function() {
    var events;

    if (this.state.collection.length) {
      events = this.state.collection.map(this.createEvent);
    }
    else {
      events = 'There are no events.';
    }

    return (
      <div className="selected-events-list">
        <div className="selected-events-list-header">
          <h3 className="title">{this.props.title}</h3>
        </div>
        {events}
      </div>
    );
  }
});