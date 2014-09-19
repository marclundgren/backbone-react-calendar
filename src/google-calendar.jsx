/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

// data: Google CalendarEvents

var GoogleCalendar = React.createClass({
  render: function() {
    // todo
  }
});

// for now, assume Timed Event
var GoogleEvent = React.createClass({
  render: function() {
    // this.props:  Object {title: "A: Mexico vs Cameroon (1-0)", key: 1, children: Array[2]}

    return (
      <div className="event">
        <h3 className="title">
          <a href={this.props.href}>{this.props.title}</a>
        </h3>
        <div className="starts">
          starts: {this.props.start}
        </div>
        <div className="ends">
          ends: {this.props.end}
        </div>
      </div>
    );
  }
});

var GoogleCalendarFetcher = React.createClass({
  getDefaultProps: function() {
    return {
      alt: 'json-in-script',
      dataType: 'jsonp',
      futureevents: 'false',
      maxResults: '9999',
      orderby: 'starttime',
      singleevents: 'true',
      sortorder: 'ascending'
    };
  },

  getInitialState: function() {
    return {data: []};
  },

  loadDataFromServer: function() {
    var self = this;

    params = {
      alt: self.props.alt,
      futureevents: self.props.futureevents,
      maxResults: self.props.maxResults,
      orderby: self.props.orderby,
      singleevents: self.props.singleevents,
      sortorder: self.props.sortorder
    };

    var url = app.Util.addParams(self.props.url, params);

    $.when(
        $.ajax({
            cache: true,
            dataType: self.props.dataType,
            // FIDM
            url: app.Util.addParams('http://www.google.com/calendar/feeds/fidmwmo%40gmail.com/public/full', params)
        }),
        $.ajax({
            cache: true,
            dataType: self.props.dataType,
            // FIFA
            url: url
        })
    ).done(function() {

      function getEntries(result) {
        return result[0].feed.entry; // [{}, ..., {}]
      }

      return;
      // reduce
      var reduce = _.reduce(arguments, getEntries); console.log('reduce: ', reduce.length, reduce);

      // map
      var map = _.map(arguments, getEntries); console.log('map: ', map.length, map);

      // reduceRight
      var reduceRight = _.reduceRight(arguments, getEntries); console.log('reduceRight: ', reduceRight.length, reduceRight);
    });

    // $.ajax({
    //     cache: true,
    //     dataType: self.props.dataType,
    //     // FIDM
    //     url: app.Util.addParams('http://www.google.com/calendar/feeds/fidmwmo%40gmail.com/public/full', params)
    // }).done(function(fidmResultsSolo) {
    //   console.log('fidmResultsSolo: ', fidmResultsSolo);
    // });

    return;

    var allDeferred = [deferred];

    $.when(allDeferred).done(function(args) {
      var promisedValues = arguments;
      console.log('args: ', args);
      console.log('promisedValues: ', promisedValues);

      var entries = _.map(promisedValues, function(item) {
        console.log('item: ', item);
        return item.feed.entry;
      });

      self.setState({data: entries});
    });
  },

  componentDidMount: function() {
    this.loadDataFromServer();
  },

  render: function() {
    return <GoogleEventList data={this.state.data} />;
  }
});

var GoogleEventListControls = React.createClass({
  changeSortBy: function(val) {
    console.log('val: ', val);

    this.setState({sortBy: val}); // re-render
  },

  render: function() {
    var self = this;
    console.log('sanity');
    return (
      <label>
        Sort by:
        <input type="select" className='event-list-controls' onChange={self.changeSortBy}>
          <option value="date">date</option>
          <option value="location">location</option>
          <option value="title">title</option>
        </input>
      </label>
    );
  }
});

var GoogleEventList = React.createClass({
  getInitialState: function() {
    return {sortBy: 'date'};
  },

  render: function() {
    console.log('?');
    var dataNodes = this.props.data.map(function(data, index) {

      var title = data.title.$t;
      var start = String(Date.parse(data.gd$when[0].startTime));
      var end = String(Date.parse(data.gd$when[0].endTime));

      var startMoment = moment(data.gd$when[0].startTime);
      var endMoment = moment(data.gd$when[0].endTime);

      var startTime = startMoment.format('YYYY MMMM DD HH:MM');
      var endTime = endMoment.format('YYYY MMMM DD HH:MM');
      var date = startMoment.calendar();
      var content = data.content.$t;
      var href = data.link[0].href;

      return (
        <GoogleEvent content={content} date={date} endTime={endTime} href={href} key={index} startTime={startTime} title={title} />
      );
    });

      // location, title, date
      // console.log(this.state);

    return (
      <GoogleEventListControls sortBy={this.state.sortBy} />,

      <div className="eventList">
        {dataNodes}
      </div>
    );
  }
});

React.renderComponent(
  <GoogleCalendarFetcher
    feedId="vdmtdcektajkqjk51vvda4ni4k%40group.calendar.google.com"
    url="http://www.google.com/calendar/feeds/vdmtdcektajkqjk51vvda4ni4k%40group.calendar.google.com/public/full" />,
  document.getElementById('googleEventList')
);