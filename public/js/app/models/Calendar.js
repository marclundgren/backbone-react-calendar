// Calendar.js
// --------

define(['jquery', 'backbone', 'underscore', 'routers/CalendarRouter', 'collections/CalendarEvents', 'collections/Sources'],
  function($, Backbone, _, CalendarRouter, CalendarEvents, Sources) {

    var Calendar = Backbone.Model.extend({
      defaults: {
        entries: new CalendarEvents(),
        sources: new Sources()
      },

      initialize: function() {
        var sources = this.get('sources');

        if (!(sources instanceof Sources)) {
          sources = new Sources(sources);

          this.set('sources', sources);
        }

        var entries = this.get('entries');

        if (!(entries instanceof CalendarEvents)) {
          entries = new CalendarEvents(entries);

          this.set('entries', entries);
        }
      }
    });

    return Calendar;
  }
);