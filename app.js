let express = require('express');
let knex = require('knex');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const Playlist = require('./models/playlist');
const Track = require('./models/track');
const Artist = require('./models/artist');
const Album = require('./models/album');

const {Op} = Sequelize;
let WebSocket = require('ws');
let wss = new WebSocket.Server({port: process.env.PORT || 8080});
let app = express();

app.use(bodyParser.json);

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

app.get('/api/playlists', function(request, response) {

  let filter = {};
  let {q} = request.query;
  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`
        }
      }
    }
  }
  Playlist.findAll(filter).then((playlists) => {
    response.json(playlists);
  });
});

app.get('/api/playlists/:id', function(request, response) {
  
  let {id} = request.params;
  
  Playlist.findByPk(id).then((playlist) => {
    if (playlist) {
      response.json(playlist);
    }
    else {
      response.status(404).send();
    }
  });
});

app.get('/api/tracks', function(request, response) {
  Track.findAll().then((tracks) => {
    response.json(tracks);
  })
})

app.post('/api/tracks', function(request, response) {
  Track.create({
    name: request.body.name
  }).then((artist) => {
    response.json(artist);
  }, (validation) => {
    response.status(422).json({
      errors: validation.errors.map((error) => {
        return {
          attribute: error.path,
          message: error.message
        }
      })
    });
  });
})
app.listen(process.env.PORT || 8000);