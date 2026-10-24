import { api } from './client';

export const TicketAPI = {
  getSummary: (ticketCode) => api.get(`/tickets/${ticketCode}/summary`),
  submitSurvey: (payload) => api.post('/surveys', payload),
  getAllSurveys: () => api.get('/surveys'), // Thêm dòng này để gọi API lấy danh sách khảo sát
};