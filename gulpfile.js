var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var connect = require('gulp-connect');
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var imagemin = require('gulp-imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

gulp.task('connect', function() {
	connect.server({
	  root: './',
	  livereload: true
	});
});


gulp.task("sass", () => {
	var plugins = [
		autoprefixer({
			browsers : ["> 1%", "last 2 versions"]
		})
	];
	return gulp.src("./scss/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(rename((path) => {
			path.basename = "style"
			path.extname = ".css" 
		}))
		.pipe(postcss(plugins))
		.pipe(gulp.dest("./css"))
		.pipe(connect.reload());
});


gulp.task("images", () => {
	gulp.src('./img/*')
	.pipe(imagemin({
		use:[imageminJpegRecompress({
		  loops:4,
		  min: 50,
		  max: 95,
		  quality:'medium' 
		})]
	  }))
        .pipe(gulp.dest('./img'))
});


gulp.task("watcher", () => {
	gulp.watch("./scss/**/*.scss", ["sass"]);
	gulp.watch("./img/**/*", ["images"]);
});


gulp.task('default', ["watcher", "connect"]);