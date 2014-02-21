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
      springForce2.restLength === 10, "Spring Constant and Length");
   ok(springForce2.otherParticle instanceof DENParticle, "Other particle for Spring Force set");
});
