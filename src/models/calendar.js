// app namespace
var app = app || {};

Backbone.Calendar = Backbone.Model.extend({
  defaults: {
    params: {},
    entries: [],
    sources: new Backbone.Sources()
  },

  _getLocalSources: function() {
    return _.filter(this.get('sources'), function(item) {
      return _.isArray(item.events);
    });
  },

  _getRemoteSources: function() {
    return _.filter(this.get('sources'), function(item) {
      return !!(item.url || item.id || item.params);
    });
  },

  addLocalEventsAsEntries: function() {
    var sourcesLocal = this._getLocalSources();

    var entries = this.get('entries');

    if (!(entries instanceof Backbone.CalendarEvents)) {
      entries = new Backbone.CalendarEvents(entries);
    }

    entries.add(sourcesLocal);

    this.set('entries', entries);
  },

  initialize: function() {
    this.addLocalEventsAsEntries();

    // this.fetchRemoteEvents();

    /*

      to-do enable the user to change default params across all sources

      var params = this.get('params');

      _.each(sources, function(item) {
        item.params = _.extend(app.Source.defaults.params, params)
      });

    */
  },

  addSource: function(source) {
    var self = this;

    var deferred = source.fetch();

    deferred.done(function(promisedData) {
      var entries = _.map(promisedData.feed.entry, function(item) {
        return {
          author:       item.author[0].name,
          calendarName: source.get('name'),
          content:      item.content.$t,
          date:         item.gd$when[0].startTime,
          endTime:      item.gd$when[0].endTime,
          id           item.id.$t,
          link:         item.link[0].href,
          location:     item.gd$where[0].valueString,
          startTime:    item.gd$when[0].startTime,
          title:        item.title.$t,
          updated:      item.updated.$t
        };
      });

      source.set('entries', entries);

      self.get('entries').add(entries);
    });

    return deferred;
  },

  fetchSources: function(callback) {
    var self = this;

    var sources = this._getRemoteSources();

    var complete = sources.map(this.addSource, this);

    var deferred = $.Deferred(function(defer) {
      $.when.apply($, complete).done(function() {
        var entries = _.map(arguments, function(data) {
          return data[0].feed.entry || [];
        });

        defer.resolve(entries);
      });
    });

    return deferred;
  }
});