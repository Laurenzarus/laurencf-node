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
    }
  }, {
      timestamps: false
});