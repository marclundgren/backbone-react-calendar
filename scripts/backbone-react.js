/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

var Sort = React.createClass({displayName: 'Sort',
  getInitialState: function() {
    return {selected: 'date'};
  },

  onChange: function(e) {
    this.setState({selected: e.target.value});
  },

  render: function() {
    var selected = this.state.selected;
    console.log('selected: ', selected);

    return (
      React.DOM.div(null, 
        React.DOM.select({value: this.state.selected, name: "sortby", onChange: this.onChange}, 
          React.DOM.option({value: "date"}, "Date"), 
          React.DOM.option({value: "title"}, "Title"), 
          React.DOM.option({value: "location"}, "Location")
        )
      )
    );
  }
});

// React Component
app.ReactEventList = React.createClass({displayName: 'ReactEventList',
    mixins: [Backbone.React.Component.mixin],

    createEntry: function (entry) {
      return (
        React.DOM.div({className: "event"}, 
          React.DOM.h3({className: "title"}, 
            React.DOM.a({href: entry.href}, entry.title)
          ), 
          React.DOM.div({className: "startTime"}, 
            "starts: ", entry.startTime
          ), 
          React.DOM.div({className: "endTime"}, 
            "ends: ", entry.endTime
          )
        )
      );
    },

    render: function () {
      return (
        React.DOM.div(null, 
          React.DOM.h2({className: "events-title"}, "Events"), 
          Sort({className: "events-sort"}), 
          React.DOM.div({className: "events-list"}, this.props.collection.map(this.createEntry))
        )
      );
    }
});



Backbone.GoogleCalendar = Backbone.Model.extend({
  defaults: {
    events: new Backbone.Collection(),
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

      React.renderComponent(
        app.ReactEventList({collection: events}),
        $('#googleEventList .eventList').get([0])
      );
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

      var entries = _.map(promisedData.feed.entry, function(item) {
        return {
          author:     item.author[0].name,
          content:    item.content.$t,
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

      var entries = _.map(flatList, function(item) {
        return {
          author:     item.author[0].name,
          content:    item.content.$t,
          endTime:    item.gd$when[0].endTime,
          id:         item.id.$t,
          link:       item.link[0].href,
          startTime:  item.gd$when[0].startTime,
          title:      item.title.$t,
          updated:    item.updated.$t,
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