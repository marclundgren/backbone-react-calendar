/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

Backbone.MultiCalendar = Backbone.Model.extend({
  defaults: {
    calendar: 'All', // aka source-filter
    date: moment(),
    sources: new Backbone.Collection([]),


    router: new Backbone.CalendarRouter()
  },

  initialize: function() {
    this._initSources();
    this._initEvents();
    this._initCalendars();
    this._bindRoutes();

    // to-do - change the routets to be soft triggers & utilize the model attrs instead of props.
    // do not have mutually exclusive attributes. therefore, no month or year attributes

    // this.set('date', '2014-08-09');
  },

  _initSources: function() {
    var self = this;
    var sources = this.get('sources');

    if (!(sources instanceof Backbone.Collection)) {
      sources = new Backbone.Sources(sources);
    }

    this.set('sources', sources);

    this.listenTo(sources, 'change', function() {
      self._syncCalendars();


      // self.dateView();
      // this.navigate
    });

    // this.fetchGoogleCalendars();
  },

  _syncCalendars: function() {
    var calendars = this.getCalendars();

    this.set('calendars', calendars);
  },

  _initEvents: function() {
    var events = this.get('sources').pluck('events');

    var flattenedEvents = _.flatten(events);

    this.set('events', new Backbone.Collection(flattenedEvents));
  },

  fetchGoogleCalendars: function() {
    var sources = this.get('sources');

    /*
    [
        {name: 'Admissions', googleCalendarId: 'fidmwmo%40gmail.com'},
        {name: 'Holiday-Events', events: holidayEvents},
        {name: 'food-events', events: foodEvents},
        {name: 'fidm-events', events: fidmEvents}
      ]
    */

    var sourcesRemote = sources.filter(function (source) {
      var id = source.get('googleCalendarId');

      return id && _.isString(id);
    });

    sourcesRemote = new Backbone.Sources(sourcesRemote);

    sourcesRemote.each(function(source) {
      console.log('fetch remote sources...');

      source.fetch().done(function(results) {
        console.log('fetch done..!');
        var entries = results.feed.entry.map(function(item) {
          var dateMoment = moment(item.gd$when[0].startTime);

          return {
            author:       item.author[0].name,
            calendar:     source.get('name'),
            content:      item.content.$t,
            dateMoment:   dateMoment,
            date:         dateMoment.format('YYYY-MM-DD'),
            month:        dateMoment.format('YYYY-MM'),
            year:         dateMoment.format('YYYY'),
            endTime:      item.gd$when[0].endTime,
            id:           item.gCal$uid.value,
            link:         item.link[0].href,
            location:     item.gd$where[0].valueString,
            startTime:    item.gd$when[0].startTime,
            title:        item.title.$t,
            week:         dateMoment.week(),
            updated:      item.updated.$t
          };
        });

        var events = new Backbone.CalendarEvents(entries);

        sources.get(source).set('events', events.toJSON());

        // consume the calendarId so that this source is not fetched again
        source.unset('googleCalendarId', {silent: true});
      });
    });
  },

  _initCalendars: function() {
    this._syncCalendars();
  },


  getCalendars: function() {
    return _.flatten(['All', this.get('sources').pluck('name')]);
  },

  _bindRoutes: function() {
    var self = this;

    var router = this.get('router');

    this.listenTo(router, 'route:calendar', function() {
      self.calendar.apply(self, arguments);
    });

    this.listenTo(router, 'route:today', function() {
      self.today.apply(self, arguments);
    });

    this.listenTo(router, 'route:calendardate', function() {
      self.calendardate.apply(self, arguments);
    });

    this.listenTo(router, 'route:date', function() {
      self.date.apply(self, arguments);
    });

    this.listenTo(router, 'route:month', function() {
      self.month.apply(self, arguments);
    });

    this.listenTo(router, 'route:year', function() {
      self.year.apply(self, arguments);
    });

    this.listenTo(router, 'route:event', function() {
      self.event.apply(self, arguments);
    });

    this.on('change:date', function(model, date) {
      // do a soft trigger so that the url updates
      // debugger;

      console.log('change date!');

      self.navigateToDay(date);
    });

    this.get('sources').bind('change', function() {
        self.trigger('change');
    });

    this.on('change:calendar', function(model, calendar) {
      // do a soft trigger so that the url updates
      // debugger;
      console.log('change calendar!');

      self.navigateToCalendar(calendar);
    });

    Backbone.history.start();
  },

  getEventById: function(id) {
    var events = this.getEvents();

    return events.findWhere({id: id});

    // return _.where(events, {id: id});
  },

  getEvents: function(options) {
    var sources = this.get('sources');
    var calendarEvents;

    // debugger;

    if (_.keys(options).length) {
      calendarEvents = sources.chain()
        // filter by calendar aka cateogry
        .filter(function(model) {
          var name = options.name;

          if (name && name.toLowerCase() !== 'all') {
            return (model.get('name') === name);
          }
          else {
            return true;
          }
        })
        // pluck events
        .map(function(model) {
          return model.get('events');
        })
        // flatten events
        .flatten()
        // fitler by time e.g. date
        .filter(function(item) {
          var startTime = item.startTime;

          if (!moment.isMoment(startTime)) {
            startTime = moment(startTime);
          }
          if (options.date) {
            // console.log('startTime: ', startTime.format('YYYY-MM-DD'));
            // console.log('options.date: ', options.date.format('YYYY-MM-DD'));
            return startTime.isSame(options.date, 'day');
          }
          else if (options.month) {
            return startTime.isSame(options.month, 'month');
          }
          else if (options.year) {
            return startTime.isSame(options.year, 'year');
          }
          else {
            return true;
          }
        })
        .value();
    }
    else {
      calendarEvents = calendarEvents = sources.chain()
        // get all events
        .map(function(model) {
          return model.get('events');
        })
        // flat
        .flatten()
        .value();
    }

    return new Backbone.CalendarEvents(calendarEvents);
  },

  /*

  'date/:date'                :   'date',         // e.g. date/2014-08-09
  'month/:month'              :   'month',        // e.g. month/2013-08
  'year/:year'                :   'year',         // e.g. year/2015

  'calendar/:cat/date/:date'  :   'date',         // e.g. calendar/educators/date/2014-08-09
  'calendar/:cat/month/:month':   'month',        // e.g. calendar/educators/month/2013-08
  'calendar/:cat/year/:year'  :   'year',         // e.g. calendar/educators/year/2015

  */

  month: function(yearMonth, cal) {
    var date = moment(yearMonth).startOf('month').add(1, 'month');

    // this.set('narrowBy', 'month');

    // this.date(date, cal);
    this.monthView(date, cal);
  },

  year: function(year, cal) {
    var date = moment(year).startOf('year').add(1, 'year');

    // this.set('narrowBy', 'year');

    // this.date(date, cal);
    this.yearView(date, cal);
  },

  calendardate: function(cal, date) {
    this.fetchGoogleCalendars();

    this.dateView(cal, date);
  },

  date: function(date) {
    this.calendardate('All', date);
  },

  eventView: function(id) {
    var self = this;

    var calendarEvent = this.getEventById(id);
    var router = this.get('router');
    var mountPoint = this.get('mountPoint');

    if (calendarEvent) {
      React.renderComponent(
        app.EventView({
          model: calendarEvent,
          router: router
        }),
        mountPoint
      );
    }
    else {
      var sources = this.get('sources');

      if (sources) {
        if (!sources.fetched) {
          sources.fetched = true;

          this.fetchGoogleCalendars();

          sources.off('change');

          sources.on('change', function() {
            calendarEvent = self.getEventById(id);

            if (calendarEvent) {
              React.renderComponent(
                app.EventView({
                  model: calendarEvent,
                  router: router
                }),
                mountPoint
              );
            }
          });
        }
      }
    }
  },

  // /#date/2014-10-08
  dateView: function(cal, date) {
    // cal = this.cal;

    // if (false && date) {
    //   this.set('date', date);
    // }

    if (!moment.isMoment(date)) {
      date = moment(date);
    }

    if (!date) {
      debugger;
    }

    console.log('date: ', date);
    console.log('cal: ', cal);
    // debugger;

    // React.createBackboneClass
    var multiCalendarView = app.MultiCalendarView({
      calendar: cal,
      date: date,
      model: this,
      router: this.get('router')
    });

    React.renderComponent(multiCalendarView, document.getElementById('calendarView'));
  },

  monthView: function(date, cal) {
    cal = this.cal;

    if (false && date) {
      this.set('date', date);
    }

    var multiCalendarView = app.MultiCalendarView({
      calendar: cal,
      month: date,
      model: this,
      router: this.get('router')
    });

    React.renderComponent(multiCalendarView, document.getElementById('calendarView'));
  },

  yearView: function(date, cal) {
    cal = this.cal;

    if (false && date) {
      this.set('date', date);
    }

    var multiCalendarView = app.MultiCalendarView({
      calendar: cal,
      year: date,
      model: this,
      router: this.get('router')
    });

    React.renderComponent(multiCalendarView, document.getElementById('calendarView'));
  },

  today: function(cal) {
    var today = moment();

    this.calendardate(cal, today);
  },

  calendar: function(cal, date) {
    debugger;
    if (date) {
      this.date.apply(this, arguments);
    }
    else {
      this.today.apply(this, arguments);
    }
  },

  event: function(cal, id) {
    this.eventView(id);
  },

  // aka category
  navigateToCalendar: function(calendar) {
    var path = 'calendar/' + calendar;

    var props = this.props;

    if (props.date) {
      path += '/date/' + props.date.format('YYYY-MM-DD');
    }
    // else if (props.month) {
    //   path += '/month/' + props.month.format('YYYY-MM');
    // }
    // else if (props.year) {
    //   path += '/year/' + props.year.format('YYYY');
    // }

    this.navigate(path);
  },

  navigateToMonth: function(month) {
    this.navigate('month/' + month);
  },

  navigateToDay: function(day) {
    debugger;
    this.navigate('date/' + day);
  },

  next: function(date) {
    // this.navigateToMonth(date);

    this.set('date', date);
  },

  prev: function(date) {
    // this.navigateToMonth(date);

    this.set('date', date);
  },

  navigate: function(fragment) {
    this.get('router').navigate(fragment);

    // var router = this.getModel().get('router');
    // router.navigate(fragment, {
    //   trigger: true
    // });
  }
});