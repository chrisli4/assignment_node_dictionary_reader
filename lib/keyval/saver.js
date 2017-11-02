const fs = require('fs');

const Saver = {};

Saver.writeFile = (path, results, callback) => {

	fs.writeFile(path, results, { flag : 'wx' }, (err) => {
		if(err) {
			callback(err);
		}
		else 
			callback('SUCCESS');
	});
};

Saver.overwrite = (path, results, callback) => {

	fs.writeFile(path, results, { flag : 'w' }, (err) => {
		if(err) {
			callback(err);
		}
		else 
			callback('SUCCESS');
	});
};

Saver.write = (path, results, code, callback) => {

	switch(code) {
		case 'EEXIST': 
			Saver.overwrite(path, results, callback);
			break;
		default:
			Saver.writeFile(path, results, callback);
	};
};


module.exports = Saver;