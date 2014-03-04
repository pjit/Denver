/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/22/14
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

//
// Applies a buoyancy force for a plane of liquid parallel to XZ plane.
//
function DENParticleBuoyancy(maxDepth, volume, waterHeight, liquidDensity) {
   'use strict';

   // The maximum submersion depth of the object before it generates its max buoyancy force
   this.maxDepth = maxDepth || 0;
   // The volume of the object
   this.volume = volume || 0;
   // The height of the water plane above y = 0. The plane will be parallel to the XZ plane
   this.waterHeight = waterHeight;
   // The density of the liquid. Pure water has a density of 1000 kg per cu meter
   this.liquidDensity = liquidDensity || 1000;
}

//
//
//
DENParticleBuoyancy.prototype.updateForce = function(particle, duration) {
   'use strict';

   // Submersion depth
   var depth = particle.position.y;
   // if we are out of water ?
   if (depth >= this.waterHeight + this.maxDepth) {
      return;
   }

   var force = new DENVector();

   // if we are at max depth
   if (depth <= this.waterHeight - this.maxDepth) {
      force.y = this.liquidDensity*this.volume;
      particle.addForce(force);
      return;
   }
   // we are partly submerged
   force.y = this.liquidDensity*this.volume*
      (depth - this.maxDepth - this.waterHeight) / 2*this.maxDepth;
   particle.addForce(force);
};

//
//
//
DENParticleBuoyancy.prototype.toString = function() {
  return "Buoyancy Force Parameters: maxDepth=>" + this.maxDepth +
     " volume=>" + this.volume + " waterheight=>" + this.waterHeight +
     " density=>" + this.liquidDensity;
};
