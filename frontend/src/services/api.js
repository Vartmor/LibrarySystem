const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/**
 * Get all books from the backend
 * @returns {Promise<{books: Array, count: number}>}
 */
export async function getBooks() {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Kitaplar yüklenemedi');
    }

    return await response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Sunucuya bağlanılamadı');
    }
    throw error;
  }
}

/**
 * Add a new book
 * @param {Object} bookData - Book data with isim, yazar, yil, tur
 * @returns {Promise<{message: string, book: Object}>}
 */
export async function addBook(bookData) {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Kitap eklenemedi');
    }

    return await response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Sunucuya bağlanılamadı');
    }
    throw error;
  }
}

/**
 * Delete a book by name
 * @param {string} isim - Book name to delete
 * @returns {Promise<{message: string, deleted_book: Object}>}
 */
export async function deleteBook(isim) {
  try {
    const encodedIsim = encodeURIComponent(isim);
    const response = await fetch(`${API_BASE_URL}/books/${encodedIsim}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Kitap silinemedi');
    }

    return await response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Sunucuya bağlanılamadı');
    }
    throw error;
  }
}

/**
 * Search books by partial name match
 * @param {string} query - Search query
 * @returns {Promise<{books: Array, count: number, query: string}>}
 */
export async function searchBooks(query) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(`${API_BASE_URL}/books/search?q=${encodedQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Arama yapılamadı');
    }

    return await response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Sunucuya bağlanılamadı');
    }
    throw error;
  }
}
