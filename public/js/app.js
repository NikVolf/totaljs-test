/**
 * Created by nikky on 12/5/14.
 */
define(['api/test/client'], function(testClient) {
    $.when(testClient.fetch())
        .then(function(data) {
            alert(JSON.stringify(data))
        });
});