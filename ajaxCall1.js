let appid = "";
let city = "";

function display(data, p) {
  let longitude = data.coord.lon;
  let latitude = data.coord.lat;
  let curTemp = data.main.temp;
  let maxTemp = data.main.temp_max;
  let minTemp = data.main.temp_min;

  let parentTag = document.querySelector("#newelement");
  let newValue = `<div style="color: white">
                        <div class="fs-1">${p}</div>
                        <div class="fs-2">CITY : ${city}</div>
                        <div class="fs-3">
                            Temperature : ${curTemp} *C
                        </div>
                        <div class="fs-4">Longitude : ${longitude}</div>
                        <div class="fs-4">Latitude : ${latitude}</div>
                        <div class="fs-4">Max Temperature : ${maxTemp} *C</div>
                        <div class="fs-4">Min Temperature : ${minTemp} *C</div>
                    </div>
                  `;
  parentTag.innerHTML = newValue;
}
async function makeCall(p) {
  appid = "4ed3104eda76b687961c60e13b225d48";
  city = document.querySelector("#getvalue").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${appid}`;
  let xmlval = "";

  if (p == 1) {
    let res = await (await fetch(url)).json();
    display(res, "Using Fetch");
  } else if (p == 2) {
    xmlval = new XMLHttpRequest();

    xmlval.onload = () => {
      let jsonStr = xmlval.response;
      let data = JSON.parse(jsonStr);
      display(data, "Using XML");
    };
    xmlval.open("GET", url);
    xmlval.send();
  } else {
    let jqVal = jQuery.get(url);
    jqVal.done((data) => {
      display(data, "Using jQuery");
    });
  }
}
