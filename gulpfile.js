var gulp        = require('gulp'),
	sass        = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	slim = require("gulp-slim");

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

	gulp.watch("scss/*.scss", ['sass']);
	gulp.watch("slim/*.slim", ['slim']);
	gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('slim', function(){
  gulp.src("slim/*.slim")
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("./"));
});

gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);