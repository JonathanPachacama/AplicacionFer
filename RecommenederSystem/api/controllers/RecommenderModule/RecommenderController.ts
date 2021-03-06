declare var module;
declare var sails;
declare var LinkPublication;
declare var Articulo;

module.exports = {

  articlesToRecommend:(req,res)=>{

    Articulo
      .find()
      .exec((err,articlesFound)=>{
        if(err) return res.negotiate(err);
        console.log("Article:",articlesFound)

        return res.view('RecommenderModule/recommender',{
          articles:articlesFound
        })
      });

  },


  bringParameters:(req,res)=>{
  let parameters = req.allParams();
  if(parameters.id){
    Articulo.findOne({
      id:parameters.id
    })
      .exec((err,articleFound)=>{
        if(err) return res.serverError(err);
        if(articleFound){
          //Si encontro
          let id=articleFound.id;
          let title=articleFound.title;
          let authors=articleFound.authores;
          let abstract=articleFound.abstract;
          let keywords=articleFound.keywords;
          let category=articleFound.category;
          sails.log.info("id:",id);
          sails.log.info("Titulo:",title);
          sails.log.info("Autor/es:",authors);
          sails.log.info("Abstract:",abstract);
          sails.log.info("Palabras clave:",keywords);
          sails.log.info("Categoria:",category);
          // sails.log.info("Articulo:",articleFound);
          return res.view('RecommenderModule/byArticle',{
            /*authors:articleFound,
            abstract:articleFound,
            keywords:articleFound,
            category:articleFound*/
            article:articleFound,

          })
        }else{
          //No encontro
          return res.redirect('/')
        }
      })
  }else{
    return res.redirect('/')
  }




}

}
