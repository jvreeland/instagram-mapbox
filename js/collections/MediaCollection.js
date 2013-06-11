define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'models/Media',    // lib/backbone/backbone
], function($, _, Backbone, Media){
  var MediaCollection = Backbone.Collection.extend({
    url: this.url,
    model: Media,

    initialize: function(options) {
      if (options.lat) {
        this.lat = options.lat;
        this.long = options.long;
      } else {
        this.lat = 48.858844;
        this.long = 2.294351;
      }
      this.url = 'https://api.instagram.com/v1/media/search?&client_id=67322419d9834c8bbd889b2280d456db&lat=' + this.lat + '&lng=' + this.long + '&callback=?';
    },

    parse: function (data) {
      if ( _.isObject(data.data) ) {
        return data.data;
      } else {
        return data;
      }
    }
  });
  return MediaCollection;
});