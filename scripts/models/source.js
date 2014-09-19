// app namespace
var app = app || {};

// cache data during development
$.ajaxSetup({ cache: true });

var Param = Backbone.Model.extend();
var Params = Backbone.Collection.extend({
  model: Param,

  getURIParams: function() {
    debugger;
    var uriParams = _.pairs(this.toJSON()).map(function(param) {
      console.log('param: ', param);
      var json = param.toJSON();

      // return param.join('=');
      return json.join('=');
    }).join('&');

    if (uriParams.length) {
      uriParams = '?' + uriParams;
    }

    return uriParams;
  },

  getParam: function(key) {

  },

  addParams: function(params) {
    params = _.extend(this.get('params'), params);

    this.set('params', params);

    return this;
  }
});

app.Source = Backbone.Model.extend({
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
      new Params([
        {alt: 'json-in-script'},
        {dataType: 'jsonp'},
        {futureevents: 'true'},
        {orderby: 'starttime'},
        {singleevents: 'true'},
        {sortorder: 'ascending'}
      ]);
    },
    __params: {
      alt: 'json-in-script',
      dataType: 'jsonp',
      futureevents: 'true',
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