Backbone.CalendarRouter = Backbone.Router.extend({
  routes: {
    ''                          :   'today',
    'calendar'                  :   'today',        // e.g. calendar
    'today'                     :   'today',        // e.g. today
    'date/:date'                :   'date',         // e.g. date/2014-08-09
    'month/:month'              :   'month',        // e.g. month/2013-08
    'year/:year'                :   'year',         // e.g. year/2015

    'calendar/:cat'             :   'calendar',     // e.g. calendar/educators
    'calendar/:cat/today'       :   'date',         // e.g. calendar/educators/today
    'calendar/:cat/date/:date'  :   'date',         // e.g. calendar/educators/date/2014-08-09
    'calendar/:cat/month/:month':   'month',        // e.g. calendar/educators/month/2013-08
    'calendar/:cat/year/:year'  :   'year',         // e.g. calendar/educators/year/2015
    'calendar/:cat/event/:event':   'event'         // e.g. calendar/educators/event/3w5sxer4q3'
  },

  navigate: function() {
    // for debugging

    Backbone.Router.prototype.navigate.apply(this, arguments);
  }
});