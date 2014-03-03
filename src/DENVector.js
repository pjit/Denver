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

   // Another vector
   if (arguments.length === 1) {
      if (x instanceof DENVector) {
         this.x = x.x;
         this.y = x.y;
         this.z = x.z;
      }
   }
}

//
// DENVector Prototype
//
DENVector.prototype = {
   toString : function() {
      'use strict';

      return "(" + this.x + ", " + this.y + ", " + this.z + ")";
   },
   // reset
   reset : function(x, y, z) {
      'use strict';

      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
   },
   // invert
   invert : function() {
      'use strict';

      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
   },
   // Magnitude of the vector
   magnitude : function() {
      'use strict';

      return Math.sqrt(this.squareMagnitude());
   },
   // sqrt is slow on some machines an sometimes we need square only
   squareMagnitude : function() {
      'use strict';

      return (this.x*this.x + this.y*this.y + this.z*this.z);
   },
   // normalize
   normalize : function() {
      'use strict';

      var n = this.magnitude();

      if (n > 0) {
         this.x = this.x/n;
         this.y = this.y/n;
         this.z = this.z/n;
      }
   },
   // Multiply by scalar
   multiply : function(scalarValue) {
      'use strict';

      var s = scalarValue || 1;

      this.x *= s;
      this.y *= s;
      this.z *= s;
   },
   // Add vector to a vector
   add : function(vector) {
      'use strict';

      this.x += vector.x;
      this.y += vector.y;
      this.z += vector.z;
   },
   // Scale a vector
   scale : function(scaleFactor) {
      'use strict';

      this.multiply(scaleFactor || 1);
   }
};

//
// Static methods
//

//
//
//
DENVector.add = function(v1, v2) {
   'use strict';

   return new DENVector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
};

//
//
// scalarProduct or dotProduct
//
//
DENVector.scalarProduct = function(v1, v2) {
   'use strict';

   return (v1.x  * v2.x + v1.y * v2.y + v1.z * v2.z);
};

//
// vector product or cross product
//
DENVector.vectorProduct = function(v1, v2) {
   'use strict';

   return new DENVector(
        v1.y * v2.z - v1.z * v2.y,
        v1.z * v2.x - v1.x * v2.z,
        v1.x * v2.y - v1.y * v2.x);
};

//
//
//
DENVector.normal = function(vector) {
   'use strict';

   var normalVec = new DENVector();

   normalVec.reset(vector.x, vector.y, vector.z);

   normalVec.normalize();

   return normalVec;
};

//
//
//
DENVector.scale = function(vector, scaleFactor) {
   'use strict';

   var scaledVec = new DENVector(),
       s = scaleFactor || 1;

    scaledVec.reset(vector.x, vector.y, vector.z);

    scaledVec.multiply(s);

    return scaledVec;
};

//
//
//
DENVector.subtract = function(vector1, vector2) {
  'use strict';

   return new DENVector(vector1.x - vector2.x,
                        vector1.y - vector2.y,
                        vector1.z - vector2.z);
};
