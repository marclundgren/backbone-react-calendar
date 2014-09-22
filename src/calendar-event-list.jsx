/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

// React Component
app.EventList = React.createClass({
    mixins: [Backbone.React.Component.mixin],

    createEntry: function (entry) {
      return (
        <div className="event">
          <h3 className="title">
            <a href={entry.get('href')}>{entry.get('title')}</a>
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
            Location: {entry.get('location')}
          </div>
          <div className="entry-content">{entry.get('content')}</div>
        </div>
      );
    },

    getInitialState: function() {
      return {sortValue: 'date'};
    },

    onChange: function(e) {
      var sortValue = this.refs.sortValue.getDOMNode().value;

      this.setState({sortValue: sortValue});
    },

    render: function () {
      var googleEventList = new Backbone.GoogleEvents(this.props.collection);

      var events = googleEventList.sortBy(this.state.sortValue);

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