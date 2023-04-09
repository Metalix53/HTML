console.log('did somebody invite dynamtionary??');
const text = document.getElementById("text");
const inp = document.getElementById("inp");
const div = document.getElementById("dynamtionary");
let allWords = new Map();
let dict = new Map();

text.addEventListener('keypress', function (e){
  if (document.activeElement == text){
    if (e.key === 'Enter'){
      var arr = text.value.split(" ");
      text.value = '';
      arr.forEach(element => {
        if (element != ""){
          element = element.replace(/(\r\n|\n|\r|\s)/gm, "");
          addToDict(element);
          update(element);
        }
      });
    }
  }
});

inp.addEventListener('keypress', function (e){
  if (document.activeElement == inp){
    if (e.key === 'Enter'){
      var word = inp.value;
      inp.value = '';
      if (!dict.has(word))
      {
        dict.set(word, word);
        update(word);
      }
    }
  }
});

function addToDict(word) {
  if (!allWords.has(word))
  {
    allWords.set(word, word);
    const node = document.createElement("span");
    node.setAttribute('id', word);
    const brk = document.createElement("br");
    const text = document.createTextNode(word);
    node.appendChild(text);
    node.appendChild(brk);
    div.appendChild(node);
  }
}

function update(word){
  if (allWords.has(word) && dict.has(word))
  {
    const elem = document.getElementById(word);
    elem.style = "background-color: green; font-weight: bold;"
  }
}