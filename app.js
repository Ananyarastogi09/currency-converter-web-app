const API_KEY = "ba003dd6785d585a00600553";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

const dropdown = document.querySelectorAll(".dropdown select");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

const btn=document.querySelector("form button");
const msg=document.querySelector(".msg");

for (let select of dropdown) {
    for (let currency in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currency;
        newoption.value = currency;

        if (select.name === "from" && currency === "USD") {
            newoption.selected = "selected";
        }
        else if (select.name === "to" && currency === "INR") {
            newoption.selected = "selected";
        }

        select.append(newoption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1)
    {
        amtval=1;
        amount.value="1";
    }

const url = `${BASE_URL}/${fromCurr.value}`;

const response = await fetch(url);
const data = await response.json();

const rate = data.conversion_rates[toCurr.value];
const finalAmt = amtval * rate;

msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;
})
