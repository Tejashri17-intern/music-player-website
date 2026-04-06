


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Homepage from './pages/Homepage';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';

// function App() {
//   const [authView, setAuthView] = useState(null); 
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // 1. User state jisme naam aur email store hoga
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     // 2. LocalStorage se user ka naam bhi uthayein
//     const storedUser = localStorage.getItem("user");
    
//     if (token) {
//       setIsLoggedIn(true);
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     }
//   }, []);

//   // 3. Login success hone par call hone wala function
//   const handleAuthSuccess = (userData) => {
//     setIsLoggedIn(true);
//     setUser(userData); // State update
//     localStorage.setItem("user", JSON.stringify(userData)); // Local storage mein save
//     setAuthView(null); // Modal close
//   };

//   // 4. Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     setUser(null);
//     window.location.href = "/"; // Homepage par redirect
//   };

//   return (
//     <Router>
//       <div className="relative min-h-screen bg-[#0f0a19]">
        
//         {/* Auth Buttons */}
//         {!isLoggedIn && !authView && (
//           <div className="fixed top-4 right-8 z-[100] flex gap-3 items-center bg-[#0f0a19]/60 backdrop-blur-md p-2 rounded-xl border border-white/5">
//             <button 
//               onClick={() => setAuthView('signup')} 
//               className="text-[12px] px-3 py-1 border border-white/10 text-white rounded-md hover:bg-white/10 h-[30px]"
//             >
//               Signup
//             </button>
//             <button 
//               onClick={() => setAuthView('login')} 
//               className="bg-[#8a33f3] text-[12px] text-white px-4 py-1 rounded-md shadow-lg h-[30px] font-medium"
//             >
//               Login
//             </button>
//           </div>
//         )}

//         {/* Floating Popup Modal */}
//         {authView && (
//           <div className="fixed inset-0 z-[150] flex justify-end p-6 bg-black/40 backdrop-blur-sm" onClick={() => setAuthView(null)}>
//             <div className="w-full max-w-sm mt-16 animate-in slide-in-from-top-5 duration-300" onClick={e => e.stopPropagation()}>
//               {/* onAuthSuccess prop pass kiya hai */}
//               {authView === 'login' && <Login setAuthView={setAuthView} onAuthSuccess={handleAuthSuccess} />}
//               {authView === 'signup' && <Signup setAuthView={setAuthView} onAuthSuccess={handleAuthSuccess} />}
//               {authView === 'forgot' && <ForgotPassword switchToLogin={() => setAuthView('login')} />} 
//             </div>
//           </div>
//         )}

//         <Routes>
//           {/* 5. Homepage ko user aur logout function pass kiya */}
//           <Route path="/" element={<Homepage user={user} onLogout={handleLogout} />} />
//           <Route path="/home" element={<Homepage user={user} onLogout={handleLogout} />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  const [authView, setAuthView] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (token) {
      setIsLoggedIn(true);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); 
    localStorage.setItem("user", JSON.stringify(userData)); 
    setAuthView(null); 
  };

  // 🆕 Profile Update Handler
  // Yeh function EditProfile.jsx se call hoga jab user apna naam badlega
  const handleUpdateUser = (updatedUserData) => {
    setUser(updatedUserData); // State update
    localStorage.setItem("user", JSON.stringify(updatedUserData)); // LocalStorage sync
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/"; 
  };

  return (
    <Router>
      <div className="relative min-h-screen bg-[#0f0a19]">
        
        {!isLoggedIn && !authView && (
          <div className="fixed top-4 right-8 z-[100] flex gap-3 items-center bg-[#0f0a19]/60 backdrop-blur-md p-2 rounded-xl border border-white/5">
            <button 
              onClick={() => setAuthView('signup')} 
              className="text-[12px] px-3 py-1 border border-white/10 text-white rounded-md hover:bg-white/10 h-[30px]"
            >
              Signup
            </button>
            <button 
              onClick={() => setAuthView('login')} 
              className="bg-[#8a33f3] text-[12px] text-white px-4 py-1 rounded-md shadow-lg h-[30px] font-medium"
            >
              Login
            </button>
          </div>
        )}

        {authView && (
          <div className="fixed inset-0 z-[150] flex justify-end p-6 bg-black/40 backdrop-blur-sm" onClick={() => setAuthView(null)}>
            <div className="w-full max-w-sm mt-16 animate-in slide-in-from-top-5 duration-300" onClick={e => e.stopPropagation()}>
              {authView === 'login' && <Login setAuthView={setAuthView} onAuthSuccess={handleAuthSuccess} />}
              {authView === 'signup' && <Signup setAuthView={setAuthView} onAuthSuccess={handleAuthSuccess} />}
              {authView === 'forgot' && <ForgotPassword switchToLogin={() => setAuthView('login')} />} 
            </div>
          </div>
        )}

        <Routes>
          {/* 🆕 handleUpdateUser function ko Homepage mein pass kiya */}
          <Route 
            path="/" 
            element={<Homepage user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />} 
          />
          <Route 
            path="/home" 
            element={<Homepage user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />} 
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;