const express = require('express');
const router = express.Router();
const service = require('../services/ticket.service');

router.get('/tickets/:code/summary', async (req, res) => {
  const data = await service.getSummary(req.params.code);
  res.json(data);
});

router.post('/surveys', async (req, res) => {
  const { ticket_id, csat_score, comment } = req.body;
  if (!ticket_id || !csat_score) return res.status(400).json({ error: "DU_LIEU_KHONG_HOP_LE" });
  const data = await service.submitSurvey(ticket_id, csat_score, comment);
  res.status(201).json(data);
});

module.exports = router;
