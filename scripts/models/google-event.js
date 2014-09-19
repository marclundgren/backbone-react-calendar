// app namespace
var app = app || {};

// Models
app.GoogleEvent = Backbone.Model.extend({
  defaults: {
    author:     '',
    category:   '',
    content:    '',
    endTime:    '',
    id:         '',
    link:       '',
    startTime:  '',
    title:      '',
    updated:    '',
    where:      ''
  },

  initialize: function() {

    if (this.title()) {
      console.log('Title: ', this.title());
    }
  },

  title: function() {
    if (!this.get('title')) {
      return;
    }
    return this.get('title').$t;
  },

  when: function() {
    return this.get('gd$when')[0];
  },

  startTime: function() {
    var when = this.when();

    return when && when.startTime;
  },

  endTime: function() {
    var when = this.when();

    return when && when.endTime;
  },

  link: function() {
    return this.get('link')[0].href;
  },

  id: function() {
    return this.get('id').$t;
  }
});

// app.GoogleEventAllDay = app.GoogleEvent.extend({
//   className: 'event event-all-day'
// });

// app.GoogleEventTimed = app.GoogleEvent.extend({
//   defaults: {
//     start: '',
//     end: ''
//   },

//   className: 'event event-timed'
// });

// Collection

app.GoogleEventList = Backbone.Collection.extend({
  model: app.GoogleEvent
});