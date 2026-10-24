import React, { useState } from 'react';
import { TicketAPI } from '../api/ticket.api';
import DataState from '../components/DataState';

export default function SurveyPage() {
  const [ticketCode, setTicketCode] = useState('');
  const [state, setState] = useState({ loading: false, error: null, data: null });
  
  const [rating, setRating] = useState(5); 
  const [form, setForm] = useState({ nps_score: 9, comment: '' });
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
      await TicketAPI.submitSurvey({ ticket_code: ticketCode, csat_score: rating, ...form });
      setSubmitResult({ type: 'success', message: 'Gửi khảo sát thành công!' });
    } catch (err) {
      setSubmitResult({ type: 'error', message: err.message });
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span 
        key={star} 
        onClick={() => setRating(star)}
        style={{ cursor: 'pointer', fontSize: '35px', color: star <= rating ? '#fbbf24' : '#d1d5db' }}
      >
        ★
      </span>
    ));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input value={ticketCode} onChange={e => setTicketCode(e.target.value)} placeholder="Nhập mã phiếu (VD: PB-2-00001)" style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button onClick={handleSearch} style={{ padding: '10px 20px', backgroundColor: '#1d4ed8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Tra cứu</button>
      </div>

      <DataState loading={state.loading} error={state.error} empty={!state.data && !state.loading && !state.error} onRetry={handleSearch}>
        {state.data && (
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            
            {/* Header xanh */}
            <div style={{ backgroundColor: '#1d4ed8', color: 'white', padding: '15px', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
              M1: FORM KHẢO SÁT CSAT (Khách hàng)
            </div>

            <div style={{ padding: '20px' }}>
              {/* Thông tin phiếu */}
              <div style={{ border: '1px solid #e5e7eb', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <p><b>Mã phiếu:</b> {state.data.ticket_code}</p>
                <p><b>Thiết bị:</b> {state.data.device_name}</p>
                <p><b>KTV xử lý:</b> {state.data.technician_name}</p>
                <div style={{ marginTop: '10px' }}>
                  <span style={{ 
                    padding: '5px 10px', 
                    borderRadius: '4px', 
                    backgroundColor: state.data.can_survey ? '#dcfce7' : '#fee2e2',
                    color: state.data.can_survey ? '#166534' : '#991b1b',
                    border: `1px solid ${state.data.can_survey ? '#86efac' : '#fca5a5'}`,
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    Trạng thái: {state.data.status} {state.data.can_survey ? '(Hoàn tất)' : ''}
                  </span>
                </div>
              </div>

              {!state.data.can_survey ? (
                <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', padding: '20px' }}>⚠️ Phiếu chưa đóng, không thể khảo sát (QT-10).</p>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Mức độ hài lòng của quý khách?</p>
                    <div>{renderStars()}</div>
                    <p style={{ color: '#16a34a', fontWeight: 'bold', marginTop: '10px' }}>
                      {rating}/5 — {rating === 5 ? 'Rất hài lòng' : rating >= 3 ? 'Bình thường' : 'Không hài lòng'}
                    </p>
                  </div>

                  <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Ý kiến đóng góp thêm (không bắt buộc):</label>
                  <textarea 
                    value={form.comment} 
                    onChange={e => setForm({...form, comment: e.target.value})} 
                    placeholder="Kỹ thuật viên nhiệt tình, xử lý nhanh chóng..."
                    rows="4" 
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', resize: 'none' }} 
                  />

                  <button type="submit" style={{ padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
                    GỬI ĐÁNH GIÁ
                  </button>
                </form>
              )}
              
              {submitResult && <p style={{ color: submitResult.type === 'success' ? 'green' : 'red', textAlign: 'center', marginTop: '10px' }}>{submitResult.message}</p>}

              {/* Dòng chữ cảnh báo QT-10 dưới cùng */}
              <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#b91c1c', fontSize: '13px', textAlign: 'center' }}>
                * Kiểm tra quy tắc QT-10: Chỉ gửi được khi phiếu DA_DONG
              </div>
            </div>
          </div>
        )}
      </DataState>
    </div>
  );
}