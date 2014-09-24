Backbone.Source = Backbone.Model.extend({
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

    params: function() {
      new Backbone.SourceParams([
        {alt: 'json-in-script'},
        {dataType: 'jsonp'},
        {futureevents: 'true'},
        {orderby: 'starttime'},
        {singleevents: 'true'},
        {sortorder: 'ascending'}
      ]);
    }
  },

  sync: function(method, model, options) {
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
    var uri = this.get('urlBase') + this.get('urnHead') + this.get('id') + this.get('urnTail');

    return app.Util.addParams(uri, this.get('params'));
  }
});