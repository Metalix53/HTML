const outputElem = document.querySelector('output')

const pw = document.getElementById('i1')
pw.addEventListener('keyup', (ev) => {
  if (ev.key === 'Enter') {
    const autoOutput = document.getElementById('auto');
    const autoContent = autoOutput.value;
    const structuredContent = JSON.parse(autoContent)
    console.log(structuredContent)
    console.log(structuredContent.next)
    //req.open("GET", `${structuredContent.next}${pw.value}.json`);
    //req.send();
    const firstRequestPromise = fetch(`${structuredContent.next}${pw.value}.json`);
    firstRequestPromise.then(processResponse)
     .then(putResponse1InDOM)
     .then(make2ndReq)
     .then(processResponse)
     .then(putResponse2InDOM)
     .then(make3rdReq)
    // .then(processThirdResponse)
    // .then(putResponse3InDOM)
    .catch((err) => {
      console.error(`\n\nERROR: ${err}`);
    })

  }
});


const processResponse = (resp) => {
  const data = resp.json()
  return data;
}


const putResponse1InDOM = (json_response) => {
  console.log(json_response);
  document.getElementById("i1-out").innerText = JSON.stringify(json_response);
  return json_response.steps[0].req;
}


const make2ndReq = (url) => {
  return fetch(url);
}


const putResponse2InDOM = (json_response) => {
  document.getElementById("i2-out").innerText = JSON.stringify(json_response);

  const numKeys = Object.keys(data).length;
  return numKeys;
}

const make3rdReq = (keycount) => {
  const url = `https://w3.cs.jmu.edu/stewarmc/scavenge/${keycount}.json`;
  return fetch(url);
}


// let req = new XMLHttpRequest();
// req.addEventListener("load", function (ev) {
//   const structuredData = JSON.parse(ev.target.responseText);
//   const data = structuredData;
//   console.log(data);
//   console.log(`${data.steps[0].req}`)
//   boredReq.open("GET", `${data.steps[0].req}`); 
//   boredReq.send();
//   document.getElementById("i1-out").innerText = ev.target.responseText;
// });

// let reqWithKeyCount = new XMLHttpRequest();
// reqWithKeyCount.addEventListener("load", function (ev) {
//   console.log("keycount responded");
//   const structuredData = JSON.parse(ev.target.responseText);
//   console.log("structuredData", structuredData);

//   document.getElementById("i3-out").innerText = ev.target.responseText;

//   const sum = structuredData.subtotals.reduce((a,b)=>a+b);
//   alert(sum);
// });

// let boredReq = new XMLHttpRequest();
// boredReq.addEventListener("load", function (ev) {
//   console.log("bored responded");
//   const structuredData = JSON.parse(ev.target.responseText);
//   console.log("structuredData", structuredData);
//   const keyCount = Object.keys(structuredData).length;
//   console.log(keyCount);

//   document.getElementById("i2-out").innerText = ev.target.responseText;
//   reqWithKeyCount.open(
//     "GET",
//     `https://w3.cs.jmu.edu/stewarmc/scavenge/${keyCount}.json`
//   );
//   reqWithKeyCount.send();
// });

