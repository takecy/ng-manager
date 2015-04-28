var request = require("request");
var debug = require("debug")("api");

module.exports.fetchConfig = function(req, res, next) {
  request({
    url: "http://localshot:3000/admin/config",
    method: "GET"
    qs: req.query || {}
  },
  function(err, res, body) {
    debug("statusCode", res.statusCode);
    debug("headers", res.headers);
    debug("body", body);

    res.send(body, statusCode);
  });
}
