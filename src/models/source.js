Backbone.Source = Backbone.Model.extend({
  defaults: {
    cache: true,
    dataType: 'jsonp',
    events: [],
    googleCalendarId: '',
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
      orderby: 'starttime',
      singleevents: 'true',
      'max-results': '9999',
      sortorder: 'ascending'
    }
  },

  sync: function(method, model, options) {
    // Lazy(obj).extend({ ... })

    options = _.extend(options, {
      cache: this.get('cache'),
      dataType: this.get('dataType'),
      timeout: this.get('timeout')
    });

    return Backbone.sync(method, model, options);
  },

  toggle: function() {
    this.set('visible', !this.get('visible'));

    return this;
  },

  url: function() {
    return this.uri();
  },

  uri: function() {
    var uri = this.get('urlBase') + this.get('urnHead') + this.get('googleCalendarId') + this.get('urnTail');

    return app.Util.addParams(uri, this.get('params'));
  }
});