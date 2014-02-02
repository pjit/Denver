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

       particle.position = DENVector.create(0,0,0);
       particle.velocity = DENVector.create(0,0,0);
       particle.acceleration = DENVector.create(0,0,0);

       return particle;
   }

   return {
        create : createParticle

   };
}());