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

    return {
        getInstance: function(name) {
            return new Instance(name);
        }
    }
});