const adFormElement = document.querySelector('.ad-form');
console.log('Привет')
adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  fetch(
    'https://23.javascript.pages.academy/code-and-magick',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log(response.status);
      // eslint-disable-next-line no-console
      console.log(response.ok);
      return response.json();
    })
    .then((json) => {
      // eslint-disable-next-line no-console
      console.log('Результат', json);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
});

