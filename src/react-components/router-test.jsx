/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

// Route-Based Components

app.GridView = React.createClass({
  render: function() {
    return (
      <div>GridView</div>
    );
  }
});

app.DayEventsView = React.createClass({
  render: function() {
    return (
      <div>DayEventsView</div>
    );
  }
});

app.AllEventsView = React.createBackboneClass({
  createEvent: function(item) {
    return (
      <app.EventPreviewView router={this.props.router} model={item} />
    );
  },

  render: function() {
    return (
      <div>
        <div>app.AllEventsView</div>
        <div>{this.props.events.map(this.createEvent)}</div>
      </div>
    );
  }
});

app.CalendarView = React.createClass({
  onClick: function() {
    this.props.changeCalendar(this.props.name);
  },

  render: function() {
    return (
      <div className='calendar-view' onClick={this.onClick}>{this.props.name}</div>
    );
  }
});

app.CalendarListView = React.createClass({
  createCalendar: function(item) {

    return (
      <app.CalendarView changeCalendar={this.props.changeCalendar} name={item} />
    );
  },

  render: function() {
    return (
      <div className="col-md-12 calendar-list">
        {this.props.calendars.map(this.createCalendar)}
      </div>
    );
  }
});

app.MultiCalendarView = React.createBackboneClass({
  changeCalendar: function(calendar) {
    var nav = 'calendar/'

    nav += calendar;

    this.props.router.navigate(nav, {
      trigger: true
    });
  },

  render: function() {
    var calendar = this.props.calendar;

    var model = this.getModel();

    var events = calendar ? model.getEventsByCalendar(calendar) : model.getEvents();

    var calendars = model.getCalendars();

    return (
      <div className="container-fluid calendars">
        <div className="row">
          <app.CalendarListView changeCalendar={this.changeCalendar} calendar={calendar} calendars={calendars} />
        </div>

        <div className="row">
          <app.GridView      date={model.get('date')} calendar={model.get('calendar')} />
          <app.DayEventsView date={model.get('date')} calendar={model.get('calendar')} />
          <app.AllEventsView router={this.props.router} events={events} date={model.get('date')} calendar={model.get('calendar')} />
        </div>

      </div>
    );
  }
});

var holidayEvents = [];
var foodEvents = [{
  title: 'Cheez-its are tasty',
  startTime: moment('2014-11-12'),
  ends: moment('2014-11-13'),
  description: 'Try cheez-it duoz. Two flavors are combined in one box.',
  id: '9qcw'
},{
  title: 'Robeks Juice is crack cocaine',
  startTime: moment('2014-11-12'),
  ends: moment('2014-11-13'),
  description: 'I drank one of those things and I thought I was Lording.',
  id: '8lq2'
}];

var fidmEvents = [{
  title: 'Amanda Bynes Reportedly Expelled From College After Cheating And Drug Allegations',
  startTime: moment('2014-11-12'),
  ends: moment('2014-11-13'),
  description: 'Rachel Loritz, a classmate of Bynes’ at the Fashion Institute of Design and Merchandising, claimed that Bynes was known to cheat and show up high on marijuana. “Amanda often ditched classes ... but even when she showed up, she was clearly high, and not good at hiding it ... she almost always wore sunglasses and laughed out loud at inappropriate times,” Loritz told TMZ.',
  id: 'sdt3'
}];

new Backbone.MultiCalendar({
  sources: [
    {name: 'Admissions', googleCalendarId: 'fidmwmo%40gmail.com'},
    {name: 'food-events', events: foodEvents},
    {name: 'fidm-events', events: fidmEvents}
  ],
  calendarListTitle: 'Categories',
  // calendarListClassName: 'calendars',

  mountPoint: document.getElementById('calendarView')
});
