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
function DENVector(x, y, z) {
   'use strict';

   this.x = x || 0;
   this.y = y || 0;
   this.z = z || 0;

   // Array or another vector
   if (arguments.length === 1) {
      if (Array.isArray(x)) {
         var arrayArg = x;

         if (arrayArg.length === 3) {
            this.x = arrayArg[0];
            this.y = arrayArg[1];
            this.z = arrayArg[2];
         }
         else if (arrayArg.length === 2) {
            this.x = arrayArg[0];
            this.y = arrayArg[1];
         }
         else if (arrayArg.length === 1) {
            this.x = arrayArg[0];
         }
      }
      else {
         if (x instanceof DENVector) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
         }
      }
   }
}

//
//
//
DENVector.prototype.toString = function() {
   'use strict';

   return "(" + this.x + ", " + this.y + ", " + this.z + ")";
};

//
// reset
//
DENVector.prototype.reset = function(x, y, z) {
   'use strict';

   this.x = x || 0;
   this.y = y || 0;
   this.z = z || 0;
};

//
// Invert
//
//
DENVector.prototype.invert = function() {
   'use strict';

   this.x = -this.x;
   this.y = -this.y;
   this.z = -this.z;
};

//
// Magnitude of the vector
//
DENVector.prototype.magnitude = function() {
   'use strict';

    return Math.sqrt(this.squareMagnitude());
};

//
// sqrt is slow on some machines an sometimes we need square only
//
DENVector.prototype.squareMagnitude = function() {
   'use strict';

   return (this.x*this.x + this.y*this.y + this.z*this.z);
};

//
//
//
DENVector.prototype.normalize = function() {
   'use strict';

   var n = this.magnitude();

   if (n > 0) {
     this.x = this.x/n;
     this.y = this.y/n;
     this.z = this.z/n;
   }
};

//
// Multiply by scalar
//
DENVector.prototype.multiply = function(scalarValue) {
   'use strict';

   var s = scalarValue || 1;

   this.x *= s;
   this.y *= s;
   this.z *= s;
};

//
//
//
DENVector.prototype.add = function(vector) {
   'use strict';

   var v = vector || {};

   if (v instanceof DENVector) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
   }
};

//
//
//
//
//
//
DENVector.prototype.scale = function(scaleFactor) {
   'use strict';

   this.multiply(scaleFactor || 1);
};

//
// Static methods
//

//
//
//
DENVector.add = function(vector1, vector2) {
   'use strict';

   var v1 = vector1 || {},
       v2 = vector2 || {},
       v = new DENVector();

   if (v1 instanceof  DENVector && v2 instanceof  DENVector) {
      v.x = v1.x + v2.x;
      v.y = v1.y + v2.y;
      v.z = v1.z + v2.z;

      return v;
   }
};

//
//
// scalarProduct or dotProduct
//
//
DENVector.scalarProduct = function(vector1, vector2) {
   'use strict';

   var v1 = vector1 || {},
       v2 = vector2 || {};

   if (v1 instanceof  DENVector && v2 instanceof  DENVector) {
        return (v1.x  * v2.x + v1.y * v2.y + v1.z * v2.z);
    }
};

//
// vector product or cross product
//
DENVector.vectorProduct = function(vector1, vector2) {
   'use strict';

   var v1 = vector1 || {},
       v2 = vector2 || {},
       v = new DENVector();

   if (v1 instanceof  DENVector && v2 instanceof  DENVector) {
        v.x = v1.y * v2.z - v1.z * v2.y;
        v.y = v1.z * v2.x - v1.x * v2.z;
        v.z = v1.x * v2.y - v1.y * v2.x;

        return v;
    }
};

//
//
//
DENVector.normal = function(vector) {
   'use strict';

   var v = vector || {},
      normalVec = new DENVector();

   if (v instanceof DENVector) {
      normalVec.reset(v.x, v.y, v.z);

      normalVec.normalize();

      return normalVec;
   }
};

//
//
//
DENVector.scale = function(vector, scaleFactor) {
   'use strict';

   var v = vector || {},
       scaledVec = new DENVector(),
       s = scaleFactor || 1;

    if (v instanceof  DENVector) {
       scaledVec.reset(v.x, v.y, v.z);

       v.multiply(s);

       return v;
    }
};
