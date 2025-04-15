
async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const formatSelect = document.getElementById("formatSelect");
    const message = document.getElementById("message");

    if (!fileInput.files.length) {
        message.textContent = "Please select a file.";
        message.style.color = "red";
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("format", formatSelect.value);

    message.textContent = "Converting file...";
    message.style.color = "blue";

    try {
        const response = await fetch("http://localhost:8080/convert", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        message.textContent = result.message;
        message.style.color = "green";
    } catch (error) {
        message.textContent = "Conversion failed!";
        message.style.color = "red";
    }
}
