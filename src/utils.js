export function base64ToCanvas(canvas, base64, pixelCrop) {
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    console.log(base64, canvas, pixelCrop)

    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = base64
    image.onload = function() {  
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )
    }
}

export function extractFileExtFromBase64 (base64) {
    return base64.substring('data:image/'.length, base64.indexOf(';base64'))
}

export function downloadBase64File(base64, filename) {
    const el = document.createElement('a')
    el.setAttribute('href', base64)
    el.setAttribute('download', filename)
    el.style.display = 'none'
    document.body.appendChild(el)
    el.click()
    document.body.removeChild(el)
}