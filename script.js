const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const initialSelect = document.querySelector('#initial-currency');
const selectToConvert = document.querySelector('#currency-to-convert');
const initialInput = document.querySelector('#initial-input');
const totalValue = document.querySelector('#total')


async function getApiContent() {
  const result = await fetch(API_URL);
  const resp = await result.json();
  setOptionsCurrencies(resp);
}
getApiContent();


function setOptionsCurrencies(apiResponse) {
  const currenciesName = Object.keys(apiResponse);
  currenciesName.forEach((currency) => {
    const newOptionInitial = document.createElement('option');
    newOptionInitial.innerText = currency;
    initialSelect.appendChild(newOptionInitial);
  })

}

async function updateApi() {
  const result = await fetch(API_URL);
  const resp = await result.json();
  teste(Object.values(resp))
}

function teste(respApi) {
  console.log(respApi);
  const valueInput = initialInput.value
  const valueSelected = initialSelect.value


};

initialInput.addEventListener("keydown", updateApi);
initialSelect.addEventListener("change", updateApi);