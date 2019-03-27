const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('track', {
    id:{
      field: 'TrackId',
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      field: 'Name',
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Track Name required'
        }
      }
    },
    albumId: {
      field: 'AlbumId',
      type: Sequelize.INTEGER
    },
    mediaTypeId: {
      field: 'MediaTypeId',
      type: Sequelize.INTEGER
    },
    genreId: {
      field: 'GenreId',
      type: Sequelize.INTEGER
    },
    composer: {
      field: 'Composer',
      type: Sequelize.STRING
    },
    milliseconds: {
      field: 'Milliseconds',
      type: Sequelize.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "Milliseconds must be numeric"
        }
      }
    },
    bytes: {
      field: 'Bytes',
      type: Sequelize.INTEGER
    },
    unitPrice: {
      field: 'UnitPrice',
      type: Sequelize.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "Unit Price must be numeric"
        }
      }
    }
  }, {
      timestamps: false
});