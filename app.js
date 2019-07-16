if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then(function(registration){
        console.log("Service Worker registered with scope:", registration.scope);
    }).catch(function(err){
        console.log("Service worker registration failed:", err);
    });
}

$("#inquiry-form").submit(function(event) {
    event.preventDefault();
    var name = $("#form-Name").val();
    var email = $("#form-Email").val();
    var phone = $("#form-Phone").val();
	var message = $("#form-Message").val();
    var id = Date.now().toString().substring(3, 11);
    if (!arrivalDate || !nights || !guests) {
      return false;
    }
    offerNotification();
    return false;
  });
  
var showNotification = function() {
	navigator.serviceWorker.ready.then(function(registration) {
		registration.showNotifications("Notificationator", {
			body:
				"Just wanted to say hi...\n" +
				"so...  \n" +
				"Hi!",
			icon: '/img/icons/app-icon-96.png',
			badge: '/img/icons/app-icon-96.png',
			tag: "new-notification"
		});
	});
};

var offerNotification = function() {
	if ("Notification" in window && "serviceWorker" in navigator) {
		Notification.requestPermission().then(function(permission) {
			if (permission === "granted") {
				showNotification();
			}
		});
	}
};

$(document).ready(function() {
  // Prepopulate inquiry form from querystring
  var url = new URL(window.location);
  var params = url.searchParams;
  if (
    params.has("form-Name") &&
    params.has("form-Email") &&
    params.has("form-Phone") &&
	params.has("form-Message")
  ) {
    $("#form-Name").val(params.get("form-Name"));
    $("#form-Email").val(params.get("form-Email"));
    $("#form-Phone").val(params.get("form-Phone"));
	$("#form-Message").val(params.get("form-Message"));
    $("form#inquiry-form").submit();
    window.history.replaceState(null, "", url.origin + url.pathname);
  }
});