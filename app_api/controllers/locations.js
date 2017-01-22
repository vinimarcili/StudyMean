/* Função para criar uma resposta padrão dos controladores */
var sendJsonResponde = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsListByDistance = function (req, res) {
    sendJsonResponde(res, 200, {"status" : "success"});
};

module.exports.locationsCreate = function (req, res) {
    sendJsonResponde(res, 200, {"status" : "success"});
};

module.exports.locationsReadOne = function (req, res) {
    sendJsonResponde(res, 200, {"status" : "success"});
};

module.exports.locationsUpdateOne = function (req, res) {
    sendJsonResponde(res, 200, {"status" : "success"});
};

module.exports.locationsDeleteOne = function (req, res) {
    sendJsonResponde(res, 200, {"status" : "success"});
};