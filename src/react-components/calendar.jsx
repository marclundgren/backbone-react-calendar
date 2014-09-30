/** @jsx React.DOM */

// app namespace
var app = app || {};

app.FilterEntry = React.createClass({
  getDefaultProps: function() {
    return {
      className: 'filter',
      name: '',
      model: new Backbone.Model()
      // filter: function(){}
    };
  },

  getInitialState: function() {
    return {
      active: true
    };
  },

  toggleActive: function() {
    this.setState({active: !this.state.active});

    this.props.filter(this.props.model);
  },

  render: function() {
    var className = this.props.className;

    if (this.state.active) {
      className += ' active';
    }

    return (
      <div className={className} onClick={this.toggleActive}>{this.props.name}</div>
    );
  }
});

app.CalendarFilter = React.createClass({
  getDefaultProps: function() {
    return {
      sources: []
    };
  },

  createEntry: function(item) {
    // debugger;
    return (
      <app.FilterEntry model={item} name={item.get('name')} filter={this.props.filter} />
    );
  },

  render: function() {
    // this.props.sources
    // console.log('this.props.sources: ', this.props.sources);

    return (
      <div className="col-md-12 calendar-filter">
        {this.props.sources.map(this.createEntry)}
      </div>
    );
  }
});

// todo move this to its own file
app.CalendarDayEvents = React.createClass({
  getInitialState: function() {
    return {
      collection: []
    };
  },

  getDefaultProps: function() {
    return {
      title: 'Detailed View'
    };
  },

  createEvent: function(item) {
    return (
      <div className="event">
        <h4 className="event-title">
          <a href={item.get('link')}>{item.get('title')}</a>
        </h4>

        <div className="when">
          <div className="starts">
            Starts: {item.starts()}
          </div>
          <div className="duration">
            Duration: {item.duration()}
          </div>
        </div>
        <div className="where">
          Location: {item.get('location')}
        </div>

        <div className="content">
          <div>{item.get('content')}</div>
        </div>
      </div>
    );
  },

  render: function() {
    var events;

    if (this.state.collection.length) {
      events = this.state.collection.map(this.createEvent);
    }
    else {
      events = 'There are no events.';
    }

    return (
      <div className="selected-events-list">
        <div className="selected-events-list-header">
          <h3 className="title">{this.props.title}</h3>
        </div>
        {events}
      </div>
    );
  }
});

app.Calendar = React.createClass({
  getDefaultProps: function() {
    return {
      classNameGrid:      'col-xs-12 col-sm-6  col-md-4 col-lg-6',
      classNameDayEvents: 'col-xs-12 col-sm-6  col-md-4 col-lg-3',
      classNameEventList: 'col-xs-12 col-sm-12 col-md-4 col-lg-3',
      debounceDelay: 800,
      params: {},
      sources: []
    };
  },

  getInitialState: function() {
    return {
      activeDayEvents: new Backbone.Collection(),
      collection: new Backbone.CalendarEvents([]),
      date: moment(new Date()),
      filters: new Backbone.Collection(this.props.sources)
    };
  },

  componentWillMount: function() {
    this.setState({date: moment(this.state.date)});
  },

  componentDidMount: function() {
    var self = this;

    var sources = this.props.sources;

    if (!(sources instanceof Backbone.Sources)) {
      sources = new Backbone.Sources(sources);

      this.props.sources = sources;
      console.log('this.props.sources: ', this.props.sources);
    }

    var googleCalendar = new Backbone.GoogleCalendar({
      // entries: this.props.entries,
      params: this.props.params,
      sources: this.props.sources
    });

    googleCalendar.get('entries').on('add', _.debounce(function(event) {
      self.updateCalendarComponents(googleCalendar);
    }), this.props.debounceDelay);

    googleCalendar.fetchSources();

    this._googleCalendar = googleCalendar;
  },

  componentWillUnmount: function() {
    this._googleCalendar.destroy();
  },

  updateCalendarComponents: function(calendar) {
    var collection = calendar.get('entries');

    // console.log('updateCalendarComponents...');

    // 98% sure this is not needed...
    // this.setState({collection: collection});

    this.refs.calendarGrid.setState({collection: collection});
    this.refs.calendarEventList.setState({collection: collection});

    var dateEvents = collection.where({
      yearMonthDay: moment(this.state.date).format('YYYY-MM-DD')
    });

    this.refs.calendarDayEvents.setState({collection: dateEvents});
  },

  onGridSelect: function(cell) {
    this.setState({date: cell.props.date});

    this.refs.calendarDayEvents.setState({collection: cell.props.events});
  },

  filterEvents: function(names) {
    var self = this;

    var filteredEvents = names.map(function(name) {
      return self.state.collection.where({calendarName: name})
    });

    var flatFilteredEvents = _.flatten(filteredEvents);

    this.refs.calendarGrid.setState({collection: flatFilteredEvents});
    this.refs.calendarEventList.setState({collection: flatFilteredEvents});

    flatFilteredEvents = new Backbone.Collection(flatFilteredEvents);

    var dateEvents = flatFilteredEvents.where({
      yearMonthDay: moment(self.state.date).format('YYYY-MM-DD')
    });

    self.refs.calendarDayEvents.setState({collection: dateEvents});
  },

  onChange: function(event) {
    var vals = $(event.currentTarget).val();

    filterEvents(vals);
  },

  next: function() {
    this.setState({date: this.state.date.add(1, 'month')});
  },

  prev: function() {
    this.setState({date: this.state.date.subtract(1, 'month')});
  },

  createOption: function(item) {
    return app.CalendarSourceOption({name: item.name});
  },

  filter: function(source) {

    console.log('source: ', source);

    var filters = this.state.filters;

    if (!(filters instanceof Backbone.Collection)) {
      filters = new Backbone.Collection(filters);
    }

    var filters = new Backbone.Collection(this.state.filters);

    var match = filters.where({name: source.get('name')});

    // toggle
    if (match) {
      filters.remove(match);
    }
    else {
      filters.add(match);
    }

    var filteredEvents = filters.toJSON();

    debugger;

    this.setState({filters: filteredEvents});

    var flatFilteredEvents = _.flatten(filteredEvents);

    this.refs.calendarGrid.setState({collection: flatFilteredEvents});
    this.refs.calendarEventList.setState({collection: flatFilteredEvents});

    flatFilteredEvents = new Backbone.Collection(flatFilteredEvents);

    var dateEvents = flatFilteredEvents.where({
      yearMonthDay: moment(self.state.date).format('YYYY-MM-DD')
    });

    self.refs.calendarDayEvents.setState({collection: dateEvents});
  },

  // createFilter: function(item) {
  //   return (
  //     <app.Filter name={item.name} />
  //   );
  // },

  render: function() {
    // var sources = new Backbone.Sources(this.props.sources);
    var sources = this.props.sources;

    if (!(sources instanceof Backbone.Collection)) {
      sources = new Backbone.Collection(this.props.sources);
    }
    // var sources = this.props.sources;
    console.log('sources: ', sources);

    if (sources.length === 1) {
      debugger;
    }

    var names = sources.pluck('name');

    var yearMonthDay = this.state.date.format('YYYY-MM-DD');

    var title = this.state.date.format('MMMM DD') + ' Events';

    // this.state.filters
    console.log('this.state.filters: ', this.state.filters);

    var filters = new Backbone.Collection(filters);

    return (
      <div className="container-fluid">
        <div className="row">
          <app.CalendarFilter filters={filters} sources={sources} filter={this.filter} />
        </div>

        <div className="row">
          <div className={this.props.classNameGrid}>
            <div className='calendar'>
              <app.CalendarControls date={this.state.date} onPrev={this.prev} onNext={this.next} />

              <app.CalendarGrid
                onGridSelect={this.onGridSelect}
                date={this.state.date}
                collection={this.props.collection}
                ref="calendarGrid" />
            </div>
          </div>

          <div className={this.props.classNameDayEvents}>
            <app.CalendarDayEvents title={title} collection={this.state.activeDayEvents} ref="calendarDayEvents" />
          </div>

          <div className={this.props.classNameEventList}>
            <app.CalendarEventList
              collection={this.props.collection}
              ref="calendarEventList" />
          </div>
        </div>
      </div>
    );
  }
});