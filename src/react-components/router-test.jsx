/**
 * @jsx React.DOM
 */

var app = app || {};

var EventView = React.createBackboneClass({
  calendar: function() {
    this.props.router.navigate('calendar', {
      trigger: true
    });
  },

  render: function() {
    var model = this.getModel();

    return (
      <div>
        <div onClick={this.calendar} className="back">&lt; back</div>
        <h3>{model.get('title')}</h3>
        <div>{model.get('description')}</div>
      </div>
    );
  }
});

var EventPreviewView = React.createBackboneClass({
  onClick: function() {
    var model = this.getModel();
    var calendar = model.get('calendar');
    console.log('calendar: ', calendar)
    // debugger;
    var id = model.get('id');

    var path = 'calendar/' + calendar + '/event/' + id;

    this.props.router.navigate(path, {
      trigger: true
    });
  },

  render: function() {
    var model = this.getModel();

    // var startTime = model.get('startTime') || moment(model.get('gd$when')[0].startTime);
    var startTime = model.get('startTime');

    // var title = model.get('title') && model.get('title').$t || model.get('title');
    var title = model.get('title');

    return (
      <div onClick={this.onClick}>
        <span className="startTime">{moment(startTime).format('MMMM DD, mm:ss a')}</span>
        <span> : </span>
        <span>{title}</span>
      </div>
    );
  }
});

var CalendarRouter = Backbone.Router.extend({
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

app.Calendar = Backbone.Model.extend({
  defaults: {
    calendar: '',
    date: moment(),
    router: new CalendarRouter(),
    sources: new Backbone.Collection([])
  },

  initialize: function() {
    this._initSources();
    this._initEvents();
    this._initCategories();
    this._bindRoutes();
  },

  _initSources: function() {
    var self = this;
    var sources = this.get('sources');

    if (!(sources instanceof Backbone.Collection)) {
      sources = new Backbone.Sources(sources);
    }

    this.set('sources', sources);

    this.listenTo(sources, 'change', function() {
      var sources = self.get('sources');

      self._syncCategories();

      self.dateView();
    });

    this._fetchRemoteSources();
  },

  _syncCategories: function() {
    var categories = this._getCategories();

      this.set('categories', categories);
  },

  _initEvents: function() {
    var events = this.get('sources').pluck('events');

    var flattenedEvents = _.flatten(events);

    this.set('events', new Backbone.Collection(flattenedEvents));
  },

  _fetchRemoteSources: function() {
    var sources = this.get('sources');

    var sourcesRemote = sources.filter(function (source) {
      return source.get('id') && _.isString(source.get('id'));
    });

    sourcesRemote = new Backbone.Sources(sourcesRemote);
    console.log('sourcesRemote: ', sourcesRemote);

    sourcesRemote.each(function(source) {
      source.fetch().done(function(results) {
        var entries = results.feed.entry.map(function(item) {

          var sourceName = source.get('name');
          // console.log('sourceName: ', sourceName);

          // debugger;

          return {
            author:       item.author[0].name,
            calendar:     source.get('name'),
            content:      item.content.$t,
            date:         item.gd$when[0].startTime,
            endTime:      item.gd$when[0].endTime,
            id:           item.gCal$uid.value,
            link:         item.link[0].href,
            location:     item.gd$where[0].valueString,
            startTime:    item.gd$when[0].startTime,
            title:        item.title.$t,
            updated:      item.updated.$t
          };
        });

        var events = new Backbone.CalendarEvents(entries);

        // debugger;

        sources.get(source).set('events', events.toJSON());
      });
    });
  },

  _initCategories: function() {
    this._syncCategories();
  },

  _getCategories: function() {
    return _.flatten(['all', this.get('sources').pluck('name')]);
  },

  _bindRoutes: function() {
    var self = this;

    var router = this.get('router');

    // this.listenTo(router, 'route', function() {
    //   self.today.apply(self, arguments);
    // });

    this.listenTo(router, 'route:calendar', function() {
      self.calendar.apply(self, arguments);
    });

    this.listenTo(router, 'route:today', function() {
      self.today.apply(self, arguments);
    });

    this.listenTo(router, 'route:date', function() {
      self.date.apply(self, arguments);
    });

    this.listenTo(router, 'route:event', function() {
      self.event.apply(self, arguments);
    });

    Backbone.history.start();
  },

  getEventById: function(id) {
    var events = this.getEvents();
    console.log('events: ', events);

    return events.findWhere({id: id});
  },

  getEventsByCalendar: function(calendar) {
    if (calendar == 'all') {
      return this.getEvents();
    }
    else {
      var sources = this.get('sources').where({name: calendar});

      sources = new Backbone.Collection(sources);

      return sources && new Backbone.Collection(_.flatten(sources.pluck('events'))) || [];
    }
  },

  getEvents: function() {
    var sourceEvents = this.get('sources').map(function(source) {
      var sourceEvents = source.get('events');

      sourceEvents = sourceEvents.map(function(item) {
        item.calendar = source.get('name');
      });

      return source.get('events');
    });

    var events = _.flatten(sourceEvents);

    events = new Backbone.CalendarEvents(events);

    return events || [];
  },

  date: function(date, id, cat) {
    console.log('id: ', id);
    if (!id) {
      debugger;
    }
    date = moment(date) || moment()

    if (id) {
      this.eventView(id, date);
    }
    else {
      this.dateView(date, cat);
    }
  },

  eventView: function(id, date) {
    var self = this;

    var calendarEvent = this.getEventById(id);

    var eventView = EventView({
        model: calendarEvent,
        router: this.get('router')
      });

    if (calendarEvent) {

      React.renderComponent(eventView, this.get('mountPoint'));
    }
    else {
      var sources = this.get('sources');

      console.log('sources: ', sources);

      if (sources) {
        // debugger;

        // debugger;

        sources.invoke('fetch');

        sources.once('change', function() {
          // events = this.get('events');
          // debugger;

          calendarEvent = self.getEventById(id);

          if (calendarEvent) {
            React.renderComponent(
              EventView({
                model: calendarEvent,
                router: this.get('router')
              }),
              self.get('mountPoint')
            );
          }
          else {
            debugger;
            // no such event
          }
        })
      }
    }
  },

  dateView: function(date, cat) {
    var cat = this.cat;

    var calendarAppView = CalendarAppView({
      model: this,
      calendar: cat,
      router: this.get('router')
    });

    React.renderComponent(calendarAppView, document.getElementById('calendarView'));
  },

  today: function(cat) {
    // console.log('today...');
    this.date(moment(), null, cat);
  },

  calendar: function() {
    this.today.apply(this, arguments);
  },

  calendar: function(cat, date) {
    // console.log('calendar...');
    this.cat = cat

    if (date) {
      this.date(date, null, cat)
    }
    else {
      this.today(cat);
    }
  },

  event: function(cat, id) {
    this.date(cat, id);

    // event has belongs to a calendar
    // back will route to this event's cat
  }
});

// Route-Based Components

var GridView = React.createClass({
  render: function() {
    return (
      <div>GridView</div>
    );
  }
});

var DayEventsView = React.createClass({
  render: function() {
    return (
      <div>DayEventsView</div>
    );
  }
});

var AllEventsView = React.createBackboneClass({
  createEvent: function(item) {
    return (
      <EventPreviewView router={this.props.router} model={item} />
    );
  },

  render: function() {
    return (
      <div>
        <div>AllEventsView</div>
        <div>{this.props.events.map(this.createEvent)}</div>
      </div>
    );
  }
});

var CalendarView = React.createClass({
  onClick: function() {
    this.props.changeCalendar(this.props.name);
  },

  render: function() {
    return (
      <div className='calendar-view' onClick={this.onClick}>{this.props.name}</div>
    );
  }
});

var CalendarListView = React.createClass({
  createCalendar: function(item) {
    return (
      <CalendarView changeCalendar={this.props.changeCalendar} name={item} />
    );
  },

  render: function() {
    return (
      <div className='calendar-view-list'>{this.props.categories.map(this.createCalendar)}</div>
    );
  }
});

var CalendarAppView = React.createBackboneClass({
  changeCalendar: function(calendar) {
    var nav = 'calendar/'

    nav += calendar;

    this.props.router.navigate(nav, {
      trigger: true
    });
  },

  render: function() {
    var model = this.getModel();
    // console.log('model: ', model);

    var calendar = this.props.calendar;
    // console.log('calendar: ', calendar);

    var events = calendar ? model.getEventsByCalendar(calendar) : model.getEvents();
    // var events = model.getEvents();

    var names = model.get('categories');

    console.log('events: ', events);
    // // console.log('calendar: ', calendar);

    return (
      <div className='calendars'>
        <CalendarListView changeCalendar={this.changeCalendar} calendar={calendar} categories={names} />

        <GridView      date={model.get('date')} calendar={model.get('calendar')} />
        <DayEventsView date={model.get('date')} calendar={model.get('calendar')} />
        <AllEventsView router={this.props.router} events={events} date={model.get('date')} calendar={model.get('calendar')} />
      </div>
    );
  }
});

var holidayEvents = [];
var foodEvents = [{
  title: 'Cheez-its are tasty',
  startTime: moment('2014-11-12'),
  ends: moment('2014-11-13'),
  description: 'Try cheez-it duoz. Two flavors are combined in one box.',
  id: '9qcw'
},{
  title: 'Robeks Juice is crack cocaine',
  startTime: moment('2014-11-12'),
  ends: moment('2014-11-13'),
  description: 'I drank one of those things and I thought I was Lording.',
  id: '8lq2'
}];

var fidmEvents = [{
  title: 'Amanda Bynes Reportedly Expelled From College After Cheating And Drug Allegations',
  startTime: moment('2014-11-12'),
  ends: moment('2014-11-13'),
  description: 'Rachel Loritz, a classmate of Bynes’ at the Fashion Institute of Design and Merchandising, claimed that Bynes was known to cheat and show up high on marijuana. “Amanda often ditched classes ... but even when she showed up, she was clearly high, and not good at hiding it ... she almost always wore sunglasses and laughed out loud at inappropriate times,” Loritz told TMZ.',
  id: 'sdt3'
}];

new app.Calendar({
  // categories: ['holidays', 'birthdays', 'important days', 'anniversary', 'food', 'fidm'],
  sources: [
    {name: 'Admissions', id: 'fidmwmo%40gmail.com'},
    {name: 'food-events', events: foodEvents},
    {name: 'fidm-events', events: fidmEvents}
  ],
  calendarListTitle: 'Categories',
  // calendarListClassName: 'categories',

  mountPoint: document.getElementById('calendarView')
});
