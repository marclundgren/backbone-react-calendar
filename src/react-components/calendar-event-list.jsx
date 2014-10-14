/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarEventItemByTitle = React.createClass({
  getDefaultProps: function() {
    return {
      calendar: '',
      starts: '',
      subtitle: '',
      title: ''
    };
  },

  onClick: function() {
    this.props.eventLink(this.props.calendar, this.props.id);
  },

  render: function() {
    return (
      <div className="row event event-fixed-height-temp-className event-by-title" onClick={this.onClick}>
        <div className="col-xs-10">
          <div className="row">

            <div className="col-xs-12 col-sm-12 col-lg-12">
              <h4 className="titlez">
                {this.props.title}
              </h4>
            </div>

            <div className="col-xs-12 col-sm-9 col-lg-9 location">
              {this.props.location}
            </div>

            <div className="col-xs-12 col-sm-12 col-lg-12 starts">
              {this.props.starts}
            </div>
          </div>
        </div>

        <div className="col-xs-2 arrow">
          <i className="glyphicon glyphicon-chevron-right"></i>
        </div>
      </div>
    );
  }
});

app.CalendarEventItemByDate = React.createClass({
  getDefaultProps: function() {
    return {
      calendar: '',
      starts: '',
      subtitle: '',
      title: ''
    };
  },

  onClick: function() {
    this.props.eventLink(this.props.calendar, this.props.id);
  },

  render: function() {
    return (
      <div className="row event event-fixed-height-temp-className event-by-date" onClick={this.onClick}>
        <div className="col-xs-10">
          <div className="row">
            <div className="col-xs-12 col-sm-3 col-lg-3 starts">
              {this.props.starts}
            </div>

            <div className="col-xs-12 col-sm-9 col-lg-9">
              <h4 className="titlez">
                {this.props.title}
              </h4>
            </div>

            <div className="col-xs-12 col-sm-12 col-lg-12 subtitlez">
              {this.props.subtitle}
            </div>
          </div>
        </div>

        <div className="col-xs-2 arrow">
          <i className="glyphicon glyphicon-chevron-right"></i>
        </div>
      </div>
    );
  }
});

app.CalendarEventItemByLocation = React.createClass({
  getDefaultProps: function() {
    return {
      calendar: '',
      location: '',
      starts: '',
      title: ''
    };
  },

  onClick: function() {
    this.props.eventLink(this.props.calendar, this.props.id);
  },

  render: function() {
    return (
      <div className="row event event-fixed-height-temp-className event-by-location" onClick={this.onClick}>
        <div className="col-xs-10">
          <div className="row">
            <div className="col-xs-12 col-sm-3 col-lg-3 locationz">
              {this.props.location}
            </div>

            <div className="col-xs-12 col-sm-9 col-lg-9">
              <h4 className="titlez">
                {this.props.title}
              </h4>
            </div>

            <div className="col-xs-12 col-sm-12 col-lg-12 subtitlez">
              {this.props.starts}
            </div>
          </div>
        </div>

        <div className="col-xs-2 arrow">
          <i className="glyphicon glyphicon-chevron-right"></i>
        </div>
      </div>
    );
  }
});

app.CalendarEventItem = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      eventLink: function() {},
      date: null,
      duration: '',
      id: '',
      sortKey: 'startTime',
      subtitle: '',
      location: '',
      startMoment: moment(),
      starts: '',
      title: ''
    };
  },

  // todo, bind a single onClick to be used by each of these items

  // onClick: function() {
  //   this.props.eventLink(this.props.calendar, this.props.id);
  // },

  render: function() {
    var sortKey = this.props.sortKey;

    var calendar = this.getModel().get('calendar');

    if (sortKey === 'startTime') {
      return <app.CalendarEventItemByDate
        calendar={calendar}
        eventLink={this.props.eventLink}
        id={this.props.id}
        starts={this.props.startMoment.format('hh:mm a')}
        subtitle={this.props.location}
        title={this.props.title} />
    }
    else if (sortKey === 'location') {
      return <app.CalendarEventItemByLocation
        calendar={calendar}
        eventLink={this.props.eventLink}
        id={this.props.id}
        location={this.props.location}
        starts={this.props.startMoment.format('hh:mm a')}
        title={this.props.title} />
    }
    else if (sortKey === 'title') {
      return <app.CalendarEventItemByTitle
        calendar={calendar}
        eventLink={this.props.eventLink}
        id={this.props.id}
        location={this.props.location}
        starts={this.props.startMoment.format('hh:mm a')}
        title={this.props.title} />
    }

    return (
      <div>
        I did not understand that sort key.
      </div>
    );
  }
});

// React Component
app.CalendarEventList = React.createClass({
    getDefaultProps: function() {
      return {
        calendar: '',
        className: 'calendar-event-list',
        containerClassName: 'col-xs-12 col-sm-6 col-md-6 col-lg-9 event-list-container',
        events: [],
        sortable: false,
        title: 'All Events'
      };
    },

    getInitialState: function() {
      return {
        sortValue: 'startTime'
      };
    },

    title: function() {
      var title;

      if (this.props.date) {
        title = this.props.date.format('MMMM DD');

        if(this.props.calendar) {
          title = this.props.calendar + ' - ' + title;
        }
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
      return (
        <app.CalendarEventItem
          calendar={this.props.calendar}
          duration={entry.duration()}
          eventLink={this.props.eventLink}
          model={entry}
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

    selectSort: function() {
      return (
        <div className="sort">
          <h5>Sort by</h5>

          <select className="form-control" ref="sortValue" value={this.state.sortValue} name="sortvalue" onChange={this.onChange}>
            <option value="startTime">Date</option>
            <option value="title">Title</option>
            <option value="location">Location</option>
          </select>
        </div>
      );
    },

    render: function () {
      var sortable = this.props.sortable;

      var sortElement, sortValue;

      if (sortable && this.props.events.length) {
        sortElement = this.selectSort();

        sortValue = this.state.sortValue;
      }
      else {
        sortValue = 'startTime';
      }

      var eventsSorted = this.props.events.sortBy(sortValue);

      var noEvents;

      if (eventsSorted.length === 0) {
         noEvents = 'I could not find any events.';
      }

      return (
        <div className={this.props.containerClassName}>
          <div className="event-list-header">
            <h3 className="events-title">{this.title()}</h3>

            {sortElement}
          </div>

          <div className={this.props.className}>{eventsSorted.map(this.createEntry)}</div>

          <div className='no-events'>{noEvents}</div>
        </div>
      );
    }
});