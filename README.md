# UTS Perancangan & Pemrograman Web (INF20053)
## Proyek: EVENTHUB - Sistem Pendaftaran Workshop Informatika

* **Nama** : Vincent
* **NIM** : 03082240020
* **Kelas / Program Studi** : Teknik Informatika - Universitas Pelita Harapan
* **Dosen Pengampu** : Sir Mangasa

---

### 1. Penjelasan Alur Dasar: Browser â†’ Web Server â†’ Response

Sesuai materi perkuliahan pertemuan 1 dan 2 mengenai dasar cara kerja web, alur komunikasi antara pengguna (client) dan server terjadi melalui proses berikut:

1. **Permintaan Pengguna (User Request di Browser)**
   Ketika pengguna membuka peramban web (seperti Google Chrome) dan mengetikkan alamat URL (misalnya `https://eventhub.uph.edu/index.html`), browser bertindak sebagai pihak *client* yang meminta data halaman web tersebut.

2. **Pencarian Alamat IP (DNS Lookup)**
   Komputer dan server di internet saling mengenali menggunakan alamat IP (seperti `172.217.194.94`), bukan nama teks. Oleh karena itu, browser terlebih dahulu bertanya ke DNS (*Domain Name System*) untuk menerjemahkan nama domain `eventhub.uph.edu` menjadi alamat IP server tempat file web disimpan (*Web Host*).

3. **Pengiriman HTTP Request**
   Setelah alamat IP server ditemukan, browser membuat koneksi (TCP handshake) dan mengirimkan pesan permintaan berupa **HTTP Request** (dengan method `GET /index.html`). Pesan ini dikirimkan melalui jaringan internet menuju Web Server.

4. **Pemrosesan di Web Server**
   Web Server (seperti Apache, Nginx, atau ekstensi Live Server di VS Code) menerima HTTP Request tersebut. Server akan mencari berkas dokumen `index.html` yang tersimpan di direktori komputernya. Jika berkas ditemukan, server membaca isi dokumen tersebut beserta referensi berkas pendukungnya (CSS, JS, dan gambar).

5. **Pengiriman HTTP Response**
   Web Server mengirimkan jawaban kembali ke browser melalui internet berupa **HTTP Response**. Respon ini memuat kode status (seperti `200 OK` jika berhasil) dan membawa berkas kode HTML sebagai isi pesannya (*response body*).

6. **Parsing dan Rendering di Browser**
   Browser menerima berkas HTML, lalu membaca tag demi tag untuk menyusun struktur dokumen (DOM Tree). Saat browser menemukan tag `<link>` CSS atau `<script>` JS, browser kembali meminta file terkait (`style.css` dan `script.js`), lalu menggabungkan gaya visual (CSSOM) dan mengeksekusi JavaScript agar halaman tampil interaktif dan rapi di layar pengguna.

---

### 2. Struktur Folder Proyek

Proyek ini disusun ke dalam direktori yang rapi dan terpisah sesuai fungsinya (*separation of concerns*):

```text
03082240020_Vincent_UTSWeb/
â”œâ”€â”€ index.html           # File utama halaman web (struktur semantik HTML5 & form)
â”œâ”€â”€ README.md            # Laporan penjelasan arsitektur web dan struktur file
â”œâ”€â”€ git-log.pdf          # Screenshot bukti commit git log --oneline
â”œâ”€â”€ screenshot.pdf       # Screenshot tampilan web (desktop, mobile, form, hasil DOM)
â”œâ”€â”€ css/
â”‚   â””â”€â”€ style.css        # File styling CSS eksternal & custom layout
â”œâ”€â”€ js/
â”‚   â””â”€â”€ script.js        # File logika JavaScript (validasi form & manipulasi DOM)
â””â”€â”€ assets/              # Folder untuk file aset gambar
    â””â”€â”€ banner.svg       # Banner utama halaman beranda
```

---
### 3. Petunjuk Pengujian Fitur Web

1. **Navigasi Bookmark**: Klik menu *Beranda*, *Workshop*, atau *Jadwal* pada navbar untuk berpindah seksi secara mulus (*smooth scrolling*).
2. **Pengecekan Responsif**: Ubah ukuran jendela browser ke ukuran layar ponsel (mobile) untuk memastikan menu berubah menjadi hamburger dan kartu workshop tertata vertikal rapi.
3. **Pengujian Validasi Form**:
   * Coba klik tombol *Kirim Pendaftaran* saat form masih kosong. Sistem akan menampilkan kotak pesan peringatan merah.
   * Isi nama, email valid, nomor telepon angka (minimal 10 digit), dan asal kampus.
   * Centang minimal satu workshop (misal: *Front-End Web* dan *Cybersecurity Dasar*).
   * Pilih tanggal hadir dan pilihan sesi.
4. **Hasil Ringkasan Dinamis**:
   * Setelah formulir valid dikirim, kotak ringkasan hijau (*Status: Terdaftar*) akan muncul seketika di bawah form tanpa memuat ulang (*reload*) halaman.
   * Rincian subtotal, potongan diskon sesuai kategori (UPH 20%, Luar 10%, Umum 0%), dan total akhir akan otomatis terkalkulasi.

---

### 4. Daftar Teknologi yang Digunakan
* **HTML5**: Elemen semantik (header, nav, main, section, article, footer, table, form).
* **CSS3**: Layout Flexbox/Grid, Box Model, Pseudo-classes (:hover, :focus, :active), Media Queries.
* **Bootstrap 5.3**: Grid layout, Responsive Navbar, Form-control, Utility classes.
* **JavaScript (ES6)**: Vanilla JS dasar (DOM Manipulation, Event Handling, Validation, Looping, Conditionals).
* **Git**: Version Control System dengan riwayat commit bertahap.
