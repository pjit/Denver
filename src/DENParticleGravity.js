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
   this.gravity = new DENVector(x || 0, y || -10, z || 0);
}

//
//
//
DENParticleGravity.prototype.updateForce = function(particle, duration) {
   'use strict';

   var newForce = {};

   if (particle.hasFiniteMass()) {
      newForce = DENVector.scale(this.gravity, particle.getMass());

      particle.addForce(newForce);
   }
};

//
//
//
DENParticleGravity.prototype.toString = function() {
   'use strict';

   return "Gravity Vector: " + this.gravity.toString();
};

