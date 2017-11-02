const Loader = require('./loader');
const User = require('./User');
const UI = require('./ui');
const Dgame = {};

const randomWord = (dictionary) => {
	const words = Object.keys(dictionary);
	return words[words.length * Math.random() << 0];
}

const select = (dictionary, num) => {

	const selected = {};
	
	while(Object.keys(selected).length !== num) {

		const word = randomWord(dictionary);
		if(selected[word] === undefined)
			selected[word] = dictionary[word];
	}
	return selected;
};

Dgame.setup = (dictionary) => {

	const game = {};
	let i = 1;

	const set = select(dictionary, 5);
	const ans = select(set, 1);	

	const anskey = Object.keys(ans)[0];
	const question = ans[anskey];

	for(var key in set) {

		game[key] = {
					  'def': set[key],
					  'number': i
					};

		if(key === anskey)
			game.answer = i;
			game.question = question;
		i++;
	}

	return game;
};

Dgame.run = (dictionary, callback) => {

	const gObj = Dgame.setup(dictionary);
	UI.game(gObj);

	const arange = UI.vrange(0, 5);
	UI.interact(arange, (u) => {
		u = parseInt(u);

		if(u === gObj.answer) {
			User.setLives(User.getLives() + 1);
			User.setScore(User.getScore() + 1);
			console.log(' Correct!');
		} else {
			User.setLives(User.getLives() - 1);
			console.log(' Wrong!');
		}

		UI.score(User.getScore(), User.getLives());

		User.getLives() > 0 ? Dgame.run(dictionary, callback) : callback(' You Lose!');
	});
};





module.exports = Dgame;
