const fs = require('fs');

const Loader = {};

Loader.list = (path, callback) => {
	const regex = /(.json)$/i;

	fs.readdir(path, (err, files) => {
		if(err) throw err;
			
		const list = files.filter((file) => {
			return regex.test(file);
		});

		callback(list);
	});
};

Loader.load = (path, callback) => {
	let str = '';

	const readStream = fs.createReadStream(path, 'utf8');

	readStream.on('data', (chunk) => {
		str += chunk.toString('utf8');
	});

	readStream.on('error', (err) => {
		throw err;
	});

	readStream.on('end', () => {
		callback(JSON.parse(str));
	});
};

module.exports = Loader;




