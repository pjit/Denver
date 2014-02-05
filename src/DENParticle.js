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
DENParticle.prototype.setProperty = function(propertyName, value) {
   if (value.length == 1) {
       if (Array.isArray(value[0])) {
           var arrayArg = value[0];

           if (arrayArg.length >= 3) {
               this[propertyName] = new DENVector(arrayArg[0], arrayArg[1], arrayArg[2]);
           }
           else if (arrayArg.length == 2) {
               this[propertyName] = new DENVector(arrayArg[0], arrayArg[1], 0);
           }
           else if (arrayArg.length == 1) {
               this[propertyName] = new DENVector(arrayArg[0], 0, 0);
           }
       }
       else {
           if (value[0].x) { // vector ??
               this[propertyName] = new DENVector(value[0].x, value[0].y, value[0].z);
           }
       }
   }
   else if (value.length == 3) {
       this[propertyName].x = value[0];
       this[propertyName].y = value[1];
       this[propertyName].z = value[2];
   }
}

//
//
//
DENParticle.prototype.setPosition = function() {
    this.setProperty("position", arguments);
}

//
//
//
DENParticle.prototype.setVelocity = function() {
    this.setProperty("velocity", arguments);
}

//
//
//
DENParticle.prototype.setAcceleration = function() {
    this.setProperty("acceleration", arguments);
}

//
//
//
DENParticle.prototype.setDamping = function(damp) {
    this.damping = damp;
}

//
//
//
DENParticle.prototype.setInverseMass = function(invMass) {
    this.inverseMass = invMass;
}

//
//
//
DENParticle.prototype.setMass = function(mass) {
    if (mass > 0) {
        this.inverseMass = 1/mass;
    }
}

//
// Adds the given force to the particle, to be applied at the next iteration only.
//
DENParticle.prototype.addForce = function() {
   if (arguments.length == 1) {
       if (arguments[0].x) {// vector ??
           this.forceAccum = new DENVector(this.forceAccum, arguments[0]);
       }
   }
}

//
//
//
DENParticle.prototype.toString = function() {
    return "position: " + this.position.toString()
        + " velocity: " + this.velocity.toString()
        + " acceleration: " + this.acceleration.toString()
        + " damping: " + this.damping.toString()
        + " inverseMass: " + this.inverseMass.toString()
        + " Accumulated force: " + this.forceAccum.toString();
}

//
// Integrates the particle forward in time by the given amount.
// This function uses a Newton-Euler integration method, which
// is a linear approximation of the correct integral. For this
// reason it may be inaccurate in some cases.
//
DENParticle.prototype.integrate = function() {
    if (arguments.length == 1) {
        var duration = arguments[0];

        if (Object.prototype.toString.call(duration).slice(8,-1).toLowerCase()
            === "number") {
            if (duration > 0) {
                var scaledVel = DENVector.scale(this.velocity, duration);

                // Update linear position
                this.position = DENVector.add(this.position, scaledVel);

                // Acceleration from the force
                var scaledAcc = DENVector.scale(this.forceAccum, this.inverseMass);
                var resultingAcc = DENVector.add(this.acceleration, scaledAcc);
                var acc = DENVector.scale(resultingAcc, duration);

                this.velocity = DENVector.add(this.velocity, acc);
                // Impose drag
                this.velocity = DENVector.scale(this.velocity, Math.pow(this.damping, duration));
                // Clear the forces
                this.clearAccumulator();
            }
        }
    }
}

//
// clear accumulated force
//
DENParticle.prototype.clearAccumulator = function() {
    this.forceAccum.init();
}


