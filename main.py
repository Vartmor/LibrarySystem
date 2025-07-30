import json
import os

print("kutuphane sistemine hos geldiniz")





def kitap_kaydet():
    while True:
        kitap_bilgileri = {

            "isim": "",
            "yazar": "",
            "yil": "",
            "tur": ""
        }

        print("Lutfen kitap bilgilerini asagida belirtin: ")

        yeni_kitap_isim = input("kitabin ismini giriniz: ")
        yeni_kitap_yazar = input("kitabin yazarini giriniz: ")
        yeni_kitap_yil = input("kitabin yilini giriniz: ")
        yeni_kitap_tur = input("kitabin turunu giriniz: ")


        kitap_bilgileri["isim"] = yeni_kitap_isim
        kitap_bilgileri["yazar"] = yeni_kitap_yazar
        kitap_bilgileri["yil"] = yeni_kitap_yil
        kitap_bilgileri["tur"] = yeni_kitap_tur

        # library.json dosyasını oku veya oluştur
        dosya_adi = "library.json"

        if os.path.exists(dosya_adi):
            with open(dosya_adi, "r", encoding="utf-8") as dosya:
                try:
                    kitaplar = json.load(dosya)
                    open(dosya_adi,"w")

                except (json.JSONDecodeError, FileNotFoundError):
                    kitaplar = []
                    open(dosya_adi, "w")
        else:
            kitaplar = []

        kitaplar.append(kitap_bilgileri)

        with open(dosya_adi, "a", encoding="utf-8") as dosya:
            json.dump(kitaplar, dosya, ensure_ascii=False, indent=4)



        print("kitabiniz basariyla kaydedili")
        cevap = input("yeni kitap eklemek ister misiniz? y/n :")
        if cevap == "y":
            continue
        elif cevap == "n":
            print("gorusuruz")
            break
        else:
            print("gecerli bir deger gir.")



def kitaplari_goruntule():

    kutuphane_dosyasi = "library.json"


    with open(kutuphane_dosyasi, "r", encoding="utf-8") as dosya:
        kitap_listesi = json.load(dosya)
        print("Iste Kıtaplarınız:")

        for kitap in kitap_listesi:
            print("------------------------------")
            print(f'isim: {kitap["isim"]}')
            print(f'yazar: {kitap["yazar"]}')
            print(f'yil: {kitap["yil"]}')
            print(f'tur: {kitap["tur"]}')




def kitap_ara():

    aranan_kisim = input("hangi kitabi ariyorsunuz? adini, veya adindan bi kismi yazin lutfen ->>>>> ")
    dosyamiz = "library.json"

    with open(dosyamiz, "r", encoding="utf-8") as dosya:

        kitap_listesi = json.load(dosya)
        eslesen_var = False
        for kitap in kitap_listesi:

            if aranan_kisim in kitap["isim"]:
                print(f'eslesen kitap var! isim: {kitap["isim"]}')
                eslesen_var = True
        if not eslesen_var:
            print("malesef bulamadik.")


def kitap_sil():
    silinmek_istenen = input("Hangi kitabi silmek istiyorsunuz?")

    with open("library.json", "r", encoding="utf-8") as dosya:
        kitap_listesi = json.load(dosya)

    silinecek_kitap = None
    for kitap in kitap_listesi:
        if silinmek_istenen == kitap["isim"]:
            silinecek_kitap = kitap
            break

    if silinecek_kitap is None:
        print("oyle bir kitap yok")
        return

    onay = input(f'{silinecek_kitap["isim"]} kitabini silmek istedigine emin misin? y/n ---> ')
    if onay == "y":
        kitap_listesi.remove(silinecek_kitap)
        with open("library.json", "w", encoding="utf-8") as dosya:
            json.dump(kitap_listesi, dosya, ensure_ascii=False, indent=4)
        print("Kitap başarıyla silindi.")
    elif onay == "n":
        print("Silme işlemi iptal edildi.")
    else:
        print("gecerli bir deger girmedin")





while True:
    print("----------------------------------------")
    islem = int(input("yapmak isteginiz islemi secin \n1:Kitap kaydet\n2:Kitaplari Goruntule\n3:Kitap ara\n4:Kitap Sil\n0:cikis\nislem: "))

    if islem == 1:
        kitap_kaydet()
    elif islem ==2:
        kitaplari_goruntule()
    elif islem == 3:
        kitap_ara()
    elif islem ==4:
        kitap_sil()
    elif islem ==0:
        print("gorusmek uzere...")
        break
    else:
        print("lutfen gecerli bir islem seciniz")




# 1. İlk olarak, `dosya_adi = "library.json"` ile işlem yapacağımız dosyanın adını belirliyoruz.
   #
   # 2. `if os.path.exists(dosya_adi):` ile dosyanın var olup olmadığını kontrol ediyoruz:
   #    - Eğer dosya varsa, içine girecek
   #    - Yoksa, `else` kısmına gidip boş bir liste oluşturacak
   #
   # 3. Dosya varsa:
   #    - `with open(dosya_adi, "r", encoding="utf-8") as dosya:` ile dosyayı okuma modunda açıyoruz
   #    - `try-except` bloğu ile:
   #      - `kitaplar = json.load(dosya)` dosyadaki JSON verisini Python listesine çeviriyor
   #      - Eğer dosya bozuksa `except` kısmında boş liste oluşturuyor
   #
   # 4. `kitaplar.append(kitap_bilgileri)` ile yeni kitap bilgilerini listeye ekliyoruz
   #
   # 5. Son olarak:
   #    - `with open(dosya_adi, "w", encoding="utf-8")` ile dosyayı yazma modunda açıyoruz
   #    - `json.dump()` ile Python listesini JSON formatında dosyaya yazıyoruz
   #    - `ensure_ascii=False` Türkçe karakterleri düzgün yazmak için
   #    - `indent=4` JSON dosyasını düzgün girintilerle, okunaklı yapmak için
   #
   # Yani özetle bu kod:
   # - Varsa dosyayı oku ve içindeki kitapları al
   # - Yoksa yeni liste oluştur
   # - Yeni kitabı listeye ekle
   # - Tüm listeyi tekrar dosyaya kaydet
