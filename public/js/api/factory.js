/**
 * Created by nikky on 12/5/14.
 */

define([], function() {
    function Instance(name) {
        var self = this;

        self.name = name;

        self.fetch = function(params) {
            var deferred = $.Deferred();

            $.ajax(
                {
                    url: '/api/' + self.name,
                    type: "GET",
                    data: $.param(params || {}),
                    success: function (response) {
                        deferred.resolve(response);
                    }
                });

            return deferred.promise();
        }
    }

    function rpcInvoke(name, func, id, params) {
        var deferred = $.Deferred();
        $.ajax(
            {
                url: "/rpc/" + name + "/func/" + id,
                type: "POST",
                data: JSON.stringify(params),
                success: function (response) {
                    deferred.resolve(response);
                }
            });

        return deferred.promise();
    }

    return {
        getInstance: function(name) {
            return new Instance(name);
        },
        getRPC: function(name, func) {
            return function(id, params) {
                rpcInvoke(name, func, id, params);
            }.bind(this);
        }
    }
});