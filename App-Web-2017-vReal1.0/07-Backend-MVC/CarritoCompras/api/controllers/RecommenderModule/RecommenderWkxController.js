module.exports = {
    test: function (req, res) {
        return res.view('RecommenderModule/MainWikindx');
    },
    recommenderWkx: function (req, res) {
        Wkx_creator
            .find()
            .exec(function (err, creatorsFound) {
            if (err)
                return res.negotiate(err);
            console.log("Article:", creatorsFound);
            return res.view('RecommenderModule/MainWikindx', {
                creators: creatorsFound
            });
        });
    },
    bringParametersCreator: function (req, res) {
        var parameters = req.allParams();
        if (parameters.creatorId) {
            Wkx_creator.findOne({
                creatorId: parameters.creatorId
            })
                .exec(function (err, creatorFound) {
                if (err)
                    return res.serverError(err);
                if (creatorFound) {
                    //Si encontro
                    Wkx_creator.query('SELECT creatorId,creatorFirstname,creatorSurname,resourceId,resourceTitle,categoryId,categoryCategory,keywordId,keywordKeyword\n' +
                        'FROM wkx_resource,wkx_creator,wkx_resource_creator,wkx_category,wkx_resource_category,wkx_keyword,wkx_resource_keyword\n' +
                        'WHERE wkx_creator.creatorId=wkx_resource_creator.resourcecreatorId AND wkx_resource.resourceId=wkx_resource_creator.resourcecreatorResourceId\n' +
                        'AND(wkx_category.categoryId=wkx_resource_category.resourcecategoryCategoryId AND wkx_resource_category.resourcecategoryResourceId=wkx_resource.resourceId)\n' +
                        'AND (wkx_keyword.keywordId=wkx_resource_keyword.resourcekeywordKeywordId AND wkx_resource_keyword.resourcekeywordResourceId=wkx_resource.resourceId)\n' +
                        'AND (wkx_creator.creatorId=?)', [creatorFound.creatorId], function (err, rawResult) {
                        if (err) {
                            return res.serverError(err);
                        }
                        if (rawResult.length != 1 || rawResult.length == 1) {
                            sails.log("tamaño", rawResult.length);
                            var query = [];
                            var iteracion = [];
                            var keyword_1 = [];
                            var category_1 = [];
                            for (var i = 0; i < rawResult.length; i++) {
                                if (rawResult[i].creatorId == creatorFound.creatorId) {
                                    iteracion.push(rawResult[i]);
                                    keyword_1.push(rawResult[i].keywordKeyword);
                                    category_1.push(rawResult[i].categoryCategory);
                                }
                            }
                            query = iteracion;
                            sails.log("query ", query);
                            sails.log("keyword ", keyword_1);
                            sails.log("category ", category_1);
                            var outKeyword = [];
                            var outCategory = [];
                            function eliminateDuplicatesKeyword(arr) {
                                var i, len = arr.length, obj = {};
                                for (i = 0; i < len; i++) {
                                    obj[arr[i]] = 0;
                                }
                                for (i in obj) {
                                    outKeyword.push(i);
                                }
                                return outKeyword;
                            }
                            function eliminateDuplicatesCategory(arr) {
                                var i, len = arr.length, obj = {};
                                for (i = 0; i < len; i++) {
                                    obj[arr[i]] = 0;
                                }
                                for (i in obj) {
                                    outCategory.push(i);
                                }
                                return outCategory;
                            }
                            eliminateDuplicatesKeyword(keyword_1);
                            eliminateDuplicatesCategory(category_1);
                            keyword_1 = outKeyword;
                            category_1 = outCategory;
                            sails.log("keyword Sin duplicados ", keyword_1);
                            sails.log("category Sin duplicados ", category_1);
                            Wkx_creator.query('SELECT "Title" as Type,resourceId AS Id,resourceTitle AS Value FROM wkx_resource WHERE resourceId = ? ' +
                                'UNION ' +
                                'SELECT "Abstract",resourcetextId,resourcetextAbstract FROM wkx_resource_text WHERE resourcetextId =?', [rawResult[0].resourceId, rawResult[0].resourceId], function (err, rawResult2) {
                                if (err) {
                                    return res.serverError(err);
                                }
                                sails.log(rawResult2);
                                var abstract = rawResult2[1].Value;
                                if (rawResult2[0].id == rawResult2[1].id) {
                                    Wkx_creator.query('SELECT "Metadata" as Type, collectionId, publisherId, collectionTitle,publisherName,publisherLocation\n' +
                                        'FROM wkx_collection,wkx_publisher,wkx_resource_misc\n' +
                                        'WHERE wkx_collection.collectionId=wkx_resource_misc.resourcemiscCollection \n' +
                                        'AND wkx_resource_misc.resourcemiscPublisher=wkx_publisher.publisherId\n' +
                                        'AND (wkx_collection.collectionId = wkx_publisher.publisherId)\n' +
                                        'AND wkx_collection.collectionId  = ?\n' +
                                        'UNION \n' +
                                        'SELECT "Title [idT|idT|title|type|type]", resourceId,resourceId,resourceTitle,resourceType,resourceType FROM wkx_resource\n' +
                                        'WHERE wkx_resource.resourceId= ?', [rawResult[0].resourceId, rawResult[0].resourceId], function (err, rawResult3) {
                                        if (err) {
                                            return res.serverError(err);
                                        }
                                        sails.log(rawResult3);
                                        if (rawResult3[0].collectionId == rawResult3[1].collectionId) {
                                            var publisher = rawResult3[0].publisherName;
                                            var locationPublisher = rawResult3[0].publisherLocation;
                                            var journal = rawResult3[0].collectionTitle;
                                            sails.log(publisher);
                                            sails.log(locationPublisher);
                                            sails.log(journal);
                                            return res.view('RecommenderModule/wkx_keyword', {
                                                creator: creatorFound,
                                                query: query[0],
                                                keyword: keyword_1,
                                                category: category_1,
                                                abstract: abstract,
                                                journal: journal,
                                                publisher: publisher,
                                                locationPublisher: locationPublisher
                                            });
                                        }
                                        else {
                                            return res.redirect('/');
                                        }
                                    });
                                }
                                else {
                                    return res.redirect('/');
                                }
                            });
                        }
                        else {
                            return res.redirect('/');
                        }
                    });
                }
                else {
                    //No encontro
                    return res.redirect('/');
                }
            });
        }
        else {
            return res.redirect('/');
        }
    }
};
