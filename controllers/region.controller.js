const { Region } = require('../models');

const crearRegion = async (req, res) => {
  try {
    const nuevaRegion = await Region.create({
      nombre: req.body.nombre,
      ordinalidad: req.body.ordinalidad
    });
    res.status(201).json(nuevaRegion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerRegiones = async (req, res) => {
  try {
    const regiones = await Region.findAll();
    res.status(200).json(regiones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerRegionPorId = async (req, res) => {
  try {
    const region = await Region.findByPk(req.params.id);
    if (!region) {
      return res.status(404).json({ message: 'Región no encontrada' });
    }
    res.status(200).json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarRegion = async (req, res) => {
  try {
    const [filasActualizadas] = await Region.update(
      { nombre: req.body.nombre },
      { where: { id: req.params.id } }
    );

    if (filasActualizadas === 0) {
      return res.status(404).json({ message: 'Región no encontrada' });
    }

    const regionActualizada = await Region.findByPk(req.params.id);
    res.status(200).json(regionActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarRegion = async (req, res) => {
  try {
    const filasEliminadas = await Region.destroy({ where: { id: req.params.id } });
    if (filasEliminadas === 0) {
      return res.status(404).json({ message: 'Región no encontrada' });
    }
    res.status(200).json({ message: 'Región eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearRegion,
  obtenerRegiones,
  obtenerRegionPorId,
  actualizarRegion,
  eliminarRegion,
};
