'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //AQUÍ SE DEFINEN LAS RELACIONES DE MIS MODELOS
    static associate(models) {
      Region.hasMany(models.Provincia,{
        foreignKey: 'regionId',
        as: 'provincias'
      })
      
    }
  }
  Region.init({
    nombre: DataTypes.STRING,
    ordinalidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Region',
    tableName: 'Regiones'
  });
  return Region;
};