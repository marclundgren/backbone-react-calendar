// CalendarEvents.js
// --------
define(['backbone','models/CalendarEvent'],
  function(Backbone, CalendarEvent) {

    var CalendarEvents = Backbone.Collection.extend({
      model: CalendarEvent
    });

    return CalendarEvents;
  }
);