'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var marked = require('gulp-markdown-livereload');
var fs = require('fs');
var BufferHelper = require('bufferhelper');

var Handlebars = require('handlebars');


module.exports = function (options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-markdown', 'Streaming not supported'));
			return;
		}
		
		var rs = fs.createReadStream('res/template.html', {encoding: 'utf-8', bufferSize: 11}); 
		var bufferHelper = new BufferHelper();

		rs.on("data", function (trunk){
				bufferHelper.concat(trunk);
		});
		
		rs.on("end", function () {
			var source = bufferHelper.toBuffer().toString();
			var template = Handlebars.compile(source);
			
			marked(file.contents.toString(), options, function (err, data) {
				if (err) {
					cb(new gutil.PluginError('gulp-markdown', err, {fileName: file.path}));
					return;
				}
			
				console.log(data);
				var m_h = new Buffer(data);
			
			
				var css_link = "ddsds";
				var data1 = {
					"css_link": "css_link",
					"parse_markdown": data
				};
			
				file.contents = new Buffer( template(data1) );
				file.path = gutil.replaceExtension(file.path, '.html');

				cb(null, file);
			});
			
		});

		
	});
};
