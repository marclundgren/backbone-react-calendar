/**
 * @jsx React.DOM
 */

var converter = new Showdown.converter();

// data: Google CalendarEvents

var GoogleCalendar = React.createClass({displayName: 'GoogleCalendar',
  getInitialState: function() {
    return {data: []};
  },

  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: this.props.url,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    // todo
  }
});

var GoogleEvent = React.createClass({displayName: 'GoogleEvent',
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      React.DOM.div({className: "comment"}, 
        React.DOM.h2({className: "commentAuthor"}, 
          this.props.author
        ), 
        React.DOM.span({dangerouslySetInnerHTML: {__html: rawMarkup}})
      )
    );
  }
});

var GoogleEventList = React.createClass({displayName: 'GoogleEventList',
  render: function() {
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        Comment({author: comment.author, key: index}, 
          comment.text
        )
      );
    });
    return (
      React.DOM.div({className: "commentList"}, 
        commentNodes
      )
    );
  }
});

React.renderComponent(
  GoogleCalendar({url: "events.json", dataType: "json"}),
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