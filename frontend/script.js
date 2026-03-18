async function download() {
    const url = document.getElementById("url").value;
    const type = document.getElementById("type").value;

    const res = await fetch("/api/download", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url, type })
    });

    const data = await res.json();

    if (data.status) {
        document.getElementById("result").innerHTML = `
            <p>✅ Success</p>
            <a href="${data.download}" target="_blank">Download File</a>
        `;
    } else {
        document.getElementById("result").innerHTML = `<p>❌ ${data.message}</p>`;
    }
}
