const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    ataque: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    defensa: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    velocidad: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    altura: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    peso: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    img: {
      type: DataTypes.BLOB
    }
  });
};
