var gulp = require('gulp');
var trans = require('./');


gulp.task('default', function() {
	gulp.src('data/src/*.md')
		.pipe(trans())
		.pipe(gulp.dest('data/dist'));
		 
		var open = require("open");
		open("./data/dist/sample.html");
});
