
const Dict = {};

Dict.process = (dictionary, callback) => {

	const count = Object.keys(dictionary).length;
	const freq = new Map();

	for(var word in dictionary) {
		if(dictionary.hasOwnProperty(word)) {
			const letter = word.slice(0,1);

			if(freq.get(letter) === undefined)
				freq.set(letter, 1);
			else {
				const num = freq.get(letter);
				freq.set(letter, num + 1);
			};
		};
	};

	callback(count, freq);
};


module.exports = Dict;