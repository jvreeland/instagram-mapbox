

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
      this.initializeMap();
      this.markerCollection = new Markers();
    },

    initializeMap: function() {
      this.map = L.mapbox.map('map', 'examples.map-y7l23tes').setView([33.03, -117], 10);
      this.map.addControl(L.mapbox.geocoderControl('examples.map-vyofok3q'));
      this.mediaView = new MediaView({map: this.map});
      this.initializeMapEvents();
    },

    initializeMapEvents: function() {
      var view = this;
      this.map.on('click', function(e) {
        view.lat = e.latlng.lat;
        view.lng = e.latlng.lng;
        var geoJsonMarker = new Marker({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [view.lng, view.lat]
          },
          properties: {
            'marker-size': 'large',
            'marker-color': '#f0a'
          }
        });

        view.markerCollection.add(geoJsonMarker);
        view.mediaView.addMediaLocation(geoJsonMarker);
        var myStyle = {
          "color": "#ff7800",
          "weight": 5,
          "opacity": 0.65
        };
        L.geoJson(geoJsonMarker.toJSON(), {
          style: myStyle,
          onEachFeature: onEachFeature
        }).addTo(view.map);

        function onEachFeature(feature, layer) {
          layer.on('click', function (e) {
            view.markerCollection.each(function(model) {
               if (model.get('geometry').coordinates == feature.geometry.coordinates) {
                 view.mediaView.updateMediaLocation(model);
                 return;
               }
            });
          });
        }
      });
    },

    updateMediaLocation: function(geoJsonMarker) {
      if (!this.mediaView) {
        throw new Error('Media view not initialized')
      } else if (!geoJsonMarker) {
        throw new Error ('Need a marker')
      } else {
        this.mediaView.updateLocation(geoJsonMarker);
      }
    }
  });

  return AppView;
});