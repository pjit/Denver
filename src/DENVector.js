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
    function _createVector() {
        vector = arguments[0];

        vector.x = vector.y = vector.z = 0;

        if (arguments.length == 2) {
            valArgs = arguments[1];
            if (valArgs.length === 3) {
                vector.x = valArgs[0];
                vector.y = valArgs[1];
                vector.z = valArgs[2];
            }
            else if (valArgs.length == 2) {
                vector.x = valArgs[0];
                vector.y = valArgs[1];
            }
            else if (valArgs.length == 1) {
                vector.x = valArgs[0];
            }
            else {
                // Nope. Already set to 0
            }




            vector.normalize = function() {
                var n = vector.magnitude();

                if (n > 0) {
                    vector.x = vector.x/n;
                    vector.y = vector.y/n;
                    vector.z = vector.z/n;
                }
            };
            // multiply by scalar
            vector.multiply = function() {
                if (arguments.length === 1) {
                    vector.x *= arguments[0];
                    vector.y *= arguments[0];
                    vector.z *= arguments[0];
                }
            };
        }
    }

    function Vector() {
        this.x = 0;
        this.y = 0;
        this.z = 0;

        // Process any arguments if passed
        if (arguments.length > 0) {
            if (arguments.length == 1) {
                if (Array.isArray(arguments[0])) {
                    var arrayArg = arguments[0];

                    if (arrayArg.length == 3) {
                        this.x = arrayArg[0];
                        this.y = arrayArg[1];
                        this.z = arrayArg[2];
                    }
                    else if (arrayArg.length == 2) {
                        this.x = arrayArg[0];
                        this.y = arrayArg[1];
                    }
                    else if (arrayArg.length == 1) {
                        this.x = arrayArg[0];
                    }
                }
            }
            else if (arguments.length == 3) {
                this.x = arguments[0];
                this.y = arguments[1];
                this.z = arguments[2];
            }
        }
    }
    // Instance methods
    Vector.prototype.toString = function() {
      return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    };
    // Init
    Vector.prototype.init = function() {
        this.x = this.y = this.z = 0;
    };
    // Invert
    Vector.prototype.invert = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    };
    // Magnitude of the vector
    Vector.prototype.magnitude = function() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    };

    // sqrt is slow on some machines an sometimes we need square only
    Vector.prototype.squareMagnitude = function() {
        return (this.x*this.x + this.y*this.y + this.z*this.z);
    };
    // Static methods
    Vector.add = function() {

    };

    return {Vector: Vector};

    return { // throw this
        vector : function vector() {
          // Call internal function to set it
          _createVector(this, arguments);
        },
        add : function() {
            if (arguments.length == 2) {
                var v = new DENVector.vector();

                v.x = (arguments[0].x || 0) + (arguments[1].x || 0);
                v.y = (arguments[0].y || 0) + (arguments[1].y || 0);
                v.z = (arguments[0].z || 0) + (arguments[1].z || 0);

                return v;
            }
        },
        // scalarProduct or dotProduct
        scalarProduct : function() {
            if (arguments.length == 2) {
                var result = (arguments[0].x || 0) * (arguments[1].x || 0) +
                             (arguments[0].y || 0) * (arguments[1].y || 0) +
                             (arguments[0].z || 0) * (arguments[1].z || 0);

                return result;
            }
        },

        // vector product or cross product
        vectorProduct : function() {
            if (arguments.length == 2) {
                var v = new DENVector.vector();

                v.x = (arguments[0].y || 0) * (arguments[1].z || 0) -
                      (arguments[0].z || 0) * (arguments[1].y || 0);

                v.y = (arguments[0].z || 0) * (arguments[1].x || 0) -
                      (arguments[0].x || 0) * (arguments[1].z || 0);

                v.z = (arguments[0].x || 0) * (arguments[1].y || 0) -
                      (arguments[0].y || 0) * (arguments[1].x || 0);

                return v;
            }
        },

        normal : function() {
            if (arguments.length == 1) {
                var v = new DENVector.vector(arguments[0].x || 0, arguments[0].y || 0, arguments[0].z || 0);

                v.normalize();

                return v;
            }
        },
        scale : function() {
            if (arguments.length == 2) {
                var v = new DENVector.vector(arguments[0].x || 0, arguments[0].y || 0, arguments[0].z || 0);
                var scaleFactor = arguments[1];

                v.multiply(scaleFactor);

                return v;
            }
        }
    };
}());
