/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

Backbone.GoogleCalendar = Backbone.Model.extend({
  defaults: {
    events: new Backbone.GoogleEvents(),
    sources: [],
    params: {}
  },

  // to-do
  // MAP_SOURCES: {},

  initialize: function() {
    var self = this;

    this.fetchSources().done(function(results) {
      // debugger;

      React.renderComponent(
        app.Calendar({
          sources: self.get('sources'), 
          eventscollection: self.get('events'), 
          collection: self.get('events')}),
        document.getElementById('calendar')
      );
    });
  },

  getSources: function() {
    var sources = this.get('sources');

    if (!(sources instanceof Backbone.Sources)) {
      /*

      to-do enable the user to change default params across all sources

      var params = this.get('params');

      _.each(sources, function(item) {
        item.params = _.extend(app.Source.defaults.params, params)
      });

    */

      sources = new Backbone.Sources(sources);
      console.log('sources: ', sources);

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

      // this.eventList = new Backbone.GoogleEvents(entries);
      // console.log('this.eventList: ', this.eventList);
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
          return data[0].feed || [];
        });

        defer.resolve(entries);
      });
    });

    deferred.done(function(results) {
      var flatList = _.flatten(results);

      var entries = _.map(flatList, function(item) {
        console.log('item: ', item);
        debugger;

        return {
          author:         item.entry.author[0].name,
          content:        item.entry.content.$t,
          calendarName:   item.title.$t,
          date:           item.entry.gd$when[0].startTime,
          endTime:        item.entry.gd$when[0].endTime,
          id:             item.entry.id.$t,
          link:           item.entry.link[0].href,
          startTime:      item.entry.gd$when[0].startTime,
          title:          item.entry.title.$t,
          updated:        item.entry.updated.$t,
          location:       item.entry.gd$where[0].valueString,
          where:          item.entry.gd$where[0].valueString
        };
      });

      self.set('events', new Backbone.GoogleEvents(entries));
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