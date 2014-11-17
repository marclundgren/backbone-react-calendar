// Source.js
// --------
define(['backbone', 'underscore'],
  function(Backbone, _) {

    // Creates a new Backbone Model class object
    var Source = Backbone.Model.extend({
      defaults: {
        cache: true,
        dataType: 'jsonp',
        events: [],
        googleCalendarApiV: null,
        name: '',
        timeout: 0,
        url: '',
        visible: true
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
        return this.get('url');
      }
    });

    return Source;
  }
);