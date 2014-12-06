/**
 * Created by nikky on 12/5/14.
 */
exports.install = function(framework) {
    framework.route('/api/{service}', restGet, ["get"]);
    framework.route('/api/{service}/{id}', restGetOne, ["get"]);
    framework.route('/api/{service}/{id}', restUpdate, ["put"]);
    framework.route('/api/{service}/{id}', restDelete, ["delete"]);
    framework.file('/js/api/{service}/client.js', handleJS)
};

var _ = require("underscore");

function resolveService(serviceReference) {
    var serviceModule = require("./../services/" + serviceReference);
    console.log(JSON.stringify(serviceModule));
    //if (!serviceModule.isPublic)
    //    framework.response403(this.req, this.res);
    return serviceModule();
}

function restGet(serviceReference) {
    var service = resolveService(serviceReference);
    this.json(service.getItems());
}

function restGetOne(serviceReference, id) {
    var service = resolveService(serviceReference);
    this.json(service.getItem(id));
}

function restUpdate(serviceReference, id) {
    var service = resolveService(serviceReference);
    var original = service.getItem(id);
    var update = this.body;
    _.extend(original, update);
    service.updateItem(original);
}

function restDelete(serviceReference, id) {
    var service = resolveService(serviceReference);
    service.deleteItem(id);
}


var util = require("util");

var contentType = "application/javascript";

function generateClientJS(serviceReference) {
    var service = resolveService(serviceReference);
    return service.generateClient();
}

var noCacheHeaders = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
};

function handleJS(req, res, isValidation) {

    console.log(JSON.stringify(_.toArray(noCacheHeaders)));

    res.noCache();

    if (req.path[0] == "js" && req.path[1] == "api" && req.path[req.path.length-1] == "client.js") {
        var clientJS = generateClientJS(req.path.slice(2, req.path.length - 1).join('/'));
        this.responseContent(req, res, 200, clientJS, contentType, true, noCacheHeaders);
        return;
    }

    res.file(
        framework.path.public(req.uri.pathname),
        req.path[req.path.length-2] + "." + req.path[req.path.length-1],
        noCacheHeaders);

}