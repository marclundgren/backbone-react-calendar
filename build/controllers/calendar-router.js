Backbone.CalendarRouter = Backbone.Router.extend({
  routes: {
    ''            : 'today',
    'calendar'    : 'calendar', // e.g. calendar
    'today'       : 'today',    // e.g. today
    'date/:date'  : 'date',     // e.g. date/2014-08-09
    'event/:event': 'event'     // e.g. event/3w5sxer4q3'
  },

  navigate: function() {
    // for debugging

    Backbone.Router.prototype.navigate.apply(this, arguments);
  }
});