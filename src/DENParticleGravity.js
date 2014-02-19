/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 2/17/14
 * Time: 8:53 PM
 * To change this template use File | Settings | File Templates.
 */

"use strict";

//
//
//
function DENParticleGravity() {
    // Holds the acceleration due to gravity.
    this.gravity = new DENVector(0,0,0);
    // Process any arguments if passed
    if (arguments.length > 0) {
        if (arguments.length == 1) {
            if (Array.isArray(arguments[0])) {
                var arrayArg = arguments[0];

                if (arrayArg.length == 3) {
                    this.gravity.x = arrayArg[0];
                    this.gravity.y = arrayArg[1];
                    this.gravity.z = arrayArg[2];
                }
                else if (arrayArg.length == 2) {
                    this.gravity.x = arrayArg[0];
                    this.gravity.y = arrayArg[1];
                }
                else if (arrayArg.length == 1) {
                    this.gravity.x = arrayArg[0];
                }
            }
            else {
                if (arguments[0] instanceof DENVector) {
                    this.gravity = arguments[0];
                }
            }
        }
        else if (arguments.length == 3) {
            this.gravity.x = arguments[0];
            this.gravity.y = arguments[1];
            this.gravity.z = arguments[2];
        }
    }
}

//
//
//
DENParticleGravity.prototype.updateForce = function(particle, duration) {
   var p = particle || {};

    if (p instanceof DENParticle) {
        if (p.hasFiniteMass()) {
            var newForce = DENVector.scale(this.gravity, p.getMass());

            p.addForce(newForce);
        }
    }
}

//
//
//
DENParticleGravity.prototype.toString = function() {
    return "Gravity Vector: " + this.gravity.toString();
}

