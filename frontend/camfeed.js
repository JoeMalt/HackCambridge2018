//const SCREENSHOT_DELAY_MS = 5000;
//DEBUG
const SCREENSHOT_DELAY_MS = 10000;
const SEND_IMAGES_TO = "https://ree.to:4000/emote"

let startTime = Date.now();

let sendScreenshot = (video) => {
	let canvas = document.createElement("canvas");
	let dim = Math.min(video.videoWidth, video.videoHeight);
	canvas.width = dim;
	canvas.height = dim;
	context = canvas.getContext("2d");
	context.drawImage(video, (video.videoWidth - dim) / 2, (video.videoHeight - dim) / 2, dim, dim, 0, 0, dim, dim);


	request = new XMLHttpRequest();
	request.open("POST", SEND_IMAGES_TO);
	request.send(canvas.toDataURL("image/png").substring(22)); //strip out the "data:image/png;base64," from the data URI
	request.onreadystatechange = () => {
		if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
			updateMoodBars(JSON.parse(request.responseText)); // Why is is not bound to request.onreadystatechange ???
		}
	}
}

function getCameraMedia() {
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
	return navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: "user"}})
}

function initVideo(mediaStream) {
	let video = document.querySelector("#cameraVideo");
	if ("srcObject" in video) {
		video.srcObject = mediaStream;
	} else {
		// Avoid using this in new browsers, as it is going away.
		video.src = window.URL.createObjectURL(mediaStream);
	}
	video.onloadedmetadata = e => {
		cameraConnected = true;
		video.play();
		sendScreenshot(video)
		setInterval(() => { sendScreenshot(video); }, SCREENSHOT_DELAY_MS);
	}
}