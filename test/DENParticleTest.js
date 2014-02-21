/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/15/14
 * Time: 3:06 PM
 * To change this template use File | Settings | File Templates.
 */
test( "DENParticle Test", function() {
    var p1 = new DENParticle();

    ok(p1 instanceof  DENParticle, "Construction" );
    ok(p1.position.x === 0 && p1.position.y === 0 && p1.position.z === 0, "Initial Position (0,0,0)");
    ok(p1.velocity.x === 0 && p1.velocity.y === 0 && p1.velocity.z === 0, "Initial Velocity (0,0,0)");
    ok(p1.acceleration.x === 0 && p1.acceleration.y === -10 && p1.acceleration.z === 0, "Initial Acceleration (0,-10,0)");
    ok(p1.damping === 0.99, "Initial Damping (.99)");
    ok(p1.inverseMass === 1, "Initial Inverse Mass (1)");
    ok(p1.forceAccum.x === 0 && p1.forceAccum.y === 0 && p1.forceAccum.z === 0, "Initial Force Accumulated (0,0,0)");

    var position = new DENVector(1,2,3),
        velocity = new DENVector(5,6,7),
        acc = new DENVector(0,-9.8, -2),
        f1 = new DENVector(0,-8, 0);

    p1.setPosition(position);
    ok(p1.position.x === 1 && p1.position.y === 2 && p1.position.z === 3, "Set Position Vector");
    p1.setVelocity(velocity);
    ok(p1.velocity.x === 5 && p1.velocity.y === 6 && p1.velocity.z === 7, "Set Velocity Vector");
    p1.setAcceleration(acc);
    ok(p1.acceleration.x === 0 && p1.acceleration.y === -9.8 && p1.acceleration.z === -2, "Set Acceleration Vector");
    p1.setPosition(2,4,6);
    ok(p1.position.x === 2 && p1.position.y === 4 && p1.position.z === 6, "Set Position Values");
    p1.setVelocity(1,3,-4);
    ok(p1.velocity.x === 1 && p1.velocity.y === 3 && p1.velocity.z === -4, "Set Velocity Values");
    p1.setAcceleration(-1,-2,-3);
    ok(p1.acceleration.x === -1 && p1.acceleration.y === -2 && p1.acceleration.z === -3, "Set Acceleration Values");
    p1.setMass(1.5);
    ok(p1.getMass() === 1.5, "Set/Get Mass");
    p1.setMass(0);
    ok(p1.getMass() !== 0, "Mass 0 can't be set");
    p1.setInverseMass(2);
    ok(p1.inverseMass === 2, "Set/Get Inversemass");
    ok(p1.hasFiniteMass() === true, "HasFinite mass - true");
    p1.inverseMass = 0;
    ok(p1.hasFiniteMass() === false, "HasFinite mass - false");
    p1.addForce(f1);
    ok(p1.forceAccum.x === 0 && p1.forceAccum.y === -8 && p1.forceAccum.z === 0, "Force 1 Added");
    f1.reset(9,7,5);
    p1.addForce(f1);
    ok(p1.forceAccum.x === 9 && p1.forceAccum.y === -1 && p1.forceAccum.z === 5, "Force 2 Added");
    f1.reset(0,-12, -9);
    p1.addForce(f1);
    ok(p1.forceAccum.x === 9 && p1.forceAccum.y === -13 && p1.forceAccum.z === -4, "Force 3 Added");
    p1.clearAccumulator();
    ok(p1.forceAccum.x === 0 && p1.forceAccum.y === 0 && p1.forceAccum.z === 0, "ClearAccumulator Force");
});

