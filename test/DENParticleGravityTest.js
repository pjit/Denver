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

   var fg2 = new DENParticleGravity();

   ok(fg2.gravity.x === 0 && fg2.gravity.y === -10 && fg2.gravity.z === 0, "Default Gravity (0, -10, 0)")
});

