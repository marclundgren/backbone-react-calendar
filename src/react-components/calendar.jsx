/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

// consider: namespace Backbone to app.Backbone

// app.Calendar = React.createClass({
app.CalendarView = React.createBackboneClass({
  mixins : [Backbone.RouterMixin],

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
      collection: new Backbone.CalendarEvents(),
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

    // var googleCalendar = new Backbone.GoogleCalendar({
    //   params: this.props.params,
    //   sources: this.props.sources
    // });

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

    var dateEvents = collection.where({
      yearMonthDay: moment(this.state.date).format('YYYY-MM-DD')
    });

    this.refs.calendarDayEvents.setState({collection: dateEvents});
    this.refs.calendarEventList.setState({collection: collection});
    this.refs.calendarGrid.setState({collection: collection});

    this.setState({collection: collection});
  },

  onGridSelect: function(cell) {
    this.refs.calendarDayEvents.setState({collection: cell.props.events});

    this.setState({date: cell.props.date});
  },

  next: function() {
    this.setState({date: this.state.date.add(1, 'month')});
  },

  prev: function() {
    this.setState({date: this.state.date.subtract(1, 'month')});
  },

  filter: function(source) {
    var self = this;

    var filters = this.state.filters;

    if (!(filters instanceof Backbone.Collection)) {
      filters = new Backbone.Collection(filters);
    }

    var match = filters.where({name: source.get('name')});

    if (match.length) {
      filters.remove(match);
    }
    else {
      filters.add(source);
    }

    var filteredEvents = filters.map(function(item) {
      return self.state.collection.where({calendarName: item.get('name')})
    });

    var flatFilteredEvents = _.flatten(filteredEvents);

    flatFilteredEvents = new Backbone.Collection(flatFilteredEvents);

    // todo: speed up this operation (and similar procedures elsewhere) with the following algo

    // pluck the names from Filters

    // filter the collection
      // return true if names.find(item.name)

    // the filtered collection should be a flat list

    var dateEvents = flatFilteredEvents.where({
      yearMonthDay: moment(self.state.date).format('YYYY-MM-DD')
    });

    this.refs.calendarDayEvents.setState({collection: dateEvents});
    this.refs.calendarEventList.setState({collection: flatFilteredEvents});
    this.refs.calendarGrid.setState({collection: flatFilteredEvents});

    this.setState({filters: filters.toJSON()});
  },

  render: function() {
    var sources = this.props.sources;

    if (!(sources instanceof Backbone.Collection)) {
      sources = new Backbone.Collection(this.props.sources);
    }

    var names = sources.pluck('name');

    var yearMonthDay = this.state.date.format('YYYY-MM-DD');

    var title = this.state.date.format('MMMM DD') + ' Events';

    var filters = new Backbone.Collection(filters);

    return (
      <div className="container-fluid">
        <div className="row">
          <app.CalendarFilter ref="calendarFilter" filters={filters} sources={sources} filter={this.filter} />
        </div>

        <div className="row">
          <div className={this.props.classNameGrid}>
            <div className='calendar'>
              <app.CalendarControls date={this.state.date} onPrev={this.prev} onNext={this.next} />

              <app.CalendarGrid
                calendarFilter={this.refs.calendarFilter}
                onGridSelect={this.onGridSelect}
                date={this.state.date}
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