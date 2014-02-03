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
var DENParticle = (function() {
   function createParticle() {
       var particle = {};

       // Linear position,velocity of the particle in the world space
       // These two properties should not be changed directly - only through
       // integrator but acceleration can be set directly.
       particle.position = DENVector.create(0,0,0);
       particle.velocity = DENVector.create(0,0,0);
       // Acceleration of the particle. This value can be used to set acceleration due
       // to gravity (its primary use) or any other constant acceleration
       particle.acceleration = DENVector.create(0,0,0);
       // Holds the amount of damping applied to linear motion. Dumping is required
       // to remove energy added through numerical instability in the integrator
       particle.damping = 0;
       // Holds the inverse of the mass of the particle. It is more useful to hold
       // the inverse mass because integration is simpler and because in real-time
       // simulation i is more useful to have objects with infinite mass (immovable)
       // than zero mass (completely unstable in numerical simulation)
       // zero inverse mass = infinite mass  = immovable objects
       // zero mass = infinite inverse mass.
       particle.inverseMass = 0;
       // Holds accumulated force to be applied at the next simulation iteration only.
       // This value is zeroed at each integration step.
       particle.forceAccum = DENVector.create(0,0,0);

       particle.setProperty = function(propertyName, value) {
           if (value.length == 1) {
               if (Array.isArray(value[0])) {
                   var arrayArg = value[0];

                   if (arrayArg.length >= 3) {
                       particle[propertyName] = DENVector.create(arrayArg[0], arrayArg[1], arrayArg[2]);
                   }
                   else if (arrayArg.length == 2) {
                       particle[propertyName] = DENVector.create(arrayArg[0], arrayArg[1], 0);
                   }
                   else if (arrayArg.length == 1) {
                       particle[propertyName] = DENVector.create(arrayArg[0], 0, 0);
                   }
               }
               else {
                   if (value[0].x) { // vector ??
                       particle[propertyName] = DENVector.create(value[0].x, value[0].y, value[0].z);
                   }
               }
           }
           else if (value.length == 3) {
               particle[propertyName].x = value[0];
               particle[propertyName].y = value[1];
               particle[propertyName].z = value[2];
           }
       };

       particle.setPosition = function() {
            particle.setProperty("position", arguments);
       };
       //
       particle.setVelocity = function() {
           particle.setProperty("velocity", arguments);
       };
       particle.setAcceleration = function() {
           particle.setProperty("acceleration", arguments);
       };
       particle.setDamping = function(damp) {
            particle.damping = damp;
       };
       particle.setInverseMass = function(invMass) {
            particle.inverseMass = invMass;
       };
       particle.setMass = function(mass) {
            if (mass > 0) {
                particle.inverseMass = 1/mass;
            }
       };
       particle.toString = function() {
            return "position: " + particle.position.toString() + " velocity: " + particle.velocity.toString()
                + " acceleration: " + particle.acceleration.toString()
                + " damping: " + particle.damping.toString()
                + " inverseMass: " + particle.inverseMass.toString();
       };
       // Integrates the particle forward in time by the given amount.
       // This function uses a Newton-Euler integration method, which
       // is a linear approximation of the correct integral. For this
       // reason it may be inaccurate in some cases.
       particle.integrate = function() {
            if (arguments.length == 1) {
                var duration = arguments[0];

                if (Object.prototype.toString.call(duration).slice(8,-1).toLowerCase()
                    === "number") {
                    if (duration > 0) {
                        var scaledVel = DENVector.scale(particle.velocity, duration);

                        // Update linear position
                        particle.position = DENVector.add(particle.position, scaledVel);

                        // Acceleration from the force
                        var scaledAcc = DENVector.scale(particle.forceAccum, particle.inverseMass);
                        var resultingAcc = DENVector.add(particle.acceleration, scaledAcc);
                        var acc = DENVector.scale(resultingAcc, duration);

                        particle.velocity = DENVector.add(particle.velocity, acc);
                        // Impose drag
                        particle.velocity = DENVector.scale(particle.velocity,
                            Math.pow(particle.damping, duration));
                    }
                }
            }
       };
       return particle;
   }

   return {
       create : createParticle
   };
}());