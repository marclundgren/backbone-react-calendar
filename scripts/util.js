// app namespace
var app = app || {};

app.Util = {
  addParams: function(url, params) {

    var paramsJoined = _.pairs(params).map(function(param) {
      return param.join('=');
    }).join('&');

    if (paramsJoined.length) {
      paramsJoined = '?' + paramsJoined;
    }

    return url + paramsJoined;
  },
  
  serialize: function(obj) {
      var urlParams = _.map(obj, function (val, key) {
          var value = (_.isObject(val)) ? JSON.stringify(val) : String(val);
          return String(key) + '=' + value;
      });
      return urlParams.join('&');
  }
};