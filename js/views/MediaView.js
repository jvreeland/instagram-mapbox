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
    events: {
      'click .icon-remove': 'iconRemove'
    },

    initialize: function(options) {
      this.marker = options.marker;
      this.map = options.map;
      this.mediaCollection = new MediaCollection([], {lat: 48.858844, long: 2.294351});
      this.numberOfRequests = 0;
    },

    iconRemove: function() {
      debugger;
    },

    initializeData: function() {
      var view = this;
//      $('.marker-description').append('Loading...');
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
      var properties = this.marker.get('properties');
      properties.images = this.mediaCollection.toJSON();

      this.marker.set('properties', properties);
      this.map.markerLayer.fireEvent('ready');

      var view = this;
      //this.$el.apppend(this.template({mediaCollection: this.mediaCollection.toJSON().slice(0,4)}));
      $('.marker-description').append(this.template({mediaCollection: this.mediaCollection.toJSON().slice(0,4)}));
      $('.icon-remove').on('click', function() {
        view.map.markerLayer.eachLayer(function(marker) {
          marker.closePopup();
        });
      });
    }
  });
  return MediaView;
});