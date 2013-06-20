

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'models/Marker',
  'collections/Markers',
  'views/MediaView'
], function($, _, Backbone, Bootstrap, Marker, Markers, MediaView){
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accessible in the global scope

    var AppView = Backbone.View.extend({
    el: $("#container"),
    template: _.template($('#item-template').html()),

    initialize: function() {
      this.setupMap();
      this.markers = new Markers();
    },

    setupMap: function() {
      var view = this;
      this.map = L.mapbox.map('map', 'examples.map-20v6611k').setView([33.03, -117], 10);

      this.map.markerLayer.on('ready', function() {
        this.eachLayer(function(marker) {
          marker.openPopup();
        });
      });

      this.map.markerLayer.on('click', function() {
        debugger;

      });

      this.map.on('click', function(e) {
        view.lat = e.latlng.lat;
        view.lng = e.latlng.lng;
        view.geoJsonMarker = new Marker({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [view.lng, view.lat]
          },
          properties: {
            title: '',
            description:'<div class="popup"><div class="icon-remove"></div></div>',
            // one can customize markers by adding simplestyle properties
            // http://mapbox.com/developers/simplestyle/
            'marker-size': 'large',
            'marker-color': '#f0a'
          }
        });
        //map.markerLayer.clearLayers();
        view.map.markerLayer.setGeoJSON(view.geoJsonMarker.toJSON());
//        view.map.markerLayer.fireEvent('ready');
//        $('.icon-remove').on('click',function(e) {
//          this.map.markerLayer.clearLayers();
//        });
        view.renderPicturesView();
        //TODO: Add the marker to the collection
        //TODO: add click handler to load the images in marker description
      });
    },

    renderPicturesView: function() {
      this.mediaView = new MediaView({map: this.map, marker: this.geoJsonMarker});
      this.mediaView.updateLocation(this.lat, this.lng);
    }
  });

  return AppView;
});