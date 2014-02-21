/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/19/14
 * Time: 9:09 PM
 * To change this template use File | Settings | File Templates.
 */

test( "DENParticleSpring Test", function() {
   var springForce = new DENParticleSpring();

   ok(springForce instanceof  DENParticleSpring, "Construction");
});
