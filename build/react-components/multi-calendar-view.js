/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.MultiCalendarTitle = React.createClass({displayName: 'MultiCalendarTitle',
  getDefaultProps: function() {
    return {
      className: 'multi-calendar-title',
      title: 'Multi Calendar',

      today: function() {}
    };
  },

  render: function() {
    return (
      React.DOM.div({className: this.props.className, onClick: this.props.today}, 
        React.DOM.h1(null, 
          this.props.title
        )
      )
    );
  }
});

app.MultiCalendarView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      classNameGridContainer: 'col-xs-12 col-sm-6 col-md-4 col-lg-3 calendar-grid-container'
    };
  },

  eventLink: function(id) {
    var model = this.getModel();

    var router = model.get('router');

    var path = '/event/' + id;

    router.navigate(path, {
      trigger: true
    });
  },

  render: function() {
    var eventFilter = {},
      model = this.getModel(),
      calendar = model.get('calendar'),
      date = model.get('date');

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

    if (calendar) {
      title = calendar;
    }

    // todo: make use of transferPropsTo

    if (calendar == 'all') {
      calendar = '';
    }

    var gridEvents = model.getEvents({calendar: calendar});

    return (
      React.DOM.div({className: "container multi-calendar-view"}, 
        app.MultiCalendarTitle({
          className: this.props.classNameTitle, 
          today: this.today, 
          title: model.get('title')}), 

        React.DOM.div({className: "row"}, 
          React.DOM.div({className: this.props.classNameGridContainer}, 
            app.CalendarControls({
              date: date, 
              onPrev: this.prev, 
              onNext: this.next}), 

            app.CalendarGrid({
              active: !allEvents, 
              date: date, 
              events: gridEvents, 
              onGridSelect: this.onGridSelect, 
              ref: "calendarGrid"}, 

              app.CalendarListView({
                active: allEvents, 
                defaultValue: calendar, 
                calendars: model.getCalendars(), 
                changeCalendar: this.changeCalendar, 
                selected: calendar})
            )
          ), 

          app.CalendarEventList({
            calendar: calendar, 
            date: model.get('date'), 
            eventLink: this.eventLink, 
            events: events, 
            sortable: allEvents})
        )
      )
    );
  },

  changeCalendar: function(calendar) {
    var model = this.getModel();

    if (calendar) {

      model.set('calendar', calendar);

      model.unset('date');
    }
    else {
      model.unset('calendar');
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

  today: function() {
    var model = this.getModel();

    model.set({
      calendar: '',
      date: moment()
    });

    var router = model.get('router');

    router.navigate('today');
  },

  changeDate: function(date) {
    var model = this.getModel();

    model.set('date', date);
  },

  onGridSelect: function(cell) {
    this.changeDate(cell.props.date);
  }
});