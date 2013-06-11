define([
  //Path alias configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
  'collections/MediaCollection'
], function($, _, Backbone, MediaCollection){

  var MediaView = Backbone.View.extend({
    el: $("#media"),
    template: _.template($('#item-template').html()),

    initialize: function() {
      this.mediaCollection = new MediaCollection([], {lat: 48.858844, long: 2.294351});
      this.numberOfRequests = 0;
    },

    initializeData: function() {
      var view = this;
      this.mediaCollection.fetch().done(function(response) {
        if (response.meta.code == 400) {
          if (this.numberOfRequests > 10) {
            //TODO: Display an error
            return;
          } else {
            this.numberOfRequests++;
            view.initializeData();
          }
        } else {
          view.render();
        }
      });
    },

    updateLocation: function(lat, lng) {
      this.mediaCollection = new MediaCollection({lat: lat, long: lng});
      this.initializeData();
    },

    render: function() {
      $('.marker-description').append(this.template({mediaCollection: this.mediaCollection.toJSON().slice(0,4)}));
    }
  });
  return MediaView;
});