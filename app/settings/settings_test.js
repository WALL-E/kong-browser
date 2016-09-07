'use strict';

describe('myApp.plugins module', function() {

  beforeEach(module('myApp.plugins'));

  describe('plugins controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var settingsCtrl = $controller('SettingsCtrl');
      expect(settingsCtrl).toBeDefined();
    }));

  });
});