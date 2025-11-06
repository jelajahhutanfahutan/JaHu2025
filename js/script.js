// ========== FALLING LEAVES ANIMATION ==========
const leafEmojis = ["🍃", "🍂", "🍁", "🌿", "🍀"];
const leafContainer = document.getElementById('falling-leaves');
let currentItem = '';

function createLeaf() {
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');
  leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
  leaf.style.left = Math.random() * 100 + 'vw';
  leaf.style.fontSize = (12 + Math.random() * 8) + 'px';

  const duration = 6 + Math.random() * 10;
  const direction = Math.random() < 0.5 ? -1 : 1;
  const sway = 40 + Math.random() * 60;

  leaf.animate([
    { transform: `translateX(0px) translateY(-50px) rotate(0deg)`, opacity: 0 },
    { transform: `translateX(${direction * sway}px) translateY(50vh) rotate(180deg)`, opacity: 0.7 },
    { transform: `translateX(${direction * -sway}px) translateY(110vh) rotate(360deg)`, opacity: 0 }
  ], {
    duration: duration * 1000,
    easing: 'linear',
    fill: 'forwards'
  });

  leafContainer.appendChild(leaf);
  setTimeout(() => leaf.remove(), duration * 1000);
}

setInterval(createLeaf, 2500);

// ========== CLICK BURST EFFECT ==========
document.addEventListener("pointerdown", function(e) {
  const burst = document.createElement("div");
  burst.style.position = "fixed";
  burst.style.left = e.clientX + "px";
  burst.style.top = e.clientY + "px";
  burst.style.pointerEvents = "none";
  burst.style.zIndex = "9999";

  for (let i = 0; i < 10; i++) {
    const leaf = document.createElement("span");
    leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
    leaf.style.position = "absolute";
    leaf.style.fontSize = (12 + Math.random() * 12) + "px";
    leaf.style.opacity = "0.9";
    
    const x = (Math.random() - 0.5) * 250;
    const y = (Math.random() - 0.5) * 250;
    
    leaf.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: `translate(${x}px, ${y}px) scale(0.4) rotate(720deg)`, opacity: 0 }
    ], { duration: 1200, easing: 'ease-out' });
    
    burst.appendChild(leaf);
  }

  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 1200);
});

// ========== COUNTDOWN TIMER YANG MENYESUAIKAN DENGAN ACARA ==========
function countdown() {
  const now = new Date().getTime();
  
  // Daftar acara dan tanggalnya
  const events = [
    { id: 'sosialisasi', date: new Date("2025-11-03T15:00:00"), name: "Sosialisasi Jelajah Hutan" },
    { id: 'pra', date: new Date("2025-12-06T07:00:00"), name: "PRA-Jelajah Hutan" },
    { id: 'harih', date: new Date("2025-12-12T08:00:00"), name: "Hari-H Jelajah Hutan" },
    { id: 'pasca', date: new Date("2025-12-20T15:00:00"), name: "Pasca-Jelajah Hutan" }
  ];

  // Cari acara berikutnya yang belum dimulai
  let nextEvent = null;
  let nextEventIndex = -1;

  for (let i = 0; i < events.length; i++) {
    if (events[i].date.getTime() > now) {
      nextEvent = events[i];
      nextEventIndex = i;
      break;
    }
  }

  // Jika semua acara sudah lewat
  if (!nextEvent) {
    document.getElementById("countdown").innerHTML = `
      <div class="time-box" style="min-width: 250px;">
        <div class="time-number">SELESAI</div>
        <div class="time-label">Semua Acara Telah Berakhir</div>
      </div>
    `;
    document.querySelector('.countdown-title').textContent = "🎉 Semua Acara Jelajah Hutan 2025 Telah Selesai!";
    return;
  }

  const targetDate = nextEvent.date.getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update judul countdown
  document.querySelector('.countdown-title').textContent = `⏰ Hitung Mundur ${nextEvent.name}`;

  // Update timer
  document.getElementById("countdown").innerHTML = `
    <div class="time-box">
      <div class="time-number">${days}</div>
      <div class="time-label">Hari</div>
    </div>
    <div class="time-box">
      <div class="time-number">${hours}</div>
      <div class="time-label">Jam</div>
    </div>
    <div class="time-box">
      <div class="time-number">${minutes}</div>
      <div class="time-label">Menit</div>
    </div>
    <div class="time-box">
      <div class="time-number">${seconds}</div>
      <div class="time-label">Detik</div>
    </div>
  `;

  // Jika acara akan dimulai dalam 24 jam, tambahkan efek berkedip
  if (distance < 24 * 60 * 60 * 1000) {
    document.querySelector('.countdown-title').classList.add('blink-text');
  } else {
    document.querySelector('.countdown-title').classList.remove('blink-text');
  }
}

// ========== CHECK EVENT STATUS YANG LEBIH AKURAT ==========
function checkEventStatus() {
  const now = new Date();
  
  // Sosialisasi - 3 Nov 2025
  const sosialisasiStart = new Date("2025-11-03T15:00:00");
  const sosialisasiEnd = new Date("2025-11-03T18:00:00");
  const sosialisasiElement = document.getElementById('event-sosialisasi');
  
  if (now >= sosialisasiStart && now <= sosialisasiEnd) {
    sosialisasiElement.classList.add('ongoing');
    sosialisasiElement.classList.remove('completed');
  } else if (now > sosialisasiEnd) {
    sosialisasiElement.classList.add('completed');
    sosialisasiElement.classList.remove('ongoing');
  } else {
    sosialisasiElement.classList.remove('ongoing', 'completed');
  }
  
  // PRA Jelajah - 6-7 Des 2025 (2 hari)
  const praStart = new Date("2025-12-06T07:00:00");
  const praEnd = new Date("2025-12-07T18:00:00");
  const praElement = document.getElementById('event-pra');
  
  if (now >= praStart && now <= praEnd) {
    praElement.classList.add('ongoing');
    praElement.classList.remove('completed');
  } else if (now > praEnd) {
    praElement.classList.add('completed');
    praElement.classList.remove('ongoing');
  } else {
    praElement.classList.remove('ongoing', 'completed');
  }
  
  // Hari-H - 12-14 Des 2025 (3 hari)
  const harihStart = new Date("2025-12-12T08:00:00");
  const harihEnd = new Date("2025-12-14T23:59:59");
  const harihElement = document.getElementById('event-harih');
  
  if (now >= harihStart && now <= harihEnd) {
    harihElement.classList.add('ongoing');
    harihElement.classList.remove('completed');
  } else if (now > harihEnd) {
    harihElement.classList.add('completed');
    harihElement.classList.remove('ongoing');
  } else {
    harihElement.classList.remove('ongoing', 'completed');
  }
  
  // Pasca - 20 Des 2025
  const pascaStart = new Date("2025-12-20T15:00:00");
  const pascaEnd = new Date("2025-12-20T18:00:00");
  const pascaElement = document.getElementById('event-pasca');
  
  if (now >= pascaStart && now <= pascaEnd) {
    pascaElement.classList.add('ongoing');
    pascaElement.classList.remove('completed');
  } else if (now > pascaEnd) {
    pascaElement.classList.add('completed');
    pascaElement.classList.remove('ongoing');
  } else {
    pascaElement.classList.remove('ongoing', 'completed');
  }
}

// ========== SPONSOR DATA ==========
const sponsors = [
  { name: "Sponsor 1", logo: "images/sponsor1.jpg", ig: "" },
  { name: "Sponsor 2", logo: "images/sponsor2.jpg", ig: "" },
  { name: "Sponsor 3", logo: "images/sponsor3.jpg", ig: "" },
  { name: "Sponsor 4", logo: "images/sponsor4.jpg", ig: "" }
];

function renderSponsors() {
  const sponsorContainer = document.getElementById('sponsor-logos-container');
  if (!sponsorContainer) return;
  
  sponsorContainer.innerHTML = '';
  
  sponsors.forEach(sponsor => {
    const sponsorLogo = document.createElement('img');
    sponsorLogo.src = sponsor.logo;
    sponsorLogo.alt = sponsor.name;
    sponsorLogo.className = 'sponsor-logo';
    sponsorLogo.onclick = () => window.open(sponsor.ig, '_blank');
    sponsorContainer.appendChild(sponsorLogo);
  });
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderSponsors);

// ========== ARTICLE/POPUP FUNCTIONS ==========
function showArticle(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = 'block';
    setTimeout(() => el.classList.add('active'), 50);
    document.body.style.overflow = 'hidden';
    history.pushState({popup: id}, '', `#${id}`);
  }
}

function closeArticle() {
  document.querySelectorAll('.content.active').forEach(el => {
    el.classList.remove('active');
    setTimeout(() => el.style.display = 'none', 500);
  });
  document.body.style.overflow = 'auto';
  
  if (window.location.hash) {
    history.pushState('', document.title, window.location.pathname);
  }
}

// ========== BROWSER HISTORY HANDLING ==========
window.addEventListener('popstate', (event) => {
  const activePopup = document.querySelector('.content.active');
  if (activePopup) {
    closeArticle();
  } else if (window.location.hash) {
    const id = window.location.hash.substring(1);
    const el = document.getElementById(id);
    if (el && el.classList.contains('content')) {
      showArticle(id);
    }
  }
});

// ========== SLIDER FUNCTIONS ==========
function nextSlide(id) {
  const container = document.querySelector('#' + id + ' .slide-container');
  if (!container) return;
  
  const slides = container.querySelectorAll('.slide');
  let currentIndex = [...slides].findIndex(s => s.classList.contains('active'));
  
  slides[currentIndex].classList.remove('active');
  let nextIndex = (currentIndex + 1) % slides.length;
  slides[nextIndex].classList.add('active');
}

function prevSlide(id) {
  const container = document.querySelector('#' + id + ' .slide-container');
  if (!container) return;
  
  const slides = container.querySelectorAll('.slide');
  let currentIndex = [...slides].findIndex(s => s.classList.contains('active'));
  
  slides[currentIndex].classList.remove('active');
  let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  slides[prevIndex].classList.add('active');
}

// ========== ORDER FORM FUNCTIONS ==========
function order(item) {
  currentItem = item;
  document.getElementById('orderForm').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeForm() {
  document.getElementById('orderForm').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function submitOrder() {
  const name = document.getElementById('buyerName').value.trim();
  const kelas = document.getElementById('buyerClass').value.trim();
  const angkatan = document.getElementById('buyerYear').value.trim();
  const qty = document.getElementById('buyerQty').value.trim();

  if (!name || !kelas || !angkatan || !qty) {
    alert('Harap isi semua data!');
    return;
  }

  const phone = '6281393288135';
  const text = encodeURIComponent(
    `Halo, saya ingin membeli: ${currentItem}\n\nNama: ${name}\nKelas: ${kelas}\nAngkatan: ${angkatan}\nJumlah: ${qty}`
  );
  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url, '_blank');
  closeForm();
  
  document.getElementById('buyerName').value = '';
  document.getElementById('buyerClass').value = '';
  document.getElementById('buyerYear').value = '';
  document.getElementById('buyerQty').value = '1';
}

// ========== SHARE WEBSITE ==========
document.addEventListener('DOMContentLoaded', function() {
  const shareBtn = document.getElementById('shareWebsiteBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const url = window.location.href.split('#')[0];
      const title = "Jelajah Hutan 2025 🌿";

      if (navigator.share) {
        navigator.share({
          title: title,
          url: url
        }).catch(err => console.log('Error sharing:', err));
      } else {
        navigator.clipboard.writeText(url).then(() => {
          alert('Link website telah disalin! Bagikan ke temanmu 😊');
        }).catch(err => {
          alert('Gagal menyalin link. Silakan salin secara manual: ' + url);
        });
      }
    });
  }
});

// ========== LOAD FROM URL HASH ==========
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    const el = document.getElementById(id);
    if (el && el.classList.contains('content')) {
      setTimeout(() => showArticle(id), 100);
    }
  }
  
  // Check event status on page load
  checkEventStatus();
});

// ========== CLOSE ON BACKGROUND CLICK ==========
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('content')) {
    closeArticle();
  }
});

document.querySelectorAll('.content .inner').forEach(inner => {
  inner.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

document.getElementById('orderForm').addEventListener('click', (e) => {
  if (e.target.id === 'orderForm') {
    closeForm();
  }
});

// Jalankan fungsi countdown dan status event
setInterval(countdown, 1000);
setInterval(checkEventStatus, 60000); // Cek status setiap menit
countdown();
checkEventStatus();