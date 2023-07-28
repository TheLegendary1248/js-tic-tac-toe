console.log(window)

document.addEventListener("keydown", function onEvent(event) {
    event = event || window.event;

    console.log(event.key)
});

console.log("JS is loaded")