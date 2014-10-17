Backbone.SourceParams = Backbone.Collection.extend({
  model: Backbone.SourceParam,

  getURIParams: function() {
    // todo: utilize app.Util.serialize()

    /*
    var colorCodes = {
      red: "#f00",
      green: "#0f0",
      blue: "#00f"
    };

    Lazy(colorCodes).pairs() // sequence: [["red", "#f00"], ["green", "#0f0"], ["blue", "#00f"]]
    */

    // var uriParams = Lazy(this.toJSON()).pairs().map(function(param) {
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
    // Lazy({ foo: "bar" }).extend({ foo: "baz" }).get("foo")   // => "baz"

    params = _.extend(this.get('params'), params);

    this.set('params', params);

    return this;
  }
});