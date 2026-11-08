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
    
    // 1. Kiểm tra dữ liệu đầu vào cơ bản
    if (!ticket_code || csat_score === undefined) {
      const error = new Error('DU_LIEU_KHONG_HOP_LE');
      error.statusCode = 400;
      throw error;
    }
    
    // 2. Kiểm tra CSAT từ 1-5
    if (csat_score < 1 || csat_score > 5) {
      const error = new Error('DU_LIEU_KHONG_HOP_LE');
      error.statusCode = 400;
      throw error;
    }
    
    // 3. Kiểm tra NPS từ 0-10
    if (nps_score !== undefined && (nps_score < 0 || nps_score > 10)) {
      const error = new Error('DU_LIEU_KHONG_HOP_LE');
      error.statusCode = 400;
      throw error;
    }
    
    // 4. Kiểm tra độ dài comment (nếu có)
    if (comment && (comment.length < 10 || comment.length > 2000)) {
      const error = new Error('DU_LIEU_KHONG_HOP_LE');
      error.statusCode = 400;
      throw error;
    }
    
    // 5. Kiểm tra phiếu tồn tại
    const ticket = await ticketRepository.findByCode(ticket_code);
    if (!ticket) {
      const error = new Error('KHONG_TIM_THAY_PHIEU');
      error.statusCode = 404;
      throw error;
    }
    
    // 6. Kiểm tra quy tắc QT-10: Phiếu phải DA_DONG
    if (ticket.status !== 'DA_DONG') {
      const error = new Error('PHIEU_CHUA_DONG_KHONG_THE_KHAO_SAT');
      error.statusCode = 400;
      throw error;
    }
    
    // 7. Lưu khảo sát
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