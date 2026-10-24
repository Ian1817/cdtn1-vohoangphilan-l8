import React, { useState } from 'react';
import { TicketAPI } from '../api/ticket.api';
import DataState from '../components/DataState';

export default function SurveyPage() {
  const [ticketCode, setTicketCode] = useState('');
  const [state, setState] = useState({ loading: false, error: null, data: null });
  const [form, setForm] = useState({ csat_score: 5, nps_score: 9, comment: '' });
  const [submitResult, setSubmitResult] = useState(null);

  const handleSearch = async () => {
    if (!ticketCode) return;
    setState({ loading: true, error: null, data: null });
    setSubmitResult(null);
    try {
      const res = await TicketAPI.getSummary(ticketCode);
      setState({ loading: false, error: null, data: res });
    } catch (err) {
      setState({ loading: false, error: err.message, data: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState(prev => ({ ...prev, loading: true }));
    try {
      await TicketAPI.submitSurvey({ ticket_code: ticketCode, ...form });
      setSubmitResult({ type: 'success', message: 'Gửi khảo sát thành công!' });
    } catch (err) {
      setSubmitResult({ type: 'error', message: err.message });
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Tra cứu & Khảo sát</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          value={ticketCode} 
          onChange={e => setTicketCode(e.target.value)} 
          placeholder="Nhập mã phiếu (VD: PB-2-00001)" 
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
        />
        <button 
          onClick={handleSearch} 
          style={{ padding: '8px 16px', background: '#1e3a8a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Tra cứu
        </button>
      </div>

      <DataState loading={state.loading} error={state.error} empty={!state.data && !state.loading && !state.error} onRetry={handleSearch}>
        {state.data && (
          <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>Phiếu: {state.data.ticket_code}</h3>
            <p><b>Thiết bị:</b> {state.data.device_name}</p>
            <p><b>KTV:</b> {state.data.technician_name}</p>
            <p><b>Trạng thái:</b> {state.data.status}</p>
            
            {!state.data.can_survey ? (
              <p style={{ color: 'red', fontWeight: 'bold' }}>⚠️ Phiếu chưa đóng, không thể khảo sát (Quy tắc QT-10).</p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                <label>Điểm CSAT (1-5):</label>
                <input type="number" min="1" max="5" value={form.csat_score} onChange={e => setForm({...form, csat_score: +e.target.value})} required style={{ padding: '8px' }} />
                
                <label>Điểm NPS (0-10):</label>
                <input type="number" min="0" max="10" value={form.nps_score} onChange={e => setForm({...form, nps_score: +e.target.value})} required style={{ padding: '8px' }} />
                
                <label>Nhận xét:</label>
                <textarea value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} rows="2" style={{ padding: '8px' }} />
                
                <button type="submit" style={{ padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Gửi khảo sát
                </button>
              </form>
            )}
            
            {submitResult && (
              <p style={{ color: submitResult.type === 'success' ? 'green' : 'red', fontWeight: 'bold', marginTop: '10px' }}>
                {submitResult.message}
              </p>
            )}
          </div>
        )}
      </DataState>
    </div>
  );
}