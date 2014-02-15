/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/14/14
 * Time: 9:39 PM
 * To change this template use File | Settings | File Templates.
 */

test( "DENVector Test", function() {
    var v1 = new DENVector(1,2,3);

    ok( v1.x === 1 && v1.y === 2 && v1.z === 3, "Contructed DENVector" );

    var v2 = new DENVector(4,5,6);

    v2.add(v1);

    ok( v2.x === 5 && v2.y === 7 && v2.z === 9, "Add 2 vectors" );

    v1.scale(5);

    ok(v1.x == 5 && v1.y === 10 && v1.z === 15, "Scaled v1(1,2,3) by 5");
});