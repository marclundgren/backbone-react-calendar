// CalendarGridView.js
// --------
define(['react', 'backbone', 'moment', 'collections/CalendarEvents', 'views/InvalidDateView', 'views/CalendarGridHeaderView', 'views/CalendarGridBodyView'],
  function(React, Backbone, moment, CalendarEvents, InvalidDateView, CalendarGridHeaderView, CalendarGridBodyView) {

    var CalendarGridView = React.createClass({displayName: 'CalendarGridView',
      getDefaultProps: function() {
        return {
          active: true,
          className: 'calendar-grid',
          events: new CalendarEvents(),
          // todo, define headerNames with locales
          headerNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        };
      },

      render: function() {

        if (!this.props.date.isValid()) {
          return InvalidDateView(null);
        }

        var monthYear = this.props.date.format('MMYY'); // e.g. "0914" for Sept, 2014

        var dates = this.getDaysOfMonth(monthYear);

        var className = this.props.className;

        if (this.props.active) {
          className += ' active';
        }

        var events = this._getEventsOfMonth();

        return (
          React.DOM.div({className: className},
            CalendarGridHeaderView({names: this.props.headerNames}),

            CalendarGridBodyView({events: events, dates: dates, onGridSelect: this.props.onGridSelect, weekLength: this.props.headerNames.length}),

            this.props.children
          )
        );
      },

      _yearMonth: function(datetime) {
        // e.g. September 14, 2014 => 09-2014
        return moment(datetime).format('YYYY-MM');
      },

      _getEventsOfMonth: function(month) {
        return this.props.events.filter(function(item) {
          return (item.month() === month);
        });
      },

      /**
       * Return an array of days for the current month that may include days prior to and after the current month
       * to complete the grid.
       */
      getDaysOfMonth: function() {
        var days = [];

        if (!this.props.date.isValid()) {
          return days;
        }

        var yearMonth = this._yearMonth(this.props.date);

        var events = this._getEventsOfMonth(yearMonth); // ~23

        var iterator = this.props.date.clone().startOf('month');

        var previousMonthIterator = iterator.clone().weekday(0);

        var weekOfMonth = 1;

        // previous month in first week
        while (previousMonthIterator.weekday() < iterator.weekday()) {
          days.push({
            className: 'date prev-month',
            fullDate: iterator.toDate(),
            moment: previousMonthIterator.clone(),
            week: weekOfMonth
          });

          previousMonthIterator.add(1, 'day');
        }

        var month = iterator.month();

        var collectionEvents = new Backbone.Collection(events);

        while (month === iterator.month()) {

          var dateEvents = collectionEvents.where({
            fullDate: iterator.format('YYYY-MM-DD')
          });

          var date = this.props.date;

          var activeWeek = date.week() === iterator.week();

          var activeDay = date.dayOfYear() === iterator.dayOfYear();

          if (activeWeek) {
            date.className += ' active-week';

            if (activeDay) {
              date.className += ' today';
            }
          }

          var dateConfig = {
            activeMonth: true,
            activeWeek: activeWeek,
            activeDay: activeDay,
            className: 'date',
            events: dateEvents,
            fullDate: iterator.toDate(),
            moment: iterator.clone(),
            week: weekOfMonth
          };

          days.push(dateConfig);

          iterator.add(1, 'day');

          if (days.length % 7 === 0) {
            weekOfMonth++;
          }
        }

        // next month in last week
        while (iterator.weekday() !== 0) {
          days.push({
            className: 'date next-month',
            fullDate: iterator.toDate(),
            moment: iterator.clone(),
            week: weekOfMonth
          });

          iterator.add(1, 'day');
        }

        return days;
      }
    });

    return CalendarGridView;
  }
);