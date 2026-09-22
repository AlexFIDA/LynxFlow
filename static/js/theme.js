// Переключатель темы: тёмная (по умолчанию) и бумажная.
// Начальная тема выставляется ещё в <head> (см. base.html), чтобы не было мигания.
const THEME_KEY = "lynxflow-theme";
const HINT_KEY = "lynxflow-theme-hint";
const HINT_DURATION = 2600;
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

const stopHint = () => {
  toggles.forEach((toggle) => toggle.classList.remove("theme-toggle--hint"));
};

// Подсказка: показываем анимацию один раз за визит (сессию браузера),
// чтобы она не повторялась при каждом переходе и перезагрузке.
const showHintOncePerVisit = () => {
  try {
    if (sessionStorage.getItem(HINT_KEY)) {
      return;
    }
    sessionStorage.setItem(HINT_KEY, "1");
  } catch (error) {
    // без sessionStorage просто показываем подсказку
  }

  toggles.forEach((toggle) => toggle.classList.add("theme-toggle--hint"));
  window.setTimeout(stopHint, HINT_DURATION);
};

toggles.forEach((toggle) => {
  toggle.setAttribute("aria-pressed", String(root.dataset.theme === "paper"));

  toggle.addEventListener("click", () => {
    stopHint();
    applyTheme(root.dataset.theme === "paper" ? "dark" : "paper");
  });
});

showHintOncePerVisit();