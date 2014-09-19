/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

// var SortableList = React.createClass({

// var Sort = React.createClass({

// });

var EventList = React.createClass({displayName: 'EventList',
  render: function() {
    console.log('this.props.sort: ', this.props.sort, this.props);
    return React.DOM.div(null);
  }
});

// React Component
// app.ReactEventListSortable = React.createClass({
//   render: function() {
//     return <Sort className="events-sort" ref="sortBy"/>
//   }
// });



// React Component
app.ReactMultiSelect = React.createClass({displayName: 'ReactMultiSelect',
  render: function() {
    console.log('multi select');
    return (
      React.DOM.select({multiple: true, value: ['B', 'C']}, 
        React.DOM.option({value: "A"}, "Apple"), 
        React.DOM.option({value: "B"}, "Banana"), 
        React.DOM.option({value: "C"}, "Cranberry")
      )
    );
  }
});

// React Component
app.ReactEventList = React.createClass({displayName: 'ReactEventList',
    mixins: [Backbone.React.Component.mixin],

    createEntry: function (entry) {
      console.log('entry: ', entry);
      return (
        React.DOM.div({className: "event"}, 
          React.DOM.h3({className: "title"}, 
            React.DOM.a({href: entry.get('href')}, entry.get('title'))
          ), 
          React.DOM.div({className: "startTime"}, 
            "starts: ", entry.get('startTime')
          ), 
          React.DOM.div({className: "endTime"}, 
            "ends: ", entry.get('endTime')
          ), 
          React.DOM.div({className: "entry-content"}, entry.get('content'))
        )
      );
    },

    getInitialState: function() {
      return {sortBy: 'date'};
    },

    onChange: function(e) {
      var sortBy = this.refs.sortBy.getDOMNode().value;

      this.setState({sortBy: sortBy});
    },

    render: function () {
      // console.log('this.props, this.state: ', this.props, this.state);

      // debugger;

      var collection = this.props.collection;
      // console.log('collection: ', collection);
      // console.log('collection instanceof app.GoogleEventList: ', collection instanceof app.GoogleEventList);
      // console.log('collection instanceof Backbone.Collection: ', collection instanceof Backbone.Collection);
      _collection = collection;

      // var sortKey = this.state.sortBy;
      // collection.sortByField(sortKey);

      collection = new app.GoogleEventList(collection);
      var events = collection.sortBy(this.state.sortBy);
      console.log('events: ', events);

      // collection.comparator = sortKey;

      // collection = collection.sort();
      // console.log('collection sorted by : ', sortKey, collection);

      return (
        React.DOM.div({className: "eventListContainer"}, 
          React.DOM.select({ref: "sortBy", value: this.state.sortBy, name: "sortby", onChange: this.onChange}, 
            React.DOM.option({value: "date"}, "Date"), 
            React.DOM.option({value: "title"}, "Title"), 
            React.DOM.option({value: "location"}, "Location")
          ), 
          React.DOM.h2({className: "events-title"}, "Events"), 
          React.DOM.div({className: "events-list"}, events.map(this.createEntry))
        )
      );
    }
});



Backbone.GoogleCalendar = Backbone.Model.extend({
  defaults: {
    events: new app.GoogleEventList(),
    // events: new Backbone.Collection(),
    sources: [],
    params: {}
  },

  // to-do
  // MAP_SOURCES: {},

  initialize: function() {
    var self = this;

    this.fetchSources().done(function(results) {
      var flatList = _.flatten(results);



      events = self.get('events');
      console.log('events: ', events);
      console.log('events instanceof app.GoogleEventList: ', events instanceof app.GoogleEventList);

      var testingList, testingGrid;
      testingList = true;
      testingGrid = false;

      if (testingList) {
        React.renderComponent(
          app.ReactEventList({collection: events}),
          $('#googleEventList').get([0])
        );
      }

    });
  },

  getSources: function() {
    var sources = this.get('sources');

    if (!(sources instanceof app.Sources)) {
      /*

      to-do enable the user to change default params across all sources

      var params = this.get('params');

      _.each(sources, function(item) {
        item.params = _.extend(app.Source.defaults.params, params)
      });
    */

      sources = new app.Sources(sources);

      this.set('sources', sources);
    }

    return sources;
  },

  addSource: function(source) {
    var deferred = source.fetch();

    deferred.done(function(promisedData) {
      console.log('dis');

      var entries = _.map(promisedData.feed.entry, function(item) {
        return {
          author:     item.author[0].name,
          content:    item.content.$t,
          date:       item.gd$when[0].startTime,
          endTime:    item.gd$when[0].endTime,
          id:         item.id.$t,
          link:       item.link[0].href,
          startTime:  item.gd$when[0].startTime,
          title:      item.title.$t,
          updated:    item.updated.$t,
          where:      item.gd$where[0].valueString
        };
      });

      // this.eventList = new app.GoogleEventList(entries);
      // console.log('this.eventList: ', this.eventList);

      // do something here
    });

    return deferred;
  },

  fetchSources: function(callback) {
    var self = this;

    var sources = this.getSources();
    _sources = sources;

    var complete = sources.map(this.addSource, this);

    var deferred = $.Deferred(function(defer) {
      $.when.apply($, complete).done(function() {
        var entries = _.map(arguments, function(data) {
          return data[0].feed.entry || [];
        });

        defer.resolve(entries);
      });
    });

    deferred.done(function(results) {
      // self._entries = results;
      // console.log('all done!: ', sources.size(), results);
      // sort these by Date, Title, Location

      var flatList = _.flatten(results);
      // self.set('events', flatList);
      // console.log('flatList: ', flatList, flatList.length);

      console.log(' or this');

      var entries = _.map(flatList, function(item) {
        return {
          author:     item.author[0].name,
          content:    item.content.$t,
          date:  item.gd$when[0].startTime,
          endTime:    item.gd$when[0].endTime,
          id:         item.id.$t,
          link:       item.link[0].href,
          startTime:  item.gd$when[0].startTime,
          title:      item.title.$t,
          updated:    item.updated.$t,
          location:      item.gd$where[0].valueString,
          where:      item.gd$where[0].valueString
        };
      });

      self.set('events', new app.GoogleEventList(entries));
    });

    return deferred;
  },

  extendURLOptions: function(obj) {
    if (obj.urlOptions) {
      var options = _.extend(obj.urlOptions || {}, this.get('urlOptions'));

      this.set('urlOptions', options);
    }
  },

  uri: function(id) {
    var urlOptions = this.get('urlOptions');

    var uri = urlOptions.url + urlOptions.urnHead + id + urlOptions.urnTail;

    return app.Util.addParams(uri, urlOptions.params);
  }
});

var params = {
  // 'max-results': '9999',
  alt: 'json-in-script',
  dataType: 'jsonp',
  futureevents: 'true',
  orderby: 'starttime',
  singleevents: 'true',
  sortorder: 'ascending'
};

var sources = [
  {name: 'Admissions', id: 'fidmwmo%40gmail.com', params: params},
  {name: 'On campus', id: '5mtlu2lndo671s83a87eojp7ks%40group.calendar.google.com', params: params},
  {name: 'College Fairs', id: 'h5db9jueqak0mq8teomdjie7jc%40group.calendar.google.com', params: params},
  {name: 'For Educators', id: 'qtr7ue6scgnc0noa9eb34ku220%40group.calendar.google.com', params: params}
];

new Backbone.GoogleCalendar({
  sources: sources,
  params: params // optional
});