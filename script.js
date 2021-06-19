const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const initialSelect = document.querySelector('#initial-currency');
const selectToConvert = document.querySelector('#currency-to-convert');
const initialInput = document.querySelector('#initial-input');
const totalValue = document.querySelector('#total')


async function getApiContent() {
  const result = await fetch(API_URL);
  const resp = await result.json();
  delete resp.USDT;
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
  delete resp.USDT;
  calculateConvert(Object.values(resp))
}

function calculateConvert(currencies) {
  const valueInput = initialInput.value
  const valueSelected = initialSelect.value
  const currencyApiSelected = currencies.find((currency) => currency.code === valueSelected);
  const totalResult = (Number(currencyApiSelected.ask) * Number(valueInput)).toFixed(2);
  console.log(totalResult);
  totalValue.innerHTML = `R$ ${totalResult}`
}

initialInput.addEventListener("keydown", updateApi);
initialInput.addEventListener("click", updateApi);
initialSelect.addEventListener("change", updateApi);