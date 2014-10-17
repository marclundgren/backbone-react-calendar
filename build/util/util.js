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

  isString: function(obj) {
    return ((typeof obj).toLowerCase() === 'string');
  },

  isObject: function(obj) {
    return ((typeof obj).toLowerCase() === 'object');
  },

  serialize: function(obj) {
      var urlParams = _.map(obj, function (val, key) {
          var value = (this.isObject(val)) ? JSON.stringify(val) : String(val);
          return String(key) + '=' + value;
      });
      return urlParams.join('&');
  },

  uniqueId: function() {
    return Math.random().toString(36).substr(2);
  },

  // e.g. September 14, 2014 => 09-2014
  yearMonth: function(datetime) {
    return moment(datetime).format('YYYY-MM');
  }
};