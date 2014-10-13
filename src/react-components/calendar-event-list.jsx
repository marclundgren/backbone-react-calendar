/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarEventItem = React.createClass({
  getDefaultProps: function() {
    return {
      eventLink: function() {},
      date: null,
      duration: '',
      id: '',
      sortKey: '',
      subtitle: '',
      location: '',
      startMoment: moment(),
      starts: '',
      title: ''
    };
  },

  onClick: function() {
    this.props.eventLink(this.props.id);
  },

  render: function() {
    var sortKey = this.props.sortKey;

    if (sortKey === 'date') {
      return (
        <div className="event event-fixed-height-temp-className" onClick={this.onClick}>
          <div className="sortKey">
            {this.props.startMoment.format('hh:mm a')}
          </div>
          <div className="event-content">

            <h4 className="title">{this.props.title}</h4>

            <div className="subtitle">
              {this.props.location}
            </div>
          </div>
          <div className="arrow">
            <i className="glyphicon glyphicon-chevron-right"></i>
          </div>
        </div>
      );
    }
    else if (sortKey === 'location') {
      return (
        <div className="event event-fixed-height-temp-className" onClick={this.onClick}>
          <div className="sortKey">
            {this.props.location}
          </div>
          <div className="event-content">

            <h4 className="title">{this.props.title}</h4>

            <div className="subtitle">
              {this.props.startMoment.format('hh:mm a')}
            </div>
          </div>
          <div className="arrow">
            <i className="glyphicon glyphicon-chevron-right"></i>
          </div>
        </div>
      );
    }
    else if (sortKey === 'title') {
      return (
        <div className="event event-fixed-height-temp-className" onClick={this.onClick}>
          <div className="event-content no-sortKey">
            <h4 className="title">{this.props.title}</h4>

            <div className="subtitle-primary">
              {this.props.location}
            </div>

            <div className="subtitle-secondary">
              {this.props.startMoment.format('hh:mm a')}
            </div>
          </div>
          <div className="arrow">
            <i className="glyphicon glyphicon-chevron-right"></i>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="event event-fixed-height-temp-className" onClick={this.onClick}>
          <div className="sortKey">
            {this.props.startMoment.format('hh:mm a')}
          </div>
          <div className="event-content">

            <h4 className="title">{this.props.title}</h4>

            <div className="subtitle">
              {this.props.location}
            </div>
          </div>
          <div className="arrow">
            <i className="glyphicon glyphicon-chevron-right"></i>
          </div>
        </div>
      );
    }
  }
});

// React Component
app.CalendarEventList = React.createClass({
    getDefaultProps: function() {
      return {
        containerClassName: 'col-xs-12 col-sm-6 col-md-6 col-lg-9 event-list-container',
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
      var title;
      if (this.props.date) {
        title = this.props.date.format('MMMM DD');
      }
      else if(this.props.calendar) {
        title = this.props.calendar;
      }
      else {
        title = this.props.title;
      }

      return title;
    },

    createEntry: function (entry) {
      // console.log('entry: ', entry);
      return (
        <app.CalendarEventItem
          duration={entry.duration()}
          eventLink={this.props.eventLink}
          id={entry.get('id')}
          sortKey={this.state.sortValue}
          location={entry.get('location')}
          startMoment={entry.startMoment()}
          starts={entry.starts()}
          title={entry.get('title')} />
      );
    },

    onChange: function(e) {
      var sortValue = this.refs.sortValue.getDOMNode().value;

      this.setState({sortValue: sortValue});
    },

    render: function () {
      var sortValue = this.state.sortValue;

      var eventsSorted = this.props.events.sortBy(sortValue);
      // console.log('eventsSorted: ', eventsSorted.length);

      var noEvents = '';

      if (eventsSorted.length === 0) {
         noEvents = 'I could not find any events.';
      }

      return (
        <div className={this.props.containerClassName}>
          <div className="event-list-header">
            <h3 className="events-title">{this.title()}</h3>

            <select ref="sortValue" value={sortValue} name="sortvalue" onChange={this.onChange}>
              <option value="startTime">Date</option>
              <option value="title">Title</option>
              <option value="location">Location</option>
            </select>
          </div>

          <div className={this.props.className}>{eventsSorted.map(this.createEntry)}</div>

          <div className='no-events'>{noEvents}</div>
        </div>
      );
    }
});