// Степпер "Как мы работаем": клик по кружку переключает активную панель с описанием.
const stepsRoot = document.querySelector("[data-steps]");

if (stepsRoot) {
  const circles = [...stepsRoot.querySelectorAll(".steps__tab")];
  const panels = [...stepsRoot.querySelectorAll(".steps__panel")];

  const activateStep = (step) => {
    circles.forEach((circle) => {
      const isActive = circle.dataset.step === step;
      circle.classList.toggle("is-active", isActive);
      circle.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.stepPanel === step;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  circles.forEach((circle) => {
    circle.addEventListener("click", () => activateStep(circle.dataset.step));
  });
}