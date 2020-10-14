const Pool = require('pg').Pool;

const pool = (item1,item2,item3,item4,item5) =>
	new Pool({
		user: item1,
		password: item2,
		host: item3,
		port: item4,
		database: item5,
	});

module.exports = pool;
