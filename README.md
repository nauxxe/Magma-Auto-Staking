# Magma-Auto-Staking
Magma Auto Staking with Schedule

---

Bot ini akan melakukan staking otomatis ke smart contract Monad sebanyak **2x sehari** pada jam **15:00 WIB** dan **22:00 WIB**.

---

## Fitur

- Staking otomatis 0.2 Monad ke smart contract pada jam yang dijadwalkan.
- Penjadwalan menggunakan cron (node-cron).
- Log hasil staking ke terminal.
- Retry otomatis jika staking gagal (maksimal 2x).

---

## Kebutuhan Sistem

- **VPS/Server** (minimal 1 vCPU, 1GB RAM)
- Hubungi Telegram http://t.me/nauxxe untuk pembelian VPS  1 vCPU, 1GB RAM seharga Rp.40.000,- Durasi 12 bulan 
- **Node.js** (disarankan versi 18.x atau 20.x)
- **npm** (Node Package Manager)
- **screen** atau **pm2** (agar bot tetap berjalan di background)
- **Akun wallet Monad** (beserta private key)
- **Saldo Monad** (untuk staking dan biaya gas)

---

## Instalasi

1. **Clone repository atau upload file ke VPS**

2. **Masuk ke folder project**
   ```bash
   cd magma-staking
   ```

3. **Install dependency**
   ```bash
   npm install ethers@5 node-cron dotenv
   ```

4. **Buat file `.env`**
   ```
   PRIVATE_KEY=0xPRIVATEKEYANDA
   ```
   Ganti `0xPRIVATEKEYANDA` dengan private key wallet Monad Anda.

---

## Cara Menjalankan

### **A. Menjalankan dengan screen (manual, sederhana)**
1. Jalankan screen:
   ```bash
   screen -S staking
   ```
2. Jalankan bot:
   ```bash
   node bot.js
   ```
3. Untuk keluar dari screen tanpa mematikan proses:
   - Tekan `Ctrl+A` lalu `D`
4. Untuk kembali ke screen:
   ```bash
   screen -r staking
   ```

---

### **B. Menjalankan dengan pm2 (direkomendasikan, auto-restart)**
1. Install pm2 (jika belum):
   ```bash
   npm install -g pm2
   ```
2. Jalankan bot:
   ```bash
   pm2 start bot.js --name monad-staking
   ```
3. Simpan konfigurasi pm2 agar auto-start saat VPS reboot:
   ```bash
   pm2 save
   pm2 startup
   ```
4. Melihat log:
   ```bash
   pm2 logs monad-staking
   ```

---

## Troubleshooting

- **Error ethers version:**  
  Pastikan menggunakan ethers versi 5 (`npm install ethers@5`).
- **PRIVATE_KEY tidak terdeteksi:**  
  Pastikan file `.env` sudah dibuat dan tidak ada spasi di depan/akhir key.
- **Staking tidak berjalan:**  
  Cek saldo Monad dan biaya gas di wallet Anda.

---

## Catatan Keamanan

- **JANGAN** membagikan file `.env` atau private key Anda ke siapapun.
- Gunakan wallet khusus untuk staking, jangan gunakan wallet utama.

---

## Lisensi

---

Jika ada pertanyaan atau kendala, silakan hubungi Telegram http://t.me/nauxxe

---

## Perhitungan Monad yang dibutuhkan jika Mainnet bulan Agustus 2025
M = Monad
X = Jumlah 1x staking
Y = Jumlah Hari
F = 0.0054 Fee 1x staking

Cari M Cari Fee
X = 0.2 Monad
Y = 110 Hari
F = 0.0054 Monad

X x Y
X = 0.2 x 110 = 22 Monad 
X = 22

F x X 
F = 0.0054 x 22 
F = 0.1188

X + F = M
X + F = 22 + 0.1188
M = 22.1188

Kesimpulan: Dibutuhkan 22.1188 Monad untuk 1x transaksi selama 110 hari
Script ini menjalankan 2x transaksi dalam 1 hari, maka M x 2 = 44.2375
Jadi dibutuhkan kurang lebih 44.2375 Monad agar script bisa berjalan hingga 110 hari kedepan
