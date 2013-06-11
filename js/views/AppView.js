

define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'views/MediaView',
], function($, _, Backbone, Bootstrap, MediaView){
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accessible in the global scope

    var AppView = Backbone.View.extend({
    el: $("#container"),
    template: _.template($('#item-template').html()),
    events: {
      'click #popover': 'showPopover'
    },

    initialize: function() {
      this.setupMap();
      this.render();
    },

    setupMap: function() {
      var view = this;
      var map = L.mapbox.map('map', 'examples.map-20v6611k').setView([33.03, -117], 10);
      //map.addControl(L.mapbox.geocoderControl('examples.map-vyofok3q'));
      map.markerLayer.on('ready', function() {
        this.eachLayer(function(marker) {
          marker.openPopup();
        });
      });

      map.on('click', function(e) {
        view.lat = e.latlng.lat;
        view.lng = e.latlng.lng;

        var slideshowContent = '';
        var popupContent =  '<div id="testing123"' + '" class="popup">' +
          '<div class="slideshow">' +
          slideshowContent +
          '</div>' +
          '</div>';

        var geoJson = {
          // this feature is in the GeoJSON format: see geojson.org
          // for the full specification
          type: 'Feature',
          geometry: {
            type: 'Point',
            // coordinates here are in longitude, latitude order because
            // x, y is the standard for GeoJSON and many formats
            coordinates: [view.lng, view.lat]
          },
          properties: {
            title: '',
            description:popupContent,
            // one can customize markers by adding simplestyle properties
            // http://mapbox.com/developers/simplestyle/
            'marker-size': 'large',
            'marker-color': '#f0a'
          }
        };
        map.markerLayer.clearLayers();
        map.markerLayer.setGeoJSON(geoJson);
        map.markerLayer.fireEvent('ready');

        view.renderPicturesView();
      });
    },

    renderPicturesView: function() {
      this.mediaView = new MediaView();
      this.mediaView.updateLocation(this.lat, this.lng);
    },

    render: function() {
      return this;
    }
  });

  return AppView;
});