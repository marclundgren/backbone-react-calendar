/**
 * @jsx React.DOM
 */

var GoogleCalendar = React.createClass({});

var GoogleEvent = React.createClass({});

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