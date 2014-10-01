# react-calendar
## (in progress)

[React](http://facebook.github.io/react/) calendar component inspired by [CLNDR.js](http://kylestetz.github.io/CLNDR/).

## To install

```
npm install

node server.js

open http://localhost:3000
```

## To use
```
// Define your sources
var sources = [
  {name: 'Admissions', id: 'fidmwmo%40gmail.com', params: params},
  {name: 'On campus', id: '5mtlu2lndo671s83a87eojp7ks%40group.calendar.google.com', params: params},
  {name: 'College Fairs', id: 'h5db9jueqak0mq8teomdjie7jc%40group.calendar.google.com', params: params},
  {name: 'For Educators', id: 'qtr7ue6scgnc0noa9eb34ku220%40group.calendar.google.com', params: params}
];

// Create your Calendar Model
var calendar = new Backbone.Calendar({sources: sources});

// Create your Calendar View
var calendarView = CalendarView({model: calendar});

// Mount your Calendar Component
React.renderComponent(calendarView, document.getElementById('calendar'));
```

## To Develop

```
jsx --watch -x jsx src build
```