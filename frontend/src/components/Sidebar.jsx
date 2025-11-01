function Sidebar({ currentView, setCurrentView }) {
  const menuItems = [
    { id: 'add', label: 'Kitap Ekle' },
    { id: 'list', label: 'Kitapları Görüntüle' },
    { id: 'search', label: 'Kitap Ara' },
  ];

  return (
    <div className="w-64 bg-gray-100 h-screen border-r border-gray-300">
      <div className="p-6 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-800">Kütüphane Sistemi</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full text-left px-6 py-3 transition-colors ${
              currentView === item.id
                ? 'bg-gray-300 text-gray-900 font-semibold'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
