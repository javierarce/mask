let $canvas = undefined
let MAX_HEIGHT = 1080

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
    $button.href = $canvas.toDataURL('image/png')
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

const showLines = () => {
  $canvas = getElement('.js-canvas')

  let ctx = $canvas.getContext('2d')

  ctx.clearRect(0, 0, $canvas.width, $canvas.height)
  ctx.save()

  let width = 1080

  $canvas.width = width
  $canvas.height = MAX_HEIGHT

  ctx = applyTransformToContext(ctx, width, MAX_HEIGHT)
  ctx.stroke()
}

const onLoadImage = (image) => {
  $canvas = getElement('.js-canvas')
  $canvas.onclick = () => {
    apply(image)
  }

  apply(image)
}

const apply = (image) => {

  console.log(image.height, MAX_HEIGHT)
  if (image.height > MAX_HEIGHT) {
    image.width *= MAX_HEIGHT / image.height
    image.height = MAX_HEIGHT
  }

  let ctx = $canvas.getContext('2d')

  ctx.clearRect(0, 0, $canvas.width, $canvas.height)
  ctx.save()

  $canvas.width = image.width
  $canvas.height = image.height

  let width = image.width
  let height = image.height

  ctx = applyTransformToContext(ctx, width, height)
  ctx.clip()

  ctx.drawImage(image, 0, 0, width, height)
  ctx.restore()
}

const applyTransformToContext = (ctx, width, height) => {
  const TRANSFORMATIONS = [
    [
      [ 100, 64 ],
      [ width, 0 ],
      [ width, MAX_HEIGHT ],
      [ 0, MAX_HEIGHT ]
    ], [
      [ 100, 0 ],
      [ width, 0 ],
      [ width, MAX_HEIGHT ],
      [ 0, MAX_HEIGHT ]
    ], [
      [ 0, 0 ],
      [ width, 0 ],
      [ width, MAX_HEIGHT ],
      [ 100, MAX_HEIGHT - 100 ]
    ]
  ]

  let transformation = getRandomItem(TRANSFORMATIONS)

  ctx.beginPath()

  transformation.forEach((t) => {
    ctx.lineTo(t[0], t[1])
  })

  ctx.closePath()

  return ctx
}

const onLoad = () => {
  setupButton()
  // showCanvas()
  // showLines()

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
