require.config({
  paths: {
    jquery: 'libs/jquery-1.9.1.min',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    bootstrap: 'libs/bootstrap'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    bootstrap: {
      deps: ["jquery"]
    }
  }
});

require([

  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});