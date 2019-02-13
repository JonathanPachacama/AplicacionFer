// Creación del módulo
var angularApp = angular.module('appRecommenderLayout', ['ui.bootstrap']);


angularApp.controller("layoutController",function ($scope,$http) {
}).factory('url_config', function() {
  var base_urlSails = 'http://localhost:1337'
  var base_UrlWebServer = 'http://172.31.104.33:8080'

  var urlLuceneIEEE = base_UrlWebServer+"/JavaAPI/api/articulos/getBusquedaIEEE/?Busqueda="
  var urlLuceneACM = base_UrlWebServer+"/JavaAPI/api/articulos/getBusquedaACM/?Busqueda="
  var urlLuceneDBLP = base_UrlWebServer+"/JavaAPI/api/articulos/getBusquedaDBLP/?Busqueda="
  http://localhost:1337/RecommenderModule/RecommenderWkx/bringParametersCreatorAPI?resourceId=2
    return {
      base_urlSails : base_urlSails,
      base_UrlWebServer : base_UrlWebServer,
      urlLuceneIEEE : urlLuceneIEEE,
      urlLuceneACM : urlLuceneACM,
      urlLuceneDBLP : urlLuceneDBLP,
    };
});

angularApp.controller("recommenderController",function ($scope,$http, $log , url_config) {


  // let TitleLucene = $("#title").val();    //get value of keywords of the title
  let fullTitle = $("#fullTitle").text();    //get value of full title
  let urlSendIEEE = url_config.urlLuceneIEEE+fullTitle
  let urlSendACM = url_config.urlLuceneACM+fullTitle
  let urlSendDBLP = url_config.urlLuceneDBLP+fullTitle

  $scope.showIEEE;
  $scope.showACM;
  $scope.showDBLP;

  $scope.listArticlesIEEE = function () {
    $http.get(urlSendIEEE)
      .success(function (data) {
        $scope.showIEEE = true;
        $scope.showACM = false;
        $scope.showDBLP = false;
        $("#ieeeNav").attr("class","nav-item active");
        $("#acmNav").attr("class","nav-item disabled");
        $("#dblpNav").attr("class","nav-item disabled");
        $scope.responseJsonLucene = data;
        $scope.endPointDinamic = "http://acm.rkbexplorer.com/sparql/";
        console.log("la url es:" + urlSendIEEE);
        console.log("numero de articulos:" + $scope.responseJsonLucene.length);
        for (let i = 0; i < $scope.responseJsonLucene.length; i++) {
          let TitleLucene = $scope.responseJsonLucene[i].tituloArticulo
          let score = $scope.responseJsonLucene[i].score
          // console.log(i + 1 + ": Titulo:" + TitleLucene);
          // console.log(i + 1 + ": Score:" + score);
        }
// start uib-pagination
        $scope.size = data.length;
        console.log("Número de resultados: ",$scope.size);
        $scope.viewby = 20;
        $scope.totalItems = $scope.size;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
          $log.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
        $scope.setItemsPerPage = function(num) {
          $scope.itemsPerPage = num;
          $scope.currentPage = 1; //reset to first page
        }
        // end uib-pagination

      })
      .error(function (err) {
      });
  }
  $scope.listArticlesACM  = function () {
    $http.get(urlSendACM)
      .success(function (data) {
        $scope.showIEEE = false;
        $scope.showACM = true;
        $scope.showDBLP = false;
        $("#ieeeNav").attr("class","nav-item disabled");
        $("#acmNav").attr("class","nav-item active");
        $("#dblpNav").attr("class","nav-item disabled");
        $scope.responseJsonLucene = data;
        console.log("la url es:" + urlSendACM);
        console.log("numero de articulos:" + $scope.responseJsonLucene.length);
        for (let i = 0; i < $scope.responseJsonLucene.length; i++) {
          let TitleLucene = $scope.responseJsonLucene[i].tituloArticulo
          let score = $scope.responseJsonLucene[i].score
          // console.log(i + 1 + ": Titulo:" + TitleLucene);
          // console.log(i + 1 + ": Score:" + score);
        }
        // start uib-pagination
        $scope.size = data.length;
        console.log("Número de resultados: ",$scope.size);
        $scope.viewby = 20;
        $scope.totalItems = $scope.size;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
          $log.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
        $scope.setItemsPerPage = function(num) {
          $scope.itemsPerPage = num;
          $scope.currentPage = 1; //reset to first page
        }
        // end uib-pagination
      })
      .error(function (err) {
      });
  }
  $scope.listArticlesDBLP = function () {
    $http.get(urlSendDBLP)
      .success(function (data) {
        $scope.showIEEE = false;
        $scope.showACM = false;
        $scope.showDBLP = true;
        $("#ieeeNav").attr("class","nav-item disabled");
        $("#acmNav").attr("class","nav-item disabled");
        $("#dblpNav").attr("class","nav-item active");
        $scope.responseJsonLucene = data;
        console.log("la url es:" + urlSendDBLP);
        console.log("numero de articulos:" + $scope.responseJsonLucene.length);
        for (let i = 0; i < $scope.responseJsonLucene.length; i++) {
          let TitleLucene = $scope.responseJsonLucene[i].tituloArticulo
          let score = $scope.responseJsonLucene[i].score
          // console.log(i + 1 + ": Titulo:" + TitleLucene);
          // console.log(i + 1 + ": Score:" + score);
        }
        // start uib-pagination
        $scope.size = data.length;
        console.log("Número de resultados: ",$scope.size);
        $scope.viewby = 20;
        $scope.totalItems = $scope.size;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
          $log.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
        $scope.setItemsPerPage = function(num) {
          $scope.itemsPerPage = num;
          $scope.currentPage = 1; //reset to first page
        }
        // end uib-pagination
      })
      .error(function (err) {
      });
  }
});


angularApp.controller('mainWikindxController',
    function($scope, url_config, $http) {
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.pages = [];



      $scope.articles = [];

      $scope.busqueda = "";
      $scope.resourceId;

      $scope.buscarArticulo = function () {

        var url = url_config.base_urlSails+'/RecommenderModule/recommenderWkx/recommenderWkxAPI?busqueda='+$scope.busqueda


        console.log('url',url);
        $http.get(url)
          .success(function (data) {
            console.log(data);
            $scope.articles = data.resource;

          })
          .error(function (err) {
          });

        $scope.configPages = function() {
          $scope.pages.length = 0;
          var ini = $scope.currentPage - 4;
          var fin = $scope.currentPage + 5;
          if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.articles.length / $scope.pageSize) > 10)
              fin = 10;
            else
              fin = Math.ceil($scope.articles.length / $scope.pageSize);
          } else {
            if (ini >= Math.ceil($scope.articles.length / $scope.pageSize) - 10) {
              ini = Math.ceil($scope.articles.length / $scope.pageSize) - 10;
              fin = Math.ceil($scope.articles.length / $scope.pageSize);
            }
          }
          if (ini < 1) ini = 1;
          for (var i = ini; i <= fin; i++) {
            $scope.pages.push({
              no: i
            });
          }

          if ($scope.currentPage >= $scope.pages.length)
            $scope.currentPage = $scope.pages.length - 1;
        };

        $scope.setPage = function(index) {
          $scope.currentPage = index - 1;
        };
      }

      $scope.irRecomendacion = function () {

        var url = url_config.base_url+'RecommenderWkx/bringParametersCreatorAPI?resourceId='+$scope.resourceId


        console.log('url',url);
        $http.get(url)
          .success(function (data) {
            console.log(data);
            $scope.articles = data;

          })
          .error(function (err) {
          });

        $scope.configPages = function() {
          $scope.pages.length = 0;
          var ini = $scope.currentPage - 4;
          var fin = $scope.currentPage + 8;
          if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.articles.length / $scope.pageSize) > 10)
              fin = 10;
            else
              fin = Math.ceil($scope.articles.length / $scope.pageSize);
          } else {
            if (ini >= Math.ceil($scope.articles.length / $scope.pageSize) - 10) {
              ini = Math.ceil($scope.articles.length / $scope.pageSize) - 10;
              fin = Math.ceil($scope.articles.length / $scope.pageSize);
            }
          }
          if (ini < 1) ini = 1;
          for (var i = ini; i <= fin; i++) {
            $scope.pages.push({
              no: i
            });
          }

          if ($scope.currentPage >= $scope.pages.length)
            $scope.currentPage = $scope.pages.length - 1;
        };

        $scope.setPage = function(index) {
          $scope.currentPage = index - 1;
        };
      }


    }
  )

  .filter('startFromGrid', function() {
    return function(input, start) {
      start = +start;
      return input.slice(start);
    }
  });


angularApp.controller("Controller",function ($scope,$http) {

  $scope.responseJson= [];

  var prefix = "PREFIX acm: <http://acm.rkbexplorer.com/id/>\n"+
    "PREFIX ieee: <http://ieee.rkbexplorer.com/id/>\n"+
    "PREFIX dblp: <http://dblp.rkbexplorer.com/id/>\n"+
    "PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
    "PREFIX akt:  <http://www.aktors.org/ontology/portal#>\n" +
    "PREFIX owl:  <http://www.w3.org/2002/07/owl#>\n" +
    "PREFIX iai: <http://www.iai.uni-sb.de/resist#>\n"+
    "PREFIX dc: <http://purl.org/dc/elements/1.1/>\n"+
    "PREFIX dct: <http://purl.org/dc/terms/>\n" +
    "PREFIX akts: <http://www.aktors.org/ontology/support#>\n"+
    "PREFIX unlocode: <http://unlocode.rkbexplorer.com/id/>\n" +
    "PREFIX class: <http://acm.rkbexplorer.com/ontologies/acm#>\n"+
    "PREFIX extension: <http://www.aktors.org/ontology/extension#>\n\n"



  var querySparql = "SELECT DISTINCT ?links ?o" +
  "WHERE {<http://acm.rkbexplorer.com/id/100233> ?links ?o}" +
  "Limit 20"

  let endPointAcm ="http://acm.rkbexplorer.com/sparql/";
  let queryParametersSparql = "?format=json&query=";
  let apiAcm = endPointAcm + queryParametersSparql  //api de ACM con sus parametros

  // let id_Prefix = "PREFIX+id%3A%3Chttp%3A%2F%2Facm.rkbexplorer.com%2Fid%2F%3E%0D%0A";
  // let rdf_Prefix = "PREFIX+rdf%3A%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0A";
  // let rdfs_Prefix = "PREFIX+rdfs%3A%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0A";
  // let akt_Prefix = "PREFIX+akt%3A%3Chttp%3A%2F%2Fwww.aktors.org%2Fontology%2Fportal%23%3E%0D%0A";
  // let owl_Prefix = "PREFIX+owl%3A%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0D%0A";
  // let akts_Prefix = "PREFIX+akts%3A%3Chttp%3A%2F%2Fwww.aktors.org%2Fontology%2Fsupport%23%3E%0D%0A";
  //
  // let prefix = id_Prefix+rdf_Prefix+rdfs_Prefix+akt_Prefix+owl_Prefix+akt_Prefix+akts_Prefix  //Prefijos Publicaciones ACM (Tomar en cuenta que akt_Prefix se repite para que funcione la consulta)

  // let select = "SELECT+DISTINCT+%3Flinks+%3Fo%0D%0A";
  // let where = "WHERE+%7B%3Chttp%3A%2F%2Facm.rkbexplorer.com%2Fid%2F100233%3E+%3Flinks+%3Fo%7D%0D%0A";
  // let limit = "Limit+20";
  // let querySparql = select+where+limit; //consulta Sparql
  let query = prefix+querySparql

  let concatenation = apiAcm+encodeURIComponent(query);


  var req = {
    method: 'GET',
    url: concatenation,
    headers: {
      'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization',
      'Content-Type': 'application/json' ,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Origin': '*'
    },
    // data: { test: 'test' }
  }

  // $http(req).then(function(){...}, function(){...});
  $http.get(req)
    .success(function (data){
      console.log(data);
      $scope.responseJson = data.results.bindings;
      console.log("la url es:" + concatenation);
      console.log("numero de articulos:" + $scope.responseJson.length);

      for(let i = 0;i<$scope.responseJson.length;i ++){
        let linksValue = $scope.responseJson[i].links.value
        let linksType = $scope.responseJson[i].links.type
        let oValue = $scope.responseJson[i].o.value
        let oType = $scope.responseJson[i].o.type
        console.log(i+1+": valor de links es:"+ linksValue);
        console.log(i+1+": tipo de links es:"+ linksType);
        console.log(i+1+": valor de o es:"+ oValue);
        console.log(i+1+": tipo de o es:"+ oType);
      }
    })
    .error(function (err) {
    });

});
