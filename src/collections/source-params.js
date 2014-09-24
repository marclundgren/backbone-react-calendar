// cache data during development
$.ajaxSetup({ cache: true });

Backbone.SourceParams = Backbone.Collection.extend({
  model: Backbone.SourceParam,

  getURIParams: function() {
    // todo: utilize app.Util.serialize()

    var uriParams = _.pairs(this.toJSON()).map(function(param) {
      var json = param.toJSON();

      return json.join('=');
    }).join('&');

    if (uriParams.length) {
      uriParams = '?' + uriParams;
    }

    return uriParams;
  },

  /*
  getParam: function(key) {
    // todo
  },
  */

  addParams: function(params) {
    params = _.extend(this.get('params'), params);

    this.set('params', params);

    return this;
  }
});