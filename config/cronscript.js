const fs = require('fs');
const rimraf = require('rimraf');

const isFileTooOld = (filepath) => {
	const diffInMs = Date.now() - fs.statSync(filepath).atime; // Result is in ms
	const diffInMn = Math.floor(diffInMs / (1000 * 60)); // in mn
	const timeLimitInMin = 30 * 24 * 60; // 30 days in mn
	// const timeLimitInMin = 1 // 1 min for testing;
	return (diffInMn > timeLimitInMin);
}

const extensionsToBeDeleted = (filename) => {
	const movieExtensions = ['mkv', 'mp4', 'vtt'];
	const extension = filename.split('.').pop()
	return movieExtensions.includes(extension);
}

const needsToBeDeleted = (file) => {
	return (isFileTooOld(file) && extensionsToBeDeleted(file));
}

const containsAFileToBeDeleted = (folderPath) => {
	var files = fs.readdirSync(folderPath);
	let toBeDeleted = false;
	files.forEach(file => {
		if (needsToBeDeleted(folderPath + '/' + file)) toBeDeleted = true;
	})
	return toBeDeleted;
}


const deleteOldFiles = (dir) => {
	var files = fs.readdirSync(dir);
	for (var i in files) {
		var name = dir + '/' + files[i];
		if (fs.statSync(name).isDirectory()) {
			if (containsAFileToBeDeleted(name) === true) {
				rimraf.sync(name);
				console.log("Deleted directory:", name);
			}
		} else {
			if (needsToBeDeleted(name) === true) {
				fs.unlinkSync(name);
				console.log("Deleted file:", name);
			}
		}
	}
}

function deleteUnusedFiles() {
	deleteOldFiles(__dirname + '/../downloads');
	deleteOldFiles(__dirname + '/../client/public/subtitles');
}
module.exports.deleteUnusedFiles = deleteUnusedFiles;