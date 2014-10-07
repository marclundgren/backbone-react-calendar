/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.SelectedEvents = React.createClass({
  getDefaultProps: function() {
    return {
      className: 'col-xs-12 col-sm-6 col-md-6 col-lg-9'
    };
  },

  selectedEventsView: function() {
    var events;

    var date = this.props.date;
    var month = this.props.month;
    var year = this.props.year;
    var events = this.props.events;

    var title, subtitle;

    // var events = model.getEvents({
    //   calendar: this.props.calendar,
    //   date: this.props.date,
    //   month: this.props.month,
    //   year: this.props.year
    // });

    if (date) {
      title = 'Day Events';
      subtitle = date;
    }
    else if (month) {
      title = 'Month Events';
      subtitle = month;
    }
    else if (year) {
      title = 'Year Events';
      subtitle = year;
    }
    else {
      title = 'Year Events';
      subtitle = calendar;
    }

    // if (date) {
    //   title = 'Day Events';
    //   subtitle = date.format('MMMM DD, YYYY');
    // }
    // else if (month) {
    //   title = 'Month Events';
    //   subtitle = month.format('MMMM, YYYY');
    // }
    // else if (year) {
    //   title = 'Year Events';
    //   subtitle = year.format('YYYY');
    // }
    // else {
    //   title = 'Year Events';
    //   subtitle = year.format('YYYY');
    // }

    return (
      <app.EventsView events={events} title={title} subtitle={subtitle} router={this.props.router} />
    );
  },

  render: function() {
    return (
      <div className={this.props.className}>
        {this.selectedEventsView()}
      </div>
    );
  }
});

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
    else if (month) {
      events = model.getEvents({month: month});
      title = 'Month Events';
      subtitle = month.format('MMMM, YYYY');
    }
    else if (year) {
      events = model.getEvents({year: year});
      title = 'Year Events';
      subtitle = year.format('YYYY');
    }
    else {
      var date = this.getModel().get('date');

      events = model.getEvents({date: date});
      title = 'Day Events';
      subtitle = date.format('MMMM DD, YYYY');
    }

    return (
      <app.EventsView events={events} title={title} subtitle={subtitle} router={this.props.router} />
    );
  },

  render: function() {
    var calendar = this.props.calendar;

    var model = this.getModel();

    var events, title;

    if (calendar) {
      title = calendar;

      events = model.getEventsByCalendar(calendar);

      console.log('calendar events: ', calendar, events);
    }
    else {
      events = model.getEvents();
      console.log('all events: ', events);
    }

    events = model.getEvents({
      calendar: this.props.calendar,
      date: this.props.date,
      month: this.props.month,
      year: this.props.year
    });

    console.log('events using chaining: ', events);

    return (<div>Testing chaining events</div>);

    var props = this.props;

    var date = props.date || props.month || props.year || model.get('date');

    var selectedEventsView = this.selectedEventsView();

    return (
      <div className="container-fluid calendars">
        <div className="row">
          <app.CalendarListView navigateToCalendar={this.navigateToCalendar} selected={calendar} calendars={model.getCalendars()} />
        </div>

        <div className="row">
          <div className={this.props.classNameGridContainer}>
            <app.CalendarControls
              date={date}
              onPrev={this.prev}
              onNext={this.next} />

            <app.CalendarGrid
              date={date}
              events={events}
              onGridSelect={this.onGridSelect}
              ref="calendarGrid" />
          </div>

          <app.SelectedEvents
            calendar={calendar}
            date={this.props.date}
            month={this.props.month}
            year={this.props.year}
            events={events} />
        </div>
      </div>
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

  navigateToCalendar: function(calendar) {
    // debugger;
    var path = 'calendar/' + calendar;

    var props = this.props;

    if (props.date) {
      // debugger;
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
    this.navigate('date/' + day);
  },

  next: function(date) {
    this.navigateToMonth(date);
  },

  prev: function(date) {
    this.navigateToMonth(date);
  },

  navigate: function(fragment) {
    var router = this.getModel().get('router');

    router.navigate(fragment, {
      trigger: true
    });
  },

  onGridSelect: function(cell) {
    // if (this.refs.calendarDayEvents) { // todo, is this needed?
    //   this.refs.calendarDayEvents.setState({collection: cell.props.events});
    // }

    var day = cell.props.date.format('YYYY-MM-DD');

    this.navigateToDay(day);
  }
});