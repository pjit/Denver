/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/19/14
 * Time: 9:09 PM
 * To change this template use File | Settings | File Templates.
 */

test( "DENParticleSpring Test", function() {
   var springForce1 = new DENParticleSpring();

   ok(springForce1 instanceof  DENParticleSpring, "Construction");

   var p1 = new DENParticle();
   var springForce2 = new DENParticleSpring(p1, 2, 10);

   ok(springForce2.springConstant === 2 &&
      springForce2.restLength === 10 &&
      springForce2.bungeeForce === false, "Spring Constant and Length");
   ok(springForce2.otherParticle instanceof DENParticle, "Other particle for Spring Force set");

   // Bungee force
   var p2 = new DENParticle();

   p2.setPosition(4, 5, 6);

   var bungeeForce = new DENParticleSpring(p2, 2, 10, true);

   ok(bungeeForce instanceof  DENParticleSpring, "Construction (bungee force)");
   ok(bungeeForce.springConstant === 2 &&
      bungeeForce.restLength === 10 &&
      bungeeForce.bungeeForce === true, "Spring Constant and Length. Bungee force");
   ok(bungeeForce.otherParticle instanceof DENParticle, "Other particle for Bungee Force set");


});
