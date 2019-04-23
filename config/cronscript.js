const fs = require('fs');

const findOldFiles = (dir, files_) => {
	files_ = files_ || [];
	var files = fs.readdirSync(dir);
	for (var i in files) {
		var name = dir + '/' + files[i];
		if (fs.statSync(name).isDirectory()) {
			getFiles(name, files_);
		} else {
			const stat = fs.statSync(name);
			const diffInMs = Date.now() - stat.atime; // Result is in ms
			const diffInMn = Math.floor(diffInMs / (1000 * 60)); // in mn
			const thirtyDays = 30 * 24 * 60; // in mn
			if (diffInMn > thirtyDays) {
				files_.push(name);
			}
		}
	}
	return files_;
}

function printOldFiles() {
	console.log(findOldFiles(__dirname + '/../downloads'));
}
module.exports.printOldFiles = printOldFiles;