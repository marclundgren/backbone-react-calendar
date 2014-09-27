/**
 * @jsx React.DOM
 */

// cache data during development
$.ajaxSetup({ cache: true });

// app namespace
var app = app || {};

var params = {
  // 'max-results': '9999',
  alt: 'json-in-script',
  dataType: 'jsonp',
  futureevents: 'true',
  orderby: 'starttime',
  singleevents: 'true',
  sortorder: 'ascending'
};

var sources = [
  {name: 'Marc\'s Calendar', id: 'marclundgren2.0@gmail.com', params: params},
  {name: 'Admissions', id: 'fidmwmo%40gmail.com', params: params},
  {name: 'On campus', id: '5mtlu2lndo671s83a87eojp7ks%40group.calendar.google.com', params: params},
  {name: 'College Fairs', id: 'h5db9jueqak0mq8teomdjie7jc%40group.calendar.google.com', params: params},
  {name: 'For Educators', id: 'qtr7ue6scgnc0noa9eb34ku220%40group.calendar.google.com', params: params}
];

React.renderComponent(
  <app.GoogleCalendar params={params} sources={sources} />,
  document.getElementById('googleCalendar')
);