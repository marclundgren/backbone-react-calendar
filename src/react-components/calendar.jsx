/** @jsx React.DOM */

// app namespace
var app = app || {};

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
        <h3 className="title">
          <a href={item.get('link')}>{item.get('title')}</a>
        </h3>
        <div className="when">
          <div className="starts">
            Starts: {item.starts()}
          </div>
          <div className="duration">
            Duration: {item.duration()}
          </div>
        </div>
        <div className="where">
          Location: {item.get('where')}
        </div>

        <div className="content">
          Location: {item.get('content')}
        </div>
      </div>
    );
  },

  render: function() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        {this.state.collection.map(this.createEvent)}
      </div>
    );
  }
});

app.Calendar = React.createClass({
  getDefaultProps: function() {
    return {
      classNameGrid:      'col-xs-12 col-sm-6 col-md-4 col-lg-6',
      classNameDayEvents: 'col-xs-12 col-sm-6 col-md-4 col-lg-3',
      classNameEventList: 'col-xs-12 col-sm-12 col-md-4 col-lg-3',
      params: {},
      sources: []
    };
  },

  getInitialState: function() {
    return {
      activeDayEvents: new Backbone.Collection(),
      collection: new Backbone.GoogleEvents([]),
      date: moment(new Date())
    };
  },

  componentWillMount: function() {
    // leverage Moment
    this.setState({date: moment(this.state.date)});
  },

  componentDidMount: function() {
    var self = this;

    var googleCalendar = new Backbone.GoogleCalendar({
      params: this.props.params,
      sources: this.props.sources
    });

    googleCalendar.fetchSources().done(function(results) {
      var collection = googleCalendar.get('events');

      if (!(collection instanceof Backbone.GoogleEvents)) {
        collection = new Backbone.GoogleEvents(collection);
      }

      // 99% sure this is not needed...
      self.setState({collection: collection});

      self.refs.calendarGrid.setState({collection: collection});
      self.refs.calendarEventList.setState({collection: collection});

      var dateEvents = collection.where({
        yearMonthDay: moment(self.state.date).format('YYYY-MM-DD')
      });

      self.refs.calendarDayEvents.setState({collection: dateEvents});
    });
  },

  onGridSelect: function(cell) {
    this.setState({date: cell.props.date});

    this.refs.calendarDayEvents.setState({collection: cell.props.events});
  },

  onChange: function(event) {
    var self = this;

    var vals = $(event.currentTarget).val();

    var filteredEvents = vals.map(function(name) {
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

  next: function() {
    this.setState({date: this.state.date.add(1, 'month')});
  },

  prev: function() {
    this.setState({date: this.state.date.subtract(1, 'month')});
  },

  createOption: function(item) {
    return app.CalendarSourceOption({name: item.name});
  },

  render: function() {
    var sources = new Backbone.Collection(this.props.sources);

    var names = sources.pluck('name');

    var yearMonthDay = this.state.date.format('YYYY-MM-DD');

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="calendar-source-filter">
              <select multiple name="source-filter" id="calendarSourceFilter" onChange={this.onChange} defaultValue={names} >
                {this.props.sources.map(this.createOption)}
              </select>
            </div>
          </div>
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
            <app.CalendarDayEvents collection={this.state.activeDayEvents} ref="calendarDayEvents" />
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