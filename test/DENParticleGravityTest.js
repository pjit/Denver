/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/17/14
 * Time: 9:09 PM
 * To change this template use File | Settings | File Templates.
 */

test( "DENParticleGravity Test", function() {
   var fgravity = new DENParticleGravity(0,-9,0);

   ok(fgravity instanceof  DENParticleGravity, "Construction");
   ok(fgravity.gravity.x === 0 && fgravity.gravity.y === -9 && fgravity.gravity.z === 0, "Initial Gravity (0,-9,0)")

   var fg2 = new DENParticleGravity([1,2,3]);

   ok(fg2.gravity.x === 1 && fg2.gravity.y === 2 && fg2.gravity.z === 3, "Initial Gravity (1,2,3)")

   var gVector = new DENVector(5,6,7);

   var fg3 = new DENParticleGravity(gVector);

   ok(fg3.gravity.x === 5 && fg3.gravity.y === 6 && fg3.gravity.z === 7, "Initial Gravity (5,6,7)")

});

