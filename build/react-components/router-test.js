/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

var EventsView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      title: 'Events',
      subtitle: ''
    };
  },

  createEvent: function(item) {
    return (
      app.EventPreviewView({router: this.props.router, model: item})
    );
  },

  render: function() {
    var events;

    if (this.props.events.length) {
      events = this.props.events.map(this.createEvent);
    }
    else {
      events = 'I could not find any events.'
    }

    return (
      React.DOM.div(null, 
        React.DOM.h2(null, this.props.title), 
        React.DOM.h4(null, this.props.subtitle), 
        React.DOM.div(null, events)
      )
    );
  }
});

app.AllEventsView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      title: 'Events'
    };
  },

  createEvent: function(item) {
    return (
      app.EventPreviewView({router: this.props.router, model: item})
    );
  },

  render: function() {
    return React.DOM.div(null);

    return (
      React.DOM.div(null, 
        React.DOM.div(null, this.props.title), 
        React.DOM.div(null, this.props.events.map(this.createEvent))
      )
    );
  }
});

app.CalendarView = React.createClass({displayName: 'CalendarView',
  getDefaultProps: function() {
    return {
      className: 'calendar-view',
      selected: false
    };
  },

  onClick: function() {
    this.props.changeCalendar(this.props.name);
  },

  render: function() {
    var classNameSelected = this.props.selected ? 'selected' : '';

    return (
      React.DOM.div({className: this.props.className, onClick: this.onClick}, 
        React.DOM.div({className: classNameSelected}, this.props.name)
      )
    );
  }
});

app.CalendarListView = React.createClass({displayName: 'CalendarListView',
  getDefaultProps: function() {
    return {
      className: 'col-md-12 calendar-list'
    }
  },

  createCalendar: function(item) {
    var selected = item === this.props.selected;

    return (
      app.CalendarView({selected: selected, changeCalendar: this.props.changeCalendar, name: item})
    );
  },

  render: function() {
    return (
      React.DOM.div({className: this.props.className}, 
        this.props.calendars.map(this.createCalendar)
      )
    );
  }
});

app.MultiCalendarView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      classNameGridContainer:      'calendar-grid-container col-xs-12 col-sm-6  col-md-4 col-lg-6'
      // classNameDayEvents: 'col-xs-12 col-sm-6  col-md-4 col-lg-3',
      // classNameEventList: 'col-xs-12 col-sm-12 col-md-4 col-lg-3',
      // debounceDelay: 800,
      // params: {},
      // sources: []
      // router: new Backbone.CalendarRouter()
    };
  },

  getInitialState: function() {
    return {
      // activeDayEvents: new Backbone.Collection(),
      // collection: new Backbone.CalendarEvents(),
      // filters: new Backbone.Collection(this.props.sources),
      date: moment()
    };
  },

  render: function() {
    var calendar = this.props.calendar;

    var model = this.getModel();

    var events, title;

    if (calendar) {
      title = calendar;

      events = model.getEventsByCalendar(calendar);
    }
    else {
      events = model.getEvents();
    }

    // var date = this.state.date;
    var date = model.get('date');
    console.log('date: ', date);

    // EventsView
    var specific_events, specific_title, specific_subtitle;

    specific_title = 'Events';
    specific_subtitle = calendar || '';

    var narrowBy = model.get('narrowBy');
    // date, month, year, event

    if (narrowBy) {
      if (narrowBy === 'date') {
        events = model.getEvents({date: date});

        specific_subtitle += ' ' + date.format('MMMM DD, YYYY');
      }
      else if (narrowBy === 'month') {
        events = model.getEvents({month: date});

        specific_subtitle += ' ' + date.format('MMMM, YYYY');
      }
      else if (narrowBy === 'year') {
        events = model.getEvents({year: date});

        specific_subtitle += ' ' + date.format('YYYY');
      }

      specific_subtitle += ' events';

      specific_events = events;
    }


    return (
      React.DOM.div({className: "container-fluid calendars"}, 
        React.DOM.div({className: "row"}, 
          app.CalendarListView({changeCalendar: this.changeCalendar, selected: calendar, calendars: model.getCalendars()})
        ), 

        React.DOM.div({className: "row"}, 
          React.DOM.div({className: this.props.classNameGridContainer}, 
            app.CalendarControls({date: date, onPrev: this.prev, onNext: this.next}), 

            app.CalendarGrid({
              onGridSelect: this.onGridSelect, 
              date: date, 
              ref: "calendarGrid"})
          ), 

          EventsView({events: specific_events, subtitle: specific_subtitle, title: specific_title, router: this.props.router})
        )

      )
    );
  },

  changeCalendar: function(calendar) {
    var nav = 'calendar/'

    nav += calendar;

    this.getModel().set('narrowBy', calendar);

    this.props.router.navigate(nav, {
      trigger: true
    });
  },

  next: function() {
    var model = this.getModel();

    var date = model.get('date');

    model.set('date', date.add(1, 'month'));

    // todo: find out why the react component isn't re-rending after model.set ...
    this.forceUpdate();
  },

  prev: function() {
    var model = this.getModel();

    var date = model.get('date');

    model.set('date', date.subtract(1, 'month'));

    // todo: find out why the react component isn't re-rending after model.set ...
    this.forceUpdate();
  },

  onGridSelect: function(cell) {
    if (this.refs.calendarDayEvents) { // todo, is this needed?
      this.refs.calendarDayEvents.setState({collection: cell.props.events});
    }

    var model = this.getModel();

    model.set('date', cell.props.date);

    // todo: find out why the react component isn't re-rending after model.set ...
    this.forceUpdate();
  }
});

var holidayEvents = [];
var foodEvents = [{
  title: 'Cheez-its are tasty',
  startTime: moment(),
  ends: moment(),
  content: 'Try cheez-it duoz. Two flavors are combined in one box.',
  id: '9qcw'
},{
  title: 'Robeks Juice is crack cocaine',
  startTime: moment(),
  ends: moment(),
  content: 'I drank one of those things and I thought I was Lording.',
  id: '8lq2'
}];

var fidmEvents = [{
  title: 'Amanda Bynes Reportedly Expelled From College After Cheating And Drug Allegations',
  startTime: moment(),
  ends: moment(),
  content: 'Rachel Loritz, a classmate of Bynes’ at the Fashion Institute of Design and Merchandising, claimed that Bynes was known to cheat and show up high on marijuana. “Amanda often ditched classes ... but even when she showed up, she was clearly high, and not good at hiding it ... she almost always wore sunglasses and laughed out loud at inappropriate times,” Loritz told TMZ.',
  id: 'sdt3'
}];

new Backbone.MultiCalendar({
  sources: [
    {name: 'Holiday-Events', events: holidayEvents},
    {name: 'Admissions', googleCalendarId: 'fidmwmo%40gmail.com'},
    {name: 'food-events', events: foodEvents},
    {name: 'fidm-events', events: fidmEvents}
  ],
  calendarListTitle: 'Categories',

  // calendarListClassName: 'calendars',

  mountPoint: document.getElementById('calendarView')
});
