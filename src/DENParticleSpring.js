//
//
//
function DENParticleSpring(particle, springConstant, restLength, bungee) {
   'use strict';

   // The particle at the other end of the spring
   this.otherParticle = particle || {};
   // Holds the spring constant
   this.springConstant = springConstant || 1;
   // Holds the rest length of the spring
   // or the length of the bungee at the point it begins to generate a force
   this.restLength = restLength || 0;
   // If this is bungee spring force, it is true otherwise false
   this.bungeeForce = bungee || false;
}

//
//
//
DENParticleSpring.prototype.updateForce = function(particle, duration) {
   'use strict';

   var force = DENVector.subtract(particle.position, this.otherParticle.position);
   var magnitude = force.magnitude();

   // Check if bungee is compressed
   if (this.bungeeForce === true) {
      if (magnitude <= this.restLength) return;
      // Calculate the mag of the force
      magnitude = this.springConstant*(this.restLength - magnitude);
   }
   else {
      magnitude = Math.abs(magnitude - this.restLength);
      magnitude = magnitude*this.springConstant;
   }
   // Calculate the final force and apply it
   force.normalize();
   force.multiply(-magnitude);
   particle.addForce(force);
};

//
//
//
DENParticleSpring.prototype.toString = function() {
   'use strict';

   return "Spring Constant: " +
      this.springConstant.toString() +
      " Rest Length: " +
      this.restLength.toString();
};

