/**
 * Created by nikky on 12/5/14.
 */
exports.install = function(framework) {
    framework.route('/api/{service}', restGet);
    //framework.route('/api/{service}/*', getClient);
    framework.file('/js/api/{service}/client.js', handleJS)
};

var sampleData = [
    {
        id: "object.1",
        title: "Object 1"
    },
    {
        id: "object.2",
        title: "Object 2"
    }
];

function restGet(service) {
    this.json(sampleData);
}

var util = require("util");

var content = "define(['./../factory'], function(factory) { return factory.getInstance('%s'); });";
var contentType = "application/javascript";

function generateClientJS(service) {
    return util.format(content, service);
}

function handleJS(req, res, isValidation) {

    res.noCache();

    if (req.path[0] == "js" && req.path[1] == "api" && req.path[req.path.length-1] == "client.js") {
        var clientJS = generateClientJS(req.path.slice(2, req.path.length - 1).join('/'));
        this.responseContent(req, res, 200, clientJS, contentType);
        return;
    }

    res.file(framework.path.public(req.uri.pathname));

}