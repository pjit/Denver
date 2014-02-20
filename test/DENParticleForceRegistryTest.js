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
   ok(DENParticleForceRegistry.getRegistrationCount() === 1, "Added 1st Particle-Force Mapping");
   DENParticleForceRegistry.remove(p1, fgravity);
   ok(DENParticleForceRegistry.getRegistrationCount() === 0, "Removed 1st Particle-Force Mapping");
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
   ok(DENParticleForceRegistry.getRegistrationCount() === 2, "Added 2nd Particle-Force Mapping");
   DENParticleForceRegistry.updateForces(4);
   ok(p1.forceAccum.x === -9.92820323027551 &&
      p1.forceAccum.y === -29.528203230275512 &&
      p1.forceAccum.z === -9.92820323027551, "Force Accumulated due to drag & gravity " + p1.forceAccum.toString());

   // create another particle for Spring force
   var pA = new DENParticle();
   var pB = new DENParticle();

   pA.setPosition(1, 2, 3);
   pA.setMass(2);

   pB.setPosition(4, 5, 6);
   pB.setMass(5);

   var springForce = new DENParticleSpring(pB, 1, 2);

   DENParticleForceRegistry.add(pA, springForce);
   DENParticleForceRegistry.updateForces(1);
   ok(DENParticleForceRegistry.getRegistrationCount() === 3, "Added 3rd Particle-Force Mapping");
   ok(pA.forceAccum.x === 1.7207957018663376 &&
      pA.forceAccum.y === 1.7207957018663376 &&
      pA.forceAccum.z === 1.1471971345775582,
      "Spring Force Accumulated on Particle A (receiving end)" + pA.forceAccum.toString());
   ok(pB.forceAccum.x === 0 &&
      pB.forceAccum.y === 0 &&
      pB.forceAccum.z === 0, "Spring Force Accumulated on Particle B " + pB.forceAccum.toString());

   var springForceB = new DENParticleSpring(pA, 1, 2);

   DENParticleForceRegistry.add(pB, springForceB);
   DENParticleForceRegistry.updateForces(1);
   ok(pB.forceAccum.x === -1.9710084891449469 &&
      pB.forceAccum.y === -1.9710084891449469 &&
      pB.forceAccum.z === -2.628011318859929,
      "Spring Force Accumulated on Particle B (receiving end) " + pB.forceAccum.toString());
});

