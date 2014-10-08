/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

// test
// http://localhost/Sites/Dev/react/react-calendar/test/#date/2014-10-07

app.MultiCalendarView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      classNameGridContainer: 'col-xs-12 col-sm-6 col-md-4 col-lg-3 calendar-grid-container'
    };
  },

  selectedEventsView: function() {
    var events;
    var model = this.getModel();

    var date = this.props.date;
    var month = this.props.month;
    var year = this.props.year;

    var title, subtitle;

    if (date) {
      events = model.getEvents({date: date});
      title = 'Day Events';
      subtitle = date.format('MMMM DD, YYYY');
    }
    // else if (month) {
    //   events = model.getEvents({month: month});
    //   title = 'Month Events';
    //   subtitle = month.format('MMMM, YYYY');
    // }
    // else if (year) {
    //   events = model.getEvents({year: year});
    //   title = 'Year Events';
    //   subtitle = year.format('YYYY');
    // }
    else {
      // debugger;
      date = this.getModel().get('date');

      events = model.getEvents({date: date});
      title = 'Day Events';
      subtitle = date.format('MMMM DD, YYYY');
    }

    console.log('events', events);

    return (React.DOM.div(null));

    return (
      app.EventsView({events: events, title: title, subtitle: subtitle, router: this.props.router})
    );
  },

  render: function() {
    console.log('MultiCalendarView render...');
    var eventFilter = {},
      model = this.getModel(),
      events = model.getEvents(eventFilter),
      props = this.props,
      calendar = props.calendar,
      // date = props.date || props.month || props.year || model.get('date'),
      date = props.date,
      selectedEventsView = this.selectedEventsView();

    if (props.calendar) {
      eventFilter.name = props.calendar;
    }
    if (props.date) {
      eventFilter.date = props.date;
    }


    console.log('props.date: ', props.date);
    console.log('model.get("date"): ', model.get("date"));
    console.log('events using chaining: ', events, eventFilter);

    // events = new Backbone.CalendarEvents(events);

    // return (<div>Testing chaining events</div>);


    console.log('date.format("YYYY-MM-DD"): ', date.format("YYYY-MM-DD"));
    // debugger;
    if (!date.isValid()) {
      return (
        app.InvalidDate(null)
      );
    }

    return (
      React.DOM.div({className: "container-fluid calendars"}, 
        React.DOM.div({className: "row"}, 
          app.CalendarListView({navigateToCalendar: this.navigateToCalendar, selected: calendar, calendars: model.getCalendars()})
        ), 

        React.DOM.div({className: "row"}, 
          React.DOM.div({className: this.props.classNameGridContainer}, 
            app.CalendarControls({
              date: date, 
              onPrev: this.prev, 
              onNext: this.next}), 

            app.CalendarGrid({
              date: date, 
              events: events, 
              onGridSelect: this.onGridSelect, 
              ref: "calendarGrid"})
          ), 

          app.SelectedEventsView({
            calendar: calendar, 
            router: model.get('router'), 
            date: this.props.date, 
            month: this.props.month, 
            year: this.props.year, 
            events: events})
        )
      )
    );
      /*
          <div className='col-xs-12 col-sm-12 col-md-4 col-lg-3'>
            <app.EventsView events={model.getEvents()} subtitle='All' router={this.props.router} />
          </div>
      */
  },

  changeCalendar: function(calendar) {
    console.log('calendar: ', calendar);
    // var nav = 'calendar/'

    // nav += calendar;

    // this.getModel().set('narrowBy', calendar);

    // this.props.router.navigate(nav, {
    //   trigger: true
    // });

    this.navigateToCalendar(calendar);
  },

  // aka category
  navigateToCalendar: function(calendar) {
    var path = 'calendar/' + calendar;

    var props = this.props;

    if (props.date) {
      path += '/date/' + props.date.format('YYYY-MM-DD');
    }
    else if (props.month) {
      path += '/month/' + props.month.format('YYYY-MM');
    }
    else if (props.year) {
      path += '/year/' + props.year.format('YYYY');
    }

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
    var model = this.getModel();

    model.set('date', date);

  },

  prev: function(date) {
    // this.navigateToMonth(date);
    var model = this.getModel();

    model.set('date', date);
  },

  // navigate: function(fragment) {
  //   var model = this.getModel();

  //   model.get('router').navigate(fragment);

  //   // var router = this.getModel().get('router');
  //   // router.navigate(fragment, {
  //   //   trigger: true
  //   // });
  // },

  changeDate: function(date) {
    var model = this.getModel();

    model.set('date', date);
  },

  onGridSelect: function(cell) {
    // if (this.refs.calendarDayEvents) { // todo, is this needed?
    //   this.refs.calendarDayEvents.setState({collection: cell.props.events});
    // }
    var model = this.getModel();

    model.set('date', cell.props.date);

    // this.navigateToDay(cell.props.date);
  }
});