let searchBtn = document.querySelector("#search-button");
let searchField = document.querySelector("#search-field");
let outputText = document.querySelector("#output-area");

searchBtn.addEventListener("click", fetchBio);

// Clear the search and the output fields
searchField.value = "";
outputText.value = "";

searchField.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      //event.preventDefault();
      // Trigger the button with a click
      if (searchField.value) {
          searchBtn.click();
      }
    }
  }); 

function fetchBio() {
    if (searchField.value) {
        let uri = "https://www.swapi.tech/api/people/?name=" + searchField.value;
        // console.log(uri);
        fetch(uri)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            let output = "";
            if (data.result.length > 0) {
                data.result.forEach(item => {
                    let charBio = [
                        `Name: ${item.properties.name},`,
                        `Gender: ${item.properties.gender},`,
                        `Hair Colour: ${item.properties.hair_color},`,
                        `Height: ${item.properties.height} cm,`,
                        `Weight: ${item.properties.mass} kg;`
                    ].join('\n');
                    output += charBio + '\n\n';
                });
            } else {
                output = "No such character.";
            }
            outputText.value = output;
        })
        .catch((err) => {
            console.error(err);
            outputText.value = "Something went wrong...";
        });
    }
}
