const Loader = require('./loader');
const Saver = require('./saver');
const Searcher = require('./searcher');
const UI = require('./ui');
const Dict = require('./dict');
const Dgame = require('./dgame');
const Scoreboard = require('./scoreboard');
const User = require('./user');
const path = require('path');

const Keyval = {};


Keyval.init = (dir) => {

	const p = path.join(dir, 'data/');
	Loader.list(p, (names) => {

		const vlen = UI.vrange(0, names.length);
		UI.one(names);
		UI.interact(vlen, (num) => {

			const file = names[num - 1];
			const fl = path.join(p, file);

			Loader.load(fl, (dictionary) => {

				Dict.process(dictionary, (count, freq) => {

					UI.two(file, count, freq);
					UI.static(3);

					const vrange = UI.vrange(0, 8);
					UI.interact(vrange, (i) => {

						i = parseInt(i);
						if(i < 8) {
							
							UI.static(4);
							UI.interact(UI.vtext, (t) => {

								const result = Searcher.performSearch(i, t, dictionary);
								const resultJSON = JSON.stringify(result);

								UI.five(result);
								UI.static(6);

								UI.yes(() => {
									UI.static(7);
									UI.interact(UI.vfile, (f) => {

										const wpath = path.join(p, f);
									
										Saver.write(wpath, resultJSON, undefined, (r) => {

											if(r.code) {
												UI.static(8);
												UI.yes(() => {
													Saver.write(wpath, resultJSON, r.code, (fr) => {
														if(fr.code)
															UI.static(12);
														else
															UI.static(9);
													});
												});
											} else
												UI.static(9);
										});
									});
								});
							});
						};

						if(i === 8) {
							//Dgame.run(dictionary, (t) => {
								
								const sp = path.join(p, 'score.json');
								Loader.load(sp, (scores) => {

									UI.static(13);
									UI.interact(UI.vtext, (u) => {

										Scoreboard.logic(u, User.getScore(), scores, (r) => {

											UI.leaderboard(r);

											const resultJSON = JSON.stringify(r);
											Saver.overwrite(sp, resultJSON, (s) => {

											});
										});
									});
								});
							
							//});
						};
						if(i === 9) {

							console.log('words game');
						};
					});
				});
			});
		});
	});
}

module.exports = Keyval;



















