let canvas = undefined
let MAX_HEIGHT = 100

const loadImage = (src) => {
  //	Prevent any non-image file type from being read.
  if(!src.type.match(/image.*/)){
    console.log("The dropped file is not an image: ", src.type)
    return
  }

  let reader = new FileReader()
  reader.onload = function(e){
    render(e.target.result)
  }
  reader.readAsDataURL(src)
}

const render = (src) => {
  let image = new Image()
  image.onload = function(){
    canvas = document.getElementById("myCanvas")
    if(image.height > MAX_HEIGHT) {
      image.width *= MAX_HEIGHT / image.height
      image.height = MAX_HEIGHT
    }
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save();
    canvas.width = image.width
    canvas.height = image.height
    
    
    // Create a shape, of some sort
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(100, 30);
    ctx.lineTo(180, 10);
    ctx.lineTo(200, 60);
    ctx.arcTo(180, 70, 120, 0, 10);
    ctx.lineTo(200, 180);
    ctx.lineTo(100, 150);
    ctx.lineTo(70, 180);
    ctx.lineTo(20, 130);
    ctx.lineTo(50, 70);
    ctx.closePath();
    // Clip to the current path
    ctx.clip();
    
    
    ctx.drawImage(image, 0, 0);
    
    // Undo the clipping
    ctx.restore();
 


  }
  image.src = src
}


const onLoad = () => {
  console.log('load')
  let target = document.getElementById("drop-target")
  target.addEventListener("dragover", function(e){e.preventDefault();}, true)
  target.addEventListener("drop", function(e){
    console.log('drop')
    e.preventDefault(); 
    loadImage(e.dataTransfer.files[0])
  }, true)
}

const download_img = (el) => {
  var image = canvas.toDataURL('image/jpg')
  el.href = image
}

window.onload = onLoad
