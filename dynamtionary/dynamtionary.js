console.log('did somebody invite dynamtionary??');
const text = document.getElementById("text");
const div = document.getElementById("dynamtionary");
let dict = new Map();

text.addEventListener('keypress', function (e){
  if (document.activeElement == text){
    if (e.key === 'Enter'){
      var arr = text.value.split(" ");
      text.value = '';
      arr.forEach(element => {
        if (element != ""){
          element = element.replace(/(\r\n|\n|\r)/gm, "");
          addToDict(element);
        }
      });
    }
  }
});

function addToDict(word) {
  if (!dict.has(word)){
    dict.set(word, word);
    const node = document.createElement("span");
    const brk = document.createElement("br");
    const text = document.createTextNode(word);
    node.appendChild(text);
    node.appendChild(brk);
    div.appendChild(node);
    console.table(dict);
  }
}