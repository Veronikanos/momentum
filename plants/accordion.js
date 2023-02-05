const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach((item) =>
  item.addEventListener('click', toggleAccordion)
);

function toggleAccordion(e) {
  if (
    e.target.nodeName !== 'BUTTON' &&
    !e.target.classList.contains('accordion-btn-icon')
  )
    return;

  accordionItems.forEach((item) => {
    let parent = item.closest('li');
    if (item === e.currentTarget.closest('li')) {
      parent.classList.toggle('active');
    } else {
      parent.classList.remove('active');
    }
  });
}
