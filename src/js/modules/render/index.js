// Server-side render helper

'use strict';

module.exports = function (Module, App, Backbone) {

  if (App.isPhantom) {

    // Call PhantomJS when the view is rendered.
    App.Content.on('show', function (view) {

      var payload = {
        type: 'loadFinished',
        path: Backbone.history.getFragment()
      };

      // Wait on views that delay loading of their collection.
      if (view.collection && !view.collection.length) {
        view.on('app:rendered', function () {
          window.callPhantom(payload);
        });
      } else {
        window.callPhantom(payload);
      }

    });

  }

};
