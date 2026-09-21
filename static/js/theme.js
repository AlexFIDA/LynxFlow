// Переключатель темы: тёмная (по умолчанию) и бумажная.
// Начальная тема выставляется ещё в <head> (см. base.html), чтобы не было мигания.
const THEME_KEY = "lynxflow-theme";
const root = document.documentElement;
const toggles = document.querySelectorAll("[data-theme-toggle]");

const applyTheme = (theme) => {
  if (theme === "paper") {
    root.dataset.theme = "paper";
  } else {
    delete root.dataset.theme;
  }

  toggles.forEach((toggle) => {
    toggle.setAttribute("aria-pressed", String(theme === "paper"));
  });

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    // localStorage может быть недоступен (приватный режим) — тема просто не запомнится
  }
};

toggles.forEach((toggle) => {
  toggle.setAttribute("aria-pressed", String(root.dataset.theme === "paper"));

  toggle.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "paper" ? "dark" : "paper");
  });
});