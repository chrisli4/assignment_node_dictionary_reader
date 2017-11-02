const Scoreboard = {};

const exists = (scores, name) => {
	return scores[name] !== undefined;
};

Scoreboard.logic = (name, curr, scores = {}, callback) => {

	const e = exists(scores, name);
	const len = Object.keys(scores).length;

	if(e) {
		const prev = scores[name];

		if(curr > prev) {
			scores[name] = curr;
		}
	}

	if(!e) {	
		if(len < 5)
			scores[name] = curr;
		if(len === 5) {

			const sortable = [];
			for(var key in scores) {
				sortable.push([key, scores[key]]);
			};

			sortable.sort((a, b) => {
				return b[1] - a[1];
			});

			if(curr > sortable[4][1]){
				sortable[4][0] = name;
				sortable[4][1] = curr;

				let scores = {};

				for(var i = 0; i < sortable.length; i++) {
					scores[sortable[i][0]] = sortable[i][1];
				};
			};
		};
	};
	 callback(scores);
};

/*
Scoreboard.logic('jhon', 5, {"chris":6,"jason":0,"david":1,"calvin":2,"jan":1}, (r) => {
	console.log(r);
})
*/

module.exports = Scoreboard;