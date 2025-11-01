import { useState } from 'react';
import { searchBooks } from '../services/api';

function SearchBooks({ showToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      showToast('error', 'Hata', 'Lütfen bir arama terimi girin');
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const data = await searchBooks(searchQuery);
      setSearchResults(data.books);
    } catch (error) {
      showToast('error', 'Hata', error.message || 'Arama yapılamadı');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Kitap Ara</h2>

      <div className="max-w-xl mb-6">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="searchQuery">
          Kitap İsmi ile Ara
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Kitap ismi ile ara..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${
              isSearching
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSearching ? 'Aranıyor...' : 'Ara'}
          </button>
        </div>
      </div>

      {hasSearched && (
        <div>
          <p className="text-gray-600 mb-4">
            {searchResults.length} kitap bulundu
          </p>

          {searchResults.length === 0 ? (
            <p className="text-gray-500">Sonuç bulunamadı</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      Kitap İsmi
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      Yazar
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      Yayın Yılı
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      Tür
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((book, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800 border-b">{book.isim}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 border-b">{book.yazar}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 border-b">{book.yil}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 border-b">{book.tur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBooks;
