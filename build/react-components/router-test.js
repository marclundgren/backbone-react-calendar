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
  location: 'Madrid, Spain',
  content: 'Try cheez-it duoz. Two flavors are combined in one box.',
  id: '9qcw'
},{
  title: 'Robeks Juice is crack cocaine',
  startTime: moment().add(1, 'hour').toDate(),
  endTime: moment().add(2, 'hours').toDate(),
  location: 'Barcelona, Italy',
  content: 'I drank one of those things and I thought I was Lording.',
  id: '8lq2'
},{
  title: 'Brownie lollipop sweet roll powder croissant croissant',
  startTime: moment().subtract(3, 'hour').toDate(),
  endTime: moment().subtract(2, 'hours').toDate(),
  location: 'Rome, Italy',
  content: 'Caramels dragée bonbon toffee pie. Fruitcake toffee icing marzipan gummies marzipan cookie. Powder gummies cupcake soufflé danish cupcake gingerbread jelly-o.',
  id: '8a0i'
},{
  title: 'Cookie powder cupcake jelly beans candy canes',
  startTime: moment().hour(8).minute(0).toDate(),
  endTime: moment().hour(10).minute(0).toDate(),
  location: 'Paris, France',
  content: 'Powder chocolate cake marzipan muffin. Dragée fruitcake lollipop sugar plum tootsie roll. Cheesecake icing sweet roll brownie applicake jelly.',
  id: '93wt'
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

  // router: app.myRouter(),

  title: 'FIDM Events Calendar',

  // calendarListTitle: 'Categories',
  // calendarListClassName: 'calendars',
  // params: {},

  mountPoint: document.getElementById('calendarView')
});



if (typeof console) {
  console.log('' +
    '       __________________' + '\n' +
    '      /\\  ______________ \\' + '\n' +
    '     /::\\ \\ZZZZZZZZZZZZ/\\ \\' + '\n' +
    '    /:/\\.\\ \\        /:/\\:\\ \\' + '\n' +
    '   /:/Z/\\:\\ \\      /:/Z/\\:\\ \\' + '\n' +
    '  /:/Z/__\\:\\ \\____/:/Z/  \\:\\ \\' + '\n' +
    ' /:/Z/____\\:\\ \\___\\/Z/    \\:\\ \\' + '\n' +
    ' \\:\\ \\ZZZZZ\\:\\ \\ZZ/\\ \\     \\:\\ \\' + '\n' +
    '  \\:\\ \\     \\:\\ \\ \\:\\ \\     \\:\\ \\' + '\n' +
    '   \\:\\ \\     \\:\\ \\_\\;\\_\\_____\\;\\ \\' + '\n' +
    '    \\:\\ \\     \\:\\_________________\\' + '\n' +
    '     \\:\\ \\    /:/ZZZZZZZZZZZZZZZZZ/' + '\n' +
    '      \\:\\ \\  /:/Z/    \\:\\ \\  /:/Z/' + '\n' +
    '       \\:\\ \\/:/Z/      \\:\\ \\/:/Z/' + '\n' +
    '        \\:\\/:/Z/________\\;\\/:/Z/' + '\n' +
    '         \\::/Z/____________\\/Z/' + '\n' +
    '          \\/ZZZZZZZZZZZZZZZZZ/');
}