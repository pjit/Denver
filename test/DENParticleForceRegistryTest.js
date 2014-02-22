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
   ok(pA.forceAccum.x === 1.8452994616207485 &&
      pA.forceAccum.y === 1.8452994616207485 &&
      pA.forceAccum.z === 1.8452994616207485,
      "Spring Force Accumulated on Particle A (receiving end)" + pA.forceAccum.toString());
   ok(pB.forceAccum.x === 0 &&
      pB.forceAccum.y === 0 &&
      pB.forceAccum.z === 0, "Spring Force Accumulated on Particle B " + pB.forceAccum.toString());

   var springForceB = new DENParticleSpring(pA, 1, 2);

   DENParticleForceRegistry.add(pB, springForceB);
   ok(DENParticleForceRegistry.getRegistrationCount() === 4,
      "Added 4th Particle-Force Mapping (Spring force - other particle - B");
   DENParticleForceRegistry.updateForces(1);
   ok(pB.forceAccum.x === -1.8452994616207485 &&
      pB.forceAccum.y === -1.8452994616207485 &&
      pB.forceAccum.z === -1.8452994616207485,
      "Spring Force Accumulated on Particle B (receiving end) " + pB.forceAccum.toString());

   var anchor = new DENVector(10, 20, 30);
   var anchoredSpring = new DENParticleAnchoredSpring(anchor, 1, 2);

   DENParticleForceRegistry.add(pA, anchoredSpring);
   ok(DENParticleForceRegistry.getRegistrationCount() === 5,
      "Added 5th Particle-Force Mapping (anchored Spring force)");
   DENParticleForceRegistry.updateForces(1);
   ok(pA.forceAccum.x === 14.001375901037395 &&
      pA.forceAccum.y === 22.466853417212548 &&
      pA.forceAccum.z === 30.9323309333877,
      "Anchored Spring Force Accumulated on Particle A" + pA.forceAccum.toString());

   var pBungeeParticleA = new DENParticle();
   var pBungeeParticleB = new DENParticle();

   pBungeeParticleA.setPosition(1, 2, 3);
   pBungeeParticleB.setPosition(4, 5, 6);

   var bungeeForce = new DENParticleSpring(pBungeeParticleA, 1, 3, true);

   DENParticleForceRegistry.clear();
   DENParticleForceRegistry.add(pBungeeParticleB, bungeeForce);
   ok(DENParticleForceRegistry.getRegistrationCount() === 1,
      "Added 6th Particle-Force Mapping (Bungee - other particle - particle B");
   DENParticleForceRegistry.updateForces(1);
   ok(pBungeeParticleA.forceAccum.x === 0 &&
      pBungeeParticleA.forceAccum.y === 0 &&
      pBungeeParticleA.forceAccum.z === 0,
      "Bungee Spring Force Accumulated on Particle A" + pBungeeParticleA.forceAccum.toString());
   ok(pBungeeParticleB.forceAccum.x === 1.2679491924311228 &&
      pBungeeParticleB.forceAccum.y === 1.2679491924311228 &&
      pBungeeParticleB.forceAccum.z === 1.2679491924311228,
      "Bungee Spring Force Accumulated on Particle B" + pBungeeParticleB.forceAccum.toString());

});

