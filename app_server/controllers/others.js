/* GET 'about' page */
module.exports.about = function (req, res) {
  res.render('generic-text', {
    title: 'About Loc8r',
    content: "Aqui é Body Builder Ipsum PORRA! Bora caralho, você quer ver essa porra velho. Vo derrubar tudo essas árvore do parque ibirapuera. Ó o homem ali porra!, é 13 porra! Aqui é bodybuilder porra! Que não vai dá rapaiz, não vai dá essa porra. É verão o ano todo vem cumpadi. \n\nEita porra!, tá saindo da jaula o monstro! Tá comigo porra. Ó o homem ali porra!, é 13 porra! Vem porra! Vamo monstro! É 37 anos caralho! \n\nEle tá olhando pra gente. Que não vai dá rapaiz, não vai dá essa porra. Birl! AHHHHHHHHHHHHHHHHHHHHHH..., porra! Eita porra!, tá saindo da jaula o monstro! Vem porra!"
  });
};

/* Exports to angular */
module.exports.angularApp = function(req, res){
  res.render('layout',
      {
        title: 'Loc8r'
      }
  );
};