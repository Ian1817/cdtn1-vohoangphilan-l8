import { api } from './client';

export const TicketAPI = {
  getSummary: (ticketCode) => api.get(`/tickets/${ticketCode}/summary`),
  submitSurvey: (payload) => api.post('/surveys', payload),
};