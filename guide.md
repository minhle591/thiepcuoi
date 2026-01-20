# Guide: Cai dat thiep cuoi

Tai lieu nay huong dan nhanh cach thay noi dung, anh va cau hinh cho thiep cuoi.

## 1) Chon trang can dung
- Nha gai: `index-nhagai.html`
- Nha trai: `index-nhatrai.html`

Moi trang la mot file HTML doc lap, co the sua rieng.

## 2) Doi ten co dau chu re
- Tim va thay noi dung trong the `<title>` va tieu de `<h1 class="couple-name">`.

## 3) Doi thoi gian, dia diem
- Phan "Thoi gian" va "Dia diem" trong khung thong tin o dau trang.
- Muc lich trong file `assets/js/main.js` tai bien `EVENT_DETAILS`.
- Dong dem nguoc tai `initCountdown()` (ngay gio muc tieu).

## 4) Doi anh
- Anh hero: `assets/img/hero.jpg`
- Khung anh: `assets/img/frame.png`
- Anh gallery: `assets/img/gallery-1.jpg` den `assets/img/gallery-7.jpg`

Chi can ghi de anh moi de len dung ten file cu.

## 5) Mung cuoi qua ma QR
- Sua `src` cua 2 the `<img>` trong muc "Mung cuoi qua ma QR".
- Doi `addInfo` va `accountName` trong URL QR.
- Doi noi dung sao chep trong nut co `data-copy`.

## 6) Nhac nen tu dong
- Dat file nhac tai: `assets/audio/nhac.mp3`
- Co the doi duong dan nhac trong the `<audio id="bg-music">` o dau `<body>`.
- Luu y: trinh duyet co the chan autoplay; chi can cham/click lan dau de nhac chay.

## 7) Loi nhan qua Telegram (tuy chon)
- Mo `assets/js/main.js`.
- Dien `BOT_TOKEN` va `CHAT_ID`, hoac dung che do proxy.
- Mac dinh su dung proxy: `TELEGRAM_MODE: "proxy"`, URL `PROXY_URL`.

## 8) Luu y hieu ung tuyet
- Hieu ung tuyet dang bat mac dinh.
- Neu muon tat: xoa `<div class="snow"></div>` trong file HTML, hoac bo khoi CSS `.snow` va JS `initSnow()`.

## 9) Chay thu
- Mo `index-nhagai.html` hoac `index-nhatrai.html` bang trinh duyet.
