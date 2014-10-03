Backbone.CalendarRouter = Backbone.Router.extend({
  routes: {
    '':                              'today',
    'today':                         'today',  // e.g. today
    'date/:date':                    'date',   // e.g. date/2014-08-09
    'calendar/':                     'today',
    'calendar/:cat':                 'calendar',    // e.g. calendar/educators
    'calendar/:cat/today':           'date',   // e.g. calendar/educators/today
    'calendar/:cat/date/:date':      'date',   // e.g. calendar/educators/date/2014-08-09
    'calendar/:cat/event/:event':    'event'   // e.g. calendar/educators/event/3w5sxer4q3'
  }
});