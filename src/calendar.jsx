/** @jsx React.DOM */
moment.locale('en');

var WEEK_LENGTH = 7;

var Day = React.createClass({
  getInitialState: function() {
    return {
      events: []
    };
  },

  render: function() {
    return (
      <div className={this.props.className}>
        <div className='day-number'>{this.props.moment.date()}</div>
      </div>
    );
  }
});

var CalendarControls = React.createClass({

  next: function() {
    this.props.onNext();
  },

  prev: function() {
    this.props.onPrev();
  },

  render: function() {
    return (
      <nav className='clndr-controls'>
        <div className='arrow arrow-previous' onClick={this.prev}></div>
        <h3 className='title'>{this.props.date.format('MMMM YYYY')}</h3>
        <div className='arrow arrow-next' onClick={this.next}></div>
      </nav>
    );
  }
});

var Calendar = React.createClass({

  getDefaultProps: function() {
    return {
      forceSixRows: false,
      lang: 'en',
      weekOffset: 0
    };
  },

  getInitialState: function() {
    return {
      date: moment(this.props.date)
    };
  },

  next: function() {
    this.setState({date: this.state.date.add(1, 'months')});
  },

  prev: function() {
    this.setState({date: this.state.date.subtract(1, 'months')});
  },

  getDaysOfMonth: _.memoize(function() {
    return this._getDaysOfMonth();
  }),

  render: function() {
    function renderDay(item) {
      var dayConfig = {moment: item.moment};

      if (item.className) {
        dayConfig.className = item.className;
      }

      return Day(dayConfig);
    }

    var monthYear = this.state.date.format('MMYY'); // e.g. "0914" for Sept, 2014

    var days = this.getDaysOfMonth(monthYear);

    return (
      <div className='clndr'>
        <CalendarControls date={this.state.date} onNext={this.next} onPrev={this.prev} />
        <div className='clndr-grid'>
          <div className='days'>
            {_.map(days, renderDay)}
          </div>
          <div className='clearfix'></div>
        </div>
      </div>
    );
  },

  /**
   * Return an array of days for the current month
   */
  _getDaysOfMonth: function() {
    var days = [];

    var iterator = this.state.date.clone().startOf('month');
    var previousMonthIterator = iterator.clone().weekday(0);

    // previous month in first week
    while (previousMonthIterator.weekday() < iterator.weekday()) {
      days.push({
        moment: previousMonthIterator.clone(),
        className: 'day prev-month'
      });

      previousMonthIterator.add(1, 'day');
    }

    // days in month
    var daysInMonth = iterator.daysInMonth();

    for (var i = 0; i < daysInMonth; i++) {
      var day = {
        moment: iterator.clone(),
        className: 'day'
      };

      var now = moment();

      if (now.week() === iterator.week()) {
        day.className += ' active-week';

        if (now.dayOfYear() === iterator.dayOfYear()) {
          day.className += ' today';
        }
      }

      days.push(day);

      iterator.add(1, 'day');
    }

    // next month in last week
    while (iterator.weekday() !== 0) {
      days.push({
        moment: iterator.clone(),
        className: 'day next-month'
      });

      iterator.add(1, 'day');
    }

    return days;
  }
});

var date = new Date(2014, 7, 9, 17, 0); // August 9, 1984

React.renderComponent(
  <Calendar date={date} />,
  document.getElementById('calendar')
);