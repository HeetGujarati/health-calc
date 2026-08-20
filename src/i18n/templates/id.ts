import type { TemplateSet } from './index';

/** Indonesian sentence-variation templates. */
export const idTemplates: TemplateSet = {
  activityIntro: [
    'Hitung berapa banyak energi yang dipakai {activity} sesuai berat badan Anda dan lamanya Anda melakukannya. Angkanya berasal dari nilai ekuivalen metabolik aktivitas tersebut, yang diterbitkan dalam Compendium of Physical Activities.',
    '{Activity} dinilai {met} MET, artinya memakai sekitar {met} kali lipat energi per menit dibanding duduk diam. Masukkan berat dan durasi Anda untuk mengubahnya menjadi kilokalori.',
    'Halaman ini mengubah nilai MET terbitan untuk {activity} menjadi angka energi bagi berat badan Anda. Tubuh yang lebih berat memakai lebih banyak untuk aktivitas yang sama, dan itulah sebabnya berat menjadi masukan, bukan asumsi.',
    'Energi yang terpakai selama {activity}, dihitung dari ekuivalen metaboliknya sebesar {met}. Tabel di bawah mencakup berat dan durasi yang umum jika Anda memilih tidak memasukkan apa pun.',
  ],
  activityMet: [
    'Satu MET adalah kelipatan laju metabolisme istirahat, yang didefinisikan sebagai serapan oksigen 3,5 mililiter per kilogram per menit. Pada {met} MET, {activity} memakan kira-kira {met} kali lipat dari yang dipakai tubuh Anda saat istirahat.',
    'Compendium memberi {activity} nilai {met} MET. Satu MET adalah biaya duduk dengan tenang, jadi aktivitas ini kira-kira {met} kali lipatnya untuk setiap menit yang Anda jalani.',
    'Ekuivalen metabolik menyatakan biaya energi relatif terhadap istirahat. {Activity} berada di {met}, yang menempatkannya {comparison} dalam rentang yang dicakup Compendium.',
    'Pada {met} MET, {activity} berada {comparison} relatif terhadap seluruh rentang aktivitas yang didaftar Compendium, yang membentang dari 1,0 untuk duduk tenang sampai di atas 20 untuk kompetisi elite.',
  ],
  activityAccuracy: [
    'Angka {met} MET untuk {activity} adalah rata-rata populasi. Compendium sendiri mencatat bahwa biaya energi tiap orang berbeda menurut kebugaran, teknik, medan, dan komposisi tubuh, jadi perlakukan sebagai perkiraan besaran, bukan hasil pengukuran.',
    'Angka ini adalah perkiraan yang dibangun di atas sebuah rata-rata. Dua orang yang melakukan {activity} pada intensitas nominal yang sama bisa berbeda dua puluh persen atau lebih, dan tak ada persamaan yang hanya memakai berat dan waktu yang bisa melihatnya.',
    'Ketepatannya dibatasi oleh apa yang bisa diwakili sebuah nilai MET. Ia satu angka yang mewakili semua orang yang melakukan {activity}, sedangkan biaya sebenarnya bergeser mengikuti seberapa keras Anda bekerja, seberapa efisien Anda, dan kondisinya.',
    'Bacalah hasilnya sebagai perkiraan. Perbandingan terbitan antara perkiraan berbasis MET dan kalorimetri tak langsung lazim menemukan selisih perorangan dua puluh sampai tiga puluh persen, dan {activity} tidak terkecuali.',
  ],
  activityNet: [
    'Angka di atas adalah energi bruto — semua yang terpakai selama sesi, termasuk metabolisme istirahat yang tetap akan terpakai. Mengurangi satu MET-jam per jam memberi tahu berapa yang benar-benar ditambahkan oleh {activity}.',
    'Tubuh Anda memakai energi entah Anda melakukan {activity} atau tidak. Angka bersih menghapus garis dasar itu, dan itulah angka yang jujur jika Anda menambahkannya di atas perkiraan pemeliharaan.',
    'Bruto dan bersih berbeda kira-kira satu MET per jam. Untuk {activity} pada {met} MET, itu berarti sekitar {netShare} dari totalnya benar-benar berasal dari aktivitas itu.',
    'Jika Anda sudah memilih pengali aktivitas yang mengandaikan Anda berlatih, menambahkan angka ini di atasnya menghitung {activity} dua kali. Pakai angka bersih, atau setel tingkat aktivitas Anda ke sedenter dan tambahkan sesi secara terpisah.',
  ],
  liftIntro: [
    'Perkirakan beban maksimal satu repetisi Anda pada {lift} dari set yang sudah Anda lakukan. Kelima persamaan terbitan ditampilkan, karena mereka sepakat pada repetisi rendah dan mulai menyimpang di atas sepuluh.',
    'Masukkan beban dan jumlah repetisi yang Anda capai pada {lift}. Kelima persamaan di bawah disesuaikan pada data yang berbeda dan memberi jawaban yang berbeda; rentang di antara mereka menunjukkan seberapa jauh perkiraan itu bisa dipercaya.',
    'Perkiraan beban maksimal satu repetisi untuk {lift}, dari set mana pun antara satu dan dua puluh repetisi. Perkiraannya paling andal dari triple berat dan paling tidak andal dari set sampai gagal pada dua belas repetisi.',
    'Hitung perkiraan maksimal untuk {lift} tanpa mengujinya. Tabel persentase di bawah mengubah perkiraan itu menjadi beban latihan.',
  ],
  liftAccuracy: [
    'Kelima persamaan divalidasi terutama pada data bench press dan squat. {biasNote}',
    'Perkiraan berpindah secara tidak sempurna antar gerakan. {biasNote}',
    'Seberapa baik persamaan ini bekerja bergantung pada gerakannya. {biasNote}',
    'Peringatan khusus untuk gerakan ini: {biasNote}',
  ],
  distanceIntro: [
    'Ubah waktu akhir {distance} menjadi pace per kilometer dan per mil, lengkap dengan split dan apa yang akan dihasilkan pace yang sama pada jarak lain.',
    'Pace, kecepatan, dan split untuk {distance}. Masukkan waktu sasaran untuk melihat pace yang dibutuhkan, atau sebuah pace untuk melihat waktu akhir yang dihasilkannya.',
    'Segala hal soal pace untuk {distance}: konversi antara pace dan waktu akhir, tabel split lengkap, dan catatan jujur tentang mengapa proyeksi ke jarak lain menyesatkan.',
    'Hitung pace {distance} dari waktu akhir, atau waktu akhir dari sebuah pace. Tabel di bawah mencakup rentang yang dipakai kebanyakan pelari saat berlomba.',
  ],
  distanceDemands: [
    'Yang membatasi performa di sini: {demands}',
    'Secara fisiologis, {distance} dibatasi oleh {demandsLower}',
    'Kendala pada jarak ini: {demandsLower}',
    '{demands}',
  ],
};
