/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

// React Component
app.CalendarEventList = React.createClass({
    getInitialState: function() {
      return {
        collection: [],
        sortValue: 'date'
      };
    },

    createEntry: function (entry) {
      return (
        <div className="event">
          <h3 className="title">
            <a href={entry.get('link')}>{entry.get('title')}</a>
          </h3>
          <div className="when">
            <div className="starts">
              Starts: {entry.starts()}
            </div>
            <div className="duration">
              Duration: {entry.duration()}
            </div>
          </div>
          <div className="where">
            Location: {entry.get('where')}
          </div>
        </div>
      );
    },

    onChange: function(e) {
      var sortValue = this.refs.sortValue.getDOMNode().value;

      this.setState({sortValue: sortValue});
    },

    render: function () {
      var googleEvents = this.state.collection;

      if (googleEvents.length && !(googleEvents instanceof Backbone.GoogleEvents)) {
        googleEvents = new Backbone.GoogleEvents(googleEvents);
      }

      // todo clean this up!
      var events = googleEvents.length && googleEvents.sortBy(this.state.sortValue) || [];

      return (
        <div className="eventListContainer">
          <div className="event-list-header">
            <h2 className="events-title">Events</h2>

            <select ref="sortValue" value={this.state.sortValue} name="sortvalue" onChange={this.onChange}>
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="location">Location</option>
            </select>
          </div>

          <div className="events-list">{events.map(this.createEntry)}</div>
        </div>
      );
    }
});