const TicketService = require('../src/services/ticket.service');

describe('Kiểm thử quy tắc nghiệp vụ - Luồng L8', () => {
  test('Cho phép khảo sát khi phiếu ở trạng thái DA_DONG', () => {
    const ticket = { status: 'DA_DONG' };
    const result = TicketService.kiemTraQuyTacQT10(ticket);
    expect(result.hopLe).toBe(true);
  });

  test('Báo lỗi khi không tìm thấy phiếu', () => {
    const result = TicketService.kiemTraQuyTacQT10(null);
    expect(result.hopLe).toBe(false);
    expect(result.lyDo).toBe('KHONG_TIM_THAY_PHIEU');
  });

  test('Từ chối khảo sát khi phiếu đang xử lý (Vi phạm QT-10)', () => {
    const ticket = { status: 'DANG_XU_LY' };
    const result = TicketService.kiemTraQuyTacQT10(ticket);
    expect(result.hopLe).toBe(false);
    expect(result.lyDo).toBe('PHIEU_CHUA_DONG_KHONG_THE_KHAO_SAT');
  });

  test('Chấp nhận điểm CSAT biên (5) và NPS biên (10)', () => {
    const result = TicketService.kiemTraDauVao(5, 10);
    expect(result).toBe(true);
  });

  test('Từ chối khi điểm CSAT vượt quá 5', () => {
    const result = TicketService.kiemTraDauVao(6, 9);
    expect(result).toBe(false);
  });
});