var myoConnected = false;

Myo.connect("uk.ac.cam.keepsmiling");

Myo.on("connected", (data, timestamp) => {
	myoConnected = true;
	console.log("Myo successfully connected. Data: " + JSON.stringify(data) + ". Timestamp: " + timestamp + ".");
	Myo.setLockingPolicy("none")
});

var num = 0;

function lerp(v0, v1, t) {
	return v0*(1-t)+v1*t
}

function limit(min, max, val) {
	return val < min ? min : val > max ? max : val;
}

const SHIFT_REG_LEN = 50;
var shiftReg = [];

Myo.on("orientation", (data) => {
	let phi = Math.atan2(2 * (data.w * data.x + data.y * data.z), 1 - 2 * (data.x * data.x + data.y * data.y));
	let digit = limit(0, 9, Math.floor(10 * lerp(0.7, -0.7, phi)));

	shiftReg.push(digit);
	shiftReg.splice(0, shiftReg.length - SHIFT_REG_LEN);

	num = Math.floor(num / 10) * 10 + digit;
	// document.getElementById("someText").innerHTML = num.toString();
});

Myo.on("fist", () => {
	let digits = [];
	for(var i = 0; i < 10; i++){
		digits[i] = 0;
	}
	shiftReg.forEach(d => digits[d]++);
	imax = 0;
	for(var i = 1; i < 10; i++)
		if(digits[i] > digits[imax])
			imax = i;
	num = (Math.floor(num / 10) * 10 + imax) * 10;
	shiftReg = []
})

Myo.on("fingers_spread", () => {
	console.log("Orientation reset!")
	Myo.myos.map(myo => myo.zeroOrientation());
})

// myMyo.on("fist", () => {alert("Fist!");})