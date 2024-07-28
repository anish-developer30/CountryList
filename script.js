let container = document.querySelector(".box-container");
let search = document.querySelector(".option input");
let select = document.querySelector(".option select");

let allData = "";

// https://restcountries.com/v3.1/name/${name}
//restcountries.com/v3.1/name/${countryname}
// fetch("data.json");
fetch("https://restcountries.com/v3.1/all")
  .then((data) => data.json())
  .then((data) => {
    renderData(data);
    allData = data;
  });

select.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${select.value}`)
    .then((data) => data.json())
    .then((data) => {
      container.innerHTML = "";
      renderData(data);
      allData = data;
    });
});

search.addEventListener("input", (e) => {
  let searchData = allData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  container.innerHTML = "";
  renderData(searchData);
});

function renderData(data) {
  data.map((element) => {
    let a = document.createElement("a");
    a.classList.add("box");
    a.href = `./detail.html?name=${element.name.common}`;
    let content = `<div class="img">
                   <img src=${element.flags.svg} alt="" />
                </div>
                <div class="content">
                    <h3>country : <span>${element.name.common}</span></h3>
                    <p>population : <span>${element.population.toLocaleString(
                      "en-IN"
                    )}</span></p>
                    <p>region : <span>${element.region}</span></p>
                    <p>capital : <span>${element.capital}</span></p>
                </div>`;
    a.innerHTML = content;
    container.append(a);
  });
}

const icon = document.querySelector("#icon");
let darkMode = localStorage.getItem("dark-mode");

let text = document.querySelector(".header #text");
text.innerHTML = "Light Mode";
const enableDarkMode = () => {
  text.innerHTML = "Light Mode";
  icon.classList.replace("fa-moon", "fa-sun");
  document.body.classList.add("dark");
  localStorage.setItem("dark-mode", "enabled");
};

const DisableDarkMode = () => {
  text.innerHTML = "Dark Mode";
  icon.classList.replace("fa-sun", "fa-moon");
  document.body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode == "enabled") {
  enableDarkMode();
}

icon.onclick = () => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode == "disabled") {
    enableDarkMode();
  } else {
    DisableDarkMode();
  }
};
