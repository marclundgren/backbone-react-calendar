/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarDate = React.createClass({displayName: 'CalendarDate',
  onClick: function() {

    // todo: show these events

    console.log('this.props.events: ', this.props.events);
  },

  render: function() {
    return (
      React.DOM.div({className: this.props.className, onClick: this.onClick}, 
        React.DOM.div({className: "date-number"}, this.props.moment.date())
      )
    );
  }
});

app.CalendarGridDate = React.createClass({displayName: 'CalendarGridDate',
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
      React.DOM.div({className: this.props.className, onClick: this.onClick}, 
        React.DOM.div({className: className}, 
          React.DOM.div(null, 
            React.DOM.div(null, 
              React.DOM.span(null, this.props.moment.date())
            ), 
            app.EventIndicator({hasEvents: this.props.events.length})
          )
        )
      )
    );
  }
});

app.CalendarGridHeader = React.createClass({displayName: 'CalendarGridHeader',
  getDefaultProps: function() {
    return {
      // to-do, build these with moment's locale
      names: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    }
  },

  render: function() {
    return (
      React.DOM.div({className: "week-header"}, 
        app.CalendarGridHeaderRow({names: this.props.names})
      )
    );
  }
});

// new app.CalendarGridBody({ weeks: [] })

app.CalendarGridBody = React.createClass({displayName: 'CalendarGridBody',
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
      app.CalendarGridBodyRow({dates: item})
    );
    // debugger;



    // return new app.CalendarGridBodyRow({dates: item});
  },

  render: function() {
    return (
      React.DOM.div({className: "week-body"}, 
        this.props.weeks.map(this.createWeek)
      )
    );
  }
});

app.CalendarGridHeaderCell = React.createClass({displayName: 'CalendarGridHeaderCell',
  render: function() {
    return (
      React.DOM.div({className: "grid-cell"}, 
        React.DOM.div(null, 
          React.DOM.div(null, 
            React.DOM.span(null, this.props.name)
          )
        )
      )
    );
  }
});

app.CalendarGridHeaderRow = React.createClass({displayName: 'CalendarGridHeaderRow',
  createCell: function(item) {
    return new app.CalendarGridHeaderCell({name: item});
  },

  render: function() {
    return (
      React.DOM.div({className: "row"}, 
        this.props.names.map(this.createCell)
      )
    );
  }
});

app.CalendarGridBodyRow = React.createClass({displayName: 'CalendarGridBodyRow',
  createCell: function(item) {
    // debugger;
      return (
        app.CalendarGridBodyCell({
          activeMonth: item.get('activeMonth'), 
          activeWeek: item.get('activeWeek'), 
          activeDay: item.get('activeDay'), 
          date: item.get('moment').date(), 
          events: item.get('events')})
      );

      // will not reach here
      return new app.CalendarGridBodyCell({date: item});
    },

    render: function() {
      return (
        React.DOM.div({className: "row"}, 
          this.props.dates.map(this.createCell)
        )
      );
    }
});

app.CalendarGridBodyCell = React.createClass({displayName: 'CalendarGridBodyCell',
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
        React.DOM.div({className: "grid-cell"}, 
          React.DOM.div({className: className}, 
            React.DOM.div(null, 
              React.DOM.span(null, this.props.date)
            ), 

            app.EventIndicator({hasEvents: this.props.events.length})
          )
        )
      );
    }
});

app.EventIndicator = React.createClass({displayName: 'EventIndicator',
  render: function() {
    var className = 'event-indicator';

    if (this.props.hasEvents) {
      className += ' has-events';
    }

    return (
      React.DOM.div({className: className})
    );
  }
});