// MultiCalendarView.js
// --------
define(['reactbackbone', 'moment', 'views/MultiCalendarTitleView', 'views/CalendarControlsView', 'views/CalendarGridView', 'views/CalendarListView', 'views/CalendarEventListView'],
  function(React, moment, MultiCalendarTitleView, CalendarControlsView, CalendarGridView, CalendarListView, CalendarEventListView) {

    var MultiCalendarView = React.createBackboneClass({
      getDefaultProps: function() {
        return {
          calendarGridRefName: 'calendarGrid',
          className: 'container multi-calendar-view',
          classNameGridContainer: 'col-xs-12 col-sm-6 col-md-4 col-lg-3 calendar-grid-container',
          rowClassName: 'row'
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

      render: function() {
        var eventFilter = {};
        var model = this.getModel();
        var calendar = model.get('calendar');
        var date = model.get('date');

        if (calendar) {
          eventFilter.calendar = calendar;
        }

        if (date) {
          eventFilter.date = date;
        }

        var events = model.getEvents(eventFilter);

        var allEvents = !date;

        var title;

        if (allEvents) {
          title = 'All Events';
          date = moment();
        }

        if (calendar) {
          title = calendar;
        }

        if (calendar === 'all') {
          calendar = '';
        }

        var gridEvents = model.getEvents({calendar: calendar});

        return (
          React.DOM.div({className: this.props.className},
            MultiCalendarTitleView({
              className: this.props.classNameTitle,
              today: this.today,
              title: model.get('title')}),

            React.DOM.div({className: this.props.rowClassName},
              React.DOM.div({className: this.props.classNameGridContainer},
                CalendarControlsView({
                  date: date,
                  onPrev: this.prev,
                  onNext: this.next}),

                CalendarGridView({
                  active: !allEvents,
                  date: date,
                  events: gridEvents,
                  onGridSelect: this.onGridSelect,
                  ref: this.props.calendarGridRefName},

                  CalendarListView({
                    active: allEvents,
                    defaultValue: calendar,
                    calendars: model.getCalendars(),
                    changeCalendar: this.changeCalendar,
                    selected: calendar})
                )
              ),

              CalendarEventListView({
                calendar: calendar,
                date: model.get('date'),
                eventLink: this.eventLink,
                events: events,
                sortable: true
              })
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

    return MultiCalendarView;
  }
);