// app namespace
var app = app || {};

// Models
app.GoogleEvent = Backbone.Model.extend({
  defaults: {
    author:     '',
    category:   '',
    content:    '',
    date: '',
    endTime:    '',
    id:         '',
    link:       '',
    startTime:  '',
    title:      '',
    updated:    '',
    where:      ''
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

  // __comparator: function(item) {
  //   return [item.get('date'), item.get('title')]
  // },

  // __comparator: function(item) {
  //   console.log('item: ', item);
  //   return [];
  // },

  // sortKeyPrimary: 'date',
  // sortKeySecondary: 'title', // todo

  // comparator: function (item) {
  //   console.log('test');
  //   return item.get(this.sort_key);
  // },

  // sortByField: function (fieldName) {
  //   this.sortKeyPrimary = fieldName;
  //   this.sort();
  // }

});