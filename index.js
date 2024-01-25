function conIdToString(id) {
	if (idToString[id]) {
		return idToString[id];
	}
	return id;
}

function addClassName(div, className) {
	if (!div.classList.contains(className)) {
		div.classList.add(className);
	}
}

function setLogicClass(div, className) {
	div.classList.remove("locationevent", "locationpossible", "locationlogical", "locationeventpossible", "locationeventlogical");
	div.classList.remove("groupevent", "grouppossible", "grouplogical", "groupeventpossible", "groupeventlogical");
	div.classList.remove("subevent", "subpossible", "sublogical", "subeventpossible", "subeventlogical");
	if (className) {
		div.classList.add(className);
	}
}

// Locations
function locationOnHover(location) {
	const locationStyle = window.getComputedStyle(location);
	idViewer.style.top = locationStyle.top;
	idViewer.style.display = "block";
	idViewer.innerHTML = conIdToString(location.id);
	const idStyle = window.getComputedStyle(idViewer);
	if (parseInt(locationStyle.left, 10) > window.innerWidth / 2) {
		idViewer.style.left = parseInt(locationStyle.left, 10) - parseInt(idStyle.width, 10) - 36 + "px";
	}
	else {
		idViewer.style.left = parseInt(locationStyle.left, 10) + 20 + "px";
	}
}

function locationOnUnHover() {
	idViewer.style.display = "none";
}

function locationOnClick(location) {
	location.classList.toggle("locationchecked");
	if (location.id.includes("EVENT_")) {
		updateLocations();
		updateGroups();
	}
	countchecks();
}

// Items
function itemOnHover(item) {
	itemHoverDesc.innerHTML = conIdToString(item.id);
}

function itemOnUnHover() {
	if (currentGroup) {
		itemHoverDesc.innerHTML = conIdToString(currentGroup);
	}
	else {
		itemHoverDesc.innerHTML = "&nbsp";
	}
}

function itemOnClick(item) {
	item.classList.toggle("itemchecked");
	updateLocations();
	updateGroups();
	countchecks();
}

//Settings
function settingIterate(setting, max) {
	let count = parseInt(setting.classList[1].substring(1), 10);
	setting.classList.remove(setting.classList[1]);
	count = count + 1;
	if (count > max) {
		count = 0;
	}
	setting.classList.add("_" + count);
}

function ifTrueAddClass(div, shouldAddClass, className) {
	if (shouldAddClass) {
		addClassName(div, className);
	}
	else {
		div.classList.remove(className);
	}
}

const dontHide = ["HIDDEN_ITEM_ABANDONED_SHIP_RM_4_KEY", "HIDDEN_ITEM_ABANDONED_SHIP_RM_1_KEY", "HIDDEN_ITEM_ABANDONED_SHIP_RM_6_KEY", "HIDDEN_ITEM_ABANDONED_SHIP_RM_2_KEY"];
function settingHiddenItem() {
	settingIterate(HIDDEN_ITEMS, 1);
	hideToMatchHidden();
	updateGroups();
	countchecks();
}
function hideToMatchHidden() {
	let show = parseInt(HIDDEN_ITEMS.classList[1].substring(1), 10);
	for (let location of document.getElementsByClassName("location")) {
		if (location.id.substring(0,7) === "HIDDEN_" && !dontHide.includes(location.id)) {
			ifTrueAddClass(location, !show, "hiddenhidden");
		}
	}
	for (let sub of document.getElementsByClassName("sub")) {
		if (sub.id.substring(0,7) === "HIDDEN_" && !dontHide.includes(sub.id)) {
			ifTrueAddClass(sub, !show, "hiddenhidden");
		}
	}
}
function settingNormanReq() {
	settingIterate(NORMAN_REQ, 1);
	if ("PETALBURG_GYM" === currentGroup) {
		groupBreakDown.innerHTML = "";
	}
	updateLocation("EVENT_DEFEAT_NORMAN");
	updateLocation("BADGE_5");
	updateLocation("NPC_GIFT_RECEIVED_TM42");
	updateLocation("NPC_GIFT_RECEIVED_HM03");
	updateGroupById("PETALBURG_GYM");
	countchecks();
	if ("PETALBURG_GYM" === currentGroup) {
		groupFocus(document.getElementById(currentGroup));
	}
}
function settingNormanCount() {
	settingIterate(NORMAN_COUNT, 7);
	if ("PETALBURG_GYM" === currentGroup) {
		groupBreakDown.innerHTML = "";
	}
	updateLocation("EVENT_DEFEAT_NORMAN");
	updateLocation("BADGE_5");
	updateLocation("NPC_GIFT_RECEIVED_TM42");
	updateLocation("NPC_GIFT_RECEIVED_HM03");
	updateGroupById("PETALBURG_GYM");
	countchecks();
	if ("PETALBURG_GYM" === currentGroup) {
		groupFocus(document.getElementById(currentGroup));
	}
}
function settingE4Req() {
	settingIterate(E4_REQ, 1);
	updateLocation("EVENT_DEFEAT_CHAMPION");
	hideToMatchE4();
	updateGroups();
	countchecks();
}
function settingE4Count() {
	settingIterate(E4_COUNT, 8);
	updateLocation("EVENT_DEFEAT_CHAMPION");
	hideToMatchE4();
	updateGroups();
	countchecks();
}
const normanLocked = ["NPC_GIFT_RECEIVED_TM36", "NPC_GIFT_GOT_BASEMENT_KEY_FROM_WATTSON", "NPC_GIFT_GOT_TM24_FROM_WATTSON"];
const e4Locked = ["EVENT_DEFEAT_STEVEN", "ITEM_SAFARI_ZONE_NORTH_EAST_NUGGET", "HIDDEN_ITEM_SAFARI_ZONE_NORTH_EAST_RARE_CANDY", "HIDDEN_ITEM_SAFARI_ZONE_NORTH_EAST_ZINC", "ITEM_SAFARI_ZONE_SOUTH_EAST_BIG_PEARL", "HIDDEN_ITEM_SAFARI_ZONE_SOUTH_EAST_PP_UP", "HIDDEN_ITEM_SAFARI_ZONE_SOUTH_EAST_FULL_RESTORE", "NPC_GIFT_RECEIVED_SS_TICKET"];
function settingVictory() {
	settingIterate(VICTORY_EVENT, 2);
	hideToMatchE4();
	updateGroups();
	countchecks();
}
function hideToMatchE4() {
	let state = parseInt(VICTORY_EVENT.classList[1].substring(1), 10);
	groupBreakDown.innerHTML = ""
	if (state === 0) {
		for (let locationId of normanLocked) {
			addClassName(document.getElementById(locationId), "victoryhidden");
		}
		const e4count = parseInt(E4_COUNT.classList[1].substring(1), 10);
		const e4req = parseInt(E4_REQ.classList[1].substring(1), 10);
		const showE4 = !(e4req && e4count > 7);
		for (let locationId of e4Locked) {
			ifTrueAddClass(document.getElementById(locationId), !showE4, "victoryhidden");
		}
	}
	else if (state === 1) {
		for (let locationId of normanLocked) {
			document.getElementById(locationId).classList.remove("victoryhidden");
		}
		for (let locationId of e4Locked) {
			addClassName(document.getElementById(locationId), "victoryhidden");
		}
	}
	else {
		for (let locationId of normanLocked) {
			document.getElementById(locationId).classList.remove("victoryhidden");
		}
		for (let locationId of e4Locked) {
			document.getElementById(locationId).classList.remove("victoryhidden");
		}
	}
	if (currentGroup) {
		groupFocus(document.getElementById(currentGroup));
	}
}

// Groups
let currentGroup = "";
function groupOnClick(group) {
	currentGroup = group.id;
	itemHoverDesc.innerHTML = conIdToString(group.id);
	groupFocus(group);
}
function groupFocus(group) {
	groupBreakDown.innerHTML = group.innerHTML;
	for (let sub of groupBreakDown.getElementsByTagName("div")) {
		sub.innerHTML = "&nbsp" + conIdToString(sub.id);
		sub.onclick = function() {subOnClick(sub)};
	}
}
function updateGroups() {
	for (let group of document.getElementsByClassName("group")) {
		updateGroup(group);
	}
}
function updateGroupById(id) {
	updateGroup(document.getElementById(id));
}
function updateGroup(group) {
	let hidden = true;
	let logical = false;
	let logicalevent = false;
	let possible = false;
	let possibleevent = false;
	let event = false;
	let checked = true;
	for (let sub of group.getElementsByClassName("sub")) {
		if (!sub.classList.contains("hiddenhidden") && !sub.classList.contains("victoryhidden")) {
			hidden = false;
			if (!sub.classList.contains("subchecked")) {
				checked = false;
				if (sub.classList.contains("sublogical")) {
					logical = true;
				}
				if (sub.classList.contains("subeventlogical")) {
					logicalevent = true;
				}
				if (sub.classList.contains("subpossible")) {
					possible = true;
				}
				if (sub.classList.contains("subeventpossible")) {
					possibleevent = true;
				}
				if (sub.classList.contains("subevent")) {
					event = true;
				}
			}
		}
	}
	if (hidden) {
		addClassName(group, "hidden");
	}
	else {
		group.classList.remove("hidden");
	}
	if (checked) {
		addClassName(group, "groupchecked");
	}
	else {
		group.classList.remove("groupchecked");
	}
	if (logicalevent) {
		setLogicClass(group, "groupeventlogical");
	}
	else if (logical) {
		setLogicClass(group, "grouplogical");
	}
	else if (possibleevent) {
		setLogicClass(group, "groupeventpossible");
	}
	else if (possible) {
		setLogicClass(group, "grouppossible");
	}
	else if (event) {
		setLogicClass(group, "groupevent")
	}
	else {
		setLogicClass(group, false);
	}
}

//subs
function subOnClick(sub) {
	groupBreakDown.innerHTML = "";
	let trueSub = document.getElementById(sub.id);
	trueSub.classList.toggle("subchecked");
	if (sub.id.includes("EVENT_")) {
		updateLocations();
	}
	updateGroups();
	countchecks();
	groupFocus(document.getElementById(currentGroup));
}

function addOnClick() {
	for (let location of document.getElementsByClassName("location")) {
		location.onclick = function() {locationOnClick(location);};
		location.onmouseenter = function() {locationOnHover(location);};
		location.onmouseleave = function() {locationOnUnHover(location);};
	}
	for (let item of document.getElementsByClassName("item")) {
		item.onclick = function() {itemOnClick(item);};
		item.onmouseenter = function() {itemOnHover(item);};
		item.onmouseleave = function() {itemOnUnHover();};
	}
	for (let setting of document.getElementsByClassName("setting")) {
		setting.onmouseenter = function() {itemOnHover(setting);};
		setting.onmouseleave = function() {itemOnUnHover();};
	}
	for (let group of document.getElementsByClassName("group")) {
		group.onclick = function() {groupOnClick(group);};
		group.onmouseenter = function() {locationOnHover(group);};
		group.onmouseleave = function() {locationOnUnHover(group);};
	}
}

function updateLocations() {
	if (currentGroup) {
		groupBreakDown.innerHTML = "";
	}
	for (const locationId in locationLogic) {
		updateLocation(locationId);
	}
	if (currentGroup) {
		groupFocus(document.getElementById(currentGroup));
	}
}

function updateLocation(locationId) {
	let div = document.getElementById(locationId);
	const isSub = div.classList.contains("sub");
	const isEvent = locationId.includes("EVENT_");
	const availablity = locationLogic[locationId]();
	let logicClass = "";
	if (isEvent || availablity) {
		if (isSub) {
			logicClass = "sub";
		}
		else {
			logicClass = "location";
		}
		if (isEvent) {
			logicClass = logicClass + "event";
		}
		if (availablity) {
			logicClass = logicClass + availablity;
		}
	}
	setLogicClass(div, logicClass);
}

function countchecks() {
	let total = 0;
	let checked = 0;
	let logical = 0;
	for (let child of map.children) {
		if (child.classList.contains("group")) {
			for (let sub of child.children) {
				if (!sub.id.includes("EVENT_") && !sub.classList.contains("hiddenhidden") && !sub.classList.contains("victoryhidden")) {
					total = total + 1;
					if (sub.classList.contains("subchecked")) {
						checked = checked + 1;
					}
					else if (sub.classList.contains("sublogical") || sub.classList.contains("subeventlogical")) {
						logical = logical + 1;
					}
				}
			}
		}
		else if (child.classList.contains("location")) {
			if (!child.id.includes("EVENT_") && !child.classList.contains("hiddenhidden") && !child.classList.contains("victoryhidden")) {
				total = total + 1;
				if (child.classList.contains("locationchecked")) {
					checked = checked + 1;
				}
				else if (child.classList.contains("locationlogical") || child.classList.contains("locationeventlogical")) {
					logical = logical + 1;
				}
			}
		}
	}
	CHECK_CHECKED.innerHTML = checked;
	CHECK_LOGICAL.innerHTML = logical;
	CHECK_TOTAL.innerHTML = total;
}

function setSettingClass(div, className) {
	div.classList.remove("_0", "_1", "_2", "_3", "_4", "_5", "_6", "_7", "_8");
	if (className) {
		div.classList.add(className);
	}
}

function isIntLessThan(check, max) {
	let intValue = parseInt(check, 10);
	return Number.isInteger(intValue) && intValue <= max && intValue >= 0;
}

function parseSettings() {
	const urlSearch = new URLSearchParams(window.location.search);
	if (isIntLessThan(urlSearch.get("hi"), 1)) {
		setSettingClass(HIDDEN_ITEMS, "_" + urlSearch.get("hi"));
	}
	if (isIntLessThan(urlSearch.get("nr"), 1)) {
		setSettingClass(NORMAN_REQ, "_" + urlSearch.get("nr"));
	}
	if (isIntLessThan(urlSearch.get("nc"), 7)) {
		setSettingClass(NORMAN_COUNT, "_" + urlSearch.get("nc"));
	}
	if (isIntLessThan(urlSearch.get("er"), 1)) {
		setSettingClass(E4_REQ, "_" + urlSearch.get("er"));
	}
	if (isIntLessThan(urlSearch.get("ec"), 8)) {
		setSettingClass(E4_COUNT, "_" + urlSearch.get("ec"));
	}
	if (isIntLessThan(urlSearch.get("g"), 2)) {
		setSettingClass(VICTORY_EVENT, "_" + urlSearch.get("g"));
	}

	if (urlSearch.get("name") && urlSearch.get("port")) {
		pname = urlSearch.get("name");
		aport = urlSearch.get("port");
	}
}