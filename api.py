from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from urllib.parse import unquote

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

LIBRARY_FILE = "library.json"


def read_books():
    """Read books from library.json file"""
    if not os.path.exists(LIBRARY_FILE):
        return []

    try:
        with open(LIBRARY_FILE, "r", encoding="utf-8") as dosya:
            kitaplar = json.load(dosya)
            return kitaplar if isinstance(kitaplar, list) else []
    except json.JSONDecodeError:
        return []
    except Exception:
        return []


def write_books(kitaplar):
    """Write books to library.json file"""
    with open(LIBRARY_FILE, "w", encoding="utf-8") as dosya:
        json.dump(kitaplar, dosya, ensure_ascii=False, indent=4)


@app.route('/api/books', methods=['GET'])
def get_books():
    """Get all books from library.json"""
    try:
        kitaplar = read_books()
        return jsonify({
            "books": kitaplar,
            "count": len(kitaplar)
        }), 200
    except Exception as e:
        return jsonify({"error": "Dosya okuma hatası"}), 500


@app.route('/api/books', methods=['POST'])
def add_book():
    """Add a new book to library.json"""
    try:
        data = request.get_json()

        # Validate all required fields are present
        if not all(key in data for key in ['isim', 'yazar', 'yil', 'tur']):
            return jsonify({"error": "Tüm alanlar zorunludur"}), 400

        # Validate all fields are non-empty strings
        if not all(str(data[key]).strip() for key in ['isim', 'yazar', 'yil', 'tur']):
            return jsonify({"error": "Alanlar boş olamaz"}), 400

        # Create new book object
        yeni_kitap = {
            "isim": data['isim'],
            "yazar": data['yazar'],
            "yil": data['yil'],
            "tur": data['tur']
        }

        # Read existing books
        kitaplar = read_books()

        # Append new book
        kitaplar.append(yeni_kitap)

        # Write back to file
        write_books(kitaplar)

        return jsonify({
            "message": "Kitap başarıyla eklendi",
            "book": yeni_kitap
        }), 201

    except Exception as e:
        return jsonify({"error": "Kitap kaydedilemedi"}), 500


@app.route('/api/books/<isim>', methods=['DELETE'])
def delete_book(isim):
    """Delete a book by exact name match"""
    try:
        # URL decode is automatic in Flask
        kitaplar = read_books()

        # Find book with exact name match
        silinecek_kitap = None
        for kitap in kitaplar:
            if kitap["isim"] == isim:
                silinecek_kitap = kitap
                break

        if silinecek_kitap is None:
            return jsonify({"error": "Kitap bulunamadı"}), 404

        # Remove book from list
        kitaplar.remove(silinecek_kitap)

        # Write updated list back to file
        write_books(kitaplar)

        return jsonify({
            "message": "Kitap başarıyla silindi",
            "deleted_book": silinecek_kitap
        }), 200

    except Exception as e:
        return jsonify({"error": "Kitap silinemedi"}), 500


@app.route('/api/books/search', methods=['GET'])
def search_books():
    """Search books by partial name match"""
    try:
        query = request.args.get('q', '')

        if not query:
            # Return all books if query is empty
            kitaplar = read_books()
            return jsonify({
                "books": kitaplar,
                "count": len(kitaplar),
                "query": query
            }), 200

        # Read all books
        kitaplar = read_books()

        # Filter books where query is in book name (case-sensitive)
        eslesen_kitaplar = [kitap for kitap in kitaplar if query in kitap["isim"]]

        return jsonify({
            "books": eslesen_kitaplar,
            "count": len(eslesen_kitaplar),
            "query": query
        }), 200

    except Exception as e:
        return jsonify({"error": "Arama yapılamadı"}), 500


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
