import * as messaging from "messaging";
import { settingsStorage } from "settings";

export function initialize() {
  settingsStorage.addEventListener("change", evt => {
    if (evt.oldValue !== evt.newValue) {
      sendValue(evt.key, evt.newValue);
    }
    /*
    if (evt.key === "oauth") {
    // Settings page sent us an oAuth token
    let data = JSON.parse(evt.newValue);
    fetchGoalsData(data.access_token) ;
  }
  */
  });
}


function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key: key,
      value: JSON.parse(val)
    });
  }
}

function sendSettingData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}

/*
// Fetch Sleep Data from Fitbit Web API
function fetchGoalsData(accessToken)  {
  // Goal API docs - https://api.fitbit.com/1/user/[user-id]/activities/goals/[period].json
  fetch(`https://api.fitbit.com/1/user/-/activities/goals/daily.json`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    let myData = {
      goals: data.goals
    }
    sendValue('goals', myData);
    }
  )
  .catch(err => console.log('[FETCH]: ' + err));
}
*/