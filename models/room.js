// //Package for creating unique IDs for each user as they register


// Creating our Room model
module.exports = function(sequelize, DataTypes) {
  const Room = sequelize.define("Room", {
    // The room_name cannot be null and each room has a unique idea
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