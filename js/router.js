// Router is not being used

define([
  'jquery',
  'underscore',
  'backbone',
  'views/AppView'
], function($, _, Backbone, Session, ProjectListView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '/projects': 'showProjects',
      '/users': 'showUsers',

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    app_router.on('showProjects', function(){
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      var projectListView = new ProjectListView();
      debugger;
      projectListView.render();
    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});