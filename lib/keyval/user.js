const User = {};

User._score = 0;
User._lives = 3;

User.setScore = (score) => {
	User._score = score;
};

User.getScore = () => {
	return User._score;
};

User.setLives = (lives) => {
	User._lives = lives;
};

User.getLives = () => {
	return User._lives;
};

module.exports = User;