
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {title:`Blazing Saddles`,director:`Mel Brooks`,year:1974,rating:8},
        {title:`The Texas Chain Saw Massacre`,director:`Tobe Hooper`,year:1974,rating:8},
        {title:`The Return of the Pink Panther`,director:`Blake Edwards`,year:1975,rating:7},
        {title:`One Flew Over the Cuckoo's Nest`,director:`Milos Forman`,year:1975,rating:9},
        {title:`Death Race 2000`,director:`Paul Bartel`,year:1975,rating:6},
        {title:`Barry Lyndon`,director:`Stanley Kubrick`,year:1975,rating:8},
        {title:`Jaws`,director:`Steven Spielberg`,year:1975,rating:8},
        {title:`Monty Python and the Holy Grail`,director:`Terry Gilliam`,year:1975,rating:8},
        {title:`Family Plot`,director:`Alfred Hitchcock`,year:1976,rating:7},
        {title:`Rocky`,director:`John G. Avildsen`,year:1976,rating:8},
        {title:`Taxi Driver`,director:`Martin Scorsese`,year:1976,rating:8},
        {title:`Silent Movie`,director:`Mel Brooks`,year:1976,rating:7},
        {title:`Logan's Run`,director:`Michael Anderson`,year:1976,rating:7},
        {title:`The Bad News Bears`,director:`Michael Ritchie`,year:1976,rating:7},
        {title:`The Omen`,director:`Richard Donner`,year:1976,rating:8},
      ]);
    });
};
