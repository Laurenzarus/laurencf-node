let express = require('express');
let knex = require('knex');
let WebSocket = require('ws');
let wss = new WebSocket.Server({port: process.env.PORT || 8080});
let app = express();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    wss.clients.forEach((client) => {
      client.send(message);
    });

  });
});

app.get('/api/genres', function(request, response) {
  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: 'chinook.db'
    }
  });

  connection.select().from('genres').then((genres) => {
    response.json(genres);
  });
});

app.get('/api/genres/:id', function(request, response) {
  let id = request.params.id;

  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: 'chinook.db'
    }
  });

  connection
    .select()
    .from('genres')
    .where('GenreId', id)
    .first()
    .then((genre) => {
      if (genre) {
        response.json(genre);
      } else {
        response.status(404).json({
          error: `Genre ${id} not found`
        });
      }
    });
});

//Node 1 Assignment
app.get('/api/artists', function(request, response) {
    let connection = knex({
        client: 'sqlite3',
        connection: {
            filename: 'chinook.db'//can this var name be abstracted out?
        }
    });
    if (request.query.filter) {
        connection
            .select()
            .from('artists')
            .whereRaw('Lower(Name) LIKE ?', ['%' + request.query.filter.toLowerCase() + '%'])
            .then((artists) => {
                artists = artists.map(artist => {
                    var formattedArtist = {};
                    formattedArtist['id'] = artist['ArtistId'];
                    formattedArtist['name'] = artist['Name'];
                    return formattedArtist;
                });
                response.json(artists);
            })
            .catch(() => {//return all artists
                
            });
    }
    else {
        connection
        .select()
        .from('artists')
        .then((artists) => {
            artists = artists.map(artist => {
                var formattedArtist = {};
                formattedArtist['id'] = artist['ArtistId'];
                formattedArtist['name'] = artist['Name'];
                return formattedArtist;
            });
            response.json(artists);
        });
    }
});


app.listen(process.env.PORT || 8000);