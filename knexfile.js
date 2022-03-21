// Update with your config settings.

module.exports = {
	development: {
		client: 'mysql',
		connection: {
			host: 'localhost',
			port: 3306,
			user: 'root',
			password: 'passwordd',
			database: 'yappi_invest',
		},
		migrations: {
			directory: './src/database/migrations',
		},
		useNullAsDefault: true,
	},
	test: {
		client: 'mysql',
		connection: {
			host: 'localhost',
			port: 3306,
			user: 'root',
			password: 'passwordd',
			database: 'yappi_invest_test',
		},
		migrations: {
			directory: './src/database/migrations',
		},
		useNullAsDefault: true,
	},
};
