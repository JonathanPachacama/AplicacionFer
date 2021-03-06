module.exports = {
    TEST: function (req, res) {
        var parametros = req.allParams();
        sails.log.info("Parametros", parametros);
        Wkx_resource
            .find()
            .where({
            resourceTitle: {
                contains: parametros.busqueda
            }
        })
            .exec(function (err, resourceFound) {
            if (err)
                return res.negotiate(err);
            return res.json({
                resource: resourceFound
            });
        });
    },
    result: function (req, res) {
        return res.view('recommenderLinkedData', {});
    },
    result1: function (req, res) {
        return res.view('RecommenderModule/byLink', {});
    },
    result2: function (req, res) {
        return res.view('RecommenderModule/byAuthor', {});
    },
    result3: function (req, res) {
        return res.view('RecommenderModule/byTitleSameAuthor', {});
    },
    result4: function (req, res) {
        return res.view('RecommenderModule/bySameAreaOfinterest', {});
    },
    ranking: function (req, res) {
        return res.view('RecommenderModule/ranking', {});
    },
    createLinkToAPublication: function (req, res) {
        var parameters = req.allParams();
        var newLinks = {
            links_Value: parameters.links_Value,
            link_Type: parameters.link_Type,
            o_Value: parameters.o_Value,
            o_Type: parameters.o_Type,
        };
        LinkPublication.create(newLinks)
            .exec(function (error, linkcreated) {
            if (error) {
                return res.serverError(error);
            }
            else {
                // return res.ok(linkCreado);
                //return res.created('Nuevo articulo creado.');
                return res.view('RecommenderModule/byLink', {
                    link: linkcreated
                });
            }
        });
    },
};
