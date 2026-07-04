export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Makna Kurban dan Keutamaan 10 Hari Pertama Dzulhijjah 1447 H',
    excerpt: 'Bulan Zulhijah memiliki kedudukan istimewa dalam Islam, khususnya 10 hari pertama yang disebut sebagai hari-hari terbaik untuk memperbanyak amal saleh...',
    content: `
      <p>Pemerintah melalui Kementerian Agama Republik Indonesia resmi menetapkan 1 Zulhijah 1447 Hijriah jatuh pada hari Senin, 18 Mei 2026. Dengan demikian, Hari Arafah 9 Zulhijah jatuh pada Selasa, 26 Mei 2026, dan Hari Raya Idul Adha 10 Zulhijah diperingati pada Rabu, 27 Mei 2026.</p>
      
      <p>Tahun ini menjadi momentum yang membahagiakan karena penetapan awal Zulhijah disepakati bersama oleh pemerintah, Nahdlatul Ulama, Majelis Ulama Indonesia, dan Muhammadiyah. Kesepakatan tersebut diharapkan semakin memperkuat <em>ukhuwah</em> dan kebersamaan umat Islam dalam menyambut bulan penuh kemuliaan ini.</p>
      
      <p>Bulan Zulhijah memiliki kedudukan istimewa dalam Islam, khususnya 10 hari pertama yang disebut sebagai hari-hari terbaik untuk memperbanyak amal saleh. Rasulullah SAW bersabda bahwa tidak ada hari-hari di mana amal saleh lebih dicintai Allah melebihi amal yang dilakukan pada 10 hari pertama Zulhijah. Bahkan, keutamaannya melebihi jihad di jalan Allah, kecuali seseorang yang berjuang dengan seluruh jiwa dan hartanya hingga tidak ada yang kembali sedikit pun. Hadis ini diriwayatkan oleh Sahih Bukhari.</p>
      
      <p>Salah satu dalil yang menunjukkan keutamaan sepuluh hari pertama bulan Zulhijah adalah hadits Ibnu 'Abbas,</p>
      
      <p>Rasulullah shallallahu 'alaihi wa sallam bersabda,</p>
      
      <blockquote style="border-left: 4px solid #0D7C66; padding-left: 1rem; color: #5A7A70; font-style: italic; margin-bottom: 1.5rem;">
        « مَا مِنْ أَيَّامٍ الْعَمَلُ الصَّالِحُ فِيهَا أَحَبُّ إِلَى اللَّهِ مِنْ هَذِهِ الأَيَّامِ ». يَعْنِى أَيَّامَ الْعَشْرِ. قَالُوا يَا رَسُولَ اللَّهِ وَلاَ الْجِهَادُ فِى سَبِيلِ اللَّهِ قَالَ « وَلاَ الْجِهَادُ فِى سَبِيلِ اللَّهِ إِلاَّ رَجُلٌ خَرَجَ بِنَفْسِهِ وَمَالِهِ فَلَمْ يَرْجِعْ مِنْ ذَلِكَ بِشَىْءٍ ».
      </blockquote>
      
      <p><em>"Tidak ada satu amal shaleh yang lebih dicintai oleh Allah melebihi amal sholeh yang dilakukan pada hari-hari ini (yaitu 10 hari pertama bulan Dzul Hijjah)."</em></p>
      
      <p>Para sahabat bertanya: "Tidak pula jihad di jalan Allah?" Nabi shallallahu 'alaihi wa sallam menjawab: <em>"Tidak pula jihad di jalan Allah, kecuali orang yang berangkat jihad dengan jiwa dan hartanya namun tidak ada yang kembali satupun."</em> (hartanya habis untuk agama Allah dan gugur sebagai syuhada) [HR. Bukhari]</p>
      
      <p>Momentum Idul Adha dan ibadah kurban merupakan momentum untuk menanamkan nilai ketakwaan, keikhlasan, dan kepedulian sosial. Kurban mengajarkan umat Islam untuk rela berbagi kepada sesama, terutama kepada masyarakat yang membutuhkan. Semangat pengorbanan Nabi Ibrahim AS dan Nabi Ismail AS menjadi teladan, mengenai ketaatan kepada Allah harus ditempatkan di atas kepentingan duniawi.</p>
      
      <p>Selain ibadah kurban, umat Islam juga dianjurkan memperbanyak ibadah selama 10 hari pertama Zulhijah. Salah satu amalan yang sangat dianjurkan adalah puasa Arafah pada Selasa, 26 Mei 2026. Rasulullah SAW menjelaskan bahwa puasa Arafah dapat menjadi jalan pengampunan dosa setahun yang lalu dan setahun yang akan datang.</p>
      
      <p>Tidak hanya itu, bulan Zulhijah juga menjadi waktu terbaik untuk memperbanyak tobat, meninggalkan kemaksiatan, serta memperbanyak zikir seperti takbir, tahmid, tasbih, tahlil, dan istighfar. Hari-hari mulia ini hendaknya diisi dengan berbagai amal saleh, menjalankan kewajiban agama, memperkuat hubungan dengan Allah, serta meningkatkan kepedulian terhadap sesama manusia.</p>
      
      <p>Di tengah berbagai tantangan kehidupan saat ini, semangat kurban juga mengajarkan pentingnya berbagi dan memperkuat solidaritas sosial. Daging kurban bukan sekadar untuk konsumsi, melainkan simbol pemerataan dan kebersamaan agar kebahagiaan Idul Adha dapat dirasakan seluruh lapisan masyarakat.</p>
      
      <p>Semoga momentum Dzulhijjah tahun ini membawa keberkahan bagi seluruh umat Islam, memperkuat keimanan, dan menjadikan kita pribadi yang lebih ikhlas, peduli, dan bertakwa kepada Allah SWT. Semoga Allah memberikan kesehatan, kekuatan, dan kesempatan kepada kita semua untuk meraih pahala besar di bulan yang mulia ini.</p>
    `,
    date: '18 Mei 2026',
    category: 'Nasehat',
    image: '/images/1.jpg',
    author: 'KH M Hulaimul Fikri',
  },
  {
    id: '2',
    title: 'Amar Ma’ruf Dari Lisan Menuju Tirakat Hati',
    excerpt: 'Ada satu bentuk perjuangan orang tua yang sering tidak terlihat, tetapi sesungguhnya sangat dalam nilainya di sisi Allah: ketika mereka tidak mampu lagi mengubah keadaan dengan tangan dan lisan...',
    content: `
      <p>Ada satu bentuk perjuangan orang tua yang sering tidak terlihat, tetapi sesungguhnya sangat dalam nilainya di sisi Allah: ketika mereka tidak mampu lagi mengubah keadaan dengan tangan dan lisan, lalu mereka menjaga anak-anaknya dengan doa, puasa, tirakat, dan kegelisahan hati.</p>
      
      <p>Sebagian orang mengira amar ma'ruf nahi munkar hanya sebatas menegur, menasihati, atau melarang. Padahal dalam banyak keadaan, terutama terhadap orang-orang yang kita cintai, perjuangan itu jauh lebih sunyi dan lebih menyakitkan.</p>
      
      <p>Rasulullah ﷺ bersabda:</p>
      
      <blockquote style="border-left: 4px solid #0D7C66; padding-left: 1rem; color: #5A7A70; font-style: italic; margin-bottom: 1.5rem;">
        عَنْ أَبِي سَعِيدٍ الْخُدْرِيِّ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ«مَنْ رَأَى مِنْكُمْ مُنْكَرًا فَلْيُغَيِّرْهُ بِيَدِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِلِسَانِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِقَلْبِهِ، وَذَلِكَ أَضْعَفُ الْإِيمَانِ»
      </blockquote>
      
      <p><em>"Barang siapa di antara kalian melihat kemungkaran maka ubahlah dengan tangannya. Jika tidak mampu maka dengan lisannya. Jika tidak mampu maka dengan hatinya, dan itulah selemah-lemahnya iman."</em> (HR. Muslim)</p>
      
      <p>Hadits ini sering dipahami seolah "dengan hati" adalah tingkatan yang tidak berarti. Padahal tidak sesederhana itu. Imam An-Nawawi menjelaskan bahwa membenci kemungkaran dalam hati adalah batas minimal iman yang tidak boleh hilang. Artinya, selama hati masih gelisah terhadap keburukan, cahaya iman itu masih hidup. Dan di sinilah kita mulai memahami mengapa orang-orang tua dahulu banyak melakukan tirakat untuk anak-anaknya.</p>
      
      <p>Mereka mungkin tidak selalu berhasil mengendalikan zaman. Mereka tidak mampu mengawasi anak-anak setiap saat. Mereka sadar nasihat kadang tidak didengar. Teguran bisa memicu jarak. Kata-kata terkadang kalah oleh lingkungan dan arus dunia.</p>
      
      <p>Lalu apa yang mereka lakukan? Mereka membawa kegelisahan itu kepada Allah. Mereka berpuasa agar hatinya lembut. Mereka bangun malam agar anaknya dijaga. Mereka menangis diam-diam dalam sujud. Mereka memperbanyak istighfar untuk keluarganya.</p>
      
      <p>Ini bukan pelarian dari amar ma'ruf. Justru ini bentuk amar ma'ruf yang paling dalam: menjaga agar hati tidak rela terhadap kerusakan, lalu mengetuk pintu langit ketika kemampuan manusia telah sampai batasnya.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: bold; color: #1A2E28; margin-top: 2rem; margin-bottom: 1rem;">Ketika Amar Ma’ruf Tidak Lagi Cukup dengan Kata-Kata</h3>
      
      <p>Ada fase dalam kehidupan ketika nasihat tidak lagi cukup. Terutama di zaman hari ini, ketika manusia dibanjiri informasi, ego, dan pembenaran diri. Kadang orang tua sudah berbicara lembut — tidak didengar. Berbicara keras — malah menjauh. Diam — dianggap membiarkan. Maka sebagian orang tua saleh memilih jalan para nabi: memperbanyak doa.</p>
      
      <p>Nabi Nuh 'alaihis salam berdakwah ratusan tahun kepada anak dan kaumnya. Nabi Ya'qub menangis karena anak-anaknya. Nabi Ibrahim tidak hanya menasihati, tetapi juga mendoakan keturunannya lintas generasi. Karena mereka tahu: hidayah bukan milik manusia.</p>
      
      <p>Allah ﷻ berfirman kepada Nabi Muhammad ﷺ:</p>
      
      <blockquote style="border-left: 4px solid #0D7C66; padding-left: 1rem; color: #5A7A70; font-style: italic; margin-bottom: 1.5rem;">
        إِنَّكَ لَا تَهْدِي مَنْ أَحْبَبْتَ وَلَٰكِنَّ اللَّهَ يَهْدِي مَنْ يَشَاءُ ۚ وَهُوَ أَعْلَمُ بِالْمُهْتَدِينَ
      </blockquote>
      
      <p><em>"Sesungguhnya engkau tidak dapat memberi hidayah kepada orang yang engkau cintai, tetapi Allah memberi hidayah kepada siapa yang Dia kehendaki."</em> (QS. Al-Qashash: 56) Ayat ini sangat menghibur sekaligus merendahkan kesombongan manusia. Bahkan Rasulullah ﷺ tidak mampu memaksa hidayah masuk ke hati orang yang beliau cintai. Lalu bagaimana manusia biasa?</p>
      
      <p>Di sinilah tirakat, doa, dan perjuangan batin menjadi penting. Sebab ketika tangan tak mampu menjangkau dan lisan tak lagi didengar, hati yang terus berharap kepada Allah bisa menjadi jalan terakhir yang tidak pernah tertutup.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: bold; color: #1A2E28; margin-top: 2rem; margin-bottom: 1rem;">"Dengan Hati" Bukan Berarti Pasif</h3>
      
      <p>Namun perlu dipahami: amar ma'ruf dengan hati bukan berarti menyerah total atau membiarkan kemungkaran. Hati yang hidup akan melahirkan: doa, kegelisahan, ikhtiar, teladan, dan kesabaran panjang. Bukan kebencian yang kasar, tetapi cinta yang takut kehilangan. Orang tua dahulu memahami bahwa memperbaiki anak tidak cukup dengan kontrol, tetapi juga membutuhkan keberkahan. Dan keberkahan itu sering lahir dari ibadah-ibadah tersembunyi.</p>
      
      <p>Mungkin itulah sebabnya dahulu ada orang tua yang: mengurangi tidur demi qiyamul lail, berpuasa Senin-Kamis untuk keluarganya, menjaga makanan halal dengan sangat hati-hati, memperbanyak membaca Al-Qur'an di rumah, dan tidak henti menyebut nama anak-anaknya dalam doa. Karena mereka yakin: ada pertempuran yang tidak bisa dimenangkan hanya dengan logika dan pendidikan, tetapi membutuhkan pertolongan Allah.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: bold; color: #1A2E28; margin-top: 2rem; margin-bottom: 1rem;">Hati yang Masih Gelisah Adalah Tanda Iman Masih Hidup</h3>
      
      <p>Yang paling berbahaya bukan ketika seseorang tidak mampu mengubah kemungkaran dengan tangan atau lisan. Yang paling berbahaya adalah ketika hati sudah tidak lagi merasa apa-apa. Tidak sedih melihat kerusakan. Tidak takut melihat anak terseret arus dunia. Tidak lagi peduli apakah keluarga dekat kepada Allah atau jauh dari-Nya. Itulah mati rasa ruhani.</p>
      
      <p>Maka kegelisahan orang tua terhadap keselamatan iman anak-anaknya sesungguhnya adalah bentuk kasih sayang yang agung. Bahkan mungkin itu salah satu bentuk amar ma'ruf yang paling tulus: sebuah perjuangan sunyi yang tidak dilihat manusia, tetapi dicatat oleh Allah.</p>
      
      <p>Dan boleh jadi, banyak anak terselamatkan bukan hanya karena nasihat orang tuanya, tetapi karena ada doa yang terus mengetuk langit atas namanya — bahkan ketika ia sendiri lalai kepada Tuhannya.</p>
    `,
    date: '20 Juni 2026',
    category: 'Motivasi',
    image: '/images/2.jpg',
    author: 'Fajar Syahri MT SK4',
  },
  {
    id: '3',
    title: 'Beribadah Kepada Allah Itu Keren',
    excerpt: 'Di tengah dunia yang riuh oleh pencarian makna, manusia sering tersesat dalam kerumitan yang ia ciptakan sendiri. Ia mengejar pengakuan, kekuasaan, dan kesenangan...',
    content: `
      <p>Di tengah dunia yang riuh oleh pencarian makna, manusia sering tersesat dalam kerumitan yang ia ciptakan sendiri. Ia mengejar pengakuan, kekuasaan, dan kesenangan, seakan semua itu mampu menenangkan jiwa. Padahal, ada satu jalan yang sederhana namun agung—jalan yang menjadikan hidup ringan namun bermakna: menyembah Allah Yang Maha Esa. Dan sungguh, dalam kedalaman maknanya, itulah "keren" yang sejati.</p>
      
      <p>Keren, dalam pengertian hakiki, bukanlah tentang penampilan atau pujian manusia. Ia adalah tentang keberanian memilih kebenaran di tengah kebingungan. Ia adalah keteguhan hati untuk hanya tunduk kepada satu Rabb, bukan kepada hawa nafsu, bukan kepada dunia, bukan pula kepada manusia. Tauhid membebaskan manusia dari perbudakan yang tidak terlihat—perbudakan terhadap selain Allah.</p>
      
      <p>Allah berfirman:</p>
      
      <blockquote style="border-left: 4px solid #0D7C66; padding-left: 1rem; color: #5A7A70; font-style: italic; margin-bottom: 1.5rem;">
        وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ
      </blockquote>
      
      <p><em>"Tidaklah Aku menciptakan jin dan manusia melainkan agar mereka beribadah kepada-Ku."</em> (QS. Adz-Dzariyat: 56)</p>
      
      <p>Ayat ini bukan sekadar pernyataan tujuan, tetapi penegasan jati diri manusia. Bahwa kita ini diciptakan untuk satu misi mulia: menyembah Allah semata. Maka ketika seseorang menemukan jalan ini, ia sebenarnya telah menemukan arah hidupnya. Dan bukankah menemukan arah di tengah kesesatan adalah sesuatu yang luar biasa?</p>
      
      <p>Menyembah Allah Yang Esa juga berarti hidup dengan kemurnian niat. Tidak ada kepura-puraan. Tidak ada pencitraan. Semua dilakukan karena Allah. Inilah bentuk kejujuran tertinggi. Rasulullah ﷺ bersabda:</p>
      
      <blockquote style="border-left: 4px solid #0D7C66; padding-left: 1rem; color: #5A7A70; font-style: italic; margin-bottom: 1.5rem;">
        إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ
      </blockquote>
      
      <p><em>"Sesungguhnya amal itu tergantung pada niatnya."</em> (HR. Bukhari dan Muslim)</p>
      
      <p>Orang yang mentauhidkan Allah dengan benar tidak lagi terombang-ambing oleh penilaian manusia. Ia tidak hancur karena celaan, tidak pula melambung karena pujian. Hatinya terikat pada Allah, bukan pada makhluk. Ini adalah kemerdekaan sejati—dan kemerdekaan seperti ini adalah sesuatu yang sangat langka, sangat kuat, dan sangat "keren".</p>
      
      <p>Lebih dari itu, tauhid memberikan ketenangan yang tidak bisa dibeli oleh dunia. Ketika seseorang hanya bergantung kepada Allah, ia tidak takut kehilangan selain-Nya. Ketika ia yakin bahwa Allah Maha Mengatur, maka segala kegelisahan menjadi ringan. Allah berfirman:</p>
      
      <blockquote style="border-left: 4px solid #0D7C66; padding-left: 1rem; color: #5A7A70; font-style: italic; margin-bottom: 1.5rem;">
        الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
      </blockquote>
      
      <p><em>"Orang-orang yang beriman dan hati mereka menjadi tenteram dengan mengingat Allah. Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram."</em> (QS. Ar-Ra’d: 28)</p>
      
      <p>Ketenangan ini bukan hasil dari dunia yang sempurna, tetapi dari hati yang terhubung dengan Rabb-nya. Maka orang yang bertauhid tetap tenang meski badai datang, tetap teguh meski ujian menghimpit. Dalam sebuah hadits yang agung, Rasulullah ﷺ bersabda: <em>"Hak Allah atas hamba adalah mereka menyembah-Nya dan tidak menyekutukan-Nya dengan sesuatu apa pun."</em> (HR. Bukhari dan Muslim)</p>
      
      <p>Inilah hak terbesar, dan ketika seorang hamba menunaikannya, ia sedang menempatkan dirinya pada posisi yang paling mulia di sisi Allah. Tidak ada kehormatan yang lebih tinggi daripada menjadi hamba yang mentauhidkan Rabb-nya.</p>
      
      <p>Menyembah Allah Yang Esa juga berarti memiliki arah akhir yang jelas: surga. Allah menjanjikan keselamatan bagi orang-orang yang menjaga tauhidnya. Bahkan dalam hadits disebutkan: <em>"Barangsiapa yang mati dalam keadaan tidak menyekutukan Allah dengan sesuatu pun, maka ia akan masuk surga."</em> (HR. Muslim)</p>
      
      <p>Bukankah ini janji yang luar biasa? Bahwa kesederhanaan dalam keyakinan—tidak menyekutukan Allah—membawa kepada keabadian yang penuh kenikmatan.</p>
      
      <p>Akhirnya, menyembah dan beribadah kepada Allah Yang Esa itu keren karena ia menempatkan manusia pada derajat yang paling autentik: sebagai hamba yang mulia. Ia tidak tunduk kepada dunia, tetapi dunia yang tunduk kepadanya. Ia tidak kehilangan arah, karena ia berjalan menuju Allah. Ia tidak kosong, karena hatinya dipenuhi dzikir.</p>
      
      <p>Di tengah dunia yang sering memuja yang fana, menjadi hamba yang bertauhid adalah bentuk keberanian tertinggi. Dan sungguh, tidak ada yang lebih "keren" daripada hati yang hanya sujud kepada Allah semata.</p>
    `,
    date: '21 Juni 2026',
    category: 'Fiqih',
    image: '/images/3.jpg',
    author: 'Fadil Aditya Adzima',
  }
];
