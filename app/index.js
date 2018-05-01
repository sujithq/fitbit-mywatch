import document from "document";
import * as simpleActivity from "./simple/activity";
import * as simpleClock from "./simple/clock";

import * as messaging from "messaging";



let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");
let secHandArc = document.getElementById("secsArc");

let stepsArc = document.getElementById("stepsArc");
let activeMinutesArc = document.getElementById("activeMinutesArc");
let elevationGainArc = document.getElementById("elevationGainArc");


messaging.peerSocket.onmessage = evt => {
  console.log(JSON.stringify(evt.data));
};


/* ------- ACTIVITY --------- */
function activityCallback(data) {  
  /*
  console.log(data.steps.raw);
  console.log(data.activeMinutes.raw);
  console.log(data.calories.raw);

  console.log(data.distance.raw);
  console.log(data.elevationGain.raw);
  
  console.log(JSON.stringify(data.steps));
  console.log(JSON.stringify(data.activeMinutes));
  console.log(JSON.stringify(data.elevationGain));
  */
  
  stepsArc.sweepAngle = data.steps.angle;
  activeMinutesArc.sweepAngle = data.activeMinutes.angle;
  elevationGainArc.sweepAngle = data.elevationGain.angle;
  
}

/* ------- CLOCK --------- */
function clockCallback(data){  
  secHand.groupTransform.rotate.angle = data.secondsAngle;
  secHandArc.sweepAngle = data.secondsSweepAngle;
  hourHand.groupTransform.rotate.angle = data.hoursAngle;
  minHand.groupTransform.rotate.angle = data.minutesAngle;
}

simpleActivity.initialize("minutes", activityCallback);
simpleClock.initialize("seconds", "longDate", clockCallback);