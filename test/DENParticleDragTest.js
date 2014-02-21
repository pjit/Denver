/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/19/14
 * Time: 9:09 PM
 * To change this template use File | Settings | File Templates.
 */

test( "DENParticleDrag Test", function() {
   var dragForce = new DENParticleDrag(1, 2);

   ok(dragForce instanceof  DENParticleDrag, "Construction");
   ok(dragForce.k1 === 1 && dragForce.k2 === 2, "Initial Drag Coefficients (1,2)")

});
