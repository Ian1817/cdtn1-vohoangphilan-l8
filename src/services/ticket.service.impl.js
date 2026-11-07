const ticketRepository = require('../repositories/ticket.repository');

class TicketServiceImpl {
  async getSummary(ticketCode) {
    const ticket = await ticketRepository.findByCode(ticketCode);
    if (!ticket) {
      const error = new Error('KHONG_TIM_THAY_PHIEU');
      error.statusCode = 404;
      throw error;
    }
    return {
      ticket_id: ticket.ticket_id,
      ticket_code: ticket.ticket_code,
      device_name: ticket.device_name,
      technician_name: ticket.technician_name,
      status: ticket.status,
      can_survey: ticket.status === 'DA_DONG'
    };
  }

  async submitSurvey(payload) {
    const { ticket_code, csat_score, nps_score, comment } = payload;
    if (!ticket_code || csat_score === undefined) {
      const error = new Error('DU_LIEU_KHONG_HOP_LE');
      error.statusCode = 400;
      throw error;
    }
    const ticket = await ticketRepository.findByCode(ticket_code);
    if (!ticket) {
      const error = new Error('KHONG_TIM_THAY_PHIEU');
      error.statusCode = 404;
      throw error;
    }
    if (ticket.status !== 'DA_DONG') {
      const error = new Error('PHIEU_CHUA_DONG_KHONG_THE_KHAO_SAT');
      error.statusCode = 400;
      throw error;
    }
    return await ticketRepository.createSurvey(ticket.ticket_id, csat_score, nps_score, comment);
  }

  // CRUD cho Warranty Tickets
  async createTicket(data) { return await ticketRepository.createTicket(data); }
  async updateTicketStatus(code, status) { return await ticketRepository.updateTicketStatus(code, status); }
  async deleteTicket(code) { return await ticketRepository.deleteTicket(code); }

  // CRUD cho Customers
  async getAllCustomers() { return await ticketRepository.getAllCustomers(); }
  async createCustomer(data) { return await ticketRepository.createCustomer(data); }
  async updateCustomer(id, data) { return await ticketRepository.updateCustomer(id, data); }
  async deleteCustomer(id) { return await ticketRepository.deleteCustomer(id); }

  // API Báo cáo & Danh sách
  async getCsatReport() { return await ticketRepository.getCsatReport(); }
  async getAllSurveys() { return await ticketRepository.getAllSurveys(); }
}

module.exports = new TicketServiceImpl();