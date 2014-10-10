/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarEventItem = React.createClass({
  getDefaultProps: function() {
    return {
      click: function() {},
      date: null,
      duration: '',
      id: '',
      subtitle: 'Lorem ipsum Ut id commodo cillum sit fugiat adipisicing laboris dolore do pariatur exercitation.',
      location: '',
      starts: '',
      title: ''
    };
  },

  onClick: function() {
    this.props.click(this.props.id);
  },

  render: function() {
    return (
      <div className="event event-fixed-height-temp-className" onClick={this.onClick}>
        <div className="event-content">
          <h3 className="title">{this.props.title}</h3>
          <div className="subtitle">
            {this.props.subtitle}
          </div>
        </div>
        <i className="glyphicon glyphicon-chevron-right"></i>
      </div>
    );
  },

  __render: function() {
    return (
      <div className="event" onClick={this.onClick}>
        <div className="event-content">
          <h5 className="title">
            {this.props.title}
          </h5>
          <div className="when">
            <div className="starts">
              Starts: {this.props.starts}
            </div>
            <div className="duration">
              Duration: {this.props.duration}
            </div>
          </div>
          <div className="location">
            Location: {this.props.location}
          </div>
        </div>
      </div>
    );
  }
});

// React Component
app.CalendarEventList = React.createClass({
    getDefaultProps: function() {
      return {
        className: 'calendar-event-list',
        events: [],
        title: 'All Events'
      };
    },

    getInitialState: function() {
      return {
        collection: [],
        sortValue: 'startTime',
        visible: true
      };
    },

    title: function() {
      var title = this.props.date ? this.props.date.format('MMMM DD') : 'placeholder';

      return title;
    },

    createEntry: function (entry) {
      return (
        <app.CalendarEventItem
          click={this.props.click}
          duration={entry.duration()}
          location={entry.get('location')}
          id={entry.get('id')}
          starts={entry.starts()}
          title={entry.get('title')} />
      );
    },

    onChange: function(e) {
      var sortValue = this.refs.sortValue.getDOMNode().value;

      this.setState({sortValue: sortValue});
    },

    render: function () {
      var events = this.props.events;
      console.log('events: ', events);

      var sortValue = this.state.sortValue;

      // events = new Backbone.CalendarEvents(events);

      var eventsSorted = events.sortBy(this.state.sortValue);

      var eventsView;

      if (eventsSorted.length) {
        eventsView = eventsSorted.map(this.createEntry);
      }
      else {
        eventsView = 'I could not find any events.';
      }

      return (
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-9 event-list-container">
          <div className="event-list-header">
            <h3 className="events-title">{this.title()}</h3>

            <select ref="sortValue" value={sortValue} name="sortvalue" onChange={this.onChange}>
              <option value="startTime">Date</option>
              <option value="title">Title</option>
              <option value="location">Location</option>
            </select>
          </div>

          <div className={this.props.className}>{eventsView}</div>
        </div>
      );
    }
});