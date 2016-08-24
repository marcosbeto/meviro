/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',

    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'angular2-jwt':               'node_modules/angular2-jwt/angular2-jwt.js',
    'rxjs':                       'node_modules/rxjs',
    'moment':                     'node_modules/moment/moment.js',
    'ng2-meta':                   'node_modules/ng2-meta/dist/meta.service.js',
    'ng2-bootstrap':              'node_modules/ng2-bootstrap',
    'ng2-uploader':               'node_modules/ng2-uploader',
    'ng2-dnd':                    'node_modules/ng2-dnd'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    "angular2-jwt":               { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'ng2-meta':                   { defaultExtension: 'js' },
    'ng2-bootstrap':              { defaultExtension: 'js' },
    'ng2-uploader':               { defaultExtension: 'js' },
    'dragula':                    { defaultExtension: 'js' },
    'ng2-dragula':                { defaultExtension: 'js' },
    'ng2-dnd':                    { defaultExtension: 'js'}
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  // No umd for router yet
  packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);
