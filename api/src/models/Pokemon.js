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
      // id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   autoIncrement: true,
      // get() {
      //   const idCreated = this.getDataValue('id') + 1000;
      //   return idCreated}
      // },
      // apiId: {type: DataTypes.INTEGER,
      //   primaryKey: true,

      // },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hp: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      strength: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      defense: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      speed: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      height: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      weight: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      img: {
        type: DataTypes.STRING
      },
      created: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {timestamps: false}
  );
};
 