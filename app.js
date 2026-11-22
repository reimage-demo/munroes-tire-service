const reviews = document.querySelector('#reviews');
const cards = [...reviews.querySelectorAll('.review-card')];
const pages = cards.length % 2 === 0 ? cards.length / 2 : cards.length;
const controls = reviews.querySelector('.review-controls');
const toggle = controls.querySelector('[data-toggle]');
const counter = controls.querySelector('output');
let current = 0;
let playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let visible = false;
let timer;

function showPair(index) {
  current = (index + pages) % pages;
  const first = (2 * current) % cards.length;
  const second = (first + 1) % cards.length;
  cards.forEach((card, i) => {
    card.hidden = i !== first && i !== second;
  });
  const group = cards[first].parentNode;
  group.append(cards[first], cards[second]);
  counter.textContent = (current + 1) + ' / ' + pages;
}

function updatePlayback() {
  clearInterval(timer);
  toggle.textContent = playing ? 'Pause' : 'Play';
  if (playing && visible && !document.hidden) {
    timer = setInterval(() => showPair(current + 1), 4000);
  }
}

controls.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button === toggle) {
    playing = !playing;
  } else {
    playing = false;
    showPair(current + Number(button.dataset.step));
  }
  updatePlayback();
});
reviews.addEventListener('focusin', event => {
  if (event.target.closest('.review-card')) {
    playing = false;
    updatePlayback();
  }
});
new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  updatePlayback();
}).observe(reviews);
document.addEventListener('visibilitychange', updatePlayback);
showPair(0);
controls.hidden = false;
updatePlayback();

const callButton = document.querySelector('.float-call');

function boundedScrollY() {
  const bottom = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(window.scrollY, bottom));
}

let previousScrollY = boundedScrollY();
window.addEventListener('scroll', () => {
  const currentScrollY = boundedScrollY();
  if (currentScrollY === previousScrollY) return;
  callButton.classList.toggle('is-hidden', currentScrollY < previousScrollY);
  previousScrollY = currentScrollY;
}, { passive: true });
