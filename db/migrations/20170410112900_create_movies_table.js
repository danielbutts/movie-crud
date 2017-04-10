
exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('director').notNullable();
    table.integer('year').notNullable();
    table.integer('rating');
    table.string('poster_url');
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movies');
};
