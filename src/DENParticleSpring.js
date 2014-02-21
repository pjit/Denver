//
//
//
function DENParticleSpring(particle, springConstant, restLength) {
   'use strict';

   // The particle at the other end of the spring
   this.otherParticle = particle || {};
   // Holds the spring constant
   this.springConstant = springConstant || 1;
   // Holds the rest length of the spring
   this.restLength = restLength || 0;
}

//
//
//
DENParticleSpring.prototype.updateForce = function(particle, duration) {
   'use strict';

   var force = new DENVector(particle.position);

   // Add method in DENVector for this
   force.x = force.x - this.otherParticle.position.x;
   force.y = force.y - this.otherParticle.position.y;
   force.z = force.z - this.otherParticle.position.y;

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
DENParticleSpring.prototype.toString = function() {
   'use strict';

   return "Spring Constant: " +
      this.springConstant.toString() +
      " Rest Length: " +
      this.restLength.toString();
};

