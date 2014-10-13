/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.MultiCalendarView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      classNameGridContainer: 'col-xs-12 col-sm-6 col-md-4 col-lg-3 calendar-grid-container'
    };
  },

  eventLink: function(id) {
    var model = this.getModel();

    var calendar = model.get('calendar');
    var router = model.get('router');

    var path = 'calendar/' + calendar + '/event/' + id;

    router.navigate(path, {
      trigger: true
    });
  },

  // selectedEventsView: function() {
  //   var model = this.getModel();

  //   var date = this.getModel().get('date');

  //   var events = model.getEvents({date: date});

  //   var title, subtitle;

  //   if (date) {
  //     title = 'Day Events';
  //     subtitle = date.format('MMMM DD, YYYY');
  //   }
  //   else {
  //     title = 'All Events';
  //   }

  //   return (
  //     <app.EventsView events={events} title={title} subtitle={subtitle} router={this.props.router} />
  //   );
  // },

  render: function() {
    var eventFilter = {},
      model = this.getModel(),
      calendar = model.get('calendar'),
      date = model.get('date');
      // selectedEventsView = this.selectedEventsView();

    if (calendar) {
      eventFilter.calendar = calendar;
    }

    if (date) {
      eventFilter.date = date;
    }

    var events = model.getEvents(eventFilter);

    var modelDate = model.get('date');

    var allEvents = !date;

    var title;
    var subtitle;

    if (allEvents) {
      title = 'All Events';
      date = moment();
      subtitle = ''
    }
    else {
      subtitle = date.format('MMMM DD, YYYY');
    }

    if (calendar && calendar.toLowerCase() !== 'all') {
      title = calendar;
    }

    var calendarEvents = model.getEvents({calendar: calendar});

    var selectedEventsTitle ='Show all events';

    if (calendar && (calendar.toLowerCase() !== 'all')) {
        selectedEventsTitle += ' in ' + calendar;
    }

    // events
    // console.log('events: ', events);

    return (
      React.DOM.div({className: "container-fluid calendars"}, 
        React.DOM.div({className: "row"}, 
          app.CalendarListView({changeCalendar: this.changeCalendar, selected: calendar, calendars: model.getCalendars()})
        ), 

        React.DOM.div({className: "row"}, 
          React.DOM.div({className: this.props.classNameGridContainer}, 
            app.CalendarControls({
              date: date, 
              onPrev: this.prev, 
              onNext: this.next}), 

            app.CalendarGrid({
              active: !allEvents, 
              date: date, 
              events: calendarEvents, 
              onGridSelect: this.onGridSelect, 
              ref: "calendarGrid"}, 

              app.SelectAllEvents({title: selectedEventsTitle, selected: allEvents, select: this.onSelectAll})
            )
          ), 

          app.CalendarEventList({
            eventLink: this.eventLink, 
            date: model.get('date'), 
            events: events, 
            calendar: calendar})
        )
      )
    );
  },

  onSelectAll: function() {
    var model = this.getModel();

    model.unset('date');
  },

  changeCalendar: function(calendar) {
    if (calendar) {
      var model = this.getModel();

      model.set('calendar', calendar);
    }
  },

  next: function(date) {
    var model = this.getModel();

    model.set('date', date);

  },

  prev: function(date) {
    var model = this.getModel();

    model.set('date', date);
  },

  changeDate: function(date) {
    var model = this.getModel();

    model.set('date', date);
  },

  onGridSelect: function(cell) {
    var model = this.getModel();

    model.set('date', cell.props.date);
  }
});