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
        registrations.find
       },
       // Clears all registrations from the registry.
       clear : function() {
        registrations.clear();
       },
       // Calls all the force generators to update the forces of their
       // corresponding particles.
       updateForces : function(duration) {

       }
    };
}());