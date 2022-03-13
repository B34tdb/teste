exports.up = (knex) =>
	knex.schema.createTable('users', (table) => {
		table.increments();
		table.string('name', 128);
		table.string('email').notNullable().unique();
		table.string('password');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table
			.timestamp('updated_at')
			.defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
	});

exports.down = (knex) => knex.schema.dropTable('users');
