const through = require('through2'),
	cheerio = require('cheerio');

const text = '<script>' +
	'document.write(\'<script src="http://\' + (location.host || \'localhost\').split(\':\')[0] + \':35729/livereload.js?snipver=1"></\' + \'script>\')' +
	'</script>';


function injector() {
	return through.obj(function(file, enc, cb) {
		if(file.isNull()) {
			return cb(null, file);
		}

		if(file.isBuffer()) {
			const $ = cheerio.load(file.contents.toString());

			$('head').append(text);

			file.contents = new Buffer($.html());
		}

		cb(null, file);
	});
}


module.exports = injector;