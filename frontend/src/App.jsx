import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AddBook from './components/AddBook';
import BooksList from './components/BooksList';
import SearchBooks from './components/SearchBooks';
import Toast from './components/Toast';

function App() {
  const [currentView, setCurrentView] = useState('add');
  const [toasts, setToasts] = useState([]);

  const showToast = (type, title, message) => {
    const id = Date.now();
    const newToast = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'add':
        return <AddBook showToast={showToast} />;
      case 'list':
        return <BooksList showToast={showToast} />;
      case 'search':
        return <SearchBooks showToast={showToast} />;
      default:
        return <AddBook showToast={showToast} />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 overflow-auto bg-gray-50">
        {renderContent()}
      </div>

      {/* Toast notifications */}
      <div className="fixed top-0 right-0 p-5 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
