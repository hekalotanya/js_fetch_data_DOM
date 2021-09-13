'use strict';

const url
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const getPhones = () => {
  const promise = new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        return response.json()
          .then(phones => {
            resolve(phones);
          });
        });

    setTimeout(() => {
      reject();
    }, 5000);
  });

  return promise;
};

const getPhonesDetails = (list) => {
  return Promise.all(list.map(id =>
    fetch(`https://mate-academy.github.io/phone-catalogue-static/api/phones
      /${id}.json`)
      .then(result => result.json())
  ));
};

let phonesWithDetails;

getPhones().then(data => {
  const phoneArray = data;

  document.querySelector('body').innerHTML = `
    <ul>
      ${data.map(item => `<li>{${item.name}}`).join('')}
    </ul>
  `;

  getPhonesDetails(data.map(phone => phone.id))
    .then(result => {
      phonesWithDetails = phoneArray.map(phone => ({
        ...phone,
        details: result.find(detail => detail.id === phone.id),
      }));

      console.log(phonesWithDetails);
    });
});

// write your code here
