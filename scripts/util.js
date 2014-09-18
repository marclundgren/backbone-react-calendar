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
  }
};