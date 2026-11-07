import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SurveyPage from './pages/SurveyPage';
import TicketListPage from './pages/TicketListPage';
import ReportPage from './pages/ReportPage';

// Component Đăng nhập
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Đăng nhập đơn giản: admin / 123456
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('token', 'fake-token');
      navigate('/');
      window.location.reload(); // Load lại để cập nhật trạng thái
    } else {
      alert('Sai tài khoản hoặc mật khẩu! (Gợi ý: admin / 123456)');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Đăng nhập Mekong CRM</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input placeholder="Username (admin)" value={username} onChange={e => setUsername(e.target.value)} style={{ padding: '8px' }} />
        <input type="password" placeholder="Password (123456)" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '8px' }} />
        <button type="submit" style={{ padding: '10px', background: '#1e3a8a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Đăng nhập</button>
      </form>
    </div>
  );
}

export default function App() {
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  if (!isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      {/* Thanh điều hướng (Menu) */}
      <nav style={{ background: '#1e3a8a', padding: '15px 20px', display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '18px' }}>
          Mekong CRM
        </Link>
        <Link to="/list" style={{ color: 'white', textDecoration: 'none', marginTop: '2px' }}>
          Danh sách phiếu
        </Link>
        <Link to="/report" style={{ color: 'white', textDecoration: 'none', marginTop: '2px' }}>
          Báo cáo KTV
        </Link>
        <button onClick={handleLogout} style={{ marginLeft: 'auto', padding: '5px 15px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Đăng xuất
        </button>
      </nav>

      {/* Nội dung các trang */}
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/list" element={<TicketListPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}