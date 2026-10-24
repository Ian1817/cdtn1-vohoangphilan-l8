import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, LabelList } from 'recharts';
import { TicketAPI } from '../api/ticket.api';
import DataState from '../components/DataState';

export default function ReportPage() {
  const [data, setData] = useState([]);
  const [state, setState] = useState({ loading: true, error: null });

  const fetchReport = async () => {
    setState({ loading: true, error: null });
    try {
      const res = await TicketAPI.getAllSurveys();
      
      const grouped = res.reduce((acc, curr) => {
        if (!acc[curr.technician_name]) {
          acc[curr.technician_name] = { total: 0, count: 0 };
        }
        acc[curr.technician_name].total += curr.csat_score;
        acc[curr.technician_name].count += 1;
        return acc;
      }, {});

      const chartData = Object.keys(grouped).map(key => ({
        name: key || 'Không xác định',
        avg_csat: Number((grouped[key].total / grouped[key].count).toFixed(1)),
        // Màu xanh lá nếu >= 4.5, màu xanh dương nếu < 4.5
        color: grouped[key].total / grouped[key].count >= 4.5 ? '#22c55e' : '#3b82f6'
      }));

      setData(chartData);
      setState({ loading: false, error: null });
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    // Thêm nền sáng để biểu đồ nổi bật
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          
          <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>
            M2: BÁO CÁO CSAT THEO KTV (Quản lý)
          </div>

          <div style={{ padding: '20px' }}>
            <DataState loading={state.loading} error={state.error} empty={data.length === 0} emptyMessage="Chưa có dữ liệu khảo sát để vẽ biểu đồ." onRetry={fetchReport}>
              
              <h4 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '30px', fontSize: '18px' }}>
                BIỂU ĐỒ SO SÁNH ĐIỂM CSAT TRUNG BÌNH
              </h4>
              
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fill: '#4b5563', fontWeight: 'bold' }} axisLine={{ stroke: '#9ca3af' }} />
                    <YAxis domain={[0, 5]} tick={{ fill: '#4b5563' }} axisLine={{ stroke: '#9ca3af' }} />
                    <Tooltip cursor={{ fill: '#f3f4f6' }} />
                    
                    <Bar dataKey="avg_csat" barSize={60}>
                      <LabelList dataKey="avg_csat" position="top" fill="#1e293b" fontWeight="bold" fontSize={16} />
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
            </DataState>
          </div>
        </div>
      </div>
    </div>
  );
}