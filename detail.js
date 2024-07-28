const countryname = new URLSearchParams(location.search).get("name");
const img = document.querySelector(".flex img");
const heading = document.querySelector(".flex h2");

const native = document.querySelector("#nativename");
const population = document.querySelector("#population");
const region = document.querySelector("#region");
const subregion = document.querySelector("#subregion");
const capital = document.querySelector("#capital");
const currency = document.querySelector("#currency");
const symbol = document.querySelector("#symbol");
const languages = document.querySelector("#languages");
const domain = document.querySelector("#domain");

fetch(`https://restcountries.com/v3.1/name/${countryname}`)
  .then((data) => data.json())
  .then(([data]) => {
    img.src = data.flags.svg;
    heading.innerHTML = data.name.common;

    if (data.name.nativeName) {
      native.innerHTML = Object.values(data.name.nativeName)[0].common;
    } else {
      native.innerHTML = data.name.common;
    }
    if (data.currencies) {
      currency.innerHTML = Object.values(data.currencies)
        .map((cname) => cname.name)
        .join(", ");
    }
    if (data.currencies) {
      symbol.innerHTML = Object.values(data.currencies)
        .map((cname) => cname.symbol)
        .join(", ");
    }
    if (data.capital) {
      capital.innerHTML = data.capital.join(", ");
    }

    if (data.subregion) {
      subregion.innerHTML = data.subregion;
    }

    if (data.borders) {
      data.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((data) => data.json())
          .then(([bordername]) => {
            const a = document.createElement("a");
            a.innerText = bordername.name.common;
            a.href = `detail.html?name=${bordername.name.common}`;
            document.querySelector(".border").appendChild(a);
          });
      });
    }

    population.innerHTML = data.population.toLocaleString("en-IN");
    region.innerHTML = data.region;
    domain.innerHTML = data.tld.join(", ");
    languages.innerHTML = Object.values(data.languages).join(", ");
  });

const icon = document.querySelector("#icon");

icon.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  console.log("hello");
});
