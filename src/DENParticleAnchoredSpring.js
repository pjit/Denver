/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/20/14
 * Time: 8:01 PM
 * To change this template use File | Settings | File Templates.
 */

//
// A force generator that applies a spring force, where
// one end is attached to a fixed point in space.
//
//
function DENParticleAnchoredSpring(anchorLocation, springConstant, restLength) {
   'use strict';

   // The location of the anchored end of the spring
   this.anchorLocation = new DENVector(anchorLocation.x, anchorLocation.y,
      anchorLocation.z);
   // Holds the spring constant
   this.springConstant = springConstant || 1;
   // Holds the rest length of the spring
   this.restLength = restLength || 0;
}

//
//
// Applies the spring force to the given particle.
//
DENParticleAnchoredSpring.prototype.updateForce = function(particle, duration) {
   'use strict';

   var force = new DENVector(particle.position);

   // Add method in DENVector for this
   force.x = force.x - this.anchorLocation.x;
   force.y = force.y - this.anchorLocation.y;
   force.z = force.z - this.anchorLocation.z;

   var magnitude = force.magnitude();

   magnitude = Math.abs(magnitude - this.restLength);
   magnitude = magnitude*this.springConstant;
   // Calculate the final force and apply it
   force.normalize();
   force.multiply(-magnitude);
   particle.addForce(force);
};

//
//
//
DENParticleAnchoredSpring.prototype.toString = function() {
   'use strict';

   return "Anchor Location: " + this.anchorLocation.toString() +
      "Spring Constant: " +
      this.springConstant.toString() +
      " Rest Length: " +
      this.restLength.toString();
};

