// Creación del módulo
var angularApp = angular.module('appRecommenderLayout', ['ui.bootstrap']);
angularApp.controller("layoutController",function () {
}).factory('urlService', function() {
  // var pathServer = 'JavaAPIRecom/api/articulos/'
  var pathServer = 'JavaAPI/api/articulos/'
    return {
      url:{},
      pathServer: pathServer
    };
});

angularApp.controller('mainWikindxController',
    function($scope, urlService, $http) {
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.pages = [];
      $scope.articles = [];
      $scope.busqueda = "";
      $scope.resourceId;

      $scope.buscarArticulo = function () {

        urlService.url.sails = $scope.url;
        console.log('urlService.url.sails',urlService.url.sails);
        var url = urlService.url.sails+'RecommenderModule/recommenderWkx/recommenderWkxAPI?busqueda='+$scope.busqueda

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

        var url = urlService.url.sails+'RecommenderWkx/bringParametersCreatorAPI?resourceId='+$scope.resourceId
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
  ).filter('startFromGrid', function() {
    return function(input, start) {
      if (!input || !input.length) { return; }
      start = +start; //parse to int
      return input.slice(start);
    }
  });

angularApp.controller("recommenderController",function ($scope,$http, $log, urlService) {

  // let TitleLucene = $("#title").val();    //get value of keywords of the title
  let fullTitle = $("#fullTitle").text();    //get value of full title
  $scope.showIEEE;
  $scope.showACM;
  $scope.showDBLP;

  $scope.listArticlesIEEE = function () {
    urlService.url.java = $scope.url;
    console.log('urlService.url.java',urlService.url.java);
    let urlSendIEEE = urlService.url.java+urlService.pathServer+"getBusquedaIEEE/?Busqueda="+fullTitle
    $http.get(urlSendIEEE)
      .success(function (data) {
        $scope.showIEEE = true;
        $scope.showACM = false;
        $scope.showDBLP = false;
        $("#ieeeNav").attr("class","nav-item active");
        $("#acmNav").attr("class","nav-item disabled");
        $("#dblpNav").attr("class","nav-item disabled");
        $scope.responseJsonLucene = data;
        console.log("la url es:" +  urlSendIEEE);
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
        $scope.viewby = 10;
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

    urlService.url.java = $scope.url;
    console.log('urlService.url.java',urlService.url.java);
    let urlSendACM = urlService.url.java+urlService.pathServer+"getBusquedaACM/?Busqueda="+fullTitle

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
        $scope.viewby = 10;
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

    urlService.url.java = $scope.url;
    console.log('urlService.url.java',urlService.url.java);
    let urlSendDBLP = urlService.url.java+urlService.pathServer+"getBusquedaDBLP/?Busqueda="+fullTitle
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
        $scope.viewby = 10;
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
  var querySparql = "SELECT DISTINCT ?links ?o\n" +
    "WHERE {<http://acm.rkbexplorer.com/id/100233> ?links ?o}\n" +
    "Limit 20"

  let endPointAcm ="http://acm.rkbexplorer.com/sparql/";
  let queryParametersSparql = "?format=json&query=";
  let apiAcm = endPointAcm + queryParametersSparql  //api de ACM con sus parametros


  let query = prefix+querySparql


  let url_proxy = 'http://192.168.1.6:8083/fetch/'
  let concatenation = url_proxy+apiAcm+encodeURIComponent(query);
  $http.get(concatenation)
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

        console.log(i+1+": valor del link es:"+ linksValue);
        console.log(i+1+": tipo del link es:"+ linksType);
        console.log(i+1+": valor del o es:"+ oValue);
        console.log(i+1+": tipo del o es:"+ oType);

      }
    })
    .error(function (err) {
    });


});
