/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/20/14
 * Time: 8:07 PM
 * To change this template use File | Settings | File Templates.
 */

test( "DENParticleAnchoredSpring Test", function() {
   var anchor = new DENVector(5, 6, 7);
   var anchoredSpring = new DENParticleAnchoredSpring(anchor, 2, 10);

   ok(anchoredSpring instanceof  DENParticleAnchoredSpring, "Construction");
   ok(anchoredSpring.springConstant === 2 &&
      anchoredSpring.restLength === 10, "Spring Constant and Length");
   ok(anchoredSpring.anchorLocation instanceof DENVector, "Anchor position is a vector for anchored spring force");
   ok(anchoredSpring.anchorLocation.x === 5 &&
      anchoredSpring.anchorLocation.y === 6 &&
      anchoredSpring.anchorLocation.z === 7, "Fixed (anchored) position for anchored spring force (5,6,7)");
});
