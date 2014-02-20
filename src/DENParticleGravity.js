/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/17/14
 * Time: 8:53 PM
 * To change this template use File | Settings | File Templates.
 */

//
//
//
function DENParticleGravity(x, y, z) {
   'use strict';

   // Holds the acceleration due to gravity.
   this.gravity = new DENVector(0,-10,0);
   // Process any arguments if passed
   if (arguments.length === 1) {
      if (Array.isArray(x)) {
         var arrayArg = x;

         if (arrayArg.length === 3) {
            this.gravity.x = x[0];
            this.gravity.y = x[1];
            this.gravity.z = x[2];
         }
         else if (arrayArg.length === 2) {
            this.gravity.x = x[0];
            this.gravity.y = x[1];
         }
         else if (arrayArg.length === 1) {
            this.gravity.x = x[0];
         }
      }
      else {
         if (x instanceof DENVector) {
            this.gravity.x = x.x;
            this.gravity.y = x.y;
            this.gravity.z = x.z;
         }
      }
   }
   else if (arguments.length === 3) {
      this.gravity.x = x;
      this.gravity.y = y;
      this.gravity.z = z;
   }
}

//
//
//
DENParticleGravity.prototype.updateForce = function(particle, duration) {
   'use strict';

   var p = particle || {},
      newForce = {};

   if (p instanceof DENParticle) {
      if (p.hasFiniteMass()) {
         newForce = DENVector.scale(this.gravity, p.getMass());

         p.addForce(newForce);
      }
   }
};

//
//
//
DENParticleGravity.prototype.toString = function() {
   'use strict';

   return "Gravity Vector: " + this.gravity.toString();
};

