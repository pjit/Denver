/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 1/29/14
 * Time: 8:19 PM
 * To change this template use File | Settings | File Templates.
 */

//
//
//
var DENVector = (function() {
    function createVector() {
        var vector = {};

        vector.x = vector.y = vector.z = 0;
        if (arguments.length === 3) {
            vector.x = arguments[0];
            vector.y = arguments[1];
            vector.z = arguments[2];
        }
        else if (arguments.length == 2) {
            vector.x = arguments[0];
            vector.y = arguments[1];
        }
        else if (arguments.length == 1) {
            vector.x = arguments[0];
        }
        else {
            // Nope. Already set to 0
        }

        vector.toString = function() {
            return "(" + vector.x + ", " + vector.y + ", " + vector.z + ")";
        };

        vector.invert = function() {
            vector.x = -vector.x;
            vector.y = -vector.y;
            vector.z = -vector.z;
        }

        return vector;
    }

    return {
        create : createVector,
        add : function() {
            if (arguments.length == 2) {
                var v = DENVector.create();

                v.x = (arguments[0].x || 0) + (arguments[1].x || 0);
                v.y = (arguments[0].y || 0) + (arguments[1].y || 0);
                v.z = (arguments[0].z || 0) + (arguments[1].z || 0);

                return v;
            }
        }
    };
}());
