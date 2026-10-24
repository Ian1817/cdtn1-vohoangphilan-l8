import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SurveyPage from './pages/SurveyPage';
import TicketListPage from './pages/TicketListPage';
import TicketDetailPage from './pages/TicketDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      {/* Thanh điều hướng (Menu) */}
      <nav style={{ background: '#1e3a8a', padding: '15px 20px', display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <Link to="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '18px' }}>
          Mekong CRM
        </Link>
        <Link to="/list" style={{ color: 'white', textDecoration: 'none', marginTop: '2px' }}>
          Danh sách phiếu
        </Link>
        <Link to="/detail" style={{ color: 'white', textDecoration: 'none', marginTop: '2px' }}>
          Chi tiết phiếu
        </Link>
      </nav>

      {/* Nội dung các trang */}
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/list" element={<TicketListPage />} />
        <Route path="/detail" element={<TicketDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}