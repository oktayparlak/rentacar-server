const Vehicle = require('../models/Vehicle');

/** Create */
exports.create = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    return res.status(201).status(vehicle);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/** Read */
exports.getAll = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { isDeleted: false } });
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ where: { id: req.params.id, isDeleted: false } });
    if (!vehicle) return res.status(404).json({ error: { message: 'Vehicle not found!' } });
    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/** Update */
exports.update = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ where: { id: req.params.id, isDeleted: false } });
    if (!vehicle) return res.status(404).json({ error: { message: 'Vehicle not found!' } });
    await vehicle.update(req.body);
    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/** Delete */
exports.delete = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ where: { id: req.params.id, isDeleted: false } });
    if (!vehicle) return res.status(404).json({ error: { message: 'Vehicle not found!' } });
    await vehicle.update({ isDeleted: true });
    return res.status(200).json({ message: 'Vehicle deleted successfully!' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
