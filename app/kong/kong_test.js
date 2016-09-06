'use strict';

describe('myApp.kong module', function() {

    beforeEach(module('myApp.kong'));

    describe('kong controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var kongCtrl = $controller('KongCtrl');
            expect(kongCtrl).toBeDefined();
        }));

    });
});