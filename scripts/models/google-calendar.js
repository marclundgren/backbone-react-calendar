// app namespace
var app = app || {};

// cache data during development
$.ajaxSetup({ cache: true });

app.GoogleCalendar = Backbone.Model.extend({
  defaults: {
    sources: []
  },

  MAP_SOURCES: {},

  initialize: function() {

    this.fetchSources();
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

      this.eventList = new app.GoogleEventList(entries);

      // do something here
    });

    return deferred;
  },

  fetchSources: function(callback) {
    var self = this;

    console.log('test');

    // var sources = this.getSources();
    var sources = this.get('sources');

    // var complete = _.invoke(sources, 'fetch');
    var complete = sources.map(this.addSource, this);

    var deferred = $.Deferred(function(defer) {
      $.when.apply($, complete).done(function() {
        var entries = _.map(arguments, function(status, index, collection) {
          console.log('arguments', arguments);
          // do something here
        });

        defer.resolve(entries);
      });
    });

    deferred.done(function(results) {
      self._entries = results;
      console.log('arguments: ', arguments);
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

// use the calendar Model to create an instance with 4 sources

var Source = Backbone.Model.extend({
  defaults: {
    cache: true,
    dataType: 'jsonp',
    id: '',
    name: '',
    timeout: 0,
    urlBase: 'http://www.google.com',
    urnHead: '/calendar/feeds/',
    urnTail: '/public/full',
    visible: true,

    params: {
      alt: 'json-in-script',
      dataType: 'jsonp',
      futureevents: 'true',
      'max-results': '9999',
      orderby: 'starttime',
      singleevents: 'true',
      sortorder: 'ascending'
    }
  },

  sync: function(method, model, options) {
    // http://iainjmitchell.com/blog/?p=777

    options = _.extend(options, {
      cache: this.get('cache'),
      dataType: this.get('dataType'),
      timeout: this.get('timeout')
    });

    return Backbone.sync(method, model, options);
  },

  toggle: function() {
    this.set('visible', !this.get('visible'));
  },

  url: function() {
    return this.uri();
  },

  uri: function() {
    var uri = this.get('urlBase') + this.get('urnHead') + this.get('id') + this.get('urnTail');

    return app.Util.addParams(uri, this.get('params'));
  }
});

var Sources = Backbone.Collection.extend({
  model: Source
});

// FIDM namespace
FIDM = {};

FIDM.sources = new Sources([
  {name: 'Admissions',    id: 'fidmwmo%40gmail.com'},
  {name: 'On campus',      id: '5mtlu2lndo671s83a87eojp7ks%40group.calendar.google.com'},
  {name: 'College Fairs',  id: 'h5db9jueqak0mq8teomdjie7jc%40group.calendar.google.com'},
  {name: 'For Educators',  id: 'qtr7ue6scgnc0noa9eb34ku220%40group.calendar.google.com'}
]);

FIDM.Calendar = new app.GoogleCalendar({
  sources: FIDM.sources
});