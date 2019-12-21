/* Magic Mirror
 * Module: MMM-SolarPicture
 *
 * Magic Mirror By Michael Teeuw https://magicmirror.builders
 * MIT Licensed.
 *
 * Module MMM-SolarPicture By Grena https://github.com/grenagit
 * MIT Licensed.
 */

Module.register("MMM-SolarPicture",{

	// Default module config
	defaults: {
		imageType: "AIA 304",
		updateInterval: 1 * 60 * 60 * 1000, // every 1 hour
		animationSpeed: 1000, // 1 second
		maxMediaWidth: 0,
		maxMediaHeight: 0,

		initialLoadDelay: 0, // 0 seconds delay

		imageTable: {
			"AIA 193": "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0193.jpg",
			"AIA 304": "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0304.jpg",
			"AIA 171": "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0171.jpg",
			"AIA 211": "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0211.jpg",
			"AIA 131": "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0131.jpg",
			"AIA 335": "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0335.jpg",
			"AIA 094": "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0094.jpg",
			"AIA 1600": "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_1600.jpg",
			"AIA 1700": "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_1700.jpg",
		},
	},

	// Define start sequence
	start: function() {
		Log.info("Starting module: " + this.name);

		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);
	},

	// Override dom generator
	getDom: function() {
		var wrapper = document.createElement("div");

		if (!this.loaded) {
			wrapper.innerHTML = this.translate("LOADING");
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		var solarImage = document.createElement('img');

		var styleString = '';
		if (this.config.maxMediaWidth != 0) {
			styleString += 'max-width: ' + this.config.maxMediaWidth + 'px;';
		}
		if (this.config.maxMediaHeight != 0) {
			styleString += 'max-height: ' + this.config.maxMediaHeight + 'px;';
		}
		if (styleString != '') {
			solarImage.style = styleString;
		}

		solarImage.src = this.config.imageTable[this.config.imageType];
		solarImage.alt = "Solar Picture with " + this.config.imageType + " Å";

		wrapper.appendChild(solarImage);

		var solarCopyright = document.createElement('div');

		solarCopyright.className = "dimmed thin xsmall";
		solarCopyright.innerHTML = "&copy; NASA SDO";

		wrapper.appendChild(solarCopyright);

		return wrapper;
	},

	// Update DOM
	updateSolar: function() {
		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
    this.scheduleUpdate();
	},

	// Schedule next update
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setTimeout(function() {
			self.updateSolar();
		}, nextLoad);
	}

});
