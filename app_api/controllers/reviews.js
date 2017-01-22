/* Função para criar uma resposta padrão dos controladores */
var sendJsonResponde = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsCreate = function (req, res) {
    sendJsonResponde(res, 200, {"status" : "success"});
};

module.exports.reviewsReadOne = function (req, res) {
    sendJsonResponde(res, 200, {"status" : "success"});
};

module.exports.reviewsUpdateOne = function (req, res) {
    sendJsonResponde(res, 200, {"status" : "success"});
};

module.exports.reviewsDeleteOne = function (req, res) {
    sendJsonResponde(res, 200, {"status" : "success"});
};