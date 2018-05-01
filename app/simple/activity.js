/*
  A simple way of returning activity data in the correct format based on user preferences.
  Callback should be used to update your UI.
*/
import clock from "clock";
import { today } from "user-activity";
import { goals } from "user-activity";
import { units } from "user-settings";

let activityCallback;

export function initialize(granularity, callback) {
  clock.granularity = granularity;
  clock.addEventListener("tick", tickHandler);
  activityCallback = callback;
}

let activityData = {
  steps: getSteps(),
  calories: getCalories(),
  distance: getDistance(),
  elevationGain: getElevationGain(),
  activeMinutes: getActiveMinutes()
}

function tickHandler(evt) {
  activityCallback(activityData);
}

function getActiveMinutes() {
  let val = (today.adjusted.activeMinutes || 0);
  return {
    raw: val,
    goal: goals.activeMinutes,
    angle:360/goals.activeMinutes*val,
    pretty: (val < 60 ? "" : Math.floor(val/60) + "h,") + ("0" + (val%60)).slice("-2") + "m"
  }
}

function getCalories() {
  let val = (today.adjusted.calories || 0);
  return {
    raw: val,
    goal: goals.calories,
    angle:360/goals.calories*val,
    pretty: val > 999 ? Math.floor(val/1000) + "," + ("00"+(val%1000)).slice(-3) : val
  }
}

function getDistance() {
  let val = (today.adjusted.distance || 0) / 1000;
  let u = "km";
  if(units.distance === "us") {
    val *= 0.621371;
    u = "mi";
  }
  return {
    raw: val,
    goal:goals.distance,
    pretty: `${val.toFixed(2)}${u}`
  }
}

function getElevationGain() {
  let val = today.adjusted.elevationGain || 0;
  return {
    raw: val,
    goal:goals.elevationGain,
    angle:360/goals.elevationGain*val,
    pretty: `+${val}`
  }
}

function getSteps() {
  let val = (today.adjusted.steps || 0);
  return {
    raw: val,
    goal:goals.steps,
    angle:360/goals.steps*val,
    pretty: val > 999 ? Math.floor(val/1000) + "," + ("00"+(val%1000)).slice(-3) : val
  }
}