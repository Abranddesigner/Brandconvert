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
    formData.append("image_file", fileInput.files[0]);
    formData.append("size", "auto");

    message.textContent = "Removing background...";
    message.style.color = "blue";

    try {
        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: {
                "X-Api-Key": "dv8bAjnKeXEbrEKpXody14VV"
            },
            body: formData
        });

        if (!response.ok) throw new Error("Failed to remove background.");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "no-bg.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        message.textContent = "Background removed successfully!";
        message.style.color = "green";
    } catch (error) {
        message.textContent = "Failed to remove background.";
        message.style.color = "red";
    }
}
