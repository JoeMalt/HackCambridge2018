var epsilon = 0.000001;

var myoConnected = false;

Myo.connect("uk.ac.cam.keepsmiling");

Myo.on("connected", (data, timestamp) => {
	myoConnected = true;
	console.log("Myo successfully connected. Data: " + JSON.stringify(data) + ". Timestamp: " + timestamp + ".");
	Myo.setLockingPolicy("none")
});

// var num = 0;
var digitFloatValue = 0;

function lerp(v0, v1, t) {
	return v0*(1-t)+v1*t
}

function invLerp(v0, v1, v) {
	return (v - v0) / (v1 - v0)
}

function limit(min, max, val) {
	return val < min ? min : val > max ? max : val;
}

const SHIFT_REG_LEN = 20;
var shiftReg = [];

Myo.on("orientation", (data) => {
	let phi = Math.atan2(2 * (data.w * data.x + data.y * data.z), 1 - 2 * (data.x * data.x + data.y * data.y));
	// console.log(phi);
	// phi = 0;
	digitFloatValue = limit(0, 10 - epsilon, 10 * invLerp(-0.75, 0.75, phi));
	// let digit = limit(0, 9, Math.floor(10 * lerp(0.7, -0.7, phi)));
	let digit = Math.floor(digitFloatValue);

	shiftReg.push(digit);
	shiftReg.splice(0, shiftReg.length - SHIFT_REG_LEN);

	// num = Math.floor(num / 10) * 10 + digit;
});

Myo.on("fist", selectDigit);

Myo.on("fingers_spread", () => {
	console.log("Orientation reset!")
	Myo.myos.map(myo => myo.zeroOrientation());
});

// myMyo.on("fist", () => {alert("Fist!");})