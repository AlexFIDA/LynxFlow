// Форма заявки: собирает сообщение и открывает WhatsApp с готовым текстом.
const WHATSAPP_NUMBER = "77771629050"; // 8 777 162 90 50 в международном формате, без «+» и восьмёрки

const form = document.querySelector("[data-whatsapp-form]");

if (form) {
  const errorBox = form.querySelector("[data-form-error]");

  // Как услуга звучит внутри фразы «мне нужно …»
  const SERVICE_PHRASES = {
    site: "сделать сайт",
    amo: "внедрить amoCRM",
    "site-amo": "сделать сайт и внедрить amoCRM",
  };

  // Добрый день! Меня зовут Айгерим, мне нужно внедрить amoCRM.
  //
  // Комментарий, если он есть
  const buildMessage = (name, serviceKey, comment) => {
    let message = `Добрый день! Меня зовут ${name}, мне нужно ${SERVICE_PHRASES[serviceKey]}.`;

    if (comment) {
      message += `\n\n${comment}`;
    }

    return message;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const checked = form.querySelector("input[name='service']:checked");
    const service = checked ? checked.dataset.service : "";
    const comment = String(data.get("comment") || "").trim();

    if (!name || !service) {
      errorBox.hidden = false;
      (name ? form.querySelector("[name='service']") : form.elements.name).focus();
      return;
    }

    errorBox.hidden = true;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildMessage(name, service, comment)
    )}`;

    // WhatsApp открывается в новой вкладке, сайт остаётся открытым.
    // Без флага "noopener": с ним браузер всегда возвращает null,
    // и нельзя понять, открылась ли вкладка. Связь с сайтом обрываем вручную.
    const whatsappTab = window.open(url, "_blank");

    if (whatsappTab) {
      whatsappTab.opener = null;
    } else {
      // Вкладку заблокировал браузер — тогда открываем WhatsApp здесь же
      window.location.href = url;
    }
  });

  // Кнопки «Обсудить» в тарифах сразу выбирают нужную услугу в форме
  document.querySelectorAll("a[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const option = form.querySelector(`input[data-service="${link.dataset.service}"]`);
      if (option) {
        option.checked = true;
        errorBox.hidden = true;
      }
    });
  });
}