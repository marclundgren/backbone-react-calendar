/**
 * @jsx React.DOM
 */

var converter = new Showdown.converter();

// data: Google CalendarEvents

var GoogleCalendar = React.createClass({
  render: function() {
    // todo
  }
});

// for now, assume Timed Event
var GoogleEvent = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="data">
        <h2 className="dataAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var GoogleEventList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  loadDataFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: this.props.url,
      success: function(data) {
        // When the state is updated, the component re-renders itself.
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadDataFromServer();
  },

  render: function() {
    var dataNodes = this.props.data.map(function(data, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <GoogleEvent title={data.title} key={index}>
          {data.text}
        </GoogleEvent>
      );
    });
    return (
      <div className="dataList">
        {dataNodes}
      </div>
    );
  }
});

React.renderComponent(
  <GoogleCalendar url="events.json" dataType="json" />,
  document.getElementById('calendar')
);

// eventsSource: '//www.google.com/calendar/feeds/vdmtdcektajkqjk51vvda4ni4k%40group.calendar.google.com/public/full?alt=json-in-script&singleevents=true&max-results=9999&futureevents=false&orderby=starttime&sortorder=ascending',

// day: '2014-06-12',

/*
$.ajax({
  cache: true,
  dataType: self.options.eventsDataType,
  url:      buildEventsUrl(source, params)
}).done(function(response) {
  events = _.map(response.feed.entry, function(item) {
    return {
      class: 'event-warning',
      title: item.title.$t,
      id: item.gCal$uid.value,
      start: String(Date.parse(item.gd$when[0].startTime)),
      end: String(Date.parse(item.gd$when[0].endTime)),
      url: item.link[0].href
    };
  });

  self.options.events = events;

  self._render();
});
*/