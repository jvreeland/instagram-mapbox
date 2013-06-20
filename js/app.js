define(function(require, exports, module) {
    var $ = require('jquery'),
      _ = require('underscore'),
      Backbone = require('backbone'),
      Bootstrap = require('bootstrap'),
      AppView = require('views/AppView');

    var initialize = function(){
      var appView = new AppView();
      appView.render();
    }

    return {
      initialize: initialize
    };
  }
);