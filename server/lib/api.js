var request = require("request");
var debug = require("debug")("api");

module.exports.fetchConfig = function(req, res, next) {
  request({
    url: "http://localhost:3000/admin/config",
    method: "GET",
    qs: req.query || {}
  },
  function(err, response, body) {
    debug("err", err);
    debug("response", response);
    debug("body", body);

    if (err) {
      response.json({"error": err}, 500);
      return;
    }
    debug("statusCode", response.statusCode);
    debug("headers", response.headers);
    debug("body", body);

    res.status(response.statusCode).json(body);
  });
}

module.exports.fetchEntity = function(req, res, next) {
  request({
    url: "http://localhost:3000/admin/entity/" + req.params.kind,
    method: "GET",
    qs: req.query || {}
  },
  function(err, response, body) {
    if (err) {
      response.json({"error": err}, 500);
      return;
    }
    debug("statusCode", response.statusCode);
    debug("headers", response.headers);
    debug("body", body);

    res.status(response.statusCode).json(body);
  });
}
