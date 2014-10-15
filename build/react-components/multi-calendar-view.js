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

  eventLink: function(calendar, id) {
    var model = this.getModel();

    var router = model.get('router');

    var path = 'calendar/' + calendar + '/event/' + id;

    router.navigate(path, {
      trigger: true
    });
  },

  _logTime: function() {
    return;
    var now = moment();

    var diff = now.diff(window._t);

    console.log('diff: ', diff);
    alert(diff);
  },

  render: function() {
    window.now();

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

    // alert('sanity');

    // todo: make use of transferPropsTo

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

            React.DOM.div(null, 
              date.format('YYYY-MM-DD')
            ), 

            app.CalendarGrid({
              active: !allEvents, 
              date: date, 
              events: model.getEvents({calendar: calendar}), 
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
        ), 

        React.DOM.h2(null, "Issues"), 
        React.DOM.ul(null, 
          React.DOM.li(null, "Event Detail View: [bug] direct links may contain raw HTML fragments."), 
          React.DOM.li(null, "Event Detail View: [presentation] The desktop view is not optimized."), 
          React.DOM.li(null, "Grid Calendar View: [performance] changing dates has a noticable delay."), 
          React.DOM.li(null, "Grid Calendar View: [bug] A user is unable to change the month quickly until the next month has rendered.")
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

    window._t = moment();
    console.log('window._t: ', window._t);

    model.set('date', date);
  },

  prev: function(date) {
    var model = this.getModel();

    window._t = moment();
    console.log('window._t: ', window._t);

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

    console.log('changeDate');

    window._t = moment();
    console.log('window._t: ', window._t);

    model.set('date', date);
  },

  onGridSelect: function(cell) {
    this.changeDate(cell.props.date);
  }
});