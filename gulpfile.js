var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var connect = require('gulp-connect');
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");

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





gulp.task("watcher", () => {
	gulp.watch("./scss/**/*.scss", ["sass"])
});


gulp.task('default', ["watcher", "connect"]);