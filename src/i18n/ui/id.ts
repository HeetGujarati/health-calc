import type { Messages } from '../../lib/i18n';

/** Indonesian UI catalog. */
export const id: Messages = {
  'nav.main': 'Utama',
  'nav.calculators': 'Kalkulator',
  'nav.charts': 'Tabel',
  'nav.guides': 'Panduan',
  'nav.skipToContent': 'Lompat ke konten',
  'nav.breadcrumb': 'Remah navigasi',
  'nav.home': 'Beranda',
  'nav.useDarkTheme': 'Gunakan tema gelap',
  'nav.useLightTheme': 'Gunakan tema terang',
  'nav.language': 'Bahasa',
  'nav.chooseLanguage': 'Pilih bahasa',

  'footer.calculators': 'Kalkulator',
  'footer.about': 'Tentang',
  'footer.legal': 'Legal',
  'footer.allCalculators': 'Semua kalkulator',
  'footer.referenceCharts': 'Tabel rujukan',
  'footer.guides': 'Panduan',
  'footer.caloriesByActivity': 'Kalori menurut aktivitas',
  'footer.oneRepMaxByLift': 'Beban maksimal menurut gerakan',
  'footer.paceByDistance': 'Pace menurut jarak',
  'footer.search': 'Cari',
  'footer.aboutLink': 'Tentang situs ini',
  'footer.editorialPolicy': 'Kebijakan editorial',
  'footer.accessibility': 'Aksesibilitas',
  'footer.contact': 'Kontak',
  'footer.privacy': 'Privasi',
  'footer.terms': 'Ketentuan',
  'footer.cookies': 'Kuki',
  'footer.disclaimer':
    '{site} memberikan perkiraan dari persamaan yang diterbitkan pada tingkat populasi. Kebutuhan tiap orang berbeda, dan ini bukan nasihat medis. Jika Anda punya kekhawatiran soal pola makan, berat badan, atau citra tubuh, dokter atau tenaga profesional yang berkualifikasi adalah tempat yang tepat untuk membicarakannya.',
  'footer.copyright':
    '© {year} {site}. Rumus dicantumkan sumbernya di setiap halaman; lihat kebijakan editorial.',
  'footer.copyrightLink': 'kebijakan editorial',

  'translation.notice':
    'Halaman ini diterjemahkan dari versi asli bahasa Inggris. Persamaan, sumber, dan angkanya identik; jika ada kalimat yang terasa janggal, halaman bahasa Inggris yang berlaku.',
  'translation.viewEnglish': 'Lihat versi asli bahasa Inggris',

  'home.title': 'Kalkulator kesehatan dan kebugaran',
  'home.description':
    'Kalkulator kesehatan dan kebugaran gratis yang dibangun di atas persamaan yang diterbitkan, masing-masing dengan sumbernya agar Anda dapat memeriksanya dan melihat bagaimana angkanya diperoleh.',
  'home.intro':
    'Setiap kalkulator di sini memakai persamaan yang diterbitkan, menyebut sumbernya, dan menunjukkan apa yang diandaikan persamaan itu. Metrik dan imperial, tanpa pendaftaran.',

  'category.body-composition': 'Komposisi tubuh',
  'category.energy': 'Energi dan asupan',
  'category.training': 'Latihan',
  'category.weight-reference': 'Rujukan berat badan',
  'category.cycle': 'Siklus menstruasi',

  'hub.calculators.title': 'Semua kalkulator',
  'hub.calculators.description':
    'Semua kalkulator di situs ini, dikelompokkan menurut kategori. Masing-masing memakai persamaan yang diterbitkan, menyebut sumbernya, dan bekerja dalam satuan metrik maupun imperial.',
  'hub.calculators.intro':
    '{count} kalkulator, masing-masing dibangun di atas persamaan yang diterbitkan dengan sumbernya dicantumkan di halaman. Metrik dan imperial di semuanya.',

  'hub.guides.title': 'Panduan',
  'hub.guides.description':
    'Penjelasan tentang persamaan di balik kalkulator: dari mana asalnya, apa yang diandaikannya, di mana ia gagal, dan seberapa besar kepercayaan yang pantas diberikan pada angkanya.',
  'hub.guides.intro':
    '{count} penjelasan tentang apa yang ada di balik kalkulator — dari mana setiap persamaan berasal, apa yang diandaikannya, dan seberapa besar kepercayaan yang pantas diberikan pada hasilnya.',
  'hub.guides.readingTime': 'Bacaan {count} menit',

  'hub.charts.title': 'Tabel rujukan',
  'hub.charts.description':
    'Tabel rujukan siap cetak untuk IMT, berat badan sehat, lemak tubuh, nilai MET, persentase latihan, zona detak jantung, protein, pace, dan lainnya.',
  'hub.charts.intro':
    '{count} tabel rujukan, masing-masing dihitung dari persamaan yang sama dengan kalkulator terkait — sehingga keduanya tidak mungkin bertentangan. Setiap tabel berisi data nyata beserta penjelasan cara membacanya, dan tetap berfungsi tanpa JavaScript.',

  'hub.activities.title': 'Kalori terbakar menurut aktivitas',
  'hub.activities.description':
    'Energi yang terpakai pada {count} aktivitas, masing-masing dengan nilai MET terbitan dan kode Compendium, dihitung untuk berat badan dan durasi Anda.',
  'hub.activities.intro':
    '{count} aktivitas, masing-masing dengan nilai MET dan kode lima digit dari Adult Compendium of Physical Activities 2024. Setiap nilai diambil dari sumber terbitannya, bukan dari kalkulator lain.',
  'hub.activities.tableCaption': 'Aktivitas {category} dan nilai MET-nya',
  'hub.activities.columnActivity': 'Aktivitas',
  'hub.activities.columnMet': 'MET',
  'hub.activities.columnCode': 'Kode',
  'hub.activities.source':
    'Sumber: Herrmann SD, Willis EA, Ainsworth BE, dkk. "2024 Adult Compendium of Physical Activities." Journal of Sport and Health Science 13(1), 2024, hlm. 6–12. Nilai MET adalah rata-rata populasi; sekitar 18% entri Compendium merupakan perkiraan, bukan hasil pengukuran.',

  'hub.lifts.title': 'Beban maksimal menurut gerakan',
  'hub.lifts.description':
    'Perkiraan beban maksimal satu repetisi untuk {count} gerakan, masing-masing dengan catatan jujur tentang perilaku kelima persamaan pada gerakan tersebut.',
  'hub.lifts.intro':
    'Kelima persamaan 1RM sebagian besar diturunkan dari data bench press dan squat, dan tidak berpindah sama baiknya ke setiap gerakan. Setiap halaman di bawah menjelaskan perilakunya pada gerakan itu.',

  'hub.distances.title': 'Tabel pace menurut jarak lomba',
  'hub.distances.description':
    'Tabel pace dan tabel split untuk {count} jarak lomba, dari 100 meter sampai 50 km, dengan konversi antara pace, kecepatan, dan waktu akhir.',
  'hub.distances.intro':
    '{count} jarak, masing-masing dengan tabel pace lengkap, tabel split, dan catatan tentang apa yang membatasi performa di jarak itu. Panjang maraton dan setengah maraton adalah yang ditetapkan World Athletics.',

  'calc.enterDetails': 'Masukkan data Anda',
  'calc.result': 'Hasil',
  'calc.calculate': 'Hitung',
  'calc.noscript':
    'Hasil langsung membutuhkan JavaScript. Tabel rujukan lebih jauh di halaman ini sudah dihitung sebelumnya dan berfungsi tanpanya.',
  'calc.howItWorks': 'Bagaimana ini dihitung',
  'calc.default': 'bawaan',
  'calc.source': 'Sumber',
  'calc.assumes': 'Mengandaikan',
  'calc.accuracy': 'Akurasi',
  'calc.whichFormula': 'Rumus mana yang sebaiknya Anda pakai',
  'calc.defaultsTo': 'Halaman ini secara bawaan memakai {formula}. {accuracy}',
  'calc.questions': 'Pertanyaan',
  'calc.related': 'Terkait',
  'calc.relatedCalculators': 'Kalkulator',
  'calc.relatedGuides': 'Panduan',
  'calc.lastReviewed': 'Terakhir ditinjau {date}. Kategori: {category}.',
  'calc.units': 'Satuan',
  'calc.metric': 'Metrik',
  'calc.imperial': 'Imperial',

  'guide.relatedCalculators': 'Kalkulator',
  'guide.relatedGuides': 'Panduan terkait',
  'guide.meta': '{date} · Bacaan {count} menit',

  'search.title': 'Cari',
  'search.description': 'Cari kalkulator, panduan, dan halaman rujukan di situs ini.',
  'search.label': 'Cari kalkulator dan panduan',
  'search.submit': 'Cari',
  'search.browse': 'Atau jelajahi semuanya',
  'search.allGuides': 'Semua panduan',
  'search.noResults': 'Tidak ada hasil untuk "{query}".',
  'search.resultCount': '{count} hasil untuk "{query}".',
  'search.resultCountOne': '1 hasil untuk "{query}".',
  'search.prompt': 'Ketik untuk mencari.',

  'notFound.title': 'Halaman tidak ditemukan',
  'notFound.description':
    'Halaman itu tidak ada. Semua kalkulator di situs ini terdaftar di bawah.',
  'notFound.label': 'Galat 404',
  'notFound.heading': 'Halaman itu tidak ada',
  'notFound.intro':
    'Alamatnya mungkin salah ketik, atau halamannya sudah dipindahkan. Semua yang dimiliki situs ini terdaftar di bawah.',
  'notFound.allCalculators': 'Semua kalkulator',
  'notFound.search': 'Cari',
  'notFound.guides': 'Panduan',
  'notFound.charts': 'Tabel',
  'notFound.reportBrokenLink': 'Laporkan tautan rusak',

  'disclaimer.heading': 'Apa yang bukan ini',
  'disclaimer.body':
    'Ini perkiraan dari persamaan tingkat populasi, bukan pengukuran atas diri Anda dan bukan nasihat medis. Hasil tiap orang sangat berbeda. Bicaralah dengan dokter atau ahli gizi terdaftar sebelum melakukan perubahan besar pada cara Anda makan atau berlatih.',

  'chart.howToRead': 'Cara membaca tabel ini',
  'chart.relatedCalculator': 'Kalkulator',
  'chart.source': 'Sumber',

  'activity.metValue': 'Nilai MET',
  'activity.compendiumCode': 'Kode Compendium',
  'activity.referenceTable': 'Kalori terbakar menurut berat badan dan durasi',
  'activity.compare': 'Dibandingkan dengan aktivitas terkait',
  'activity.columnWeight': 'Berat badan',

  'lift.percentageTable': 'Persentase latihan',
  'lift.repMaxTable': 'Konversi maksimal per repetisi',
  'lift.notes': 'Catatan tentang gerakan ini',

  'distance.paceChart': 'Tabel pace',
  'distance.splits': 'Waktu split',
  'distance.notes': 'Catatan tentang jarak ini',

  'consent.heading': 'Kuki',
  'consent.body':
    'Situs ini tidak memakai kuki iklan maupun analitik. Jika suatu saat itu berubah, pemberitahuan ini akan bertanya lebih dulu.',
  'consent.accept': 'Terima',
  'consent.reject': 'Tolak',

  'about.title': 'Tentang situs ini',
  'about.description':
    'Apa itu situs ini, bagaimana kalkulatornya dibangun, dan apa yang bisa serta tidak bisa dikatakan angka-angkanya kepada Anda.',
  'about.p1':
    'Situs ini ada karena kebanyakan kalkulator kebugaran tidak memberi tahu dari mana angkanya berasal. Anda memasukkan tinggi dan berat badan, sebuah angka muncul, dan tidak ada cara untuk tahu persamaan mana yang menghasilkannya, dari populasi mana ia diturunkan, atau seberapa meleset ia bisa jadi untuk orang seperti Anda.',
  'about.p2':
    'Setiap kalkulator di sini menyebut persamaan yang dipakainya, mengutip makalah asalnya, menyatakan apa yang diandaikan persamaan itu tentang orang yang dikenainya, dan mengatakan seberapa akurat ia dibanding alternatifnya. Ketika beberapa persamaan terbitan berbeda pendapat — dan untuk lemak tubuh serta laju metabolisme basal perbedaannya besar — halaman ini menunjukkan perbedaan itu alih-alih menyembunyikannya di balik satu angka.',
  'about.p3':
    'Perhitungan berjalan di peramban Anda. Tidak ada yang Anda ketik dikirim ke mana pun, disimpan di server, atau dicatat. Tidak ada akun, tidak ada penjaringan alamat surel, dan tidak ada skrip pelacak.',
  'about.h2Limits': 'Apa yang bukan angka-angka ini',
  'about.p4':
    'Setiap persamaan di sini diperoleh dengan mencocokkan sebuah kurva pada pengukuran dari sekelompok orang tertentu. Kecocokan itu bagus secara rata-rata dan bisa buruk untuk individu mana pun — sebuah persamaan dengan galat baku 4 poin persentase meleset lebih dari itu untuk sebagian besar minoritas orang. Persamaan komposisi tubuh khususnya sebagian besar diturunkan dari sampel kecil, muda, dan mayoritas kulit putih, sehingga berpindah secara tidak sempurna kepada semua orang lain.',
  'about.p5':
    'Tidak satu pun dari ini merupakan nasihat medis, tidak satu pun merupakan diagnosis, dan tidak satu pun menggantikan percakapan dengan klinisi yang benar-benar bisa mengukur Anda.',

  'contact.title': 'Kontak',
  'contact.description':
    'Cara melaporkan kesalahan pada rumus, tautan rusak, atau masalah aksesibilitas.',
  'contact.p1':
    'Jika sebuah rumus salah, sebuah kutipan tidak cocok dengan sumbernya, sebuah tautan rusak, atau ada sesuatu di situs ini yang tidak bisa dipakai dengan papan ketik atau pembaca layar, tolong sampaikan. Koreksi atas persamaan adalah hal paling berharga yang bisa dikirim siapa pun.',
  'contact.emailLabel': 'Surel',
  'contact.p2':
    'Mohon sertakan alamat halamannya dan, untuk koreksi rumus, sumber terbitan yang Anda pakai. Itu membuat perbaikannya dapat diverifikasi, bukan sekadar soal pendapat.',
  'contact.h2Response': 'Apa yang bisa diharapkan',
  'contact.p3':
    'Ini situs kecil yang dijalankan satu orang. Koreksi rumus dan masalah aksesibilitas didahulukan di atas segalanya.',

  'a11y.title': 'Aksesibilitas',
  'a11y.description':
    'Standar aksesibilitas yang dituju situs ini, bagaimana ia diuji, dan cara melaporkan masalah.',
  'a11y.p1':
    'Situs ini menargetkan WCAG 2.2 Level AA. Itu komitmen tentang bagaimana ia dibangun, bukan sertifikasi yang dikeluarkan siapa pun.',
  'a11y.h2What': 'Apa artinya dalam praktik',
  'a11y.li1':
    'Setiap halaman berfungsi dengan papan ketik saja, dalam urutan yang logis, dengan penanda fokus yang terlihat.',
  'a11y.li2':
    'Setiap kendali formulir punya label sungguhan, bukan teks contoh yang menggantikan label.',
  'a11y.li3':
    'Hasil kalkulator diumumkan secara sopan kepada pembaca layar saat berubah, tanpa memindahkan fokus dari kolom yang sedang Anda ketik.',
  'a11y.li4': 'Kontras teks minimal 4,5:1, dan batas antarmuka minimal 3:1, pada kedua tema.',
  'a11y.li5': 'Target sentuh berukuran minimal 44 kali 44 piksel.',
  'a11y.li6': 'Animasi ditiadakan ketika sistem meminta gerak yang dikurangi.',
  'a11y.li7':
    'Setiap tabel rujukan dirender sebagai HTML sungguhan dengan sel tajuk yang benar, bukan sebagai gambar.',
  'a11y.h2Testing': 'Bagaimana ia diuji',
  'a11y.p2':
    'Pemeriksaan otomatis berjalan pada setiap build: validasi HTML termasuk aturan khusus WCAG, dan audit aksesibilitas Lighthouse yang menggagalkan build di bawah 95. Rasio kontras dihitung ulang dari token desain oleh sebuah uji unit, sehingga perubahan warna yang merusak kontras akan gagal alih-alih terkirim. Pengoperasian kalkulator lewat papan ketik dicakup oleh uji ujung ke ujung.',
  'a11y.p3':
    'Pengujian otomatis hanya menangkap sebagian kecil masalah aksesibilitas. Jika Anda menemukan sesuatu yang terlewat oleh pemeriksaan ini, mohon laporkan.',
  'a11y.h2Known': 'Keterbatasan yang diketahui',
  'a11y.p4':
    'Ketiga huruf yang dihosting sendiri hanya mencakup aksara Latin. Halaman dalam bahasa Hindi, Jepang, dan Arab beralih ke tumpukan fonta sistem untuk aksara tersebut, yang tampil dengan benar tetapi tidak selaras secara tipografis dengan halaman beraksara Latin.',

  'editorial.title': 'Kebijakan editorial',
  'editorial.description':
    'Bagaimana rumus dipilih, bagaimana sumber dikutip, apa yang ditolak, dan seberapa sering halaman ditinjau.',
  'editorial.h2Selection': 'Bagaimana rumus dipilih',
  'editorial.p1':
    'Sebuah kalkulator hanya diterbitkan jika persamaannya diterbitkan, dapat diatribusikan, dan dapat diperiksa. Artinya sebuah makalah bernama, sebuah peraturan bernama, atau sebuah standar kelembagaan bernama — bukan situs lain, bukan aplikasi kebugaran, dan bukan persamaan yang beredar tanpa asal-usul.',
  'editorial.p2':
    'Bila ada beberapa persamaan untuk besaran yang sama, halaman ini menerapkan lebih dari satu dan menunjukkan di mana mereka berbeda. Yang menjadi bawaan adalah yang validasinya paling terdokumentasi pada populasi dewasa umum, dan halaman ini menjelaskan mengapa ia menjadi bawaan.',
  'editorial.h2Citation': 'Bagaimana sumber dikutip',
  'editorial.p3':
    'Setiap rumus di situs ini membawa kutipan lengkapnya di halaman yang memakainya: penulis, judul, jurnal, tahun. Kutipannya adalah terbitan asli, bukan sumber sekunder yang mereproduksinya. Bila sebuah nilai berasal dari tabel rujukan alih-alih persamaan — nilai MET, misalnya — kode spesifik dan edisinya diberikan agar entrinya bisa ditelusuri.',
  'editorial.h2Refused': 'Apa yang tidak akan dilakukan situs ini',
  'editorial.li1':
    'Ia tidak akan menyarankan asupan di bawah 1.500 kkal untuk pria atau 1.200 kkal untuk wanita, atau defisit lebih besar dari 25% pemeliharaan atau 1.000 kkal per hari, mana yang lebih kecil.',
  'editorial.li2':
    'Ia tidak akan menyusun rencana menuju berat sasaran dengan IMT di bawah 18,5, dan menjelaskan alasannya alih-alih menolak diam-diam.',
  'editorial.li3':
    'Ia tidak akan mengeluarkan sasaran kalori atau lemak tubuh bagi siapa pun di bawah 18 tahun.',
  'editorial.li4':
    'Ia tidak akan menyebut sebuah tubuh baik, buruk, ideal, atau perlu diperbaiki. Kategori dinamai sebagaimana standar terbitan menamainya, dan tidak lebih.',
  'editorial.li5':
    'Ia tidak akan mengarang penulis, peninjau medis, penilaian, atau jumlah ulasan. Tidak ada apa pun di situs ini yang diatribusikan kepada orang yang tidak menulisnya.',
  'editorial.h2Review': 'Irama peninjauan',
  'editorial.p4':
    'Setiap halaman memuat tanggal sebenarnya konten itu terakhir ditinjau. Tanggal itu berubah ketika kontennya berubah dan tidak pada kesempatan lain — halaman yang tanggal tinjauannya bergeser pada setiap build tidak memberi tahu Anda apa pun. Halaman rumus diperiksa ulang terhadap sumbernya ketika sebuah sumber direvisi; standar komposisi tubuh Angkatan Darat AS, misalnya, berubah pada 2026 dan halamannya berubah bersamanya.',
  'editorial.h2Corrections': 'Koreksi',
  'editorial.p5':
    'Jika sebuah rumus di sini tidak cocok dengan sumber yang dikutipnya, itu cacat dan akan diperbaiki. Laporkan lewat halaman kontak beserta sumber yang Anda pakai.',

  'privacy.title': 'Privasi',
  'privacy.description':
    'Apa yang dikumpulkan situs ini, yang hampir tidak ada, dan apa hak Anda menurut GDPR dan CCPA.',
  'privacy.lastUpdated': 'Terakhir diperbarui {date}.',
  'privacy.p1':
    'Setiap perhitungan di situs ini berjalan di peramban Anda. Tinggi, berat, usia, dan angka lain yang Anda masukkan tidak pernah dikirim, tidak pernah disimpan di server, dan tidak pernah dicatat. Menutup tab akan membuangnya.',
  'privacy.h2Collect': 'Apa yang dikumpulkan',
  'privacy.p2':
    'Tidak ada analitik, tidak ada iklan, tidak ada piksel pelacak, tidak ada skrip pihak ketiga apa pun. Situs ini tidak membuat permintaan jaringan ke domain mana pun selain yang melayaninya.',
  'privacy.p3':
    'Dua hal disimpan secara lokal di peramban Anda menggunakan localStorage dan tidak pernah meninggalkan perangkat Anda: preferensi tema terang atau gelap, dan preferensi satuan metrik atau imperial. Anda dapat menghapus keduanya lewat pengaturan peramban.',
  'privacy.h2Server': 'Log server',
  'privacy.p4':
    'Penyedia hosting statis mencatat log permintaan standar — alamat IP, stempel waktu, jalur yang diminta, agen pengguna — seperti yang dilakukan setiap peladen web. Itu catatan milik penyedia, disimpan menurut kebijakan mereka, dan situs ini tidak membaca maupun mengolahnya.',
  'privacy.h2Future': 'Jika iklan ditambahkan',
  'privacy.p5':
    'Iklan tidak diaktifkan. Jika ditambahkan di kemudian hari, spanduk persetujuan akan bertanya sebelum kuki iklan apa pun dipasang, halaman ini akan diperbarui lebih dulu, dan perubahannya akan diberi tanggal di sini.',
  'privacy.h2Rights': 'Hak Anda',
  'privacy.p6':
    'Menurut GDPR dan CCPA Anda punya hak akses, koreksi, penghapusan, portabilitas, dan keberatan atas data pribadi yang disimpan sebuah situs tentang Anda. Situs ini tidak menyimpan apa pun, jadi tidak ada yang bisa diakses atau dihapus — tetapi jika Anda berpendapat lain, tulislah ke alamat kontak dan itu akan ditelusuri.',
  'privacy.h2Children': 'Privasi anak',
  'privacy.p7':
    'Situs ini tidak ditujukan untuk anak di bawah 13 tahun dan tidak mengumpulkan apa pun dari siapa pun. Kalkulator yang menghasilkan sasaran kalori atau lemak tubuh menolak melakukannya bagi siapa pun di bawah 18 tahun.',
  'privacy.h2Changes': 'Perubahan',
  'privacy.p8':
    'Perubahan penting pada kebijakan ini akan tercermin pada tanggal di atas dan dijelaskan dalam catatan perubahan.',
  'privacy.ownerNotice':
    'PENANDA PEMILIK: sebelum peluncuran, tambahkan nama badan hukum, alamat pos, dan kontak pelindungan data yang diwajibkan Pasal 13 GDPR. Lihat daftar periksa di DEPLOY.md.',

  'terms.title': 'Ketentuan',
  'terms.description': 'Ketentuan penyediaan situs ini, termasuk batas penggunaan perkiraannya.',
  'terms.h2Use': 'Penggunaan situs',
  'terms.p1':
    'Situs ini gratis. Anda boleh memakai angka yang dihasilkannya untuk keperluan sendiri. Anda tidak boleh mengeruknya pada laju yang menurunkan kualitasnya bagi orang lain, atau menerbitkan ulang isinya secara borongan sebagai milik Anda.',
  'terms.h2NotAdvice': 'Bukan nasihat medis',
  'terms.p2':
    'Segala sesuatu di sini adalah perkiraan yang dihasilkan persamaan terbitan yang diterapkan pada angka yang Anda berikan. Ini bukan nasihat medis, bukan diagnosis, bukan rencana pengobatan, dan bukan pengganti tenaga profesional berkualifikasi yang dapat memeriksa Anda. Jangan memakainya untuk mengambil keputusan medis.',
  'terms.p3':
    'Jika Anda mengalami atau menduga mengalami gangguan makan, atau sedang hamil, menyusui, berusia di bawah 18 tahun, atau sedang mengelola suatu kondisi medis, angka-angka di sini tidak berlaku bagi situasi Anda, sedangkan panduan seorang klinisi berlaku.',
  'terms.h2Accuracy': 'Akurasi',
  'terms.p4':
    'Persamaan diterapkan dengan setia dan diuji terhadap contoh terhitung dari terbitan sumbernya. Persamaan itu sendiri adalah rata-rata populasi dengan rentang galat nyata, yang dinyatakan di setiap halaman. Sebuah persamaan yang diterapkan dengan benar tetap bisa meleset jauh untuk Anda.',
  'terms.h2Liability': 'Tanggung jawab',
  'terms.p5':
    'Situs ini disediakan apa adanya, tanpa jaminan dalam bentuk apa pun. Sejauh diizinkan hukum, tidak ada tanggung jawab yang diterima atas kerugian atau kerusakan yang timbul dari penggunaan situs ini atau ketergantungan pada keluarannya.',
  'terms.h2Ip': 'Konten',
  'terms.p6':
    'Teks, tata letak, dan kode situs ini milik pengelolanya. Persamaannya tidak — ia milik literatur terbitan dan dikutip sebagaimana mestinya. Nilai rujukan yang direproduksi dari sumber terbitan tetap milik penerbitnya dan dipakai di sini dengan atribusi.',
  'terms.h2Law': 'Hukum yang berlaku',
  'terms.ownerNotice':
    'PENANDA PEMILIK: sebelum peluncuran, sebutkan badan hukum dan yurisdiksi yang mengatur ketentuan ini. Lihat daftar periksa di DEPLOY.md.',

  'cookies.title': 'Kuki',
  'cookies.description':
    'Kuki apa yang dipasang situs ini, yaitu tidak ada, dan apa yang berubah jika iklan diaktifkan.',
  'cookies.p1': 'Situs ini tidak memasang kuki apa pun.',
  'cookies.h2Storage': 'Apa yang disimpan sebagai gantinya',
  'cookies.p2':
    'Dua preferensi disimpan di localStorage, yang bukan kuki dan tidak pernah dikirim ke peladen mana pun:',
  'cookies.li1':
    'Preferensi tema terang atau gelap Anda, agar halaman tidak berkedip dengan tema yang salah.',
  'cookies.li2':
    'Preferensi satuan metrik atau imperial Anda, agar Anda tidak perlu mengaturnya ulang di setiap halaman.',
  'cookies.p3':
    'Keduanya bisa dihapus lewat pengaturan data situs di peramban Anda. Menghapusnya tidak merugikan apa pun selain preferensi itu sendiri.',
  'cookies.h2Third': 'Kuki pihak ketiga',
  'cookies.p4':
    'Tidak ada, karena tidak ada skrip, sematan, huruf, atau gambar pihak ketiga. Setiap aset yang dimuat situs ini berasal dari domainnya sendiri.',
  'cookies.h2Ads': 'Jika iklan diaktifkan',
  'cookies.p5':
    'Iklan tidak diaktifkan. Kode untuk menampilkannya ada dan menyediakan ruangnya di tata letak, tetapi tidak menampilkan apa pun. Jika dinyalakan, mitra periklanan akan memasang kuki mereka sendiri, spanduk persetujuan akan bertanya sebelum satu pun dipasang, dan halaman ini akan mendaftarkannya sebelum hal itu terjadi.',

  // --- Chart, activity, lift and distance page templates ---
  'common.related': 'Terkait',
  'common.lastReviewed': 'Terakhir ditinjau {date}.',
  'common.category': 'Kategori',
  'common.weight': 'Berat',
  'common.duration': 'Durasi',
  'chart.workItOut': 'Hitung dengan angka Anda sendiri',
  'chart.workItOutBody':
    'Tabel ini dihitung dari persamaan yang sama dengan kalkulatornya, jadi keduanya selalu sejalan.',
  'chart.relatedGuides': 'Panduan terkait',
  'activity.h1': 'Kalori terbakar saat {activity}',
  'activity.metSection': 'Nilai MET dan dari mana asalnya',
  'activity.listedAs': 'Tercatat sebagai',
  'activity.referenceNote':
    'Energi bruto dalam kilokalori. Baca mendatar dari berat badan Anda dan menurun dari durasi Anda. Orang dengan berat 70 kg memakai sekitar {gross} kkal per jam, dan kira-kira {net} di antaranya berada di atas yang akan terpakai saat istirahat.',
  'activity.compareNote':
    'Energi yang terpakai dalam tiga puluh menit pada 70 kg, sehingga aktivitasnya bisa dibandingkan langsung.',
  'activity.compareCaption': 'Perbandingan dengan aktivitas terkait',
  'activity.columnKcal30': 'kkal / 30 mnt',
  'activity.noscript':
    'Hasil langsung membutuhkan JavaScript. Tabel di bawah sudah dihitung sebelumnya dan berfungsi tanpanya.',
  'activity.allActivities': 'Semua aktivitas',
  'activity.metaDescription':
    'Berapa kalori yang terbakar saat {activity}, menurut berat badan dan durasi. Memakai nilai MET terbitan {met} dari Adult Compendium 2024.',
  'lift.enterSet': 'Masukkan set Anda',
  'lift.typicalReps': 'Repetisi umum',
  'lift.percentageTableCaption':
    'Persentase dari beban maksimal satu repetisi beserta repetisi yang diharapkan',
  'lift.repMaxCaption':
    'Perkiraan beban maksimal satu repetisi menurut beban yang diangkat dan jumlah repetisi',
  'lift.comparisonHeading': 'Konversi maksimal per repetisi dan perbandingan rumus',
  'lift.comparisonCaption': 'Kelima persamaan dibandingkan untuk 100 kg dikali lima',
  'distance.enterTime': 'Masukkan waktu akhir',
  'search.typeCalculator': 'Kalkulator',
  'search.typeGuide': 'Panduan',
  'search.typePage': 'Halaman',
  'search.unavailable': 'Pencarian sedang tidak tersedia. Direktori kalkulator memuat semuanya.',

  // --- Chart, activity, lift and distance page templates ---
  'metBand.light': 'ke arah ujung ringan',
  'metBand.moderate': 'pada rentang sedang',
  'metBand.vigorous': 'pada rentang berat',
  'metBand.demanding': 'ke arah ujung paling berat',
  'netShare.none': 'tidak ada',
  'netShare.percent': '{value} persen',

  // --- Programmatic page copy ---
  'activity.appName': 'Kalkulator kalori terbakar saat {activity}',
  'activity.howToName': 'Cara menghitung kalori terbakar saat {activity}',
  'activity.step1.name': 'Masukkan berat dan durasi Anda',
  'activity.step1.text':
    'Pilih satuan metrik atau imperial, lalu masukkan berat badan Anda dan berapa lama Anda melakukan {activity}.',
  'activity.step2.name': 'Baca hasilnya',
  'activity.step2.text':
    'Hasil diperbarui saat Anda mengetik, menampilkan energi bruto dan angka di atas istirahat.',
  'activity.step3.name': 'Periksa nilai MET dan sumbernya',
  'activity.step3.text':
    'Kode Compendium dan keterangan di balik nilai {met} MET ditampilkan di bawah kalkulator.',
  'activity.faq.q1': 'Berapa kalori yang terbakar saat {activity}?',
  'activity.faq.a1':
    'Pada {met} MET, orang dengan berat 70 kg memakai sekitar {kcal30} kkal dalam tiga puluh menit. Pemakaian energi mengikuti berat badan, jadi orang 90 kg memakai kira-kira sepertiga lebih banyak untuk sesi yang sama.',
  'activity.faq.q2': 'Berapa nilai MET untuk {activity}?',
  'activity.faq.a2':
    '{met} MET, tercantum pada kode Compendium {code}. Satu MET adalah kelipatan laju metabolisme istirahat.',
  'activity.faq.q3': 'Perlukah saya mengurangi metabolisme istirahat?',
  'activity.faq.a3':
    'Kalau Anda menambahkannya ke angka pemeliharaan yang sudah mencakup istirahat, ya. Angka bersih menghapus kira-kira satu MET-jam per jam yang tetap akan terpakai tubuh Anda, sehingga untuk {activity} tersisa sekitar {netShare} dari total bruto.',
  'activity.faq.q4': 'Mengapa berat badan mengubah jawabannya?',
  'activity.faq.a4':
    'Nilai MET adalah energi per kilogram massa tubuh, jadi aktivitas yang sama lebih mahal bagi tubuh yang lebih berat. Itulah sebabnya berat menjadi masukan, bukan asumsi, dan sebabnya angka kalori terbakar yang umum tanpa berat badan hampir tak bermakna.',
  'activity.faq.q5': 'Seberapa akurat angka ini?',
  'activity.faq.a5':
    'Ini perkiraan dari rata-rata populasi. Perbandingan terbitan dengan kalorimetri tak langsung menemukan selisih perorangan dua puluh sampai tiga puluh persen, jadi pakailah untuk membandingkan aktivitas, bukan sebagai catatan utang yang harus dimakan kembali.',
  'lift.h1': 'Kalkulator beban maksimal satu repetisi {lift}',
  'lift.metaDescription':
    'Perkirakan beban maksimal satu repetisi {liftLower} Anda dari sebuah set, dengan kelima persamaan terbitan dibandingkan dan tabel persentase untuk beban latihan.',
  'lift.howToName': 'Cara memperkirakan beban maksimal satu repetisi {liftLower}',
  'lift.step1.name': 'Masukkan beban dan repetisi',
  'lift.step1.text':
    'Masukkan beban yang Anda angkat pada {liftLower} dan berapa repetisi yang Anda selesaikan.',
  'lift.step2.name': 'Baca perkiraannya',
  'lift.step2.text':
    'Kelima persamaan ditampilkan, beserta rata-ratanya dan sebuah tabel persentase.',
  'lift.step3.name': 'Periksa perilaku persamaan pada gerakan ini',
  'lift.step3.text':
    'Catatan di bawah menjelaskan bagaimana persamaan ini berpindah ke gerakan ini secara khusus.',
  'lift.faq.q1': 'Bagaimana cara memperkirakan maksimal {liftLower} saya?',
  'lift.faq.a1':
    'Lakukan set sampai atau mendekati gagal, masukkan beban dan repetisinya, sisanya dikerjakan persamaan. Triple berat memberi perkiraan yang jauh lebih andal daripada set dua belas repetisi, karena kelima persamaan divalidasi pada rentang dua sampai sepuluh repetisi.',
  'lift.faq.q2': 'Apakah perkiraan 1RM akurat untuk {liftLower}?',
  'lift.faq.q3': 'Rumus mana yang sebaiknya saya pakai?',
  'lift.faq.a3':
    'Wathan dan Epley mengikuti data terukur pada rentang terluas; Brzycki paling konservatif dan tepat pada satu repetisi. Rata-rata kelimanya adalah satu angka yang lebih bisa dipertanggungjawabkan daripada mana pun secara sendiri, dan rentang di antara mereka menunjukkan seberapa besar kepercayaan yang pantas diberikan.',
  'lift.faq.q4': 'Rentang repetisi mana yang cocok untuk {liftLower}?',
  'lift.faq.a4':
    'Gerakan ini biasanya dilatih pada rentang {reps} repetisi. Perkiraan yang diambil dari dalam rentang itu paling bisa dipercaya, karena paling dekat dengan tempat persamaan itu disesuaikan.',
  'lift.faq.q5': 'Sebaiknya saya menguji maksimal sungguhan saja?',
  'lift.faq.a5':
    'Hanya jika Anda membutuhkan angkanya untuk kompetisi, dan itu pun dengan penjaga dan pemanasan penuh. Untuk menyusun program, perkiraan dari triple berat hampir sama bergunanya dan jauh lebih murah dari sisi pemulihan dan risiko.',
  'distance.h1': 'Kalkulator pace {distance}',
  'distance.metaDescription':
    'Tabel pace dan kalkulator {distance}: konversi antara pace, kecepatan, dan waktu akhir, lengkap dengan split dan catatan jujur tentang proyeksi lomba.',
  'distance.howToName': 'Cara menghitung pace {distanceLower}',
  'distance.step1.name': 'Masukkan waktu akhir',
  'distance.step1.text':
    'Masukkan waktu sasaran atau waktu nyata {distanceLower} dalam format j:mm:dd atau m:dd.',
  'distance.step2.name': 'Baca pace-nya',
  'distance.step2.text':
    'Pace per kilometer dan per mil, kecepatan, serta split diperbarui saat Anda mengetik.',
  'distance.step3.name': 'Periksa tabel pace',
  'distance.step3.text':
    'Tabel di bawah memetakan setiap pace pada rentang umum ke sebuah waktu akhir.',
  'distance.faq.q1': 'Pace berapa yang saya butuhkan untuk waktu {short} tertentu?',
  'distance.faq.a1':
    'Bagi waktu sasaran dengan jarak dalam kilometer. Untuk {distance}, {midPace} per kilometer menghasilkan {midTime}. Tabel di bawah mencakup rentang yang dipakai kebanyakan pelari saat berlomba.',
  'distance.faq.q2': 'Bagaimana sebaiknya saya mengatur pace {short}?',
  'distance.faq.q3': 'Apa yang membatasi performa pada {short}?',
  'distance.faq.q4': 'Apakah proyeksi ke jarak lain bisa diandalkan?',
  'distance.faq.a4':
    'Tidak, dan halaman ini mengatakannya. Proyeksi itu mengandaikan pace yang sama bertahan pada jarak berbeda, padahal tidak: pace menurun seiring jarak bertambah. Rumus Riegel menerapkan eksponen kelelahan dan itulah alat yang tepat untuk prediksi sungguhan.',
  'distance.faq.q5': 'Mengapa tabel split punya segmen terakhir yang tidak penuh?',
  'distance.faq.a5':
    'Karena {distance} adalah {km} km, yang bukan kelipatan bulat dari interval split. Segmen terakhir yang tidak penuh tetap ditampilkan alih-alih dibuang, sebab tabel yang berakhir sebelum garis finis justru salah di tempat yang paling penting.',

  // --- Lift and distance page chrome ---
  'lift.weightLifted': 'Beban yang diangkat',
  'lift.reps': 'Repetisi',
  'lift.repsUnit': 'rep',
  'lift.formula': 'Rumus',
  'lift.noscript':
    'Hasil langsung membutuhkan JavaScript. Tabel di bawah sudah dihitung sebelumnya dan berfungsi tanpanya.',
  'lift.specificHeading': '{lift} secara khusus',
  'lift.estimateHeading': 'Perkiraan maksimal {lift} menurut beban dan repetisi',
  'lift.estimateNote':
    'Perkiraan Epley dalam kilogram. Baca mendatar dari beban yang Anda angkat dan menurun dari repetisi yang Anda capai. Kolom di atas sepuluh repetisi tetap ditampilkan tetapi paling tidak andal.',
  'lift.percentageHeading': 'Tabel persentase',
  'lift.percentageNote':
    'Beban latihan sebagai bagian dari maksimal 100 kg, beserta repetisi yang biasanya dimungkinkan tiap persentase. Sesuaikan secara proporsional dengan perkiraan Anda sendiri.',
  'lift.columnPercentage': 'Persentase',
  'lift.columnLoad100': 'Beban dari 100 kg',
  'lift.columnApproxReps': 'Perkiraan repetisi',
  'lift.conversionHeading': 'Konversi maksimal per repetisi',
  'lift.conversionNote':
    'Berapa nilai maksimal perkiraan 100 kg pada tiap jumlah repetisi, dan bagaimana kelima persamaan dibandingkan untuk set lima repetisi pada 100 kg.',
  'lift.columnLoadFor100': 'Beban untuk maksimal 100 kg',
  'lift.column100x5': '100 kg × 5 rep',
  'lift.otherLifts': 'Gerakan lain',
  'lift.formulasGuide': 'Bagaimana rumus 1RM berbeda',
  'distance.finishTime': 'Waktu akhir',
  'distance.noscript':
    'Hasil langsung membutuhkan JavaScript. Tabel pace di bawah sudah dihitung sebelumnya dan berfungsi tanpanya.',
  'distance.aboutHeading': '{distance}',
  'distance.length': 'Jarak: {km} km ({metres} m).',
  'distance.fixedByRules': 'Ditetapkan oleh World Athletics Competition Rule 55.',
  'distance.chartHeading': 'Tabel pace {distance}',
  'distance.chartNote':
    'Waktu akhir, pace per mil, dan kecepatan untuk tiap pace per kilometer. Semuanya dihitung dalam meter dan detik lalu dikonversi sekali saja, sehingga tidak ada pembulatan yang menumpuk di sepanjang tabel.',
  'distance.columnPaceKm': 'Pace / km',
  'distance.columnPaceMile': 'Pace / mil',
  'distance.columnSpeed': 'Kecepatan',
  'distance.columnDistance': 'Jarak',
  'distance.columnElapsed': 'Waktu tempuh',
  'distance.otherDistances': 'Jarak lain',
  'distance.paceChartGuide': 'Cara membaca tabel pace',

  // --- Prose page detail ---
  'about.h2Absent': 'Apa yang sengaja tidak ada',
  'about.pAbsent':
    'Beberapa kalkulator sengaja tidak disediakan. Fungsi ginjal, luas permukaan tubuh untuk dosis kemoterapi, dan kadar alkohol dalam darah menghasilkan angka yang memengaruhi keputusan nyata, dan itu ranah klinisi. Kalkulator kehamilan dan kesuburan adalah kategori dengan pengawasan paling ketat di bidang kesehatan dan sudah dilayani dengan baik oleh penerbit medis mapan.',
  'about.h2Built': 'Bagaimana situs ini dibangun',
  'about.pBuilt':
    'Halaman statis, tanpa akun, tanpa basis data. Perhitungan berjalan di peramban Anda dan tidak ada peladen tempat mengirimkannya. Setiap rumus diperiksa terhadap contoh terhitung dari makalah asalnya dalam rangkaian uji otomatis, dan itulah yang menangkap kesalahan penyalinan yang diam-diam membuat sebuah kalkulator salah.',
  'contact.h2NoForm': 'Mengapa tidak ada formulir kontak',
  'contact.pNoForm':
    'Formulir butuh tempat untuk mengirim kiriman Anda, artinya sebuah peladen, artinya tempat pesan Anda tersimpan dan satu hal lagi yang harus diamankan. Situs ini berkas statis tanpa backend, dan mempertahankannya begitu adalah alasan tidak ada yang Anda ketik di kalkulator bisa keluar dari perangkat Anda. Sebuah alamat surel adalah pertukaran yang adil untuk itu.',
  'contact.ownerNotice':
    'PENANDA PEMILIK: ganti alamat kontak di src/config/site.ts sebelum peluncuran. Alamat itu muncul di sini, di kebijakan privasi, di ketentuan, dan di security.txt, dan mengubah satu berkas itu memperbarui semuanya.',

  // --- Short meta title, distinct from the H1 ---
  'lift.metaTitle': 'Kalkulator 1RM {lift}',

  // --- Short meta title for activity pages ---
  'activity.metaTitle': 'Kalori: {activity}',

  // --- Imperial height sub-fields, which need their own labels ---
  'calc.heightFeet': 'Tinggi, kaki',
  'calc.heightInches': 'Tinggi, inci',
};
