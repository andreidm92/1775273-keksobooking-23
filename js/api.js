
export function loadData(){
  return fetch('https://23.javascript.pages.academy/keksobooking/data').
    then ((response) => response.json());
}

export function saveData(data) {
  return fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => response.json())
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
}


