/**
 * Created by nikky on 12/5/14.
 */

var serviceBase = require("./base");
var _ = require("underscore");

_.extend(exports, serviceBase);

var TestService = function(reference) {
    var self = serviceBase(reference);

    self.getItem = function (id, params) {
        return {
            id: "object.1",
            title: "Some Object",
            details: {
                many: "",
                x: 0,
                y: 5
            }
        }
    };


    self.getItems = function (params) {
        return [
            {
                id: "object.1",
                title: "Some Object"

            },

            {
                id: "object.2",
                title: "Another Object"

            }
        ]
    };

    self.updateItem = function (obj) {

    };

    self.deleteItem = function (id) {

    };

    self.confirm = function () {
        this.isConfirmed = true;
        self.updateItem(this);
    };

    function canBeConfirmed() {
        return !this.isConfirmed;
    }

    self.actions = {
        "confirm": {
            displayName: "Confirm object",
            execute: confirm,
            isAvailable: canBeConfirmed
        }
    };

    return self;
};

TestService.isPublic = true;

exports = TestService;