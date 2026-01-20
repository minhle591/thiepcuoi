// Proxy is recommended to avoid CORS; paste BOT_TOKEN/CHAT_ID in your deploy env.
const CONFIG = {
  TELEGRAM_MODE: "proxy",
  PROXY_URL: "/api/telegram",
  BOT_TOKEN: "PUT_YOUR_TOKEN_HERE",
  CHAT_ID: "PUT_YOUR_CHAT_ID_HERE",
};

const EVENT_DETAILS = {
  "2026-02-01": {
    title: "Chủ nhật 01/02/2026",
    items: [
      "15:00: Mời bữa cơm thân mật tại nhà trai",
      "17:30: Mời bữa cơm thân mật tại nhà gái",
    ],
  },
  "2026-02-02": {
    title: "Thứ hai 02/02/2026",
    items: ["11:00: Lễ cưới tổ chức tại tư gia nhà trai"],
  },
};

const TOAST_DURATION = 2600;

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector));

const showToast = (message) => {
  const toast = $(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toast.dataset.timer);
  const timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, TOAST_DURATION);
  toast.dataset.timer = timer;
};

const initReveal = () => {
  const revealItems = $$(".reveal");
  if (!revealItems.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealItems.forEach((item) => observer.observe(item));
};

const initLightbox = () => {
  const lightbox = $(".lightbox");
  if (!lightbox) return;
  const lightboxImg = $(".lightbox__img");
  const openButtons = $$("[data-lightbox]");
  const closeButtons = $$("[data-lightbox-close]");

  const open = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Ảnh cưới";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightboxImg.src = "";
    lightbox.setAttribute("aria-hidden", "true");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-lightbox");
      const alt = $("img", button)?.alt;
      open(src, alt);
    });
  });

  closeButtons.forEach((btn) => btn.addEventListener("click", close));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
};

const initCountdown = () => {
  const target = new Date("2026-02-02T11:00:00+07:00");
  const daysEl = $("[data-countdown='days']");
  const hoursEl = $("[data-countdown='hours']");
  const minutesEl = $("[data-countdown='minutes']");
  const secondsEl = $("[data-countdown='seconds']");
  const statusEl = $("[data-countdown='status']");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const update = () => {
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      daysEl.textContent = "0";
      hoursEl.textContent = "0";
      minutesEl.textContent = "0";
      secondsEl.textContent = "0";
      if (statusEl) statusEl.textContent = "Đã đến ngày lễ cưới";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = String(days);
    hoursEl.textContent = String(hours);
    minutesEl.textContent = String(minutes);
    secondsEl.textContent = String(seconds);
  };

  update();
  setInterval(update, 1000);
};

const initCalendar = () => {
  const modal = $("#event-modal");
  if (!modal) return;
  const titleEl = $("#event-modal-title");
  const listEl = $("#event-modal-list");
  const buttons = $$("[data-date]");

  const openModal = (dateKey) => {
    const detail = EVENT_DETAILS[dateKey];
    if (!detail) return;
    titleEl.textContent = detail.title;
    listEl.innerHTML = detail.items.map((item) => `<li>${item}</li>`).join("");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dateKey = btn.dataset.date;
      openModal(dateKey);
    });
  });

  $$("[data-modal-close]").forEach((btn) =>
    btn.addEventListener("click", closeModal),
  );
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
};

const copyText = async (text) => {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Đã sao chép");
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showToast("Đã sao chép");
  }
};

const initCopyButtons = () => {
  $$("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      copyText(btn.dataset.copy);
    });
  });
};

const initScrollTop = () => {
  const button = $(".scroll-top");
  if (!button) return;
  const toggle = () => {
    if (window.scrollY > 400) {
      button.classList.add("is-visible");
    } else {
      button.classList.remove("is-visible");
    }
  };
  button.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
};

const initSnow = () => {
  const container = $(".snow");
  if (!container) return;

  const flakes = 36;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < flakes; i += 1) {
    const flake = document.createElement("span");
    flake.className = "snow__flake";
    const size = (Math.random() * 6 + 4).toFixed(1);
    const left = (Math.random() * 100).toFixed(2);
    const duration = (Math.random() * 12 + 10).toFixed(2);
    const delay = (Math.random() * -20).toFixed(2);
    const drift = (Math.random() * 24 - 12).toFixed(2);
    const opacity = (Math.random() * 0.5 + 0.3).toFixed(2);

    flake.style.setProperty("--size", `${size}px`);
    flake.style.setProperty("--left", `${left}vw`);
    flake.style.setProperty("--duration", `${duration}s`);
    flake.style.setProperty("--delay", `${delay}s`);
    flake.style.setProperty("--drift", `${drift}vw`);
    flake.style.setProperty("--opacity", opacity);
    fragment.appendChild(flake);
  }

  container.appendChild(fragment);
};

const initBackgroundMusic = () => {
  const audio = $("#bg-music");
  if (!audio) return;

  audio.volume = 0.7;

  const attemptPlay = () => {
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay might be blocked; retry on user interaction.
      });
    }
  };

  attemptPlay();

  const unlock = () => {
    attemptPlay();
  };

  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("touchstart", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
};

const formatTelegramMessage = (payload) => {
  const lines = [
    `Thiệp mời: ${payload.page}`,
    `Gửi cho: ${payload.toSide}`,
    `Họ tên: ${payload.name}`,
    `SĐT: ${payload.phone || "Không cung cấp"}`,
    `Tham dự: ${payload.attend}`,
    `Lời nhắn: ${payload.message}`,
    `Thời gian: ${payload.timestamp}`,
  ];
  return lines.join("\n");
};

const sendTelegram = async (payload) => {
  if (CONFIG.TELEGRAM_MODE === "proxy") {
    const response = await fetch(CONFIG.PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Proxy request failed");
    }
    return response.json().catch(() => ({}));
  }

  if (!CONFIG.BOT_TOKEN || CONFIG.BOT_TOKEN.includes("PUT_YOUR")) {
    throw new Error("Thiếu BOT_TOKEN/CHAT_ID");
  }

  const message = formatTelegramMessage(payload);
  const response = await fetch(
    `https://api.telegram.org/bot${CONFIG.BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CONFIG.CHAT_ID,
        text: message,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Telegram request failed (có thể lỗi CORS)");
  }
  return response.json();
};

const initForm = () => {
  const form = $("#rsvp-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = $("#name").value.trim();
    const phone = $("#phone").value.trim();
    const message = $("#message").value.trim();
    const attend = form.querySelector("input[name='attend']:checked")?.value;
    const toSide = $("#toSide").value;
    const page = document.body.dataset.pageLabel || "Thiệp cưới";

    if (!name || !message || !attend) {
      showToast("Vui lòng điền đủ thông tin bắt buộc");
      return;
    }

    const payload = {
      name,
      phone,
      message,
      attend,
      toSide,
      page,
      timestamp: new Date().toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      }),
    };

    showToast("Đang gửi...");

    try {
      await sendTelegram(payload);
      showToast("Đã gửi thành công");
      form.reset();
    } catch (error) {
      showToast("Gửi thất bại, vui lòng thử lại");
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initSnow();
  initBackgroundMusic();
  initReveal();
  initLightbox();
  initCountdown();
  initCalendar();
  initCopyButtons();
  initScrollTop();
  initForm();
});
