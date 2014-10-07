/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

var holidayEvents = [];
var foodEvents = [{
  title: 'Cheez-its are tasty',
  startTime: moment(),
  ends: moment(),
  content: 'Try cheez-it duoz. Two flavors are combined in one box.',
  id: '9qcw'
},{
  title: 'Robeks Juice is crack cocaine',
  startTime: moment(),
  ends: moment(),
  content: 'I drank one of those things and I thought I was Lording.',
  id: '8lq2'
}];

var fidmEvents = [{
  title: 'Amanda Bynes Reportedly Expelled From College After Cheating And Drug Allegations',
  startTime: moment(),
  ends: moment(),
  content: 'Rachel Loritz, a classmate of Bynes’ at the Fashion Institute of Design and Merchandising, claimed that Bynes was known to cheat and show up high on marijuana. “Amanda often ditched classes ... but even when she showed up, she was clearly high, and not good at hiding it ... she almost always wore sunglasses and laughed out loud at inappropriate times,” Loritz told TMZ.',
  id: 'sdt3'
}];

new Backbone.MultiCalendar({
  sources: [
    {name: 'Admissions', googleCalendarId: 'fidmwmo%40gmail.com'},
    {name: 'Holiday-Events', events: holidayEvents},
    {name: 'food-events', events: foodEvents},
    {name: 'fidm-events', events: fidmEvents}
  ],
  calendarListTitle: 'Categories',

  params: {

  },

  // calendarListClassName: 'calendars',

  mountPoint: document.getElementById('calendarView')
});
