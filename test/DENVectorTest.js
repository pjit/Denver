/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/14/14
 * Time: 9:39 PM
 * To change this template use File | Settings | File Templates.
 */

test( "DENVector Test", function() {
    var v1 = new DENVector(1,2,3);

    ok(v1 instanceof  DENVector, "Construction")
    ok( v1.x === 1 && v1.y === 2 && v1.z === 3, "Construction w/ Arguments" );

    var v2 = new DENVector(4,5,6);

    v2.add(v1);

    ok( v2.x === 5 && v2.y === 7 && v2.z === 9, "Add Two Vectors" );

    v1.scale(5);

    ok(v1.x === 5 && v1.y === 10 && v1.z === 15, "Scale");

    v1.invert();

    ok(v1.x === -5 && v1.y === -10 && v1.z === -15, "Invert");

    v1.reset();

    ok(v1.x === 0 && v1.y === 0 && v1.z === 0, "Reset");

    v1.reset(1,-2,3);

    ok( v1.x === 1 && v1.y === -2 && v1.z === 3, "Reset w/ Arguments" );

    strictEqual(v1.squareMagnitude(), 14, "Square Magnitude");

    strictEqual(v1.magnitude(), Math.sqrt(14), "Magnitude")

    v1.reset(3,1,2);

    v1.normalize();

    ok(v1.x === 0.8017837257372732
        && v1.y === 0.2672612419124244
        && v1.z === 0.5345224838248488, "Normalize a Vector");

    v1.reset(2,4,0);

    var v2 = DENVector.normal(v1);

    ok(v2.x === 1/Math.sqrt(5)
        && v2.y === 2/Math.sqrt(5)
        && v2.z === 0, "Normal of a Vector");

    strictEqual(Math.round(v2.magnitude()), 1, "Magnitude of a Normal");

    v1.reset(1,2,3);
    v2.reset(4,5,6);

    var v3 = DENVector.vectorProduct(v1, v2);

    ok(v3.x === -3 && v3.y === 6 && v3.z === -3, "Vector Product");

    v1.reset(2,-3,7);
    v2.reset(-4,2,-4);

    var scalarProduct = DENVector.scalarProduct(v1,v2);

    strictEqual(scalarProduct, -42, "Scalar Product");

    var v3 = v1;

    ok(v3.x === 2 && v3.y === -3 && v3.z === 7, "Assignment (=)");

    v1.x = 0;

    ok(v3.x === 0 && v3.y === -3 && v3.z === 7, "Assignment (=)  (Reference)");

    var v4 = new DENVector(v1);

    ok(v4.x === 0 && v4.y === -3 && v4.z === 7, "Construction from another Vector");

    v1.x = 2;

    ok(v4.x === 0 && v4.y === -3 && v4.z === 7, "Construction from another vector is not Reference");
});