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

var data = [{
  title: 'Arizona', subtitle: 'Group Information Session', location: 'SCOTTSDALE', when: 'November 15'
},{
  title: 'Arizona', subtitle: 'One-on-One Admissions Meeting', location: 'SCOTTSDALE', when: 'November 16-17'
},{
  title: 'Canada', subtitle: 'One-on-One Admissions Appointment', location: 'TORONTO', when: 'November 9-14'
},{
  title: 'Canada', subtitle: 'One-on-One Admissions Appointment', location: 'VANCOUVER', when: 'December 5-6'
},{
  title: 'Colorado', subtitle: 'One-on-One Admissions Meeting', location: 'DENVER', when: 'October 25-26'
},{
  title: 'Connecticut', subtitle: 'One-on-One Admissions Appointment', location: 'STAMFORD', when: 'November 4'
},{
  title: 'Florida', subtitle: 'One-on-One Admissions Appointment', location: 'MIAMI', when: 'December 3'
},{
  title: 'Florida', subtitle: 'One-on-One Admissions Appointment', location: 'BOCA RATON', when: 'December 4'
},{
  title: 'Georgia', subtitle: 'One-on-One Admissions Appointment', location: 'ATLANTA', when: 'December 1-2'
},{
  title: 'Illinois', subtitle: 'One-on-One Admissions Meeting', location: 'CHICAGO', when: 'October 25-26'
},{
  title: 'Indonesia', subtitle: 'One-on-One Admissions Appointment', location: 'Jakarta', when: 'October 9-12'
},{
  title: 'Korea', subtitle: 'One-on-One Admissions Appointment', location: 'Seoul', when: 'September 26-30'
},{
  title: 'Massachusetts', subtitle: 'One-on-One Admissions Appointment', location: 'BOSTON', when: 'November 15-16'
},{
  title: 'Missouri', subtitle: 'One-on-One Admissions Appointment', location: 'KANSAS CITY', when: 'November 8-9'
},{
  title: 'Nevada', subtitle: 'One-on-One Admissions Appointment', location: 'LAS VEGAS', when: 'October 18'
},{
  title: 'New Jersey', subtitle: 'One-on-One Admissions Appointment', location: 'SHORT HILLS', when: 'November 23'
},{
  title: 'New York', subtitle: 'One-on-One Admissions Appointment', location: 'LONG ISLAND', when: 'November 1-2'
},{
  title: 'New York', subtitle: 'One-on-One Admissions Appointment', location: 'TARRYTOWN', when: 'November 3'
},{
  title: 'North Carolina', subtitle: 'One-on-One Admissions Appointment', location: 'CHARLOTTE', when: 'October 18-19'
},{
  title: 'North Carolina', subtitle: 'One-on-One Admissions Appointment', location: 'RALEIGH-DURHAM', when: 'October 20'
},{
  title: 'Oregon', subtitle: 'One-on-One Admissions Appointment', location: 'PORTLAND', when: 'October 11-12'
},{
  title: 'Pennsylvania', subtitle: 'One-on-One Admissions Appointment', location: 'PHILADELPHIA', when: 'November 21-22'
},{
  title: 'Taiwan', subtitle: 'One-on-One Admissions Appointment', location: 'Taipei', when: 'October 14-19'
},{
  title: 'Taiwan', subtitle: 'One-on-One Admissions Appointment', location: 'Taichung', when: 'October 18-20'
},{
  title: 'Taiwan', subtitle: 'One-on-One Admissions Appointment', location: 'Kaohsiung', when: 'October 21'
},{
  title: 'Texas', subtitle: 'Group Information Session', location: 'DALLAS', when: 'October 18'
},{
  title: 'Texas', subtitle: 'One-on-One Admissions Appointment', location: 'DALLAS', when: 'October 19'
},{
  title: 'Texas', subtitle: 'One-on-One Admissions Appointment', location: 'AUSTIN', when: 'October 23-24'
},{
  title: 'Texas', subtitle: 'One-on-One Admissions Appointment', location: 'HOUSTON', when: 'October 25-26'
},{
  title: 'Virginia', subtitle: 'One-on-One Admissions Appointment', location: 'ALEXANDRIA', when: 'November 18-19'
},{
  title: 'Washington', subtitle: 'Group Information Session', location: 'SEATTLE', when: 'October 25'
},{
  title: 'Washington', subtitle: 'One-on-One Admissions Meeting', location: 'SEATTLE', when: 'October 26-27'
}];

// app namespace
var app = app || {};

// Define your sources
// var sources = new Backbone.Sources([
var sources = [
  // {name: 'No Such Calendar', id: 'marclundgren2.0@gmail.com', params: params},
  // {name: 'Server-side events', events: data},
  {name: 'Admissions', id: 'fidmwmo%40gmail.com', params: params},
  {name: 'On campus', id: '5mtlu2lndo671s83a87eojp7ks%40group.calendar.google.com', params: params},
  {name: 'College Fairs', id: 'h5db9jueqak0mq8teomdjie7jc%40group.calendar.google.com', params: params},
  {name: 'For Educators', id: 'qtr7ue6scgnc0noa9eb34ku220%40group.calendar.google.com', params: params}
// ]);
];

sources = new Backbone.Sources(sources);

// Create your Calendar Model
var calendar = new Backbone.Calendar({sources: sources});

// Create your Calendar View
var calendarView = app.CalendarView({
  model: calendar,
  collection: sources
});

// Mount your Calendar Component
React.renderComponent(calendarView, document.getElementById('calendar'));