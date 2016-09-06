'use strict';

describe('myApp.kong module', function() {

    beforeEach(module('myApp.consumers'));

    describe('consumers controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var consumersCtrl = $controller('ConsumersCtrl');
            expect(consumersCtrl).toBeDefined();
        }));

    });
});