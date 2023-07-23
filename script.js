function generateSchema() {
    const jsonInput = document.getElementById("jsonInput");
    var jsonData = jsonInput.value
    const reqData = jsonData
    var jsonData = jsonData.replace(/"(\w+)"(?=:)/g, '<span class="key">"$1"</span>');
    jsonInput.innerHTML = jsonData;
    var jsonInputReq = "{ \"jsonFile\":" + reqData + "}" 
    if (reqData.trim() === "") {
        alert("Please enter JSON data.");
        return;
    }

    fetch("http://15.207.99.199:8080/json-schema", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonInputReq
    })
    .then(response => response.json())
    .then(data => {
        const schemaResult = document.getElementById("schemaResult");
        var formattedSchema = JSON.stringify(data, null, 2);
        const coloredSchema = formattedSchema.replace(/"(\w+)"(?=:)/g, '<span class="key">"$1"</span>');
        schemaResult.innerHTML = coloredSchema;
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while generating the schema.");
    });
}
