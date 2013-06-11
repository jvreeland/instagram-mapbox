define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'bootstrap',
  'views/AppView'// Request router.js
], function($, _, Backbone, Router, Bootstrap, AppView){
  var initialize = function(){
//    Router.initialize();
    var appView = new AppView();
    appView.render();
  }

  return {
    initialize: initialize
  };
});