'use strict';

describe('myApp.plugin.key-auth module', function() {

  beforeEach(module('myApp.plugins'));

  describe('key-auth controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var settingsCtrl = $controller('keyAuthCtrl');
      expect(keyAuthCtrl).toBeDefined();
    }));

  });
});