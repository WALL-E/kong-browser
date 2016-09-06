'use strict';

describe('myApp.kong module', function() {

    beforeEach(module('myApp.apis'));

    describe('apis controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var apisCtrl = $controller('ApisCtrl');
            expect(apisCtrl).toBeDefined();
        }));

    });
});