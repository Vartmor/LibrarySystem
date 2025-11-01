import { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../services/api';

function BooksList({ showToast }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data.books);
    } catch (error) {
      showToast('error', 'Hata', error.message || 'Kitaplar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (isim) => {
    setDeleteConfirmId(isim);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
  };

  const handleDeleteConfirm = async (isim) => {
    try {
      await deleteBook(isim);
      setBooks(books.filter((book) => book.isim !== isim));
      setDeleteConfirmId(null);
      showToast('success', 'Başarılı', 'Kitap başarıyla silindi');
    } catch (error) {
      showToast('error', 'Hata', error.message || 'Kitap silinirken hata oluştu');
      setDeleteConfirmId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Tüm Kitaplar</h2>
        <p className="text-gray-600">Henüz kitap yok</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Tüm Kitaplar</h2>
      <p className="text-gray-600 mb-6">Toplam: {books.length} kitap</p>

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
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <>
                <tr
                  key={index}
                  className={`hover:bg-gray-50 transition-colors ${
                    deleteConfirmId === book.isim ? 'bg-yellow-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800 border-b">{book.isim}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-b">{book.yazar}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-b">{book.yil}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-b">{book.tur}</td>
                  <td className="px-6 py-4 text-sm border-b">
                    {deleteConfirmId !== book.isim ? (
                      <button
                        onClick={() => handleDeleteClick(book.isim)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Sil
                      </button>
                    ) : (
                      <span className="text-gray-600 text-xs">Onay bekleniyor...</span>
                    )}
                  </td>
                </tr>
                {deleteConfirmId === book.isim && (
                  <tr key={`${index}-confirm`} className="bg-yellow-50">
                    <td colSpan="5" className="px-6 py-4 border-b">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-800">
                          <strong>{book.isim}</strong> kitabını silmek istediğinizden emin misiniz?
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteConfirm(book.isim)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            Evet
                          </button>
                          <button
                            onClick={handleDeleteCancel}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                          >
                            Hayır
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BooksList;
