/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 1/29/14
 * Time: 8:19 PM
 * To change this template use File | Settings | File Templates.
 */

//
// DENVector
//
// Constructor. Accepts x,y,z or an array of x,y,z i.e. [x,y,z]
//
//
function DENVector() {
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

//
//
//
DENVector.prototype.toString = function() {
  return "(" + this.x + ", " + this.y + ", " + this.z + ")";
}

//
// Init
//
DENVector.prototype.init = function() {
    this.x = this.y = this.z = 0;
}

//
// Invert
//
//
DENVector.prototype.invert = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
}

//
// Magnitude of the vector
//
DENVector.prototype.magnitude = function() {
    return Math.sqrt(this.squareMagnitude());
}

//
// sqrt is slow on some machines an sometimes we need square only
//
DENVector.prototype.squareMagnitude = function() {
    return (this.x*this.x + this.y*this.y + this.z*this.z);
}

//
//
//
DENVector.prototype.normalize = function() {
    var n = this.magnitude();

    if (n > 0) {
        this.x = this.x/n;
        this.y = this.y/n;
        this.z = this.z/n;
    }
}

//
// Multiply by scalar
//
DENVector.prototype.multiply = function() {
    if (arguments.length === 1) {
        this.x *= arguments[0];
        this.y *= arguments[0];
        this.z *= arguments[0];
    }
}

//
//
//
DENVector.prototype.add = function() {
    if (arguments.length == 1) {
        this.x += (arguments[0].x || 0);
        this.y += (arguments[0].y || 0);
        this.z += (arguments[0].z || 0);
    }
}

//
//
//
//
//
//
DENVector.prototype.scale = function() {
    this.multiply(arguments[0] || 1);
}

//
// Static methods
//

//
//
//
DENVector.add = function() {
    if (arguments.length == 2) {
        var v = new DENVector();

        v.x = (arguments[0].x || 0) + (arguments[1].x || 0);
        v.y = (arguments[0].y || 0) + (arguments[1].y || 0);
        v.z = (arguments[0].z || 0) + (arguments[1].z || 0);

        return v;
    }
}

//
//
// scalarProduct or dotProduct
//
//
DENVector.scalarProduct = function() {
    if (arguments.length == 2) {
        var result = (arguments[0].x || 0) * (arguments[1].x || 0) +
            (arguments[0].y || 0) * (arguments[1].y || 0) +
            (arguments[0].z || 0) * (arguments[1].z || 0);

        return result;
    }
}

//
// vector product or cross product
//
DENVector.vectorProduct = function() {
    if (arguments.length == 2) {
        var v = new DENVector();

        v.x = (arguments[0].y || 0) * (arguments[1].z || 0) -
            (arguments[0].z || 0) * (arguments[1].y || 0);

        v.y = (arguments[0].z || 0) * (arguments[1].x || 0) -
            (arguments[0].x || 0) * (arguments[1].z || 0);

        v.z = (arguments[0].x || 0) * (arguments[1].y || 0) -
            (arguments[0].y || 0) * (arguments[1].x || 0);

        return v;
    }
}

//
//
//
DENVector.normal = function() {
    if (arguments.length == 1) {
        var v = new DENVector(arguments[0].x || 0, arguments[0].y || 0, arguments[0].z || 0);

        v.normalize();

        return v;
    }
}

//
//
//
DENVector.scale = function() {
    if (arguments.length == 2) {
        var v = new DENVector(arguments[0].x || 0, arguments[0].y || 0, arguments[0].z || 0);
        var scaleFactor = arguments[1];

        v.multiply(scaleFactor);

        return v;
    }
}
