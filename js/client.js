let $canvas = undefined
let MAX_HEIGHT = 500

const loadImage = (src) => {
  if (!src.type.match(/image.*/)){
    console.log("The dropped file is not an image: ", src.type)
    return
  }

  let reader = new FileReader()

  reader.onload = (e) => {
    render(e.target.result)
  }

  reader.readAsDataURL(src)
}

const render = (src) => {
  let image = new Image()

  image.onload = () => {
    onLoadImage(image) 
    showCanvas()
    showButton()
  }

  image.src = src
}

const setupButton  = () => {
  let $button = getElement('.js-send')

  $button.onclick = () => {
    $button.href = $canvas.toDataURL('image/jpg')
  }
}

const showCanvas = () => {
  let $canvas = getElement('.js-canvas')
  $canvas.classList.remove('is-hidden')
}

const showButton = () => {
  let $button = getElement('.js-send')
  $button.classList.remove('is-hidden')
}

const onLoadImage = (image) => {
  $canvas = getElement('.js-canvas')

  if (image.height > MAX_HEIGHT) {
    image.width *= MAX_HEIGHT / image.height
    image.height = MAX_HEIGHT
  }

  let ctx = $canvas.getContext('2d')

  ctx.clearRect(0, 0, $canvas.width, $canvas.height)
  ctx.save()
  $canvas.width = image.width
  $canvas.height = image.height

  ctx.beginPath()
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 30)
  ctx.lineTo(180, 10)
  ctx.lineTo(200, 60)
  ctx.arcTo(180, 70, 120, 0, 10)
  ctx.lineTo(200, 180)
  ctx.lineTo(100, 150)
  ctx.lineTo(70, 180)
  ctx.lineTo(20, 130)
  ctx.lineTo(50, 70)
  ctx.closePath()
  ctx.clip()

  ctx.drawImage(image, 0, 0)
  ctx.restore()
}


const onLoad = () => {
  setupButton()

  let $target = getElement('.js-drop')

  $target.addEventListener('dragleave', (e) => {
    killEvent(e)
    $target.classList.remove('is-dragover')
  }, true)

  $target.addEventListener('dragend', (e) => {
    killEvent(e)
    $target.classList.remove('is-dragover')
  }, true)

  $target.addEventListener('dragover', (e) => {
    killEvent(e)
    $target.classList.add('is-dragover')
  }, true)

  $target.addEventListener('drop', (e) => {
    killEvent(e)
    if (e && e.dataTransfer && e.dataTransfer.files.length) {
      loadImage(e.dataTransfer.files[0])
      $target.classList.add('is-drop')
    }
  }, true)
}


window.onload = onLoad