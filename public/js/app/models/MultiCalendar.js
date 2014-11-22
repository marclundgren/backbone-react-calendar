// MultiCalendar.js
// --------
define(['backbone', 'underscore.guid', 'react', 'moment', 'fastclick', 'routers/CalendarRouter', 'collections/CalendarEvents', 'collections/Sources', 'views/MultiCalendarView', 'views/EventView', 'es5shim', 'es5sham'],
  function(Backbone, _, React, moment, FastClick, CalendarRouter, CalendarEvents, Sources, MultiCalendarView, EventView) {

    var MultiCalendar = Backbone.Model.extend({
      defaults: {
        calendar: '', // todo: rename this to "source-filter"
        calendarEvents: new CalendarEvents(),
        dangerouslySetInnerHTML: false,
        sources: new Sources(),
        router: new CalendarRouter(),
        title: 'Multi Calendar',
        view: MultiCalendarView
      },

      initialize: function() {
        this._initSources();
        this._initEvents();
        this._bindRoutes();

        FastClick.attach(this.get('mountPoint'));
      },

      _initSources: function() {
        var sources = this.get('sources');

        if (!(sources instanceof Backbone.Collection)) {
          sources = new Sources(sources);
        }

        sources.each(function(source) {
          var name = source.get('name');

          var calendarEvents = source.get('events');

          if (calendarEvents) {
            calendarEvents.map(function(calendarEvent) {
              calendarEvent.calendar = name;

              if (!calendarEvent.id) {
                calendarEvent.id = _.guid();
              }
            });
            source.set('events', calendarEvents);
          }
        });

        this.set('sources', sources);

        this.fetchGoogleCalendars();
      },

      _initEvents: function() {
        var events = this.get('sources').pluck('events');

        var flattenedEvents = _.flatten(events);

        this.set('events', new Backbone.Collection(flattenedEvents));
      },

      getCalendars: function() {
        return this.get('sources').pluck('name');
      },

      fetchGoogleCalendars: function() {
        var sources = this.get('sources');

        var sourcesRemote = sources.filter(function (source) {
          return source.get('googleCalendarApiV');
        });

        sourcesRemote = new Sources(sourcesRemote);

        sourcesRemote.each(function(source) {
          source.fetch().done(function(results) {

            var apiVersion = source.get('googleCalendarApiV');

            var entries;

            if (apiVersion) {
              if (apiVersion === 3) {
                var items = results.items;

                /* global console */
                if (results.error && typeof console !== 'undefined') {
                  results.error.errors.map(console.info.bind(console));
                }

                if (items) {
                  entries = items.map(function(item) {
                    return {
                      created:      item.created,
                      creator:      item.creator,
                      calendar:     source.get('name') || results.summary,
                      content:  item.description, // todo change this name to description
                      endTime:      item.end.dateTime || item.end.date,
                      id:           item.id,
                      link:         item.htmlLink,
                      location:     item.location,
                      startTime:    item.start.dateTime || item.start.date,
                      title:      item.summary, // todo change this name to summary
                      timeZone:     item.results,
                      updated:      item.updated
                    };
                  });
                }
              }
              else if (apiVersion === 2) {
                var feed = results.feed;

                if (feed) {
                  entries = feed.entry.map(function(item) {
                    return {
                      author:       item.author[0].name,
                      calendar:     source.get('name'),
                      content:      item.content.$t,
                      endTime:      item.gd$when[0].endTime,
                      id:           item.gCal$uid.value,
                      link:         item.link[0].href,
                      location:     item.gd$where[0].valueString,
                      startTime:    item.gd$when[0].startTime,
                      title:        item.title.$t,
                      updated:      item.updated.$t
                    };
                  });
                }
              }

              if (entries) {
                var events = new CalendarEvents(entries);

                // consume the calendarId so that this source is not fetched again
                source.unset('googleCalendarApiV', {silent: true});

                sources.get(source).set('events', events.toJSON());
              }
            }
          });
        });
      },

      _bindRoutes: function() {
        var self = this;

        var router = this.get('router');

        this.listenTo(router, 'route:all', function() {
          self.all.apply(self, arguments);
        });

        this.listenTo(router, 'route:calendar', function() {
          self.calendardate.apply(self, arguments);
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
          if (date) {
            self.navigateToDay(date);
          }
          else {
            self.navigateToAllEvents();
          }
        });

        this.on('change:calendar', function(model, calendar) {
          self.navigateToCalendar(calendar || '');
        });

        this.get('sources').bind('change', function() {
            self.trigger('change');
        });

        Backbone.history.start();
      },

      getEventById: function(id) {
        var events = this.getEvents();

        return events.findWhere({id: id});
      },

      getEvents: function(options) {
        var calendarEvents;

        if (_.keys(options).length) {
          var calendar = options.calendar;

          calendarEvents = this.get('sources').chain()
            // filter by calendar aka cateogry
            .filter(function(sourceModel) {
              if (calendar) {
                return (sourceModel.get('name') === calendar);
              }
              else {
                return true;
              }
            })
            // return events as a collection

            .map(function(sourceModel) {
              return sourceModel.get('events');
            })
            .value();

            var flattenedEvents = _.flatten(calendarEvents);

            var flattenedEventsCollection = new CalendarEvents(flattenedEvents);

            var filteredEvents = flattenedEventsCollection.filter(function(eventItem) {
              // fitler by time e.g. date
              var startMoment = eventItem.startMoment();

              if (options.date) {
                return startMoment.isSame(options.date, 'day');
              }
              else {
                return true;
              }
            });

            calendarEvents = filteredEvents;
        }
        else {
          calendarEvents = calendarEvents = this.get('sources').chain()
            // get all events
            .map(function(model) {
              return model.get('events');
            })
            .flatten()
            .value();
        }

        var collection = new CalendarEvents(calendarEvents);

        return collection;
      },

      month: function(yearMonth, cal) {
        var date = moment(yearMonth).startOf('month').add(1, 'month');

        this.monthView(date, cal);
      },

      year: function(year, cal) {
        var date = moment(year).startOf('year').add(1, 'year');

        this.yearView(date, cal);
      },

      calendardate: function(cal, date) {
        if (date) {
          this.set('date', moment(date), {silent: true});
        }

        if (cal) {
          this.set('calendar', cal, {silent: true});
        }

        this.dateView(cal);
      },

      date: function(date) {
        this.unset('calendar', {silent: true});

        this.calendardate('', date);
      },

      toCalendar: function() {
        this.get('router').navigate('', {
          trigger: true
        });
      },

      eventView: function(id) {
        var self = this;

        var calendarEvent = this.getEventById(id);

        if (calendarEvent) {
          React.renderComponent(
            EventView({
              dangerouslySetInnerHTML: self.get('dangerouslySetInnerHTML'),
              toCalendar: self.toCalendar.bind(self),
              model: calendarEvent
            }),
            self.get('mountPoint')
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
                    EventView({
                      dangerouslySetInnerHTML: self.get('dangerouslySetInnerHTML'),
                      toCalendar: self.toCalendar.bind(self),
                      model: calendarEvent
                    }),
                    self.get('mountPoint')
                  );
                }
              });
            }
          }
        }
      },

      dateView: function(cal) {
        var multiCalendarView = this.get('view')({
          calendar: cal,
          model: this,
          router: this.get('router')
        });

        React.renderComponent(multiCalendarView, this.get('mountPoint'));
      },

      all: function() {
        var multiCalendarView = this.get('view')({
          model: this,
          router: this.get('router')
        });

        React.renderComponent(multiCalendarView, this.get('mountPoint'));
      },

      today: function() {
        this.set('date', moment(), {silent: true});

        this.calendardate.apply(this, arguments);
      },

      event: function(cal, id) {
        this.eventView(id);
      },

      navigateToAllEvents: function() {
        this.navigate('');
      },

      // aka category
      navigateToCalendar: function(calendar) {
        var path = 'calendar/' + calendar;

        var date = this.get('date');

        if (date) {
          path += '/date/' + date.format('YYYY-MM-DD');
        }

        this.navigate(path);
      },

      navigateToMonth: function(month) {
        this.navigate('month/' + month);
      },

      navigateToDay: function(day) {
        this.set('date', day);

        var calendar = this.get('calendar');

        if (calendar) {
          this.navigateToCalendar(calendar);
        }
        else {
          this.navigate('date/' + day.format('YYYY-MM-DD'));
        }
      },

      navigate: function(fragment) {
        this.get('router').navigate(fragment);
      }
    });

    return MultiCalendar;
  }
);