/**
 * Rick and Morty API'sinden gelen İngilizce değerleri Türkçe'ye çeviren yardımcı fonksiyonlar
 */

/**
 * Karakter durumunu Türkçe'ye çevirir
 * @param status - API'den gelen İngilizce durum değeri
 * @returns Türkçe durum değeri
 */
export const translateStatus = (status: string): string => {
  switch (status.toLowerCase()) {
    case "alive":
      return "Yaşıyor";
    case "dead":
      return "Ölü";
    default:
      return "Bilinmiyor";
  }
};

/**
 * Karakter cinsiyetini Türkçe'ye çevirir
 * @param gender - API'den gelen İngilizce cinsiyet değeri
 * @returns Türkçe cinsiyet değeri
 */
export const translateGender = (gender: string): string => {
  switch (gender.toLowerCase()) {
    case "male":
      return "Erkek";
    case "female":
      return "Kadın";
    case "genderless":
      return "Cinsiyetsiz";
    default:
      return "Bilinmiyor";
  }
}; 