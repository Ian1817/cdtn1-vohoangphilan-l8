const repo = require('../repositories/ticket.repository');
class TicketService {
  async getSummary(code) {
    const ticket = await repo.findByCode(code);
    return { ...ticket, can_survey: ticket.status === 'DA_DONG' };
  }
  async submitSurvey(id, score, comment) {
    return await repo.createSurvey(id, score, comment);
  }
}
module.exports = new TicketService();
