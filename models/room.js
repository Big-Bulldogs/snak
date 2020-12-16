// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");

// //Package for creating unique IDs for each user as they register
import { v4 as uuidv4 } from 'uuid';

// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Room = sequelize.define("Room", {
    // The email cannot be null, and must be a proper email before creation
    id:{
      type: DataTypes.CHAR(36),
      defaultValue: sequelize.UUIDV4,
      allowNull: false,
      unique:true,
      primaryKey:true
    },
    room_name:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Room;
};