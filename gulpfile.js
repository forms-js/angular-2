var gulp = require('gulp');
var shell = require('gulp-shell');

var PATHS = {
    src: {
      ts: '*.ts',
    }
};

gulp.task('ts', function () {
    return gulp.src(PATHS.src.ts, {read: false})
        .pipe(shell(['node tsc/tsc.js -m amd <%= file.path %>'], {}));
});

gulp.task('play', ['default'], function () {

    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src.ts, ['ts']);

    app = connect().use(serveStatic(__dirname + '/'));  // serve everything that is static
    http.createServer(app).listen(port, function () {
      open('http://localhost:' + port);
    });
});

gulp.task('default', ['ts']);
