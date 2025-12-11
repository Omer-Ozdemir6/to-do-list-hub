import React from 'react';

export const VIEWS = {
    ALL: 'all',          
    COMPLETED: 'completed', 
    ADD_NEW: 'add_new',    
};

const Navbar = ({ onViewChange, currentView, onLoginClick, onSignupClick, isDarkMode, onToggleTheme }) => {

    const navClass = isDarkMode ? 'navbar-dark' : 'navbar-light';

    const handleTitleClick = () => {
        onViewChange(VIEWS.ALL);
    };

    return (
        <div className={`Navbar-Container ${navClass}`}>

            <div className="navbar-brand" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
                <span className="brand-text">🛠️ TO DO HUB V06.11.12</span>
            </div>

            <div className="navbar-links">

                <a 
                    href="#" 
                    className={currentView === VIEWS.COMPLETED ? 'active' : ''}
                    onClick={() => onViewChange(VIEWS.COMPLETED)}
                >
                    Tamamlananlar
                </a>

                <a 
                    href="#"
                    className={currentView === VIEWS.ADD_NEW ? 'active' : ''}
                    onClick={() => onViewChange(VIEWS.ADD_NEW)}
                >
                    Yeni Ekle
                </a>

                <a 
                    href="#"
                    className={currentView === VIEWS.ALL ? 'active' : ''}
                    onClick={() => onViewChange(VIEWS.ALL)}
                >
                    Tüm Görevler
                </a>

            </div>

            <div className="navbar-auth">

                <button 
                    onClick={onToggleTheme}
                    className="theme-toggle-button" 
                >
                    {isDarkMode ? '🌙 Gece' : '☀️ Gündüz'}
                </button>

                <button 
                    onClick={onSignupClick} 
                    className="signup-button" 
                >
                    Kayıt Ol
                </button>

                <button 
                    onClick={onLoginClick} 
                    className="login-button"
                >
                    Giriş Yap
                </button>
            </div>
        </div>
    );
};

export default Navbar;