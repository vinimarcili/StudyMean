var mongoose = require('mongoose'),
    Loc = mongoose.model('Location');

/* Função para criar uma resposta padrão dos controladores */
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsCreate = function (req, res) {
    sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.reviewsReadOne = function (req, res) {
    sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.reviewsUpdateOne = function (req, res) {
    sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.reviewsDeleteOne = function (req, res) {
    sendJSONresponse(res, 200, {"status" : "success"});
};