const rda = require('./rda-properties.js');
document.getElementById("yaml").oninput = function (event) {
    let result = rda.fromYaml(event.target.value);
    console.log(event.target.value, result);
    document.getElementById("rda").value = result;
}