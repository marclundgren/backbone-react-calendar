/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

var holidayEvents = [];
var foodEvents = [{
  title: 'Eat food tomorrow',
  startTime: moment().add(1, 'day').toDate(),
  endTime: moment().add(1, 'day').toDate(),
  content: 'Eat food.',
  id: 'u80f'
},{
  title: 'Cheez-its are tasty',
  startTime: moment().toDate(),
  endTime: moment().toDate(),
  content: 'Try cheez-it duoz. Two flavors are combined in one box.',
  id: '9qcw'
},{
  title: 'Robeks Juice is crack cocaine',
  startTime: moment().toDate(),
  endTime: moment().toDate(),
  content: 'I drank one of those things and I thought I was Lording.',
  id: '8lq2'
}];

var fidmEvents = [{
  title: 'Amanda Bynes Reportedly Expelled From College After Cheating And Drug Allegations',
  startTime: moment().toDate(),
  endTime: moment().toDate(),
  content: 'Rachel Loritz, a classmate of Bynes’ at the Fashion Institute of Design and Merchandising, claimed that Bynes was known to cheat and show up high on marijuana. “Amanda often ditched classes ... but even when she showed up, she was clearly high, and not good at hiding it ... she almost always wore sunglasses and laughed out loud at inappropriate times,” Loritz told TMZ.',
  id: 'sdt3'
}];

window.multicalendar = new Backbone.MultiCalendar({
  sources: [
    {name: 'Admissions', googleCalendarId: 'fidmwmo%40gmail.com'},
    {name: 'Holiday-Events', events: holidayEvents},
    {name: 'food-events', events: foodEvents},
    {name: 'fidm-events', events: fidmEvents}
  ],

  // calendarListTitle: 'Categories',
  // calendarListClassName: 'calendars',z
  // params: {},

  mountPoint: document.getElementById('calendarView')
});