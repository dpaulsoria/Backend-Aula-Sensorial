// models/file.js
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define("File", {
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    size: DataTypes.INTEGER,
    mimeType: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });

  return File;
};
