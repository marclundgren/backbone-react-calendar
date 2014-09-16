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
        <h3 className="title">
          {this.props.title}
        </h3>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var GoogleEventContainer = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  loadDataFromServer: function() {
    var self = this;

    $.ajax({
      cache: true,
      dataType: this.props.dataType,
      url: this.props.url,
    }).done(function(response) {
      console.log('done...:');
      console.log(response);

      _.map(response.feed.entry, function(item) {

      // When the state is updated, the component re-renders itself.
        self.setState({
          data: {
            title: item.title.$t,
            id: item.gCal$uid.value,
            start: String(Date.parse(item.gd$when[0].startTime)),
            end: String(Date.parse(item.gd$when[0].endTime)),
            url: item.link[0].href
          }
        });
      });
    });
  },

  componentDidMount: function() {
    this.loadDataFromServer();
  },

  render: function() {
    return (
      <div className="googleEventContainer">
        <h2>Events</h2>
        <GoogleEventList data={this.state.data} />
      </div>
    );
  }
});

var GoogleEventList = React.createClass({
  render: function() {
    var dataNodes = this.props.data.map(function(data, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <GoogleEvent title={data.title} key={index}>
          <div className="starts">starts: {data.start}</div>
          <div className="ends">ends: {data.end}</div>
        </GoogleEvent>
      );
    });
    return (
      <div className="eventList">
        {dataNodes}
      </div>
    );
  }
});

console.log('hiz');

React.renderComponent(
  <GoogleEventContainer dataType="jsonp" url="http://www.google.com/calendar/feeds/vdmtdcektajkqjk51vvda4ni4k%40group.calendar.google.com/public/full"  alt="json-in-script" singleevents="true" maxResults="9999" futureevents="false" orderby="starttime" sortorder="ascending" />,
  document.getElementById('googleEventList')
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