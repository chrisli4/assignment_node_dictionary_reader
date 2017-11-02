
const UI = {};

//prompts
UI.one = (files) => {
	const a = ['  Welcome to the Node Dictionary Reader!', 
				 ' ======================================', 
				 '  Enter q to quit', 
				 '', 
				 '', 
				 '  Select a dictionary to load:'];

	for(let i = 0; i < files.length; i++) {
		a.push(`  ${ i + 1 }. ${ files[i] }`);
	};

	UI.iterate(a);
};

UI.two = (name, count, freq) => {
	const a = ['', 
			   '', 
			   ' File Statistics', 
			   ' ======================================', 
			   `  Successfully loaded: ${ name }`, 
			   `  Word count: ${ count }`, 
			   '  Word frequency by starting letter:'];

	for(let [word, def] of freq) {
		word = word.toUpperCase();
		a.push(`  ${ word }: ${ def }`);
	};

	UI.iterate(a);
};

UI.five = (match) => {
	const a = ['',
			   '', 
			   ' Search Results', 
			   ' ======================================', 
			   `  Found ${ Object.keys(match).length } matches`];

	for(var word in match) {
		a.push(`  ${ word }: ${ match[word] }`);
	}

	UI.iterate(a);
}

UI.game = (game) => {
	const a = ['',
			   '',
			   ' Definition',
			   ' ======================================',
			   ` ${ game.question }`, 
			   '',
			   ' Select the Correct Word',
			   ' ======================================', 
			   ' '];

	for(var word in game) {
		if(game.hasOwnProperty(word)) {
			if(word !== 'answer' && word !== 'question')
				a.push(` ${ game[word].number }. ${ word }`);
		}
	}

	UI.iterate(a);
}

UI.score = (score, lives) => {
	const a = ['',
			   ' Current Stats',
			   ' ======================================',
			   ` Score: ${ score } Lives: ${ lives }`];

	UI.iterate(a);
}

UI.leaderboard = (scores) => {

	let i = 1;

	const a = ['',
			  ' High Scores',
			  ' ======================================'];

	for(var key in scores) {
		a.push(` ${ i }. ${ key }: ${ scores[key] }`);
		i++;
	};

	UI.iterate(a);
};

UI.static = (i) => {
	
	let a = [];

	switch(i) {
		case 3: 
				a = ['', 
			   		'', 
			   		' Perform Search', 
			   		' ======================================', 
					'  What kind of search?', 
			   		'  1: Exact', 
			   		'  2: Partial', 
			   		'  3: Begins With', 
			   		'  4: Ends With',
			   		'  5: Anagram',
			   		'  6: Subset',
			   		'  7: Subset With Duplicates',
			   		'',
			   		'',
			   		' Play Games',
			   		' ======================================',
			   		' 8: Definition Game',
			   		' 9: Words from Words Game'];
			   		break;
		case 4: 
				a = ['Enter the search term:'];
					break;
		case 6:
				a = ['', 
			        '', 
			   		' Save Results', 
			   		' ======================================', 
			   		'  Do you want to save results? y/n? "q" quits.'];
			   		break;
		case 7:
				a = ['', 
			   		'  What filepath should we write results to?'];
			   		break;
		case 8: 
				a = ['', 
			   		'  That file exists, overwrite? y/n? "q" quits.'];
			   		break;
		case 9:
				a = ['', 
			   		'  File successfully written!'];
		case 10:
				a = ['', 
			   		'  File successfully overwritten!'];
			   		break;
		case 11: 
				a = ['',
					'  File was not written.'];
					break;
		case 12: 
				a = ['',
					'  File failed to write.'];
					break;
		case 13: 
				a = ['',
					' Enter name for high score:'];
					break;
		case 14: 
				a = ['',
					' Scores saved!!'];
					break;
		default:
			break
	};

	UI.iterate(a);

};

//validators

UI.vfile = (input) => {
	const regex = new RegExp('[a-zA-z.]'); 
	return regex.test(input);
};

UI.vyon = (input) => {
	input = input.toLowerCase();
	return (input === 'yes' || input === 'no');
};

UI.vy = (input) => {
	input = input.toLowerCase();
	return (input === 'yes' || input === 'y');
}

UI.vtext = (input) => {
	const regex = new RegExp('[a-zA-z]'); 
	return regex.test(input);
};

UI.vrange = (min, max) => {
	return (input) => {
		const num = parseInt(input);
		return num > min && num <= max; 
	}
};

UI.iterate = (prompt) => {
	for(var i = 0; i < prompt.length; i++) {
		console.log(prompt[i]);
	};
};

UI.interact = (func, callback) => {

	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	process.stdout.write('=> ');
	process.stdin.on('data', this.eventListener = (i) => {

		i = i.trim();
		const valid = func(i);
		
		if(i === 'q')
			process.exit();
		else if(valid) {
			process.stdin.pause();
			process.stdin.removeListener('data', this.eventListener);
			callback(i);
		} else
			console.log(`Invalid Input: ${ i }`);
	});
};

UI.yes = (callback) => {

	UI.interact(UI.vyon, (yon) => {
		const yes = UI.vy(yon);

		if(yes)
			callback();
		else 
			console.log('Good bye!');

	});
}


module.exports = UI;


