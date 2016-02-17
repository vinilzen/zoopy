var gulp            = require('gulp'),
	sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
	browserSync     = require('browser-sync').create(),
    // prefix          = require('gulp-autoprefixer'),
	slim            = require("gulp-slim"),
    svgSprite       = require("gulp-svg-sprites");

var bootstrapDir = 'bower_components/bootstrap-sass';

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        ghostMode: false,
        open: false
    });

    gulp.watch("sass/*.scss", ['sass']);
	gulp.watch(bootstrapDir+"/assets/stylesheets/*/*.scss", ['sass']);
	gulp.watch("slim/*.slim", ['slim']);
	gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('slim', function(){
  gulp.src(["slim/index.slim", "slim/create-profile.slim", "slim/layout.slim"])
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("./"));
});

gulp.task('sass', function() {
    return gulp.src("sass/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [bootstrapDir + '/assets/stylesheets'],
        }).on('error', sass.logError))
        // .pipe(prefix("last 1 version", "> 1%"))
        .pipe(sourcemaps.write('.', {includeContent: false}))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

/* copy */
gulp.task('icons', function() { 
    return gulp.src(bootstrapDir+'/assets/fonts/bootstrap/**.*') 
        .pipe(gulp.dest('./fonts/bootstrap')); 
});
gulp.task('bootstrapjs', function() { 
    return gulp.src(bootstrapDir+'/assets/javascripts/bootstrap.min.js') 
        .pipe(gulp.dest('./js')); 
});
gulp.task('jqueryjs', function() { 
    return gulp.src('bower_components/jquery/dist/jquery.min.js') 
        .pipe(gulp.dest('./js')); 
});


gulp.task('sprites', function () {
    return gulp.src('svg/*.svg')
        .pipe(svgSprite({
            mode: 'symbols',
            common: 'iconzoopy',
            layout: 'diagonal',
            selector: "icon-%f",
            svg: {
                symbols: 'symbols.svg'
            }
            // cssFile: "scss/_sprite.scss",  for sprite mod
        }))
        .pipe(gulp.dest("./"));
});

gulp.task('default', ['serve', 'bootstrapjs', 'jqueryjs', 'icons']);
