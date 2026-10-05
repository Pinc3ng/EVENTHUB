// SCRIPT.JS - Logika Pendaftaran EVENTHUB
// Mahasiswa: Vincent (03082240020) - INF20053 UPH

// 1. Struktur Biaya Workshop & Diskon Peserta (Ditetapkan eksplisit sesuai RPS)
const HARGA_WORKSHOP = {
  'Front-End Web': 150000,
  'UI/UX Design': 120000,
  'Cybersecurity Dasar': 180000
};

const DISKON_PESERTA = {
  'Mahasiswa UPH': 0.20,      // Diskon 20%
  'Mahasiswa Luar': 0.10,     // Diskon 10%
  'Umum': 0.00                // Normal
};

function formatRupiah(nilai) {
  return 'Rp ' + Math.round(nilai).toLocaleString('id-ID');
}

// 2. Event Listener Form Submit
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formPendaftaran');
  const alertBox = document.getElementById('alertBox');
  const ringkasanBox = document.getElementById('ringkasanBox');
  const btnReset = document.getElementById('btnReset');

  // Reset form
  if (btnReset) {
    btnReset.addEventListener('click', function () {
      alertBox.classList.add('d-none');
      ringkasanBox.classList.add('d-none');
    });
  }

  form.addEventListener('submit', function (e) {
    // Mencegah reload halaman
    e.preventDefault();
    alertBox.classList.add('d-none');

    // Ambil data input
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const telepon = document.getElementById('telepon').value.trim();
    const institusi = document.getElementById('institusi').value.trim();
    const tanggal = document.getElementById('tanggalHadir').value;
    const sesi = document.getElementById('sesi').value;
    const tipeRadio = document.querySelector('input[name="tipePeserta"]:checked');
    const tipe = tipeRadio ? tipeRadio.value : 'Umum';

    // 3. Validasi Form Dasar
    if (nama === '') {
      alertBox.textContent = 'Nama lengkap wajib diisi!';
      alertBox.classList.remove('d-none');
      return;
    }

    if (email === '' || !email.includes('@')) {
      alertBox.textContent = 'Format email tidak valid!';
      alertBox.classList.remove('d-none');
      return;
    }

    const regexTelepon = /^[0-9]{10,14}$/;
    if (!regexTelepon.test(telepon)) {
      alertBox.textContent = 'Nomor telepon harus berupa angka (10-14 digit)!';
      alertBox.classList.remove('d-none');
      return;
    }

    if (institusi === '') {
      alertBox.textContent = 'Asal kampus/institusi wajib diisi!';
      alertBox.classList.remove('d-none');
      return;
    }

    // Ambil workshop yang dicentang menggunakan perulangan for
    const checkNodes = document.querySelectorAll('.ws-check:checked');
    const selectedWorkshops = [];
    for (let i = 0; i < checkNodes.length; i++) {
      const namaWs = checkNodes[i].value;
      selectedWorkshops.push({
        nama: namaWs,
        harga: HARGA_WORKSHOP[namaWs] || 0
      });
    }

    if (selectedWorkshops.length === 0) {
      alertBox.textContent = 'Pilih minimal satu workshop!';
      alertBox.classList.remove('d-none');
      return;
    }

    if (tanggal === '') {
      alertBox.textContent = 'Silakan pilih tanggal kehadiran!';
      alertBox.classList.remove('d-none');
      return;
    }

    if (sesi === '') {
      alertBox.textContent = 'Silakan pilih sesi workshop!';
      alertBox.classList.remove('d-none');
      return;
    }

    // 4. Hitung Total Biaya & Diskon
    let subtotal = 0;
    for (let i = 0; i < selectedWorkshops.length; i++) {
      subtotal += selectedWorkshops[i].harga;
    }

    let rateDiskon = 0;
    let labelDiskon = 'Diskon:';
    if (tipe === 'Mahasiswa UPH') {
      rateDiskon = DISKON_PESERTA['Mahasiswa UPH'];
      labelDiskon = 'Diskon UPH (20%):';
    } else if (tipe === 'Mahasiswa Luar') {
      rateDiskon = DISKON_PESERTA['Mahasiswa Luar'];
      labelDiskon = 'Diskon Mahasiswa Luar (10%):';
    } else {
      rateDiskon = 0;
      labelDiskon = 'Diskon (0%):';
    }

    const potongan = subtotal * rateDiskon;
    const totalAkhir = subtotal - potongan;

    // 5. Manipulasi DOM untuk Menampilkan Ringkasan
    document.getElementById('resNama').textContent = nama;
    document.getElementById('resEmail').textContent = email;
    document.getElementById('resTelepon').textContent = telepon;
    document.getElementById('resInstitusi').textContent = institusi;
    document.getElementById('resTipe').textContent = tipe;
    document.getElementById('resJadwal').textContent = tanggal + ' (' + sesi + ')';

    const ulWs = document.getElementById('resWorkshopList');
    ulWs.innerHTML = '';
    selectedWorkshops.forEach(function (item, idx) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between py-1 bg-transparent border-0';
      li.innerHTML = '<span>' + (idx + 1) + '. ' + item.nama + '</span><strong>' + formatRupiah(item.harga) + '</strong>';
      ulWs.appendChild(li);
    });

    document.getElementById('resSubtotal').textContent = formatRupiah(subtotal);
    document.getElementById('resDiskonLabel').textContent = labelDiskon;
    document.getElementById('resDiskon').textContent = '- ' + formatRupiah(potongan);
    document.getElementById('resTotal').textContent = formatRupiah(totalAkhir);

    ringkasanBox.classList.remove('d-none');
    ringkasanBox.scrollIntoView({ behavior: 'smooth' });
  });
});


