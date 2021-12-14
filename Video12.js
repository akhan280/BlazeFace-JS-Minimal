let video = document.getElementById("video");
let model; 
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const setupCamera = () => {
  navigator.mediaDevices
    .getUserMedia({ video: 
        { width: 600, height: 400 }, 
        audio: false, })
    .then(stream => {
      video.srcObject = stream;
    });
};

const detect = asnyc () => {
  const prediction = await model.estimatefaces(video, false);
  console.log(prediction);
  ctx.drawImage(video, 0, 0, 600, 400);
  prediction.forEach((pred) => {
    ctx.begintax();
    ctx.linewidth = "4";
    ctx.strokeStyle = "red";
    ctx.rect(
      pred.topleft[0],
      pred.topleft[1],
      pred.bottomright[0] - pred.topleft[0],
      pred.bottomright[1] - pred.topleft[1]
    );
  ctx.stroke();

  ctx.fillstyle = "red";
  pred.landmarks.forEach((landmark) => {
    ctx.fillRect(landmark[0], landmark[1], 5, 5);
  }
  });
};

setupCamera();
video.addEventListener("play", asnyc () => {
  model = blazeface.load();
  setInterval(detect, 100); 
}); 