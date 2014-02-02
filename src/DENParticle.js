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
       particle.position = DENVector.create(0,0,0);
       particle.velocity = DENVector.create(0,0,0);
       // Acceleration of the particle. This value can be used to set acceleration due
       // to gravity (its primary use) or any other constant acceleration
       particle.acceleration = DENVector.create(0,0,0);

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

       particle.toString = function() {
            return "position: " + particle.position.toString() + " velocity: " + particle.velocity.toString()
                + " acceleration: " + particle.acceleration.toString();
       };

       return particle;
   }

   return {
       create : createParticle
   };
}());