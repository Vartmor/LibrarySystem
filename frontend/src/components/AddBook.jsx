import { useState } from 'react';
import { addBook } from '../services/api';

function AddBook({ showToast }) {
  const [formData, setFormData] = useState({
    isim: '',
    yazar: '',
    yil: '',
    tur: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = () => {
    return (
      formData.isim.trim() !== '' &&
      formData.yazar.trim() !== '' &&
      formData.yil.trim() !== '' &&
      formData.tur.trim() !== ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addBook(formData);
      showToast('success', 'Başarılı', 'Kitap başarıyla eklendi');

      // Clear form
      setFormData({
        isim: '',
        yazar: '',
        yil: '',
        tur: '',
      });
    } catch (error) {
      showToast('error', 'Hata', error.message || 'Kitap eklenirken hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Yeni Kitap Ekle</h2>

      <form onSubmit={handleSubmit} className="max-w-xl">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="isim">
            Kitap İsmi
          </label>
          <input
            type="text"
            id="isim"
            name="isim"
            value={formData.isim}
            onChange={handleChange}
            placeholder="Kitap adını girin"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="yazar">
            Yazar
          </label>
          <input
            type="text"
            id="yazar"
            name="yazar"
            value={formData.yazar}
            onChange={handleChange}
            placeholder="Yazar adını girin"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="yil">
            Yayın Yılı
          </label>
          <input
            type="text"
            id="yil"
            name="yil"
            value={formData.yil}
            onChange={handleChange}
            placeholder="Örnek: 2024"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="tur">
            Tür
          </label>
          <input
            type="text"
            id="tur"
            name="tur"
            value={formData.tur}
            onChange={handleChange}
            placeholder="Örnek: Roman"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className={`px-6 py-3 rounded-md font-semibold transition-colors ${
            !isFormValid() || isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Ekleniyor...' : 'Kitap Ekle'}
        </button>
      </form>
    </div>
  );
}

export default AddBook;
