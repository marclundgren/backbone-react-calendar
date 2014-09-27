/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.GoogleCalendar = React.createClass({
  getDefaultProps: function() {
    return {
      params: {},
      sources: []
    };
  },

  render: function() {
    // todo: this.trasnferPropsTo (app.googleClaendar)
    return (
      <div className='google-calendar'>
        <app.Calendar params={this.props.params} sources={this.props.sources} />
      </div>
    );
  }
});

Backbone.GoogleCalendar = Backbone.Model.extend({
  defaults: {
    params: {},
    sources: new Backbone.Sources(),
    entries: new Backbone.GoogleEvents()
  },

  initialize: function() {
    var sources = this.get('sources');

    if (!(sources instanceof Backbone.Sources)) {
      sources = new Backbone.Sources(sources);

      this.set('sources', sources);
    }

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
      console.log('done! ', promisedData);
      var entries = _.map(promisedData.feed.entry, function(item) {
        return {
          author:       item.author[0].name,
          calendarName: source.get('name'),
          content:      item.content.$t,
          date:         item.gd$when[0].startTime,
          endTime:      item.gd$when[0].endTime,
          id:           item.id.$t,
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

    var complete = this.get('sources').map(this.addSource, this);

    var deferred = $.Deferred(function(defer) {
      $.when.apply($, complete).done(function() {
        var entries = _.map(arguments, function(data) {
          return data[0].feed.entry || [];
        });

        defer.resolve(entries);
      });
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