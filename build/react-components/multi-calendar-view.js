/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.MultiCalendarView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      classNameGridContainer: 'col-xs-12 col-sm-6 col-md-4 col-lg-3 calendar-grid-container',
      selectEventsContainer: 'col-xs-12 col-sm-6 col-md-6 col-lg-9 select-events-container'
    };
  },

  selectedEventsView: function() {
    var model = this.getModel();

    // var date = this.props.date || this.getModel().get('date');
    var date = this.getModel().get('date');

    if (!date){
      return (
        React.DOM.div(null, "No Date.")
      );
    }

    var events = model.getEvents({date: date});
    var title = 'Day Events';
    var subtitle = date.format('MMMM DD, YYYY');

    return (
      app.EventsView({events: events, title: title, subtitle: subtitle, router: this.props.router})
    );
  },

  render: function() {
    var eventFilter = {},
      model = this.getModel(),
      calendar = model.get('calendar'),
      date = model.get('date'),
      selectedEventsView = this.selectedEventsView();

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

    if (calendar && calendar == 'food-events' && calendarEvents.length == 47) {
      debugger;
    }

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
              ref: "calendarGrid"})
          ), 

          React.DOM.div({className: this.props.selectEventsContainer}, 
            app.SelectAllEvents({selected: allEvents, select: this.onSelectAll}), 

            app.SelectedEventsView({
              calendar: calendar, 
              className: "selected-events-view", 
              date: date, 
              events: events, 
              router: model.get('router'), 
              subtitle: subtitle, 
              title: title})
          )
        )
      )
    );
  },

  onSelectAll: function() {
    var model = this.getModel();

    model.unset('date');
  },

  changeCalendar: function(calendar) {
    // this.props.router.navigate(nav, {
    //   trigger: true
    // });

    // this.navigateToCalendar(calendar);

    // todo: make this work via removing all props.calendar and instead listening to the model's property for sourceFilter
    if (calendar) {
      var model = this.getModel();

      model.set('calendar', calendar);
    }
  },

  // aka category
  // navigateToCalendar: function(calendar) {
  //   var path = 'calendar/' + calendar;

  //   var props = this.props;

  //   if (props.date) {
  //     path += '/date/' + props.date.format('YYYY-MM-DD');
  //   }
  //   // else if (props.month) {
  //   //   path += '/month/' + props.month.format('YYYY-MM');
  //   // }
  //   // else if (props.year) {
  //   //   path += '/year/' + props.year.format('YYYY');
  //   // }

  //   this.navigate(path);
  // },

  // navigateToMonth: function(month) {
  //   this.navigate('month/' + month);
  // },

  // navigateToDay: function(day) {
  //   // debugger;
  //   this.navigate('date/' + day);
  // },

  next: function(date) {
    // this.navigateToMonth(date);
    var model = this.getModel();

    model.set('date', date);

  },

  prev: function(date) {
    // this.navigateToMonth(date);
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