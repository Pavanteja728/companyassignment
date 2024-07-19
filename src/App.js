import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Login from './Components/login';
import Header from './Components/Header/Sidebar/Sidebar';
import Notes from './Components/Notes/Notes';
import Archive from './Components/Archive/Archives';
import Trash from './Components/Trash/TrashNotes';

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={
          localStorage.getItem('isLoggedIn') ? (
            <Box style={{ display: 'flex', width: '100%' }}>
              <Header />
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ p: 3, width: '100%' }}>
                  <DrawerHeader />
                  <Notes />
                </Box>
              </Box>
            </Box>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route exact path="/archive" element={
          localStorage.getItem('isLoggedIn') ? (
            <Box style={{ display: 'flex', width: '100%' }}>
              <Header />
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ p: 3, width: '100%' }}>
                  <DrawerHeader />
                  <Archive />
                </Box>
              </Box>
            </Box>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route exact path="/trash" element={
          localStorage.getItem('isLoggedIn') ? (
            <Box style={{ display: 'flex', width: '100%' }}>
              <Header />
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ p: 3, width: '100%' }}>
                  <DrawerHeader />
                  <Trash />
                </Box>
              </Box>
            </Box>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;