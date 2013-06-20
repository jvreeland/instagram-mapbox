define([
  // These are path alias that we configured in our bootstrap
  'jquery',
  'underscore',
  'backbone',
  'models/Marker'
], function($, _, Backbone, Marker){
  var Markers = Backbone.Collection.extend({
    model: Marker,

    initialize: function(options) {
    }
  });
  return Markers;
});