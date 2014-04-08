/**
 * @module ui/test.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Test
 * @extends Component
 */
exports.Test = Component.specialize(/** @lends Test# */ {
    constructor: {
        value: function Test() {
            this.super();
        }
    }
});
