/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/15/14
 * Time: 3:05 PM
 * To change this template use File | Settings | File Templates.
 */
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

    var position = new DENVector(1,2,3);

    p1.setPosition(position);

    ok(p1.position.x === 1 && p1.position.y === 2 && p1.position.z === 3, "Set Position");

    var velocity = new DENVector(5,6,7);

    p1.setVelocity(velocity);

    ok(p1.velocity.x === 5 && p1.velocity.y === 6 && p1.velocity.z === 7, "Set Velocity");

    var acc = new DENVector(0,-9.8, -2);

    p1.setAcceleration(acc);

    ok(p1.acceleration.x === 0 && p1.acceleration.y === -9.8 && p1.acceleration.z === -2, "Set Acceleration");

    p1.setMass(1.5);

    ok(p1.getMass() === 1.5, "Set/Get Mass");
});
