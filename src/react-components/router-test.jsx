/**
 * @jsx React.DOM
 */
var EventView = React.createBackboneClass({
  calendar: function() {
    this.props.router.navigate('calendar', {
      trigger: true
    });
  },

  render: function() {
    var model = this.getModel();

    return (
      <div>
        <div onClick={this.calendar} className="back">&lt; back</div>
        <h3>{model.get('title')}</h3>
        <div>{model.get('description')}</div>
      </div>
    );
  }
});

var EventPreviewView = React.createBackboneClass({
  onClick: function() {
    var model = this.getModel();
    var category = model.get('category');
    var id = model.get('id');

    var path = 'calendar/category/' + category + '/event/' + id;

    router.navigate(path, {
      trigger: true
    });
  },

  render: function() {
    var model = this.getModel();

    return (
      <div onClick={this.onClick}>
        <span className="starts">{model.get('starts').format('MMMM DD, mm:ss a')}</span>
        <span> : </span>
        <span>{model.get('title')}</span>
      </div>
    );
  }
});

var Calendar = Backbone.Model.extend({
  defaults: {
    date: moment(),
    category: '',
    categories: [],
    events: new Backbone.Collection([{
      title: 'Cheez-its are tasty',
      category: 'food',
      starts: moment('2014-11-12'),
      ends: moment('2014-11-13'),
      description: 'Try cheez-it duoz. Two flavors are combined in one box.',
      id: '9qcw'
    },{
      title: 'Amanda Bynes Reportedly Expelled From College After Cheating And Drug Allegations',
      category: 'fidm',
      starts: moment('2014-11-12'),
      ends: moment('2014-11-13'),
      description: 'Rachel Loritz, a classmate of Bynes’ at the Fashion Institute of Design and Merchandising, claimed that Bynes was known to cheat and show up high on marijuana. “Amanda often ditched classes ... but even when she showed up, she was clearly high, and not good at hiding it ... she almost always wore sunglasses and laughed out loud at inappropriate times,” Loritz told TMZ.',
      id: 'sdt3'
    },{
      title: 'Robeks Juice is crack cocaine',
      category: 'food',
      starts: moment('2014-11-12'),
      ends: moment('2014-11-13'),
      description: 'I drank one of those things and I thought I was Lording.',
      id: '8lq2'
    }])
  },

  initialize: function() {
    var categories = this.get('categories');

    categories.push('all');

    this.set('categories', categories);
  },

  getEventById: function(id) {
    return this.get('events').findWhere({id: id});
  },

  getEventsByCategory: function(category) {
    if (category == 'all') {
      return this.getEvents();
    }
    else {
      return this.get('events').where({category: category});
    }
  },

  getEvents: function() {
    return this.get('events') || [];
  }
});

// Route-Based Components

var GridView = React.createClass({
  render: function() {
    return (
      <div>GridView</div>
    );
  }
});

var DayEventsView = React.createClass({
  render: function() {
    return (
      <div>DayEventsView</div>
    );
  }
});

var AllEventsView = React.createClass({
  createEvent: function(item) {
    return (
      <EventPreviewView model={item} />
    );
  },

  render: function() {
    return (
      <div>
        <div>AllEventsView</div>
        <div>{this.props.events.map(this.createEvent)}</div>
      </div>
    );
  }
});

var CategoryView = React.createClass({
  onClick: function() {
    // dcategoryebugger;
    this.props.changeCategory(this.props.name);
  },

  render: function() {
    return (
      <div className='category-view' onClick={this.onClick}>{this.props.name}</div>
    );
  }
});

var CategoryListView = React.createClass({
  createCategory: function(item) {
    return (
      <CategoryView changeCategory={this.props.changeCategory} name={item} />
    );
  },

  render: function() {
    return (
      <div className='category-view-list'>{this.props.categories.map(this.createCategory)}</div>
    );
  }
});

var CalendarView = React.createBackboneClass({
  changeCategory: function(category) {
    var nav = 'calendar'

    nav += '/category/' + category;

    console.log('category: ', category);
    // debugger;

    router.navigate(nav, {
      trigger: true
    });
  },

  render: function() {
    var calendar = this.getModel();

    var category = this.props.category;
    // var category = calendar.get('category');

    var events;

    if (category) {
      events = calendar.getEventsByCategory(category);
    }
    else {
      events = calendar.getEvents();
    }

    var categories = calendar.get('categories');

    console.log('category: ', category);
    // debugger;

    return (
      <div className='calendar'>
        <CategoryListView changeCategory={this.changeCategory} calendar={calendar} categories={categories} />

        <GridView      date={calendar.get('date')} category={calendar.get('category')} />
        <DayEventsView date={calendar.get('date')} category={calendar.get('category')} />
        <AllEventsView events={events} date={calendar.get('date')} category={calendar.get('category')} />
      </div>
    );
  }
});

var calendar = new Calendar({categories: ['holidays', 'birthdays', 'important days', 'anniversary', 'food', 'fidm']});

var CalendarRouter = Backbone.Router.extend({
  routes: {
    '':                                       'calendar',
    'calendar':                               'calendar',  // e.g. calendar
    'calendar/today':                         'today',  // e.g. calendar/today
    'calendar/date':                          'date',   // e.g. calendar/date/2014-08-09
    'calendar/category/':                     'calendar',
    'calendar/category/:cat':                 'category',    // e.g. calendar/category/educators
    'calendar/category/:cat/today':           'date',   // e.g. calendar/category/educators/today
    'calendar/category/:cat/date/:date':      'date',   // e.g. calendar/category/educators/date/2014-08-09
    'calendar/category/:cat/event/:event':    'event'   // e.g. calendar/category/educators/event/3w5sxer4q3'
  },

  initialize: function(options) {

    // Matches #page/10, passing "10"
    // this.route("page/:number", "page", function(number){ ... });

    // // Matches /117-a/b/c/open, passing "117-a/b/c" to this.open
    // this.route(/^(.*?)\/open$/, "open");

  },


  date: function(date, id, cat) {
    console.log('route: date!', arguments);

    date = moment(date) || moment()

    if (id) {
      this.showEvent(id, date);
    }
    else {
      this.showCalendar(date, cat);
    }
  },

  showEvent: function(id, date) {
    var sources = calendar.get('sources');

    var calendarEvent = calendar.getEventById(id);

    if (calendarEvent) {
      var eventView = EventView({
        model: calendarEvent,
        router: this
      });

      React.renderComponent(eventView, document.getElementById('calendarView'));
    }
    else {
      sources.fetch();

      sources.on('add', function() {
        events = calendar.get('events');

        calendarEvent = calendar.getEventById(id);

        <Event id={id} />
      })
    }
  },

  showCalendar: function(date, cat) {
    var cat = this.cat;

    var calendarView = CalendarView({
      model: calendar,
      category: cat
    });

    cat
    console.log('cat: ', cat);

    React.renderComponent(calendarView, document.getElementById('calendarView'));

    // calendar.on('')
  },

  today: function(cat) {
    console.log('route: today!', arguments);
    // console.log('today!');

    // debugger;

    this.date(moment(), null, cat);
  },

  calendar: function() {
    this.today.apply(this, arguments);
  },

  category: function(cat, date) {
    console.log('route: category!', arguments);
    this.cat = cat

    if (date) {
      this.date(date, null, cat)
    }
    else {
      this.today(cat);
    }
  },

  event: function(cat, id) {
    console.log('route: event!', arguments);
    this.date(cat, id);

    // event has belongs to a category
    // back will route to this event's cat
  }
});

var app = new CalendarRouter();

Backbone.history.start();


var app = function() {};

app.prototype = {

}

var myApp = new app();

<script id="blah"> data = [ ...... ]



