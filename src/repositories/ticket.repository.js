class TicketRepository {
  async findByCode(ticketCode) {
    return { ticket_id: 1052, ticket_code: ticketCode, device_name: "iPhone 13 Pro Max", technician_name: "Nguyen Van A", status: "DA_DONG" };
  }
  async createSurvey(ticketId, csatScore, comment) {
    return { survey_id: 8801, ticket_id: ticketId, csat_score: csatScore, comment: comment, status: "SUCCESS" };
  }
}
module.exports = new TicketRepository();
