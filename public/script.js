async function sendMessage() {
    const input = document.getElementById("message");
    const chat = document.getElementById("chat");

    const userText = input.value;
    chat.innerHTML += `<p><b>You:</b> ${userText}</p>`;

    const response = await fetch("/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
    });

    const data = await response.json();
    chat.innerHTML += `<p><b>EduGenie:</b> ${data.reply}</p>`;

    input.value = "";
}
