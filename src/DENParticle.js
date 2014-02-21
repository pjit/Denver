/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/2/14
 * Time: 12:00 AM
 * To change this template use File | Settings | File Templates.
 */

//
//
//
function DENParticle() {
   'use strict';

    // Linear position,velocity of the particle in the world space
    // These two properties should not be changed directly - only through
    // integrator but acceleration can be set directly.
    this.position = new DENVector(0,0,0);
    this.velocity = new DENVector(0,0,0);
    // Acceleration of the particle. This value can be used to set acceleration due
    // to gravity (its primary use) or any other constant acceleration
    this.acceleration = new DENVector(0,-10,0);
    // Holds the amount of damping applied to linear motion. Dumping is required
    // to remove energy added through numerical instability in the integrator
    this.damping = 0.99;
    // Holds the inverse of the mass of the particle. It is more useful to hold
    // the inverse mass because integration is simpler and because in real-time
    // simulation i is more useful to have objects with infinite mass (immovable)
    // than zero mass (completely unstable in numerical simulation)
    // zero inverse mass = infinite mass  = immovable objects
    // zero mass = infinite inverse mass.
    this.inverseMass = 1;
    // Holds accumulated force to be applied at the next simulation iteration only.
    // This value is zeroed at each integration step.
    this.forceAccum = new DENVector(0,0,0);
}

//
//
//
DENParticle.prototype.setProperty = function(propertyName, v) {
   'use strict';

    this[propertyName].x = v.x;
    this[propertyName].y = v.y;
    this[propertyName].z = v.z;
};

//
//
//
DENParticle.createDENVector = function(x, y, z) {
   'use strict';

    // Try a vector first
   if (x instanceof DENVector) {
      return x;
   }

   return new DENVector(x || 0, y || 0, z || 0);
};

//
//
//
DENParticle.prototype.setPosition = function(x, y, z) {
   'use strict';

   this.setProperty("position", DENParticle.createDENVector(x, y, z));
};

//
//
//
DENParticle.prototype.setVelocity = function(x, y, z) {
   'use strict';

   this.setProperty("velocity", DENParticle.createDENVector(x, y, z));
};

//
//
//
DENParticle.prototype.setAcceleration = function(x, y, z) {
   'use strict';

   this.setProperty("acceleration", DENParticle.createDENVector(x, y, z));
};

//
//
//
DENParticle.prototype.setDamping = function(damp) {
   'use strict';

    this.damping = damp || 0.99;
};

//
//
//
DENParticle.prototype.setInverseMass = function(invMass) {
   'use strict';

   this.inverseMass = invMass || 1;
};

//
//
//
DENParticle.prototype.setMass = function(mass) {
   'use strict';

   var m = mass || 0;

    if (m > 0) {
        this.inverseMass = 1/m;
    }
};

//
//
//
DENParticle.prototype.getMass = function() {
   'use strict';

    if (this.inverseMass === 0) {
        return Math.MAX_VALUE;
    }

    return (1.0/this.inverseMass);
};

//
//
//
DENParticle.prototype.hasFiniteMass = function() {
   'use strict';

   return (this.inverseMass !== 0);
};

//
// Adds the given force to the particle, to be applied at the next iteration only.
//
DENParticle.prototype.addForce = function(force) {
   'use strict';

    this.forceAccum.add(force);
};

//
//
//
DENParticle.prototype.toString = function() {
   'use strict';

   return "position: " + this.position.toString() +
     " velocity: " + this.velocity.toString() +
     " acceleration: " + this.acceleration.toString() +
     " damping: " + this.damping.toString() +
     " inverseMass: " + this.inverseMass.toString() +
     " Accumulated force: " + this.forceAccum.toString();
};

//
// Integrates the particle forward in time by the given amount.
// This function uses a Newton-Euler integration method, which
// is a linear approximation of the correct integral. For this
// reason it may be inaccurate in some cases.
//
DENParticle.prototype.integrate = function(duration) {
   'use strict';

   if (this.inverseMass <= 0) {
      return;
   }
   if (duration === undefined || duration === null) {
      return;
   }
   if (duration < 0) {
      return;
   }

   var scaledVel = DENVector.scale(this.velocity, duration),
      // Acceleration from the force
      scaledAcc = DENVector.scale(this.forceAccum, this.inverseMass),
      resultingAcc = DENVector.add(this.acceleration, scaledAcc);

   // Update linear position
   this.position.add(scaledVel);
   this.velocity.add(DENVector.scale(resultingAcc, duration));
   // Impose drag
   this.velocity.scale(Math.pow(this.damping, duration));
   // Clear the forces
   this.clearAccumulator();
};

//
// clear accumulated force
//
DENParticle.prototype.clearAccumulator = function() {
   'use strict';

   this.forceAccum.reset();
};


