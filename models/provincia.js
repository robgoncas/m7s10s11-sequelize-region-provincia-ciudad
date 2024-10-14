'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provincia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Provincia.hasMany(models.Ciudad,{
        foreignKey:'provinciaId',
        as:'ciudades'
      });

      Provincia.belongsTo(models.Region, {
        foreignKey: 'regionId',
        as: 'regiones'
      });

    }
  }
  Provincia.init({
    nombre: DataTypes.STRING,
    regionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Provincia',
    tableName: 'Provincias'
  });
  return Provincia;
};