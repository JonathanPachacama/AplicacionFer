/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files, and ! in front of an expression to ignore files.)
 *
 * For more information see:
 *   https://github.com/balderdashy/sails-docs/blob/master/anatomy/myApp/tasks/pipeline.js.md
 */


// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)

  //Assets (estamos localizados aqui)

var cssFilesToInject = [
  'styles/**/*.css',
  // 'Bootstrap/css/bootstrap.css',
  '/theme/bower_component/bootstrap/dist/css/bootstrap.css',

    'lib/google-code-prettify/prettify.css',
    'lib/google-code-prettify/prettify-desert.css',
    '/styles/fileinput.css',
    '/styles/busy_indicator.css',
    '/styles/croppie.css',
    '/styles/MisEstilos.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/**/*.js',
  '/theme/plugins/jquery/jquery.min.js',
  '/theme/plugins/datatables/jquery.dataTables.min.js',
  '/theme/plugins/datatables/dataTables.bootstrap4.min.js',
  'js/customValidate.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  // 'js/**/*.js',
  'js/*.js',
  'Bootstrap/js/bootstrap.js',
  'js/angular/main.js',
  'js/recommenderModule/recommendeHeader.js',
  'js/recommenderModule/recommenderWkxView.js',
  '/ui-bootstrap/ui-bootstrap-custom-tpls-2.5.0.js',
  '/theme/bower_component/bootstrap/dist/css/bootstrap.js',


  'js/d3sparql.js',
  'lib/d3/d3.v3.min.js',
  'lib/google-code-prettify/prettify.js',
  '/js/fileinput.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html',
  'templates/d3sparql.html'
];







// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(cssPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (cssPath[0] === '!') {
    return require('path').join('!.tmp/public/', cssPath.substr(1));
  }
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(jsPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (jsPath[0] === '!') {
    return require('path').join('!.tmp/public/', jsPath.substr(1));
  }
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(tplPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (tplPath[0] === '!') {
    return require('path').join('!assets/', tplPath.substr(1));
  }
  return require('path').join('assets/',tplPath);
});


