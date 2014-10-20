/**
 * @jsx React.DOM
 */

$(document).on('ready', function() {
  // namespace
  var app = app || {};

  var foodEvents = [{
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

  var multicalendar = new Backbone.MultiCalendar({
    sources: [
      {name: 'Admissions', googleCalendarId: 'fidmwmo%40gmail.com'},
      {name: 'On-Campus', googleCalendarId: '5mtlu2lndo671s83a87eojp7ks%40group.calendar.google.com'},
      {name: 'College-Fairs', googleCalendarId: 'h5db9jueqak0mq8teomdjie7jc%40group.calendar.google.com'},
      {name: 'For-Educators', googleCalendarId: 'qtr7ue6scgnc0noa9eb34ku220%40group.calendar.google.com'},
      {name: 'Empty-List', events: []},
      {name: 'Food-events', events: foodEvents}
    ],

    title: 'FIDM Events Calendar',

    // router: new myRouter(), // override the router

    dangerouslySetInnerHTML: true, // event content contains raw HTML

    // calendarListTitle: 'Categories',
    // calendarListClassName: 'calendars',
    // params: {}, // todo,

    // view: app.MultiCalendarView,

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
});