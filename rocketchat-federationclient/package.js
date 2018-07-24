Package.describe({
	name: "rocketchat:federationclient",
	version: "0.0.1",
	summary: "Federation Client",
	git: ""
});

Package.onUse(function(api) {
	api.use([
		"ecmascript",
		"rocketchat:lib",
		"mongo"

	]);


	//Register v1 helpers
	api.use("templating", "client");
	api.addFiles("Client/federation.html", "client");
	api.addFiles("Server/client.js","server");
	api.addFiles("Server/Dns.js","server");
	api.addFiles("Server/fedmsgserver.js","server");
	api.addFiles("CLientfedmsgclient.js","client");
	api.addFiles("Client/style.css","client");


});

Npm.depends({

	net: "1.0.2",
	skiff: "1.10.0",
	memdown: "2.0.0"
});
