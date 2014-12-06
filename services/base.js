/**
 * Created by nikky on 12/5/14.
 */
var util = require("util");

exports = function(reference) {
    var self = {};

    self.reference = reference;

    self.generateClient = function() {
        util.format("define(['./../factory'], function(factory) { return factory.getInstance('%s'); });", self.reference);
    };

    return self;
};