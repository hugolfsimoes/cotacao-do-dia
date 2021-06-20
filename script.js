const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const initialSelect = document.querySelector('#initial-currency');
const initialInput = document.querySelector('#initial-input');
const totalValue = document.querySelector('#total');
const currencyName = document.querySelector('#currency-name');


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
  currencyName.innerHTML = `(${currencyApiSelected.name.split('/')[0]})`
  const totalResult = (Number(currencyApiSelected.ask) * Number(valueInput)).toFixed(2);
  totalValue.innerHTML = `R$ ${totalResult} reais`
}

initialInput.addEventListener("keydown", updateApi);
initialInput.addEventListener("click", updateApi);
initialSelect.addEventListener("change", updateApi);