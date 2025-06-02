const Report = require('../models/Report');

// Get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('reporter reported_user ride');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single report
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate('reporter reported_user ride');
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new report
const createReport = async (req, res) => {
  const report = new Report(req.body);
  try {
    const saved = await report.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update report (e.g. for admin marking as handled)
const updateReport = async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Report not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete report
const deleteReport = async (req, res) => {
  try {
    const deleted = await Report.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Report not found' });
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
