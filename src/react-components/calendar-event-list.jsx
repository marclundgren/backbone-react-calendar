/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

// React Component
app.CalendarEventList = React.createClass({
    getDefaultProps: function() {
      return {
        title: 'All Events'
      };
    },

    getInitialState: function() {
      return {
        collection: [],
        sortValue: 'date',
        visible: true
      };
    },

    toggleVisible: function() {
      this.setState({visible: !this.state.visible});
    },

    createEntry: function (entry) {
      return (
        <div className="event">
          <h5 className="title">
            <a href={entry.get('link')}>{entry.get('title')}</a>
          </h5>
          <div className="when">
            <div className="starts">
              Starts: {entry.starts()}
            </div>
            <div className="duration">
              Duration: {entry.duration()}
            </div>
          </div>
          <div className="location">
            Location: {entry.get('location')}
          </div>
        </div>
      );
    },

    onChange: function(e) {
      var sortValue = this.refs.sortValue.getDOMNode().value;
      console.log('sortValue: ', sortValue);

      this.setState({sortValue: sortValue});
    },

    render: function () {
      var googleEvents = this.state.collection;

      if (googleEvents.length && !(googleEvents instanceof Backbone.GoogleEvents)) {
        googleEvents = new Backbone.GoogleEvents(googleEvents);
      }

      // todo clean this up!
      var events = googleEvents.length && googleEvents.sortBy(this.state.sortValue) || [];

      var classNameEventsList = 'events-list';

      if (!this.state.visible) {
        classNameEventsList += ' hide';
      }

      return (
        <div className="eventListContainer">
          <div className="event-list-header">
            <h3 className="events-title">{this.props.title}</h3>

            <select ref="sortValue" value={this.state.sortValue} name="sortvalue" onChange={this.onChange}>
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="location">Location</option>
            </select>

            <div class="toggleVisible" onClick={this.toggleVisible}>
              toggle visible
            </div>
          </div>

          <div className={classNameEventsList}>{events.map(this.createEntry)}</div>
        </div>
      );
    }
});