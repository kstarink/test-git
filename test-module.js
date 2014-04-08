/**
 * @module test-module
 * @requires montage/core/core
 */
var Montage = require("montage/core/core").Montage;
/**
 * @class TestModule
 * @extends Montage
 */
exports.TestModule = Montage.specialize(/** @lends TestModule# */ {
    constructor: {
        value: function TestModule() {
            this.super();
        }
    }
});
