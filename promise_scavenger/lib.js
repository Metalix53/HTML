// provide some helper code for students?

// provide some baseline
const form = document.querySelector('form')
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
})

const autoOutput = document.getElementById('auto')

let request = new XMLHttpRequest();
request.addEventListener("load", function (ev) {
  console.log("reqListener");
  const structuredData = JSON.parse(ev.target.responseText);
  console.log(structuredData);

  autoOutput.innerText = ev.target.responseText;
});
request.open("GET", "https://w3.cs.jmu.edu/stewarmc/0.json");
request.send();