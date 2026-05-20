if (globalThis.location.href.includes("cheeserinc.com") && !globalThis.location.href.includes("debug")) {
    globalThis.location.href = "maintenance.html";
}

if (globalThis.location.href.includes("skip")) {
    document.getElementById("welcome-modal").style.display = "none";
}