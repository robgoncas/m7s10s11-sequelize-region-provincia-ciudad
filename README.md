# Paso a paso para implementar el proyecto con Sequelize


# 1. Inicializar el proyecto

# 2. Configurar la base de datos

# 3. Crear los modelos y migraciones

# 4. Modificar las migraciones para las relaciones

# 5. Definir las relaciones en los modelos

# 6. Correr las migraciones

# 7. Crear los controladores

# 8. Crear el servidor con Express


## 1. Inicializar el proyecto

1. Inicializar npm
    ```bash
    npm init -y
    ```

2. Instalar Sequelize y PostgreSQL
    ```bash
    npm install sequelize pg pg-hstore
    ```

3. Instalar `sequelize-cli` (como dependencia de desarrollo)
    ```bash
    npm install --save-dev sequelize-cli
    ```

4. Inicializar Sequelize (genera la estructura base)
    ```bash
    npx sequelize-cli init
    ```

## 2. Configurar la base de datos

1. Modificar el archivo `config/config.json` para conectar a PostgreSQL:
    ```json
    {
      "development": {
        "username": "tu_usuario",
        "password": "tu_contraseña",
        "database": "nombre_base_datos",
        "host": "127.0.0.1",
        "dialect": "postgres"
      }
    }
    ```

## 3. Crear los modelos y migraciones

1. Crear el modelo y migración para **Regiones**
    ```bash
    npx sequelize-cli model:generate --name Region --attributes nombre:string
    ```

2. Crear el modelo y migración para **Provincias**
    ```bash
    npx sequelize-cli model:generate --name Provincia --attributes nombre:string,regionId:integer
    ```

3. Crear el modelo y migración para **Ciudades**
    ```bash
    npx sequelize-cli model:generate --name Ciudad --attributes nombre:string,provinciaId:integer
    ```

## 4. Modificar las migraciones para las relaciones

1. **Regiones**: Sin cambios necesarios.

2. **Provincias**: Editar la migración `create-Provincia.js` para agregar la clave foránea `regionId`.
    ```js
    regionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Regiones',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
    ```

3. **Ciudades**: Editar la migración `create-Ciudad.js` para agregar la clave foránea `provinciaId`.
    ```js
    provinciaId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Provincias',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
    ```

## 5. Definir las relaciones en los modelos

1. **Modelo Región** (`models/region.js`)
    ```js
    Region.associate = function(models) {
      Region.hasMany(models.Provincia, {
        foreignKey: 'regionId',
        as: 'provincias'
      });
    };
    ```

2. **Modelo Provincia** (`models/provincia.js`)
    ```js
    Provincia.associate = function(models) {
      Provincia.belongsTo(models.Region, {
        foreignKey: 'regionId',
        as: 'region'
      });
      Provincia.hasMany(models.Ciudad, {
        foreignKey: 'provinciaId',
        as: 'ciudades'
      });
    };
    ```

3. **Modelo Ciudad** (`models/ciudad.js`)
    ```js
    Ciudad.associate = function(models) {
      Ciudad.belongsTo(models.Provincia, {
        foreignKey: 'provinciaId',
        as: 'provincia'
      });
    };
    ```

## 6. Correr las migraciones

1. Ejecutar todas las migraciones para crear las tablas en la base de datos:
    ```bash
    npx sequelize-cli db:migrate:undo:all //Eliminar migración dentro de la BD

    npx sequelize-cli db:migrate
    ```

## 7. Crear los controladores

1. Crear el archivo **controller/regionController.js**:
    ```js
    const { Region, Provincia, Ciudad } = require('../models');

    exports.createRegion = async (req, res) => {
      const region = await Region.create(req.body);
      res.status(201).json(region);
    };

    exports.getAllRegions = async (req, res) => {
      const regiones = await Region.findAll({ include: [{ model: Provincia, as: 'provincias' }] });
      res.status(200).json(regiones);
    };

    exports.getRegionById = async (req, res) => {
      const region = await Region.findByPk(req.params.id, { include: [{ model: Provincia, as: 'provincias' }] });
      res.status(200).json(region);
    };

    exports.updateRegion = async (req, res) => {
      await Region.update(req.body, { where: { id: req.params.id } });
      const region = await Region.findByPk(req.params.id);
      res.status(200).json(region);
    };

    exports.deleteRegion = async (req, res) => {
      await Region.destroy({ where: { id: req.params.id } });
      res.status(204).send();
    };
    ```

2. Repetir este proceso para los controladores de **Provincias** y **Ciudades**, creando archivos `provinciaController.js` y `ciudadController.js`.

## 8. Crear el servidor con Express

1. Crear el archivo **server.js**:
    ```js
    const express = require('express');
    const app = express();
    const regionController = require('./controllers/regionController');

    app.use(express.json());

    
    ```

2. Probar las rutas con herramientas como **Postman** o **cURL**.
