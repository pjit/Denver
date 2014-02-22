/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/17/14
 * Time: 12:09 AM
 * To change this template use File | Settings | File Templates.
 */


//
// DENParticleForceRegistry module
//

var DENParticleForceRegistry = (function() {
   "use strict";

   // Keeps track of one force generator and the particle it
    // applies to.
    var registrations = [];

    return {
       // Registers the given force generator to apply to the
       // given particle
       add : function(particle, forcegenerator) {
           registrations.push({Particle : particle, ForceGenerator : forcegenerator});
       },
       // Removes the given registered pair from the registry.
       remove : function(particle, forcegenerator) {
           for (var i = 0; i < registrations.length; ++i) {
              var particleForceObj = registrations[i];

              if (particleForceObj.ForceGenerator == forcegenerator &&
                  particleForceObj.Particle == particle) {
                  registrations.splice(i, 1);
                  break;
              }
           }
       },
       // Clears all registrations from the registry.
       clear : function() {
            registrations.length = 0;
       },
       // Calls all the force generators to update the forces of their
       // corresponding particles.
       updateForces : function(duration) {
            var d = duration || 1;

            registrations.forEach(function(particleForceObj) {
                particleForceObj.ForceGenerator.updateForce(particleForceObj.Particle, d);
            });
       },
       // Added for testing only
       getRegistrationCount : function() {
           return registrations.length;
       }
    };
}());