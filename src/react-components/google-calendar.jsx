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
        <app.Calendar
          sources={self.get('sources')}
          eventscollection={self.get('events')}
          collection={self.get('events')} />,
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

  entries: function() {
    var sources = this.getSources();

    return sources.pluck('entries');
  },

  entriesFlat: function() {
    return _.flatten(this.entries());
  },

  addSource: function(source) {
    var deferred = source.fetch();

    deferred.done(function(promisedData) {
      var entries = _.map(promisedData.feed.entry, function(item) {
        return {
          author:       item.author[0].name,
          content:      item.content.$t,
          calendarName: source.get('name'),
          date:         item.gd$when[0].startTime,
          endTime:      item.gd$when[0].endTime,
          id:           item.id.$t,
          link:         item.link[0].href,
          startTime:    item.gd$when[0].startTime,
          title:        item.title.$t,
          updated:      item.updated.$t,
          where:        item.gd$where[0].valueString
        };
      });

      source.set('entries', entries);
    });

    return deferred;
  },

  fetchSources: function(callback) {
    var self = this;

    var sources = this.getSources();

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
      self.set('events', new Backbone.GoogleEvents(self.entriesFlat()));
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