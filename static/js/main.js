const pricingCarousel = document.querySelector("[data-pricing-carousel]");

if (pricingCarousel) {
  const track = pricingCarousel.querySelector("[data-pricing-track]");
  const cards = [...track.querySelectorAll(".pricing-card")];
  const previousButton = document.querySelector("[data-pricing-prev]");
  const nextButton = document.querySelector("[data-pricing-next]");

  const cardWidth = () => {
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    return cards[0].getBoundingClientRect().width + gap;
  };

  const moveCarousel = (direction) => {
    const maximumScroll = track.scrollWidth - track.clientWidth;
    const isAtStart = track.scrollLeft <= 2;
    const isAtEnd = track.scrollLeft >= maximumScroll - 2;

    if (direction > 0 && isAtEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction < 0 && isAtStart) {
      track.scrollTo({ left: maximumScroll, behavior: "smooth" });
      return;
    }

    track.scrollBy({
      left: direction * cardWidth(),
      behavior: "smooth",
    });
  };

  previousButton?.addEventListener("click", () => moveCarousel(-1));
  nextButton?.addEventListener("click", () => moveCarousel(1));
}