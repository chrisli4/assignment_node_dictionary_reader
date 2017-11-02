
const Searcher = {};

const regexTest = (phrase, word) => {
	return phrase.test(word);
};

const anagramTest = (phrase, word) => {
	if(phrase.length === word.length) {
		const parr = phrase.split('').sort().join('');
		const warr = word.split('').sort().join('');
		return parr === warr;
	} else 
		return false;
};

const subsetTest = (phrase, word) => {
	for(var i = 0; i < word.length; i++) {
		const letter = word[i];
		if(phrase.indexOf(letter) === -1 || word.indexOf(letter) !== i)
			break;
		if(i + 1 === word.length)
			return true;
	};
	return false;
};

const subsetdTest = (phrase, word) => {
	for(var i = 0; i < word.length; i++) {
		const letter = word[i];
		if(phrase.indexOf(letter) === -1)
			break;
		if(i + 1 === word.length)
			return true;
	};
	return false;
};

Searcher.__find = (phrase, dictionary, func) => {
	const found = {};

	for(var word in dictionary) {
		if(dictionary.hasOwnProperty(word)) {
			if(func(phrase, word))
				found[word] = dictionary[word];
		}
	};
	return found;
};

Searcher.exact = (phrase, dictionary) => {
	phrase = phrase.trim();
	const regex = new RegExp(`^${ phrase }$`);

	return Searcher.__find(regex, dictionary, regexTest);
};

Searcher.partial = (phrase, dictionary) => {
	phrase = phrase.trim()
	const regex = new RegExp(`(${ phrase })`);

	return Searcher.__find(regex, dictionary, regexTest);
};

Searcher.begins = (phrase, dictionary) => {
	phrase = phrase.trim();
	const regex = new RegExp(`^${ phrase }`);

	return Searcher.__find(regex, dictionary, regexTest);
};

Searcher.ends = (phrase, dictionary) => {
	phrase = phrase.trim();
	const regex = new RegExp(`${ phrase }$`);

	return Searcher.__find(regex, dictionary, regexTest);
};

Searcher.anagram = (phrase, dictionary) => {
	phrase = phrase.trim();

	return Searcher.__find(phrase, dictionary, anagramTest);
};

Searcher.subset = (phrase, dictionary) => {
	phrase = phrase.trim();

	return Searcher.__find(phrase, dictionary, subsetTest);
};

Searcher.subsetd = (phrase, dictionary) => {
	phrase = phrase.trim();

	return Searcher.__find(phrase, dictionary, subsetdTest);
};


Searcher.performSearch = (select, searchTerm, dictionary) => {

	switch(select) {
		case 1:
			return Searcher.exact(searchTerm, dictionary);
		case 2:
			return Searcher.partial(searchTerm, dictionary);
		case 3:
			return Searcher.begins(searchTerm, dictionary);
		case 4:
			return Searcher.ends(searchTerm, dictionary);
		case 5:
			return Searcher.anagram(searchTerm, dictionary);
		case 6:
			return Searcher.subset(searchTerm, dictionary);
		case 7:
			return Searcher.subsetd(searchTerm, dictionary);
		default:
			break;
	};
}

module.exports = Searcher;