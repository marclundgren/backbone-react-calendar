// Sources.js
// --------
define(['backbone', 'models/Source'],
  function(Backbone, Source) {

    var Sources = Backbone.Collection.extend({
      model: Source
    });

    return Sources;
  }
);
