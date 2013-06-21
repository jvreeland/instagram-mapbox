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
    VIEW_STATE: {
      NEW: 'new',
      LOADING: 'loading',
      LOADED: 'loaded'
    },

    initialize: function(options) {
      this.map = options.map;
      this.numberOfRequests = 0;
      this.renderViewState(this.VIEW_STATE.NEW);
    },

    addMediaLocation: function(geoJsonMarker) {
      this.marker = geoJsonMarker;
      this.mediaCollection = new MediaCollection({lat: geoJsonMarker.get('geometry').coordinates[1], long: geoJsonMarker.get('geometry').coordinates[0]});
      this.initializeData();
    },

    initializeData: function() {
      var view = this;
      view.renderViewState(this.VIEW_STATE.LOADING);
      this.mediaCollection.fetch().done(function(response) {
        if (response.meta.code == 400) {
          if (this.numberOfRequests > 10) {
            throw new Error('The instagram api is not responding');
          } else {
            this.numberOfRequests++;
            view.initializeData();
          }
        } else {
          var properties = view.marker.get('properties');
          properties.images = view.mediaCollection.toJSON();
          view.marker.set('properties', properties);
          view.renderViewState(view.VIEW_STATE.LOADED);
        }
      });
    },

    updateMediaLocation: function(geoJsonMarker) {
      this.marker = geoJsonMarker;
      this.renderViewState(this.VIEW_STATE.LOADED);
    },

    renderViewState: function(state) {
      $(this.el).empty();
      switch (state) {
        case this.VIEW_STATE.LOADING:
          $(this.el).append('Fetching images...');
          break;
        case this.VIEW_STATE.LOADED:
          if (this.marker.get('properties').images.length == 0) {
            $(this.el).append('No images for this location.  Try another location.')
          } else {
            $(this.el).append(this.template({mediaCollection: this.marker.get('properties').images}));
          }
          break;
        default:
          $(this.el).append('Select a location on the map to load images.');
      }
    }
  });

  return MediaView;
});