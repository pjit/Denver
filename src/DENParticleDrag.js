/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/19/14
 * Time: 8:59 PM
 * To change this template use File | Settings | File Templates.
 */

//
//
//
function DENParticleDrag(k1, k2) {
   'use strict';

   // Holds the velocity drag coefficient
   this.k1 = k1 || 0;
   // Holds the velocity squared drag coefficient
   this.k2 = k2 || 0;
}

//
//
//
DENParticleDrag.prototype.updateForce = function(particle, duration) {
   'use strict';

   var velocity = new DENVector(particle.velocity);
   var velMag = velocity.magnitude();

   velMag = this.k1*velMag + this.k2*velMag*velMag;

   // Calculate the final force and apply it
   velocity.normalize();
   velocity.multiply(-velMag);
   particle.addForce(velocity);
};

//
//
//
DENParticleDrag.prototype.toString = function() {
   'use strict';

   return "Drag Force Coefficients: (" +
      this.k1.toString() +
      "," +
      this.k2.toString() + ")";
};

