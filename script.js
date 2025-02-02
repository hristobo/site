function updateText() {
    // Get input values
    let mainText = document.getElementById("main-input").value;
    let subText = document.getElementById("sub-input").value;

    // Update the text if inputs are not empty
    if (mainText.trim() !== "") {
        document.getElementById("main-text").innerText = mainText;
    }

    if (subText.trim() !== "") {
        document.getElementById("sub-text").innerText = subText;
    }
}