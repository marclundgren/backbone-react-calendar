// Require.js Configurations
// -------------------------

require.config({

  // Sets the js folder as the base directory for all future relative paths
  baseUrl: "./js/app",

  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
  // probably a good idea to keep version numbers in the file names for updates checking
  paths: {

      // Core Libraries
      // --------------
      "backbone": "../libs/backbone",

      "fastclick": "../libs/fastclick/lib/fastclick",

      "showdown": "../libs/showdown/compressed/showdown",

      "jquery": "../libs/jquery",

      "moment": "../libs/moment/min/moment.min",

      "react": "../libs/react/react",

      "reactbackbone": "../libs/react.backbone/react.backbone",

      "underscore": "../libs/lodash",

      // Plugins
      // -------
      "backbone.validateAll": "../libs/plugins/Backbone.validateAll",

      "underscore.guid": "../libs/plugins/underscore.guid",

      "bootstrap": "../libs/plugins/bootstrap",

      "text": "../libs/plugins/text",

      "jasminejquery": "../libs/plugins/jasmine-jquery"

  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

      // Twitter Bootstrap jQuery plugins
      "bootstrap": ["jquery"],

      // Backbone.validateAll plugin that depends on Backbone
      "backbone.validateAll": ["backbone"],

      // Jasmine-jQuery plugin
      "jasminejquery": ["jquery"]

  }

});