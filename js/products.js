/* =========================================================
   Belagavi Organics — Products data + WhatsApp integration
   Each product has a deep link with prefilled context.
   ========================================================= */

const WHATSAPP_NUMBER = "918884063030";
const CONTACT_PERSON = "Maruti Mellikeri";

/* Category data — drives both the website category cards AND the PDF catalogue */
const CATEGORIES = [
  {
    key: "sweeteners",
    name: "Sweeteners",
    nameLocal: { en: "Sweeteners", hi: "मिठासी", kn: "ಸಿಹಿಕಾರಕಗಳು", mr: "गोड पदार्थ" },
    icon: "honey",
    count: 6
  },
  {
    key: "dry-nuts",
    name: "Dry Nuts",
    nameLocal: { en: "Dry Nuts", hi: "सूखे मेवे", kn: "ಒಣ ಬೀಜಗಳು", mr: "सुका मेवा" },
    icon: "nut",
    count: 4
  },
  {
    key: "pulses-and-dals",
    name: "Pulses & Dal",
    nameLocal: { en: "Pulses & Dal", hi: "दालें और अनाज", kn: "ದ್ವಿದಳ ಧಾನ್ಯಗಳು", mr: "डाळी व कडधान्य" },
    icon: "lentil",
    count: 22
  },
  {
    key: "rice",
    name: "Rice",
    nameLocal: { en: "Rice", hi: "चावल", kn: "ಅಕ್ಕಿ", mr: "तांदूळ" },
    icon: "rice",
    count: 9
  },
  {
    key: "millets",
    name: "Millets",
    nameLocal: { en: "Millets", hi: "बाजरा", kn: "ಸಿರಿಧಾನ್ಯಗಳು", mr: "बाजरी" },
    icon: "millet",
    count: 9
  },
  {
    key: "oils",
    name: "Cold-Pressed Oils",
    nameLocal: { en: "Cold-Pressed Oils", hi: "कोल्ड-प्रेस्ड तेल", kn: "ಕೋಲ್ಡ್-ಪ್ರೆಸ್ಡ್ ಎಣ್ಣೆಗಳು", mr: "कोल्ड-प्रेस्ड तेले" },
    icon: "oil",
    count: 3
  },
  {
    key: "spices",
    name: "Spices & Seeds",
    nameLocal: { en: "Spices & Seeds", hi: "मसाले और बीज", kn: "ಸಾಂಬಾರು ಪದಾರ್ಥಗಳು", mr: "मसाले व बियाणे" },
    icon: "spice",
    count: 23
  },
  {
    key: "pickles",
    name: "Pickles",
    nameLocal: { en: "Pickles", hi: "अचार", kn: "ಉಪ್ಪಿನಕಾಯಿಗಳು", mr: "लोणचे" },
    icon: "pickle",
    count: 3
  },
  {
    key: "others",
    name: "Other Specialities",
    nameLocal: { en: "Other Specialities", hi: "अन्य विशेष", kn: "ಇತರ ವಿಶೇಷತೆಗಳು", mr: "इतर विशेष" },
    icon: "grain",
    count: 4
  }
];

/* SVG icons for category cards (reuse from PDF) */
const CAT_ICONS = {
  honey: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 6 L8 26 L18 26 L14 42 L40 22 L28 22 L32 6 Z" fill="#F28A1A" stroke="#1B5E20" stroke-width="2" stroke-linejoin="round"/></svg>',
  nut: '<svg viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="26" rx="14" ry="16" fill="#F28A1A" stroke="#1B5E20" stroke-width="2"/><path d="M14 20 Q24 16 34 20" stroke="#1B5E20" stroke-width="2" fill="none"/><path d="M24 10 Q26 6 28 8" stroke="#1B5E20" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  lentil: '<svg viewBox="0 0 48 48" fill="none"><ellipse cx="14" cy="24" rx="6" ry="9" fill="#F28A1A" stroke="#1B5E20" stroke-width="2"/><ellipse cx="24" cy="28" rx="6" ry="9" fill="#22A83A" stroke="#1B5E20" stroke-width="2"/><ellipse cx="34" cy="24" rx="6" ry="9" fill="#F28A1A" stroke="#1B5E20" stroke-width="2"/></svg>',
  rice: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 8 Q24 14 22 20 Q20 26 18 32 Q16 38 14 42" stroke="#1B5E20" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M24 8 Q24 14 26 20 Q28 26 30 32 Q32 38 34 42" stroke="#1B5E20" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="18" cy="22" rx="2" ry="4" fill="#F28A1A"/><ellipse cx="30" cy="22" rx="2" ry="4" fill="#F28A1A"/><ellipse cx="22" cy="32" rx="2" ry="4" fill="#F28A1A"/><ellipse cx="26" cy="32" rx="2" ry="4" fill="#F28A1A"/></svg>',
  millet: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 42 L24 18" stroke="#1B5E20" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="12" r="5" fill="#F28A1A" stroke="#1B5E20" stroke-width="2"/><circle cx="18" cy="18" r="3" fill="#F28A1A" stroke="#1B5E20" stroke-width="1.5"/><circle cx="30" cy="18" r="3" fill="#F28A1A" stroke="#1B5E20" stroke-width="1.5"/><circle cx="16" cy="26" r="3" fill="#22A83A" stroke="#1B5E20" stroke-width="1.5"/><circle cx="32" cy="26" r="3" fill="#22A83A" stroke="#1B5E20" stroke-width="1.5"/></svg>',
  oil: '<svg viewBox="0 0 48 48" fill="none"><path d="M18 6 L30 6 L30 14 L34 18 L34 42 L14 42 L14 18 L18 14 Z" fill="#F28A1A" stroke="#1B5E20" stroke-width="2" stroke-linejoin="round"/><path d="M14 28 L34 28" stroke="#1B5E20" stroke-width="2"/><text x="24" y="38" text-anchor="middle" font-size="8" fill="#1B5E20" font-weight="bold">OIL</text></svg>',
  spice: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 6 Q18 12 18 18 Q18 24 24 26 Q30 24 30 18 Q30 12 24 6 Z" fill="#F28A1A" stroke="#1B5E20" stroke-width="2"/><path d="M24 26 L24 42" stroke="#1B5E20" stroke-width="2" stroke-linecap="round"/><path d="M18 32 L24 30 M30 32 L24 30" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round"/></svg>',
  pickle: '<svg viewBox="0 0 48 48" fill="none"><rect x="10" y="14" width="28" height="28" rx="3" fill="#F28A1A" stroke="#1B5E20" stroke-width="2"/><rect x="14" y="8" width="20" height="8" rx="2" fill="#1B5E20"/><path d="M16 22 L20 26 L16 30 M22 22 L26 26 L22 30 M28 22 L32 26 L28 30" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>',
  grain: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 8 L24 40" stroke="#1B5E20" stroke-width="2" stroke-linecap="round"/><path d="M24 14 Q18 14 14 18" stroke="#1B5E20" stroke-width="1.5" fill="none"/><path d="M24 14 Q30 14 34 18" stroke="#1B5E20" stroke-width="1.5" fill="none"/><path d="M24 22 Q18 22 14 26" stroke="#1B5E20" stroke-width="1.5" fill="none"/><path d="M24 22 Q30 22 34 26" stroke="#1B5E20" stroke-width="1.5" fill="none"/><path d="M24 30 Q18 30 14 34" stroke="#1B5E20" stroke-width="1.5" fill="none"/><path d="M24 30 Q30 30 34 34" stroke="#1B5E20" stroke-width="1.5" fill="none"/><circle cx="24" cy="10" r="2" fill="#F28A1A"/></svg>'
};

/* ---------- WhatsApp helpers ---------- */

/* Build the WhatsApp deep link with prefilled message (same format as the existing site + PDF) */
function buildWhatsAppLink(productName, categoryName) {
  const lang = (document.documentElement.getAttribute("data-lang") || "en");
  const dict = window.I18N?.[lang] || window.I18N?.en || {};
  const msg = (dict["wa.message"] || window.I18N.en["wa.message"])
    .replace("{product}", productName)
    .replace("{category}", categoryName);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* Build a category-level WhatsApp link */
function buildCategoryWhatsAppLink(categoryName) {
  const lang = (document.documentElement.getAttribute("data-lang") || "en");
  const dict = window.I18N?.[lang] || window.I18N?.en || {};
  const msg = (dict["wa.categoryMessage"] || window.I18N.en["wa.categoryMessage"])
    .replace("{category}", categoryName);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* Open WhatsApp — automatically use mobile vs web WhatsApp */
function openWhatsApp(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

/* Helper: get a tagline for a category from the (possibly nested) dictionary */
function getCatTagline(cat, dict) {
  const fallback = window.I18N?.en || {};
  // Try nested object first: dict["products.catTagline"][cat.key]
  const taglineObj = dict["products.catTagline"] || fallback["products.catTagline"];
  if (taglineObj && typeof taglineObj === "object" && taglineObj[cat.key]) {
    return taglineObj[cat.key];
  }
  // Fallback: flat key
  const flatKey = `products.catTagline.${cat.key}`;
  return dict[flatKey] || fallback[flatKey] || "";
}

/* ---------- Render category cards ---------- */

function getLocalizedCategoryName(cat, lang) {
  return cat.nameLocal?.[lang] || cat.nameLocal?.en || cat.name;
}

function renderCategoryCards() {
  const lang = document.documentElement.getAttribute("data-lang") || "en";
  const dict = window.I18N?.[lang] || window.I18N?.en || {};
  const grid = document.getElementById("catGrid");
  if (!grid) return;

  grid.innerHTML = "";

  CATEGORIES.forEach((cat, idx) => {
    const localizedName = getLocalizedCategoryName(cat, lang);
    const tagline = getCatTagline(cat, dict);
    const buyLabel = dict["products.catBuy"] || "Enquire on WhatsApp";
    const waLink = buildCategoryWhatsAppLink(localizedName);

    const card = document.createElement("a");
    card.className = "cat-card reveal";
    card.href = waLink;
    card.target = "_blank";
    card.rel = "noopener";
    card.setAttribute("aria-label", `${buyLabel} — ${localizedName}`);
    card.innerHTML = `
      <div class="cat-card-image">
        <span class="cat-card-tag">CAT ${(idx + 1).toString().padStart(2, "0")}</span>
        <span class="cat-card-count">${cat.count}+</span>
        <div class="cat-card-icon">${CAT_ICONS[cat.icon] || CAT_ICONS.grain}</div>
      </div>
      <div class="cat-card-info">
        <h3>${localizedName}</h3>
        <p>${tagline}</p>
        <span class="cat-card-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          ${buyLabel}
        </span>
      </div>
    `;
    grid.appendChild(card);
  });

  // Re-observe newly added cards for scroll reveal
  if (window.revealObserver) {
    grid.querySelectorAll(".reveal").forEach(el => window.revealObserver.observe(el));
  } else {
    // Make them visible immediately if observer not ready
    grid.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
  }

  // Also update the footer "Top Categories" list
  renderFooterCategories();
}

function renderFooterCategories() {
  const lang = document.documentElement.getAttribute("data-lang") || "en";
  const footerCats = document.getElementById("footerCats");
  if (!footerCats) return;
  footerCats.innerHTML = "";
  CATEGORIES.slice(0, 5).forEach(cat => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#products";
    a.textContent = getLocalizedCategoryName(cat, lang);
    a.addEventListener("click", e => {
      e.preventDefault();
      const target = document.getElementById("products");
      if (target) {
        const header = document.querySelector(".site-header");
        const H = header ? header.offsetHeight : 70;
        const y = target.getBoundingClientRect().top + window.pageYOffset - H;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
    li.appendChild(a);
    footerCats.appendChild(li);
  });
}

/* Re-render category cards when language changes */
document.addEventListener("langchange", () => {
  renderCategoryCards();
});

/* Initial render */
document.addEventListener("DOMContentLoaded", () => {
  renderCategoryCards();
});
