/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/14/14
 * Time: 9:39 PM
 * To change this template use File | Settings | File Templates.
 */

test( "DENVector Test", function() {
    var v1 = new DENVector(1,2,3);

    ok( v1.x === 1 && v1.y === 2 && v1.z === 3, "constructed DENVector" );

    var v2 = new DENVector(4,5,6);

    v2.add(v1);

    ok( v2.x === 5 && v2.y === 7 && v2.z === 9, "add 2 vectors" );

    v1.scale(5);

    ok(v1.x === 5 && v1.y === 10 && v1.z === 15, "scaled v1(1,2,3) by 5");

    v1.invert();

    ok(v1.x === -5 && v1.y === -10 && v1.z === -15, "invert(5,10,15)");

    v1.reset();

    ok(v1.x === 0 && v1.y === 0 && v1.z === 0, "reset()");

    v1.reset(1,-2,3);

    ok( v1.x === 1 && v1.y === -2 && v1.z === 3, "reset(1,-2,3)" );

    strictEqual(v1.squareMagnitude(), 14, "squareMagnitude of (1,-2,3)");

    strictEqual(v1.magnitude(), Math.sqrt(14), "magnitude of (1,-2,3)")

    v1.reset(3,1,2);

    v1.normalize();

    ok(v1.x === 0.8017837257372732
        && v1.y === 0.2672612419124244
        && v1.z === 0.5345224838248488, "normalize (4,5,6)");

    v1.reset(2,4,0);

    var v2 = DENVector.normal(v1);

    ok(v2.x === 1/Math.sqrt(5)
        && v2.y === 2/Math.sqrt(5)
        && v2.z === 0, "normal (2,4,0)");

    strictEqual(Math.round(v2.magnitude()), 1, "magnitude of normal is 1");

    v1.reset(1,2,3);
    v2.reset(4,5,6);

    var v3 = DENVector.vectorProduct(v1, v2);

    ok(v3.x === -3 && v3.y === 6 && v3.z === -3, "vectorProduct (1,2,3) and (4,5,6)");

});