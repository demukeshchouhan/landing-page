var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
	  root: './',
	  livereload: true
	});
});


gulp.task("sass", () => {
	return gulp.src("./scss/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(rename((path) => {
			path.basename = "style"
			path.extname = ".css" 
		}))
		.pipe(gulp.dest("./css"))
		.pipe(connect.reload());
});



gulp.task("watcher", () => {
	gulp.watch("./scss/**/*.scss", ["sass"])
});


gulp.task('default', ["watcher", "connect"]);