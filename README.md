<h1 align="center">Welcome to nusantara-1 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: arya" src="https://img.shields.io/badge/License-arya-yellow.svg" />
  </a>
</p>

> Web Development untuk user login dengan menggunakan token lalu penampilan chart yang memanfaatkan library react js dan juga menambahkan akses menambah dan menghapus data dari db yang dibuat sederhana, dalam proses login memiliki tambahan seperti remember me, dan user tidak bisa sembarang mengakses endpoint, jika user mengakses sembarang jika posisi user sudah login maka akan masuk ke /chart dan jika user belum login maka akan dikembalikan ke dalam halaman login, pengerjaan ini memanfaatkan penggunaan axios, chart, dan lain lain
>
> Proyek Web Development untuk Sistem Login User dan Pengelolaan Data Chart menggunakan Token-based Authentication

Proyek ini bertujuan untuk membangun aplikasi web yang memungkinkan pengguna untuk melakukan login menggunakan autentikasi berbasis token. Sistem ini memanfaatkan React.js untuk antarmuka pengguna (UI) dan Axios untuk komunikasi dengan backend API. Pengguna yang berhasil login akan diberikan akses untuk melihat dan mengelola data chart dalam aplikasi.

Fitur Utama:
Autentikasi Pengguna dengan Token:
Pengguna harus login menggunakan kredensial yang valid. Setelah login, sistem akan menghasilkan token yang digunakan untuk mengakses berbagai endpoint di aplikasi. Token ini disimpan di localStorage (atau cookie) agar pengguna tetap terautentikasi meskipun melakukan reload atau menutup browser, dengan tambahan opsi "Remember Me" agar sesi pengguna tetap aktif lebih lama.

Halaman Login yang Terproteksi:
Pengguna yang belum login akan dialihkan secara otomatis ke halaman login. Jika pengguna sudah berhasil login, mereka tidak dapat mengakses halaman login lagi. Sebaliknya, jika pengguna mencoba mengakses halaman selain /chart tanpa login, mereka akan diarahkan ke halaman login terlebih dahulu.

Manajemen Data Chart:
Setelah login, pengguna dapat melihat data chart yang ditampilkan dengan menggunakan library seperti Chart.js. Data chart ini dapat berupa informasi seperti jumlah suara atau statistik lainnya yang diambil dari backend. Pengguna dapat menambah, mengubah, dan menghapus data chart, dengan perubahan langsung diterapkan ke database melalui API.

Backend API dengan Keamanan:
Backend akan melibatkan penggunaan token untuk memastikan setiap request yang dikirim oleh pengguna yang terautentikasi. Hanya pengguna yang memiliki token yang valid yang dapat mengakses endpoint untuk mengambil data chart, menambah data baru, atau menghapus data yang ada.

Responsif dan Interaktif:
Antarmuka pengguna dirancang agar responsif dan interaktif, menggunakan teknologi React.js untuk membangun elemen-elemen UI, dan Chart.js untuk menampilkan data chart secara dinamis. Pengguna dapat mengklik elemen chart untuk melihat detail lebih lanjut atau melakukan modifikasi.

Akses Control dengan Route Guarding:
Sistem ini menggunakan routing berbasis React untuk menjaga akses ke halaman. Jika pengguna mencoba mengakses halaman tertentu tanpa login, mereka akan diarahkan kembali ke halaman login. Setelah login berhasil, mereka akan dibawa ke halaman chart dan hanya dapat mengaksesnya jika token autentikasi mereka valid.

Penggunaan Axios untuk API Calls:
Axios digunakan untuk menangani komunikasi antara frontend dan backend, termasuk pengambilan data chart, pengiriman data baru, serta penghapusan data. Token autentikasi akan disertakan dalam setiap permintaan yang membutuhkan akses terbatas.

Teknologi yang Digunakan:
Frontend: React.js

## Install

```sh
npm install
```

## Author

👤 **Arya Gilang**

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
