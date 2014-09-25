/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarDate = React.createClass({
  onClick: function() {

    // todo: show these events

    console.log('this.props.events: ', this.props.events);
  },

  render: function() {
    return (
      <div className={this.props.className} onClick={this.onClick}>
        <div className='date-number'>{this.props.moment.date()}</div>
      </div>
    );
  }
});

app.CalendarGridDate = React.createClass({
  onClick: function() {

    // todo: show these events

    console.log('this.props.events: ', this.props.events);
  },

  render: function() {
    var className = 'grid-cell';

    if (this.props.events.length) {
      // make more markup
    }

    var today = (app.Util.app.today(this.props.moment));

    if (today) {
      className += ' active-day';
    }

    return (
      <div className={this.props.className} onClick={this.onClick}>
        <div className={className}>
          <div>
            <div>
              <span>{this.props.moment.date()}</span>
            </div>
            <app.EventIndicator hasEvents={this.props.events.length}/>
          </div>
        </div>
      </div>
    );
  }
});

app.CalendarGridHeader = React.createClass({
  getDefaultProps: function() {
    return {
      // to-do, build these with moment's locale
      names: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    }
  },

  render: function() {
    return (
      <div className='week-header'>
        <app.CalendarGridHeaderRow names={this.props.names} />
      </div>
    );
  }
});

// new app.CalendarGridBody({ weeks: [] })

app.CalendarGridBody = React.createClass({
  getDefaultProps: function() {
    return {
      events: [],
      dates: [],
      weeks: []
    };
  },

  getEventsByWeek: function() {
    var eventsByWeek = this.props.events;

    // magic goes here
    debugger;

    // make sure this is a collection



    return eventsByWeek;
  },

  createWeek: function(item) {
    return (
      <app.CalendarGridBodyRow dates={item} />
    );
    // debugger;



    // return new app.CalendarGridBodyRow({dates: item});
  },

  render: function() {
    return (
      <div className='week-body'>
        {this.props.weeks.map(this.createWeek)}
      </div>
    );
  }
});

app.CalendarGridHeaderCell = React.createClass({
  render: function() {
    return (
      <div className='grid-cell'>
        <div>
          <div>
            <span>{this.props.name}</span>
          </div>
        </div>
      </div>
    );
  }
});

app.CalendarGridHeaderRow = React.createClass({
  createCell: function(item) {
    return new app.CalendarGridHeaderCell({name: item});
  },

  render: function() {
    return (
      <div className='row'>
        {this.props.names.map(this.createCell)}
      </div>
    );
  }
});

app.CalendarGridBodyRow = React.createClass({
  createCell: function(item) {
    // debugger;
      return (
        <app.CalendarGridBodyCell
          activeMonth={item.get('activeMonth')}
          activeWeek={item.get('activeWeek')}
          activeDay={item.get('activeDay')}
          date={item.get('moment').date()}
          events={item.get('events')} />
      );

      // will not reach here
      return new app.CalendarGridBodyCell({date: item});
    },

    render: function() {
      return (
        <div className='row'>
          {this.props.dates.map(this.createCell)}
        </div>
      );
    }
});

app.CalendarGridBodyCell = React.createClass({
  getDefaultProps: function() {
    return {
      date: '',
      events: []
    };
  },

  render: function() {
      var className = '';

      if (this.props.activeMonth) {
        className += ' active-month';

        if (this.props.activeWeek) {
          className += ' active-week';

          if (this.props.activeDay) {
            className += ' active-day';
          }
        }
      }

      return (
        <div className='grid-cell'>
          <div className={className}>
            <div>
              <span>{this.props.date}</span>
            </div>

            <app.EventIndicator hasEvents={this.props.events.length} />
          </div>
        </div>
      );
    }
});

app.EventIndicator = React.createClass({
  render: function() {
    var className = 'event-indicator';

    if (this.props.hasEvents) {
      className += ' has-events';
    }

    return (
      <div className={className}></div>
    );
  }
});