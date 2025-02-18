globalThis.onmessage = async function (e) {
  const { src, width, height } = e.data

  try {
    const response = await fetch(src)
    const blob = await response.blob()
    const imgBitmap = await createImageBitmap(blob)

    const canvas = new OffscreenCanvas(width, height)
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(imgBitmap, 0, 0, width, height)
      const thumbnail = await canvas.convertToBlob({ type: 'image/png' })
      const reader = new FileReader()
      reader.onload = () => {
        globalThis.postMessage({ thumbnail: reader.result })
      }
      reader.readAsDataURL(thumbnail)
    }
    else {
      globalThis.postMessage({ error: 'Canvas context is null' })
    }
  }
  catch {
    globalThis.postMessage({ error: 'Image load error' })
  }
}
