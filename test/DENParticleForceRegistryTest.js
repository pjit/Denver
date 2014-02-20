/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/17/14
 * Time: 9:05 PM
 * To change this template use File | Settings | File Templates.
 */

test( "DENParticleForceRegistry Test", function() {
   var p1 = new DENParticle();
   var fgravity = new DENParticleGravity(0, -9.8, 0);

   p1.setPosition(1, 2, 3);
   p1.setMass(2);
   DENParticleForceRegistry.add(p1, fgravity);
   ok(DENParticleForceRegistry.getRegistrationCount() === 1, "Added 1 Particle-Force Mapping");
   DENParticleForceRegistry.remove(p1, fgravity);
   ok(DENParticleForceRegistry.getRegistrationCount() === 0, "Removed 1 Particle-Force Mapping");
   // Add again for testing
   DENParticleForceRegistry.add(p1, fgravity);
   DENParticleForceRegistry.updateForces(4);
   ok(p1.forceAccum.x === 0 && p1.forceAccum.y === -19.6 && p1.forceAccum.z === 0,
      "Force Accumulated due to Gravity " + p1.forceAccum.toString());

   // Remove gravity for a moment
   DENParticleForceRegistry.remove(p1, fgravity);
   // Clear any previously accumulated force
   p1.clearAccumulator();

   // Create and add drag force
   var d1 = new DENParticleDrag(3, 4);

   p1.setVelocity(1, 1, 1);
   DENParticleForceRegistry.add(p1, d1);
   ok(DENParticleForceRegistry.getRegistrationCount() === 1, "Added Particle-Drag Force Mapping");
   DENParticleForceRegistry.updateForces(4);
   ok(p1.forceAccum.x === -9.92820323027551 &&
      p1.forceAccum.y === -9.92820323027551 &&
      p1.forceAccum.z === -9.92820323027551, "Force Accumulated due to drag " + p1.forceAccum.toString());
   // Clear any accumulation
   p1.clearAccumulator();
   // add gravity force back
   DENParticleForceRegistry.add(p1, fgravity);
   ok(DENParticleForceRegistry.getRegistrationCount() === 2, "Added 2 Particle-Force Mapping");
   DENParticleForceRegistry.updateForces(4);
   ok(p1.forceAccum.x === -9.92820323027551 &&
      p1.forceAccum.y === -29.528203230275512 &&
      p1.forceAccum.z === -9.92820323027551, "Force Accumulated due to drag & gravity " + p1.forceAccum.toString());
});

