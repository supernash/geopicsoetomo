let selectedLatLng = null;
let uploadedImg = null;

const logo = new Image();
logo.src = "rsds.png"; // file logo kamu yang dikirim barusan
let logoLoaded = false;
logo.onload = () => {
  logoLoaded = true;
};

document.getElementById("photoInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      uploadedImg = img;
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(file);
});

const map = L.map('map').setView([-7.25, 112.75], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
let marker;
map.on('click', function(e) {
  selectedLatLng = e.latlng;
  if (marker) marker.setLatLng(e.latlng);
  else marker = L.marker(e.latlng).addTo(map);
});

document.getElementById("exportBtn").addEventListener("click", () => {
  if (!uploadedImg) return alert("Upload foto dulu!");
  if (!logoLoaded) return alert("Logo belum dimuat!");

  const canvas = document.getElementById("canvas");
  canvas.width = uploadedImg.width;
  canvas.height = uploadedImg.height;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImg, 0, 0);

  // Gambar logo (ukuran 120px, pojok kiri atas)
  ctx.drawImage(logo, 20, 20, 120, 120);

  // Tambahkan teks
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.strokeStyle
