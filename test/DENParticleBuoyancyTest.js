/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/22/14
 * Time: 10:25 PM
 * To change this template use File | Settings | File Templates.
 */

test ("DENParticleBuoyancy Test", function() {
   var buonyancyForce = new DENParticleBuoyancy(10, 30, 20, 1000);

   ok(buonyancyForce instanceof DENParticleBuoyancy, "Consruction");
   ok(true, buonyancyForce.toString());
});