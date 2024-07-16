// let api =
//   `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const dropdown = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdown) {
  for (currcode in countrylist) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  } select.addEventListener("change", (ev) => {
    updateFlag(ev.target);
  });
}

const updateFlag = (element) => {
  let currcode = element.value;
  let countrycode = countrylist[currcode];
  let newSrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;

}
btn.addEventListener("click", async (evn) => {
  evn.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  // console.log(amtVal);
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";

  }
  
  let fromValue = fromCurr.value;
  let toValue = toCurr.value;

  try {
    let rate = await getExchangeRate(fromValue, toValue);
    if (!rate) {
      throw new Error("Rate not found for selected currency");
    }
    let convertedAmount = (amtVal * rate).toFixed(2);

    document.querySelector(".msg").innerText = `${amtVal} ${fromValue} = ${convertedAmount} ${toValue}`;
    document.querySelector(".msg").style.display = "block";
  } catch (error) {
    document.querySelector(".msg").innerText = `Error: ${error.message}`;
    document.querySelector(".msg").style.display = "block";
  }
});

const getExchangeRate = async (fromCurrency, toCurrency) => {
  const apiKey = "cur_live_MmmJ2yZB8H8TghCfpiQ8R4d71rPZ9tbv0aP94Bi5"; // Replace with your actual API key
  const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${fromCurrency}`;
  let response = await fetch(url);
  let rJson = await response.json();
  return rJson.data[toCurrency] ? rJson.data[toCurrency].value : null;
};

// const populate = async (value, currency) => {
//   let myStr = "";
//   const apiKey = "cur_live_MmmJ2yZB8H8TghCfpiQ8R4d71rPZ9tbv0aP94Bi5"; // Replace with your actual API key
//   const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${currency}`;
//   let response = await fetch(url);
//   let rJson = await response.json();
//   for (let key of Object.keys(rJson.data)) {
//     myStr += ` <tr>
//                   <td>${key}</td>
//                   <td>${rJson.data[key].code}</td>
//                   <td>${Math.round(rJson.data[key].value * value)}</td>
//               </tr>`;
//   }
//   const tableBody = document.querySelector("tbody");
//   tableBody.innerHTML = myStr;
// }
