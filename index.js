window.addEventListener("keydown", (e) => {
    if (e.ctrlKey) {
        switch (e.key) {
            case "o":
                e.preventDefault()
                openFile()
                highlight(".o")
                break
            case "s":
                e.preventDefault()
                saveFile()
                highlight(".s")
                break
        }
    }
})
function highlight(selector) {
    let el = document.querySelector(selector)
    el.classList.add("highlight")
    setTimeout(() => {
        el.classList.remove("highlight")
    }, 200)
}

let fileHandle
const textarea = document.querySelector("textarea")

async function openFile() {
    const [handle] = await window.showOpenFilePicker()
    fileHandle = handle
    const file = await handle.getFile()
    const text = await file.text()
    textarea.value = text
}

async function saveFile() {
    const writable = await fileHandle.createWritable()
    await writable.write(textarea.value)
    await writable.close()
}
