class TicketService {
  static kiemTraQuyTacQT10(ticket) {
    if (!ticket) {
      return { hopLe: false, lyDo: 'KHONG_TIM_THAY_PHIEU' };
    }
    if (ticket.status !== 'DA_DONG') {
      return { hopLe: false, lyDo: 'PHIEU_CHUA_DONG_KHONG_THE_KHAO_SAT' };
    }
    return { hopLe: true, lyDo: null };
  }

  static kiemTraDauVao(csat_score, nps_score) {
    if (csat_score === undefined || csat_score < 1 || csat_score > 5) return false;
    if (nps_score === undefined || nps_score < 0 || nps_score > 10) return false;
    return true;
  }
}
module.exports = TicketService;