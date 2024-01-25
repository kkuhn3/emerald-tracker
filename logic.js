function count_gyms() {
	let count = 0;
	const gyms = ["EVENT_DEFEAT_ROXANNE", "EVENT_DEFEAT_BRAWLY", "EVENT_DEFEAT_WATTSON", "EVENT_DEFEAT_FLANNERY", "EVENT_DEFEAT_NORMAN", "EVENT_DEFEAT_WINONA", "EVENT_DEFEAT_TATE_AND_LIZA", "EVENT_DEFEAT_JUAN"];
	for (const gym of gyms) {
		const gymDiv = document.getElementById(gym);
		if (gymDiv.classList.contains("subchecked")) {
			count = count + 1;
		}
	}
	return count;
}

function count_badges() {
	let count = 0;
	const badges = ["ITEM_BADGE_1", "ITEM_BADGE_2", "ITEM_BADGE_3", "ITEM_BADGE_4", "ITEM_BADGE_5", "ITEM_BADGE_6", "ITEM_BADGE_7", "ITEM_BADGE_8"];
	for (const badge of badges) {
		const badgeDiv = document.getElementById(badge);
		if (badgeDiv.classList.contains("itemchecked")) {
			count = count + 1;
		}
	}
	return count;
}

function norman_open() {
	let needed = parseInt(NORMAN_COUNT.classList[1].substring(1), 10);
	let count = -1;
	if (parseInt(NORMAN_REQ.classList[1].substring(1), 10)) {
		count = count_gyms();
	}
	else {
		count = count_badges();
	}
	return count >= needed;
}

function e4_open() {
	let needed = parseInt(E4_COUNT.classList[1].substring(1), 10);
	let count = -1;
	if (parseInt(E4_REQ.classList[1].substring(1), 10)) {
		count = count_gyms();
	}
	else {
		count = count_badges();
	}
	return count >= needed;
}

function has(item) {
	const itemdiv = document.getElementById(item);
	if (!itemdiv) {
		return false;
	}
	return itemdiv.classList.contains("locationchecked") || 
		   itemdiv.classList.contains("itemchecked") ||
		   itemdiv.classList.contains("subchecked");
}

function can_cut() {
	return has("ITEM_HM01_CUT") && has("ITEM_BADGE_1");
}

function can_flash() {
	return has("ITEM_HM05_FLASH") && has("ITEM_BADGE_2");
}

function can_rocksmash() {
	return has("ITEM_HM06_ROCK_SMASH") && has("ITEM_BADGE_3");
}

function can_strength() {
	return has("ITEM_HM04_STRENGTH") && has("ITEM_BADGE_4");
}

function can_surf() {
	return has("ITEM_HM03_SURF") && has("ITEM_BADGE_5");
}

function can_dive() {
	return has("ITEM_HM08_DIVE") && has("ITEM_BADGE_7");
}

function can_waterfall() {
	return has("ITEM_HM07_WATERFALL") && has("ITEM_BADGE_8");
}

function can_bike() {
	return has("ITEM_ACRO_BIKE") || has("ITEM_MACH_BIKE");
}

function ferry_from_slateport() {
	return slateport_access() && has("ITEM_SS_TICKET");
}

function dewford_access() {
	return has("EVENT_TALK_TO_MR_STONE") || can_surf();
}

function pass_slateport() {
	return has("EVENT_RESCUE_CAPT_STERN") || can_bike();
}

function pass_wailmers() {
	return can_surf() && has("EVENT_CLEAR_AQUA_HIDEOUT");
}

function slateport_access() {
	return (has("EVENT_DELIVER_LETTER") && has("EVENT_TALK_TO_MR_STONE")) || 
		   can_surf() || 
		   (can_rocksmash() && pass_slateport());
}

function mauville_access() {
	return can_rocksmash() ||
		   can_surf() ||
		   (slateport_access() && pass_slateport());
}

function fallarbor_access() {
	return (has("EVENT_MAGMA_STEALS_METEORITE") && can_surf()) || 
		   (mauville_access() && can_rocksmash());
}

function meteorfalls_access() {
	return fallarbor_access() || can_surf();
}

function rt115_beach_access() {
	return can_surf() || fallarbor_access();
}

function lavaridge_access() {
	return has("EVENT_RECOVER_METEORITE") && fallarbor_access();
}

function rt119_south_access() {
	return (mauville_access() && can_surf()) ||
		   (rt121_access());
}

function fortree_side_access() {
	return mauville_access() && can_surf();
}

function rt121_access() {
	return fortree_side_access() ||
		   (lilycove_access() && (can_cut() || can_surf()));
}

function lilycove_access() {
	return fortree_side_access() || ferry_from_slateport();
}

function rt124_access() {
	return lilycove_access() && can_surf() && pass_wailmers();
}

function divespot_access() {
	return rt124_access() && can_dive();
}

function victory_road_access() {
	return rt124_access() && can_waterfall();
}

function elite_four() {
	return e4_open() &&
		   victory_road_access() &&
		   can_strength() &&
		   can_rocksmash() &&
		   can_surf();
}

function hidden_logic() {
	if (has("ITEM_ITEMFINDER")) {
		return "logical";
	}
	return "possible";
}

const locationLogic = {
	//Cities
	//Littleroot
	"NPC_GIFT_RECEIVED_AMULET_COIN": function() {
		if (has("ITEM_BADGE_5") && has("EVENT_RECOVER_DEVON_GOODS")) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_SS_TICKET": function() {
		if (has("EVENT_DEFEAT_CHAMPION")) {
			return "logical";
		}
	},
	//Oldale
	"NPC_GIFT_RECEIVED_POTION_OLDALE": function() {
		return "logical";
	},
	//Petalburg
	"ITEM_PETALBURG_CITY_MAX_REVIVE": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"ITEM_PETALBURG_CITY_ETHER": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_PETALBURG_CITY_RARE_CANDY": function() {
		if (can_surf()) {
			return hidden_logic();
		}
	},
	"EVENT_DEFEAT_NORMAN": function() {
		if (norman_open()) {
			return "logical";
		}
	},
	"BADGE_5": function() {
		if (norman_open()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM42": function() {
		if (norman_open()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_HM03": function() {
		if (norman_open()) {
			return "logical";
		}
	},
	//Rustboro
	"ITEM_RUSTBORO_CITY_X_DEFEND": function() {
		return "logical";
	},
	"NPC_GIFT_RECEIVED_GREAT_BALL_RUSTBORO_CITY": function() {
		if (has("EVENT_RECOVER_DEVON_GOODS")) {
			return "logical";
		}
	},
	"EVENT_DEFEAT_ROXANNE": function() {
		return "logical";
	},
	"BADGE_1": function() {
		return "logical";
	},
	"NPC_GIFT_RECEIVED_TM39": function() {
		return "logical";
	},
	"NPC_GIFT_RECEIVED_QUICK_CLAW": function() {
		return "logical";
	},
	"NPC_GIFT_RECEIVED_LETTER": function() {
		if (has("EVENT_RECOVER_DEVON_GOODS")) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_EXP_SHARE": function() {
		if (has("EVENT_DELIVER_LETTER")) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_PREMIER_BALL_RUSTBORO": function() {
		return "logical";
	},
	"NPC_GIFT_RECEIVED_HM01": function() {
		return "logical";
	},
	"EVENT_RETURN_DEVON_GOODS": function() {
		if (has("EVENT_RECOVER_DEVON_GOODS")) {
			return "logical";
		}
	},
	"EVENT_TALK_TO_MR_STONE": function() {
		if (has("EVENT_RECOVER_DEVON_GOODS")) {
			return "logical";
		}
	},
	//Dewford
	"NPC_GIFT_RECEIVED_OLD_ROD": function() {
		if (dewford_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM36": function() {
		if (dewford_access() && has("EVENT_DEFEAT_NORMAN")) {
			return "logical";
		}
	},
	"EVENT_DEFEAT_BRAWLY": function() {
		if (dewford_access()) {
			return "logical";
		}
	},
	"BADGE_2": function() {
		if (dewford_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM08": function() {
		if (dewford_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_SILK_SCARF": function() {
		if (dewford_access()) {
			return "logical";
		}
	},
	//Slateport
	"NPC_GIFT_RECEIVED_POWDER_JAR": function() {
		if (slateport_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM41": function() {
		if (slateport_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_SOOTHE_BELL": function() {
		if (slateport_access()) {
			return "logical";
		}
	},
	"EVENT_RESCUE_CAPT_STERN": function() {
		if (slateport_access() && has("ITEM_DEVON_GOODS")) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM46": function() {
		if (slateport_access() && has("ITEM_DEVON_GOODS")) {
			return "logical";
		}
	},
	/*"EVENT_AQUA_STEALS_SUBMARINE": function() {
		if (slateport_access() && has("EVENT_RELEASE_GROUDON")) {
			return "logical";
		}
	},*/
	"NPC_GIFT_RECEIVED_DEEP_SEA_TOOTH": function() {
		if (slateport_access() && has("ITEM_SCANNER") && has("EVENT_RELEASE_GROUDON") && has("ITEM_BADGE_7")) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_DEEP_SEA_SCALE": function() {
		if (slateport_access() && has("ITEM_SCANNER") && has("EVENT_RELEASE_GROUDON") && has("ITEM_BADGE_7")) {
			return "logical";
		}
	},
	/*"EVENT_TALK_TO_DOCK": function() {
		if (slateport_access() && has("ITEM_DEVON_GOODS")) {
			return "logical";
		}
	},*/
	/*"EVENT_BUY_HARBOR_MAIL": function() {
		if (slateport_access()) {
			return "logical";
		}
	},*/
	//Mauville
	"ITEM_MAUVILLE_CITY_X_SPEED": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_GOT_BASEMENT_KEY_FROM_WATTSON": function() {
		if (mauville_access() && has("EVENT_DEFEAT_NORMAN")) {
			return "logical";
		}
	},
	"NPC_GIFT_GOT_TM24_FROM_WATTSON": function() {
		if (mauville_access() && has("EVENT_DEFEAT_NORMAN") && has("EVENT_TURN_OFF_GENERATOR")) {
			return "logical";
		}
	},
	"EVENT_DEFEAT_WATTSON": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"BADGE_3": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM34": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_ACRO_BIKE": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_MACH_BIKE": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_HM06": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_COIN_CASE": function() {
		if (mauville_access() && slateport_access()) {
			return "logical";
		}
	},
	//Verdanturf
	"NPC_GIFT_RECEIVED_TM45": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	//Fallarbor
	"HIDDEN_ITEM_FALLARBOR_TOWN_NUGGET": function() {
		if (fallarbor_access()) {
			if (has("ITEM_ITEMFINDER")) {
				return "logical";
			}
			return 'possible';
		}
	},
	"NPC_GIFT_RECEIVED_TM27": function() {
		if (fallarbor_access() && has("ITEM_METEORITE") && has("EVENT_RECOVER_METEORITE")) {
			return "logical";
		}
	},
	//Lavaridge
	"HIDDEN_ITEM_LAVARIDGE_TOWN_ICE_HEAL": function() {
		if (lavaridge_access()) {
			return hidden_logic();
		}
	},
	"NPC_GIFT_RECEIVED_CHARCOAL": function() {
		if (lavaridge_access()) {
			return "logical";
		}
	},
	"EVENT_DEFEAT_FLANNERY": function() {
		if (lavaridge_access()) {
			return "logical";
		}
	},
	"BADGE_4": function() {
		if (lavaridge_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM50": function() {
		if (lavaridge_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_GO_GOGGLES": function() {
		if (lavaridge_access()) {
			return "logical";
		}
	},
	//Fortree
	"NPC_GIFT_RECEIVED_TM10": function() {
		if (rt121_access()) {
			return "logical";
		}
	},
	/*"EVENT_WINGULL_QUEST_1": function() {
		if (rt121_access()) {
			return "logical";
		}
	},*/
	"NPC_GIFT_RECEIVED_MENTAL_HERB": function() {
		if (rt121_access() && rt124_access()) {
			return "logical";
		}
	},
	"EVENT_DEFEAT_WINONA": function() {
		if (rt121_access() && has("ITEM_DEVON_SCOPE")) {
			return "logical";
		}
	},
	"BADGE_6": function() {
		if (rt121_access() && has("ITEM_DEVON_SCOPE")) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM40": function() {
		if (rt121_access() && has("ITEM_DEVON_SCOPE")) {
			return "logical";
		}
	},
	//Lilycove
	"ITEM_LILYCOVE_CITY_MAX_REPEL": function() {
		if (lilycove_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_LILYCOVE_CITY_HEART_SCALE": function() {
		if (lilycove_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_LILYCOVE_CITY_PP_UP": function() {
		if (lilycove_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_LILYCOVE_CITY_POKE_BALL": function() {
		if (lilycove_access()) {
			return hidden_logic();
		}
	},
	"NPC_GIFT_RECEIVED_POKEBLOCK_CASE": function() {
		if (lilycove_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM44": function() {
		if (lilycove_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM49": function() {
		if (ferry_from_slateport()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_SS_TIDAL_LOWER_DECK_LEFTOVERS": function() {
		if (ferry_from_slateport() && has("ITEM_ITEMFINDER")) {
			return "logical";
		}
	},
	//Mossdeep
	"ITEM_MOSSDEEP_CITY_NET_BALL": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_KINGS_ROCK": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"EVENT_DEFEAT_TATE_AND_LIZA": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"BADGE_7": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM04": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_SUN_STONE_MOSSDEEP": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	/*"EVENT_DEFEAT_MAXIE_AT_SPACE_STATION": function() {
		if (rt124_access() && has("EVENT_DEFEAT_TATE_AND_LIZA")) {
			return "logical";
		}
	},*/
	"EVENT_STEVEN_GIVES_DIVE": function() {
		if (rt124_access() && has("EVENT_DEFEAT_TATE_AND_LIZA")) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_HM08": function() {
		if (rt124_access() && has("EVENT_DEFEAT_TATE_AND_LIZA")) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_SUPER_ROD": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	/*"EVENT_WINGULL_QUEST_2": function() {
		if (rt124_access() && has("EVENT_WINGULL_QUEST_1")) {
			return "logical";
		}
	},*/
	//Sootopolis
	"NPC_GIFT_RECEIVED_TM31": function() {
		if (divespot_access()) {
			return "logical";
		}
	},
	/*"EVENT_WALLACE_GOES_TO_SKY_PILLAR": function() {
		if (divespot_access() && has("EVENT_RELEASE_KYOGRE")) {
			return "logical";
		}
	},*/
	"NPC_GIFT_RECEIVED_HM07": function() {
		if (divespot_access() && has("EVENT_RELEASE_KYOGRE")) {
			return "logical";
		}
	},
	"EVENT_DEFEAT_JUAN": function() {
		if (divespot_access() && has("EVENT_RELEASE_KYOGRE")) {
			return "logical";
		}
	},
	"BADGE_8": function() {
		if (divespot_access() && has("EVENT_RELEASE_KYOGRE")) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM03": function() {
		if (divespot_access() && has("EVENT_RELEASE_KYOGRE")) {
			return "logical";
		}
	},
	//Pacifidlog
	"NPC_GIFT_RECEIVED_TM27_2": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM21": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	//Ever Grand City
	"EVENT_DEFEAT_CHAMPION": function() {
		if (elite_four()) {
			return "logical";
		}
	},
	//Dungeons
	//Petalburg Woods
	"ITEM_PETALBURG_WOODS_ETHER": function() {
		return "logical";
	},
	"ITEM_PETALBURG_WOODS_PARALYZE_HEAL": function() {
		return "logical";
	},
	"HIDDEN_ITEM_PETALBURG_WOODS_POTION": function() {
		if (has("ITEM_ITEMFINDER")) {
			return "logical";
		}
		return "possible";
	},
	"HIDDEN_ITEM_PETALBURG_WOODS_POKE_BALL": function() {
		if (has("ITEM_ITEMFINDER")) {
			return "logical";
		}
		return "possible";
	},
	"NPC_GIFT_RECEIVED_GREAT_BALL_PETALBURG_WOODS": function() {
		return "logical";
	},
	"ITEM_PETALBURG_WOODS_GREAT_BALL": function() {
		if (can_cut()) {
			return "logical";
		}
	},
	"ITEM_PETALBURG_WOODS_X_ATTACK": function() {
		if (can_cut()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_PETALBURG_WOODS_TINY_MUSHROOM_1": function() {
		if (can_cut()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_PETALBURG_WOODS_TINY_MUSHROOM_2": function() {
		if (can_cut()) {
			return hidden_logic();
		}
	},
	"NPC_GIFT_RECEIVED_MIRACLE_SEED": function() {
		if (can_cut()) {
			return "logical";
		}
	},
	//Rusturf Tunnel
	"ITEM_RUSTURF_TUNNEL_POKE_BALL": function() {
		return "logical";
	},
	"EVENT_RECOVER_DEVON_GOODS": function() {
		return "logical";
	},
	"NPC_GIFT_RECEIVED_DEVON_GOODS_RUSTURF_TUNNEL": function() {
		return "logical";
	},
	"NPC_GIFT_RECEIVED_HM04": function() {
		if (can_rocksmash()) {
			return "logical";
		}
	},
	"ITEM_RUSTURF_TUNNEL_MAX_ETHER": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	//Granite Cave
	"NPC_GIFT_RECEIVED_HM05": function() {
		if (dewford_access()) {
			return "logical";
		}
	},
	"ITEM_GRANITE_CAVE_1F_ESCAPE_ROPE": function() {
		if (dewford_access()) {
			return "logical";
		}
	},
	"ITEM_GRANITE_CAVE_B1F_POKE_BALL": function() {
		if (dewford_access()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"HIDDEN_ITEM_GRANITE_CAVE_B2F_EVERSTONE_2": function() {
		if (dewford_access()) {
			if (can_flash() && has("ITEM_ITEMFINDER")) {
				return "logical";
			}
			return "possible";
		}
	},
	"EVENT_DELIVER_LETTER": function() {
		if (dewford_access() && has("ITEM_LETTER")) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"NPC_GIFT_RECEIVED_TM47": function() {
		if (dewford_access() && has("ITEM_LETTER")) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"ITEM_GRANITE_CAVE_B2F_REPEL": function() {
		if (dewford_access() && has("ITEM_MACH_BIKE")) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"ITEM_GRANITE_CAVE_B2F_RARE_CANDY": function() {
		if (dewford_access() && has("ITEM_MACH_BIKE")) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"HIDDEN_ITEM_GRANITE_CAVE_B2F_EVERSTONE_1": function() {
		if (dewford_access() && has("ITEM_MACH_BIKE")) {
			if (can_flash() && has("ITEM_ITEMFINDER")) {
				return "logical";
			}
			return "possible";
		}
	},
	//Fiery Path
	"ITEM_FIERY_PATH_FIRE_STONE": function() {
		if (fallarbor_access() && can_strength()) {
			return "logical";
		}
	},
	"ITEM_FIERY_PATH_TM06": function() {
		if (fallarbor_access() && can_strength()) {
			return "logical";
		}
	},
	//Magma Hideout
	"ITEM_MAGMA_HIDEOUT_1F_RARE_CANDY": function() {
		if (lavaridge_access() && can_strength() && has("ITEM_MAGMA_EMBLEM")) {
			return "logical";
		}
	},
	"ITEM_MAGMA_HIDEOUT_2F_2R_MAX_ELIXIR": function() {
		if (lavaridge_access() && can_strength() && has("ITEM_MAGMA_EMBLEM")) {
			return "logical";
		}
	},
	"ITEM_MAGMA_HIDEOUT_2F_2R_FULL_RESTORE": function() {
		if (lavaridge_access() && can_strength() && has("ITEM_MAGMA_EMBLEM")) {
			return "logical";
		}
	},
	"ITEM_MAGMA_HIDEOUT_3F_1R_NUGGET": function() {
		if (lavaridge_access() && can_strength() && has("ITEM_MAGMA_EMBLEM")) {
			return "logical";
		}
	},
	"ITEM_MAGMA_HIDEOUT_3F_2R_PP_MAX": function() {
		if (lavaridge_access() && can_strength() && has("ITEM_MAGMA_EMBLEM")) {
			return "logical";
		}
	},
	"ITEM_MAGMA_HIDEOUT_4F_MAX_REVIVE": function() {
		if (lavaridge_access() && can_strength() && has("ITEM_MAGMA_EMBLEM")) {
			return "logical";
		}
	},
	"EVENT_RELEASE_GROUDON": function() {
		if (lavaridge_access() && can_strength() && has("ITEM_MAGMA_EMBLEM")) {
			return "logical";
		}
	},
	"ITEM_MAGMA_HIDEOUT_3F_3R_ECAPE_ROPE": function() {
		if (lavaridge_access() && can_strength() && has("ITEM_MAGMA_EMBLEM")) {
			return "logical";
		}
	},
	//Meteor Falls
	"ITEM_METEOR_FALLS_1F_1R_FULL_HEAL": function() {
		if (meteorfalls_access()) {
			return "logical";
		}
	},
	"EVENT_MAGMA_STEALS_METEORITE": function() {
		if (meteorfalls_access()) {
			return "logical";
		}
	},
	"ITEM_METEOR_FALLS_1F_1R_MOON_STONE": function() {
		if (meteorfalls_access()) {
			return "logical";
		}
	},
	"ITEM_METEOR_FALLS_1F_1R_PP_UP": function() {
		if (meteorfalls_access() && can_waterfall()) {
			return "logical";
		}
	},
	"ITEM_METEOR_FALLS_B1F_2R_TM02": function() {
		if (meteorfalls_access() && can_waterfall()) {
			return "logical";
		}
	},
	"ITEM_METEOR_FALLS_1F_1R_TM23": function() {
		if (meteorfalls_access() && can_waterfall()) {
			return "logical";
		}
	},
	"EVENT_DEFEAT_STEVEN": function() {
		if (meteorfalls_access() && can_waterfall() && has("EVENT_DEFEAT_CHAMPION")) {
			return "logical";
		}
	},
	//Abandoned Ship
	"ITEM_ABANDONED_SHIP_ROOMS_1F_HARBOR_MAIL": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"ITEM_ABANDONED_SHIP_ROOMS_2_1F_REVIVE": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"ITEM_ABANDONED_SHIP_ROOMS_2_B1F_DIVE_BALL": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"ITEM_ABANDONED_SHIP_ROOMS_B1F_ESCAPE_ROPE": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"ITEM_ABANDONED_SHIP_ROOMS_B1F_TM13": function() {
		if (can_surf() && has("ITEM_STORAGE_KEY")) {
			return "logical";
		}
	},
	"ITEM_ABANDONED_SHIP_CAPTAINS_OFFICE_STORAGE_KEY": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"ITEM_ABANDONED_SHIP_HIDDEN_FLOOR_ROOM_1_TM18": function() {
		if (can_surf() && has("ITEM_ROOM_1_KEY")) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ABANDONED_SHIP_RM_4_KEY": function() {
		if (can_surf() && has("ITEM_ROOM_1_KEY")) {
			return "logical";
		}
	},
	"ITEM_ABANDONED_SHIP_HIDDEN_FLOOR_ROOM_4_SCANNER": function() {
		if (can_surf() && has("ITEM_ROOM_2_KEY")) {
			return "logical";
		}
	},
	"ITEM_ABANDONED_SHIP_HIDDEN_FLOOR_ROOM_3_WATER_STONE": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ABANDONED_SHIP_RM_1_KEY": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ABANDONED_SHIP_RM_6_KEY": function() {
		if (can_surf() && has("ITEM_ROOM_4_KEY")) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ABANDONED_SHIP_RM_2_KEY": function() {
		if (can_surf() && has("ITEM_ROOM_6_KEY")) {
			return "logical";
		}
	},
	"ITEM_ABANDONED_SHIP_HIDDEN_FLOOR_ROOM_6_LUXURY_BALL": function() {
		if (can_surf() && has("ITEM_ROOM_6_KEY")) {
			return "logical";
		}
	},
	//New Mauville
	"ITEM_NEW_MAUVILLE_ULTRA_BALL": function() {
		if (mauville_access() && has("ITEM_BASEMENT_KEY") && can_surf()) {
			return "logical";
		}
	},
	"ITEM_NEW_MAUVILLE_ESCAPE_ROPE": function() {
		if (mauville_access() && has("ITEM_BASEMENT_KEY") && can_surf()) {
			return "logical";
		}
	},
	"ITEM_NEW_MAUVILLE_THUNDER_STONE": function() {
		if (mauville_access() && has("ITEM_BASEMENT_KEY") && can_surf()) {
			return "logical";
		}
	},
	"ITEM_NEW_MAUVILLE_FULL_HEAL": function() {
		if (mauville_access() && has("ITEM_BASEMENT_KEY") && can_surf()) {
			return "logical";
		}
	},
	"ITEM_NEW_MAUVILLE_PARALYZE_HEAL": function() {
		if (mauville_access() && has("ITEM_BASEMENT_KEY") && can_surf()) {
			return "logical";
		}
	},
	"EVENT_TURN_OFF_GENERATOR": function() {
		if (mauville_access() && has("ITEM_BASEMENT_KEY") && can_surf()) {
			return "logical";
		}
	},
	//Scoarched Slab
	"ITEM_SCORCHED_SLAB_TM11": function() {
		if (rt121_access() && can_surf() && has("ITEM_DEVON_SCOPE")) {
			return "logical";
		}
	},
	//Mt. Pyre
	"NPC_GIFT_RECEIVED_CLEANSE_TAG": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"ITEM_MT_PYRE_2F_ULTRA_BALL": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"ITEM_MT_PYRE_3F_SUPER_REPEL": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"ITEM_MT_PYRE_4F_SEA_INCENSE": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"ITEM_MT_PYRE_5F_LAX_INCENSE": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"ITEM_MT_PYRE_6F_TM30": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"ITEM_MT_PYRE_EXTERIOR_TM48": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"ITEM_MT_PYRE_EXTERIOR_MAX_POTION": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_MT_PYRE_EXTERIOR_MAX_ETHER": function() {
		if (lilycove_access() && can_surf()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_MT_PYRE_EXTERIOR_ULTRA_BALL": function() {
		if (lilycove_access() && can_surf()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_MT_PYRE_SUMMIT_ZINC": function() {
		if (lilycove_access() && can_surf()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_MT_PYRE_SUMMIT_RARE_CANDY": function() {
		if (lilycove_access() && can_surf()) {
			return hidden_logic();
		}
	},
	"NPC_GIFT_RECEIVED_MAGMA_EMBLEM": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	//Aqua Hideout
	"ITEM_AQUA_HIDEOUT_B1F_MAX_ELIXIR": function() {
		if (lilycove_access() && can_surf() && has("EVENT_RELEASE_GROUDON")) {
			return "logical";
		}
	},
	"ITEM_AQUA_HIDEOUT_B1F_NUGGET": function() {
		if (lilycove_access() && can_surf() && has("EVENT_RELEASE_GROUDON")) {
			return "logical";
		}
	},
	"ITEM_AQUA_HIDEOUT_B1F_MASTER_BALL": function() {
		if (lilycove_access() && can_surf() && has("EVENT_RELEASE_GROUDON")) {
			return "logical";
		}
	},
	"ITEM_AQUA_HIDEOUT_B2F_NEST_BALL": function() {
		if (lilycove_access() && can_surf() && has("EVENT_RELEASE_GROUDON")) {
			return "logical";
		}
	},
	"EVENT_CLEAR_AQUA_HIDEOUT": function() {
		if (lilycove_access() && can_surf() && has("EVENT_RELEASE_GROUDON")) {
			return "logical";
		}
	},
	//Shoal Cave
	"ITEM_SHOAL_CAVE_ENTRANCE_BIG_PEARL": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"ITEM_SHOAL_CAVE_INNER_ROOM_RARE_CANDY": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"ITEM_SHOAL_CAVE_STAIRS_ROOM_ICE_HEAL": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_FOCUS_BAND": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"ITEM_SHOAL_CAVE_ICE_ROOM_TM07": function() {
		if (rt124_access() && can_strength()) {
			return "logical";
		}
	},
	"ITEM_SHOAL_CAVE_ICE_ROOM_NEVER_MELT_ICE": function() {
		if (rt124_access() && can_strength()) {
			return "logical";
		}
	},
	//Seafloor Cavern
	"ITEM_SEAFLOOR_CAVERN_ROOM_9_TM26": function() {
		if (can_dive() && can_strength() && can_rocksmash() && rt124_access() && has("EVENT_STEVEN_GIVES_DIVE")) {
			return "logical";
		}
	},
	"EVENT_RELEASE_KYOGRE": function() {
		if (can_dive() && can_strength() && can_rocksmash() && rt124_access() && has("EVENT_STEVEN_GIVES_DIVE")) {
			return "logical";
		}
	},
	//Sky Pillar
	/*"EVENT_WAKE_RAYQUAZA": function() {
		if (rt124_access() && has("EVENT_WALLACE_GOES_TO_SKY_PILLAR")) {
			return "logical";
		}
	},*/
	//Victory Road
	"ITEM_VICTORY_ROAD_1F_MAX_ELIXIR": function() {
		if (victory_road_access()) {
			return "logical";
		}
	},
	"ITEM_VICTORY_ROAD_1F_PP_UP": function() {
		if (victory_road_access() && can_strength() && can_rocksmash()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"HIDDEN_ITEM_VICTORY_ROAD_1F_ULTRA_BALL": function() {
		if (victory_road_access() && can_strength() && can_rocksmash()) {
			if (can_flash() && has("ITEM_ITEMFINDER")) {
				return "logical";
			}
			return "possible";
		}
	},
	"ITEM_VICTORY_ROAD_B1F_TM29": function() {
		if (victory_road_access() && can_strength() && can_rocksmash()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"ITEM_VICTORY_ROAD_B1F_FULL_RESTORE": function() {
		if (victory_road_access() && can_strength() && can_rocksmash()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"HIDDEN_ITEM_VICTORY_ROAD_B2F_MAX_REPEL": function() {
		if (victory_road_access() && can_strength() && can_rocksmash()) {
			if (can_flash() && has("ITEM_ITEMFINDER")) {
				return "logical";
			}
			return "possible";
		}
	},
	"ITEM_VICTORY_ROAD_B2F_FULL_HEAL": function() {
		if (victory_road_access() && can_strength() && can_rocksmash()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"HIDDEN_ITEM_VICTORY_ROAD_B2F_ELIXIR": function() {
		if (victory_road_access() && can_strength() && can_rocksmash()) {
			if (can_flash() && has("ITEM_ITEMFINDER")) {
				return "logical";
			}
			return "possible";
		}
	},
	//Routes
	//101
	//102
	"ITEM_ROUTE_102_POTION": function() {
		return "logical";
	},
	//103
	"ITEM_ROUTE_103_GUARD_SPEC": function() {
		if (mauville_access() && can_cut()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_103_PP_UP": function() {
		if (mauville_access() && can_cut()) {
			return "logical";
		}
	},
	//104
	"HIDDEN_ITEM_ROUTE_104_POTION": function() {
		if (has("ITEM_ITEMFINDER")) {
			return "logical";
		}
		return "possible"
	},
	"HIDDEN_ITEM_ROUTE_104_POTION": function() {
		if (has("ITEM_ITEMFINDER")) {
			return "logical";
		}
		return "possible"
	},
	"HIDDEN_ITEM_ROUTE_104_HEART_SCALE": function() {
		if (has("ITEM_ITEMFINDER")) {
			return "logical";
		}
		return "possible"
	},
	"HIDDEN_ITEM_ROUTE_104_ANTIDOTE": function() {
		if (has("ITEM_ITEMFINDER")) {
			return "logical";
		}
		return "possible"
	},
	"ITEM_ROUTE_104_POKE_BALL": function() {
		return "logical";
	},
	"NPC_GIFT_RECEIVED_TM09": function() {
		return "logical";
	},
	"NPC_GIFT_RECEIVED_WHITE_HERB": function() {
		if (has("ITEM_BADGE_3")) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_CHESTO_BERRY_ROUTE_104": function() {
		return "logical";
	},
	"NPC_GIFT_RECEIVED_WAILMER_PAIL": function() {
		return "logical";
	},
	"ITEM_ROUTE_104_POTION": function() {
		return "logical";
	},
	"HIDDEN_ITEM_ROUTE_104_SUPER_POTION": function() {
		if (has("ITEM_ITEMFINDER")) {
			return "logical";
		}
		return "possible";
	},
	"HIDDEN_ITEM_ROUTE_104_POKE_BALL": function() {
		if (has("ITEM_ITEMFINDER")) {
			return "logical";
		}
		return "possible";
	},
	/*"EVENT_MEET_FLOWER_SHOP_OWNER": function() {
		return "logical";
	},*/
	"ITEM_ROUTE_104_X_ACCURACY": function() {
		if (can_surf() || can_cut()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_104_PP_UP": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	//105
	"ITEM_ROUTE_105_IRON": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_105_HEART_SCALE": function() {
		if (can_surf()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_105_BIG_PEARL": function() {
		if (can_surf()) {
			return hidden_logic();
		}
	},
	//106
	"ITEM_ROUTE_106_PROTEIN": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_106_POKE_BALL": function() {
		if (dewford_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_106_STARDUST": function() {
		if (dewford_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_106_HEART_SCALE": function() {
		if (dewford_access()) {
			return hidden_logic();
		}
	},
	//107
	//108
	"ITEM_ROUTE_108_STAR_PIECE": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_108_RARE_CANDY": function() {
		if (can_surf()) {
			return hidden_logic();
		}
	},
	//109
	"ITEM_ROUTE_109_PP_UP": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_109_HEART_SCALE_3": function() {
		if (can_surf()) {
			return hidden_logic();
		}
	},
	"ITEM_ROUTE_109_POTION": function() {
		if (slateport_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_SOFT_SAND": function() {
		if (slateport_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_6_SODA_POP": function() {
		if (slateport_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_109_REVIVE": function() {
		if (slateport_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_109_HEART_SCALE_1": function() {
		if (slateport_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_109_GREAT_BALL": function() {
		if (slateport_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_109_ETHER": function() {
		if (slateport_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_109_HEART_SCALE_2": function() {
		if (slateport_access()) {
			return hidden_logic();
		}
	},
	//110
	"ITEM_ROUTE_110_DIRE_HIT": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_110_ELIXIR": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_110_REVIVE": function() {
		if (mauville_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_110_GREAT_BALL": function() {
		if (mauville_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_110_POKE_BALL": function() {
		if (mauville_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_110_FULL_HEAL": function() {
		if (mauville_access()) {
			return hidden_logic();
		}
	},
	"NPC_GIFT_RECEIVED_ITEMFINDER": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_110_RARE_CANDY": function() {
		if (mauville_access() && can_surf()) {
			return "logical";
		}
	},
	//111
	"ITEM_ROUTE_111_ELIXIR": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_111_HP_UP": function() {
		if (mauville_access() && can_surf()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_111_TM37": function() {
		if (fallarbor_access() && has("ITEM_GO_GOGGLES")) {
			return "logical";
		}
	},
	"ITEM_ROUTE_111_STARDUST": function() {
		if (fallarbor_access() && has("ITEM_GO_GOGGLES")) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_111_STARDUST": function() {
		if (fallarbor_access() && has("ITEM_GO_GOGGLES")) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_111_PROTEIN": function() {
		if (fallarbor_access() && has("ITEM_GO_GOGGLES")) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_111_RARE_CANDY": function() {
		if (fallarbor_access() && has("ITEM_GO_GOGGLES")) {
			return hidden_logic();
		}
	},
	"NPC_GIFT_RECEIVED_SECRET_POWER": function() {
		if (fallarbor_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_MACHO_BRACE": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	//112
	"ITEM_ROUTE_112_NUGGET": function() {
		if (lavaridge_access()) {
			return "logical";
		}
	},
	//Mt Chimney
	"NPC_GIFT_RECEIVED_METEORITE": function() {
		if (fallarbor_access() && has("EVENT_MAGMA_STEALS_METEORITE")) {
			return "logical";
		}
	},
	"EVENT_RECOVER_METEORITE": function() {
		if (fallarbor_access() && has("EVENT_MAGMA_STEALS_METEORITE")) {
			return "logical";
		}
	},
	//Jagged Pass
	"HIDDEN_ITEM_JAGGED_PASS_FULL_HEAL": function() {
		if (lavaridge_access()) {
			return hidden_logic();
		}
	},
	"ITEM_JAGGED_PASS_BURN_HEAL": function() {
		if (lavaridge_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_JAGGED_PASS_GREAT_BALL": function() {
		if (lavaridge_access()) {
			return hidden_logic();
		}
	},
	//113
	"ITEM_ROUTE_113_MAX_ETHER": function() {
		if (fallarbor_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_113_SUPER_REPEL": function() {
		if (fallarbor_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_113_HYPER_POTION": function() {
		if (fallarbor_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_113_ETHER": function() {
		if (fallarbor_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_113_TM32": function() {
		if (fallarbor_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_113_NUGGET": function() {
		if (fallarbor_access()) {
			return hidden_logic();
		}
	},
	//114
	"ITEM_ROUTE_114_PROTEIN": function() {
		if (fallarbor_access() && can_rocksmash()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_114_ENERGY_POWDER": function() {
		if (fallarbor_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_114_REVIVE": function() {
		if (fallarbor_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_114_CARBOS": function() {
		if (fallarbor_access()) {
			return hidden_logic();
		}
	},
	"NPC_GIFT_RECEIVED_TM05": function() {
		if (fallarbor_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_114_RARE_CANDY": function() {
		if (fallarbor_access() && can_waterfall()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_TM28": function() {
		if (fallarbor_access()) {
			return "logical";
		}
	},
	//115
	"ITEM_ROUTE_115_SUPER_POTION": function() {
		return "logical";
	},
	"HIDDEN_ITEM_ROUTE_115_HEART_SCALE": function() {
		if (rt115_beach_access()) {
			return hidden_logic();
		}
	},
	"ITEM_ROUTE_115_PP_UP": function() {
		if (meteorfalls_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_115_GREAT_BALL": function() {
		if (meteorfalls_access() && can_rocksmash()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_115_HEAL_POWDER": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_115_TM01": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_115_IRON": function() {
		if (can_surf() && has("ITEM_MACH_BIKE")) {
			return "logical";
		}
	},
	//116
	"ITEM_ROUTE_116_REPEL": function() {
		return "logical";
	},
	"ITEM_ROUTE_116_X_SPECIAL": function() {
		return "logical";
	},
	"NPC_GIFT_RECEIVED_REPEAT_BALL": function() {
		if (has("EVENT_RESCUE_CAPT_STERN")) {
			return "logical";
		}
	},
	"ITEM_ROUTE_116_ETHER": function() {
		if (can_cut()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_116_POTION": function() {
		if (can_cut()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_116_SUPER_POTION": function() {
		if (can_cut()) {
			return hidden_logic();
		}
	},
	"ITEM_ROUTE_116_HP_UP": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_116_BLACK_GLASSES": function() {
		if (mauville_access()) {
			return hidden_logic();
		}
	},
	//117
	"ITEM_ROUTE_117_GREAT_BALL": function() {
		if (mauville_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_117_REVIVE": function() {
		if (mauville_access() && can_cut()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_117_REPEL": function() {
		if (mauville_access()) {
			return hidden_logic();
		}
	},
	//118
	"HIDDEN_ITEM_ROUTE_118_HEART_SCALE": function() {
		if (mauville_access()) {
			return hidden_logic();
		}
	},
	"ITEM_ROUTE_118_HYPER_POTION": function() {
		if (rt119_south_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_118_IRON": function() {
		if (rt119_south_access()) {
			return hidden_logic();
		}
	},
	"NPC_GIFT_RECEIVED_GOOD_ROD": function() {
		if (rt119_south_access()) {
			return "logical";
		}
	},
	//119
	"ITEM_ROUTE_119_SUPER_REPEL": function() {
		if (rt119_south_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_119_HYPER_POTION_1": function() {
		if (rt119_south_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_119_FULL_HEAL": function() {
		if (rt119_south_access()) {
			return hidden_logic();
		}
	},
	"ITEM_ROUTE_119_ZINC": function() {
		if (rt119_south_access() && can_surf()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_119_CALCIUM": function() {
		if (rt119_south_access() && has("ITEM_ACRO_BIKE")) {
			return hidden_logic();
		}
	},
	"ITEM_ROUTE_119_ELIXIR_1": function() {
		if (rt119_south_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_119_HYPER_POTION_2": function() {
		if (rt119_south_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_119_LEAF_STONE": function() {
		if (rt119_south_access() && can_surf()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_119_ULTRA_BALL": function() {
		if (rt119_south_access() && can_surf()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_119_MAX_ETHER": function() {
		if (can_surf() && (rt119_south_access() || rt121_access())) {
			return hidden_logic();
		}
	},
	"ITEM_ROUTE_119_ELIXIR_2": function() {
		if (rt119_south_access() || rt121_access()) {
			return "logical";
		}
	},
	"NPC_GIFT_RECEIVED_HM02": function() {
		if (rt119_south_access() || rt121_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_119_RARE_CANDY": function() {
		if (can_waterfall() && has("ITEM_ACRO_BIKE") && 
		   (rt119_south_access() || rt121_access())) {
			return "logical";
		}
	},
	"ITEM_ROUTE_119_NUGGET": function() {
		if (can_waterfall() && has("ITEM_ACRO_BIKE") && 
		   (rt119_south_access() || rt121_access())) {
			return "logical";
		}
	},
	/*"EVENT_DEFEAT_SHELLY": function() {
		if (rt119_south_access()) {
			return "logical";
		}
	},*/
	//120
	"HIDDEN_ITEM_ROUTE_120_RARE_CANDY_1": function() {
		if (rt121_access() && can_cut()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_120_REVIVE": function() {
		if (rt121_access()) {
			return hidden_logic();
		}
	},
	"NPC_GIFT_RECEIVED_DEVON_SCOPE": function() {
		if (rt121_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_120_NEST_BALL": function() {
		if (rt121_access() && has("ITEM_DEVON_SCOPE")) {
			return "logical";
		}
	},
	"ITEM_ROUTE_120_NUGGET": function() {
		if (rt121_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_120_REVIVE": function() {
		if (rt121_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_120_HYPER_POTION": function() {
		if (rt121_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_120_ZINC": function() {
		if (rt121_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_120_RARE_CANDY_2": function() {
		if (rt121_access() && can_surf()) {
			return hidden_logic();
		}
	},
	"ITEM_ROUTE_120_FULL_HEAL": function() {
		if (rt121_access() && can_surf()) {
			return "logical";
		}
	},
	//121
	"HIDDEN_ITEM_ROUTE_121_HP_UP": function() {
		if (rt121_access()) {
			return hidden_logic();
		}
	},
	"ITEM_ROUTE_121_CARBOS": function() {
		if (lilycove_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_121_REVIVE": function() {
		if (lilycove_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_121_ZINC": function() {
		if (lilycove_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_121_NUGGET": function() {
		if (lilycove_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_121_FULL_HEAL": function() {
		if (lilycove_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_121_MAX_REVIVE": function() {
		if (lilycove_access()) {
			return hidden_logic();
		}
	},
	//Safari Zone
	"ITEM_SAFARI_ZONE_NORTH_CALCIUM": function() {
		if (lilycove_access() && has("ITEM_POKEBLOCK_CASE") && has("ITEM_ACRO_BIKE")) {
			return "logical";
		}
	},
	"ITEM_SAFARI_ZONE_NORTH_WEST_TM22": function() {
		if (lilycove_access() && has("ITEM_POKEBLOCK_CASE") && can_surf() && has("ITEM_MACH_BIKE")) {
			return "logical";
		}
	},
	"ITEM_SAFARI_ZONE_NORTH_EAST_NUGGET": function() {
		if (lilycove_access() && has("ITEM_POKEBLOCK_CASE") && has("EVENT_DEFEAT_CHAMPION")) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_SAFARI_ZONE_NORTH_EAST_RARE_CANDY": function() {
		if (lilycove_access() && has("ITEM_POKEBLOCK_CASE") && has("EVENT_DEFEAT_CHAMPION")) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_SAFARI_ZONE_NORTH_EAST_ZINC": function() {
		if (lilycove_access() && has("ITEM_POKEBLOCK_CASE") && has("EVENT_DEFEAT_CHAMPION")) {
			return hidden_logic();
		}
	},
	"ITEM_SAFARI_ZONE_SOUTH_WEST_MAX_REVIVE": function() {
		if (lilycove_access() && has("ITEM_POKEBLOCK_CASE") && can_surf()) {
			return "logical";
		}
	},
	"ITEM_SAFARI_ZONE_SOUTH_EAST_BIG_PEARL": function() {
		if (lilycove_access() && has("ITEM_POKEBLOCK_CASE") && can_surf() && has("EVENT_DEFEAT_CHAMPION")) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_SAFARI_ZONE_SOUTH_EAST_PP_UP": function() {
		if (lilycove_access() && has("ITEM_POKEBLOCK_CASE") && has("EVENT_DEFEAT_CHAMPION")) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_SAFARI_ZONE_SOUTH_EAST_FULL_RESTORE": function() {
		if (lilycove_access() && has("ITEM_POKEBLOCK_CASE") && has("EVENT_DEFEAT_CHAMPION")) {
			return hidden_logic();
		}
	},
	//123
	"ITEM_ROUTE_123_ULTRA_BALL": function() {
		if (rt119_south_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_123_REVIVE": function() {
		if (rt119_south_access()) {
			return hidden_logic();
		}
	},
	"ITEM_ROUTE_123_CALCIUM": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_123_ELIXIR": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_123_PP_UP": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_123_REVIVAL_HERB": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_123_SUPER_REPEL": function() {
		if (lilycove_access() && can_surf()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_123_HYPER_POTION": function() {
		if (lilycove_access() && can_surf()) {
			return hidden_logic();
		}
	},
	"NPC_GIFT_RECEIVED_TM19": function() {
		if (lilycove_access() && can_surf()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_ROUTE_123_PP_UP": function() {
		if (lilycove_access() && can_surf() && can_cut()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_123_RARE_CANDY": function() {
		if (lilycove_access() && can_surf() && can_cut()) {
			return hidden_logic();
		}
	},
	//124
	"ITEM_ROUTE_124_RED_SHARD": function() {
		if (divespot_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_124_YELLOW_SHARD": function() {
		if (divespot_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_124_BLUE_SHARD": function() {
		if (divespot_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_UNDERWATER_124_GREEN_SHARD": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_124_PEARL": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_124_BIG_PEARL": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_124_HEART_SCALE_1": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_124_CALCIUM": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_124_HEART_SCALE_2": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_124_CARBOS": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	//125
	"ITEM_ROUTE_125_BIG_PEARL": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	//126
	"ITEM_ROUTE_126_GREEN_SHARD": function() {
		if (divespot_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_UNDERWATER_126_HEART_SCALE": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_126_ULTRA_BALL": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_126_STARDUST": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_126_BIG_PEARL": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_126_PEARL": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_126_IRON": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_126_YELLOW_SHARD": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_126_BLUE_SHARD": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	//127
	"ITEM_ROUTE_127_ZINC": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_127_RARE_CANDY": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_127_CARBOS": function() {
		if (divespot_access()) {
			return "logical";
		}
	},
	"HIDDEN_ITEM_UNDERWATER_127_HEART_SCALE": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_127_STAR_PIECE": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_127_HP_UP": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_127_RED_SHARD": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	//128
	"HIDDEN_ITEM_ROUTE_128_HEART_SCALE_1": function() {
		if (rt124_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_128_HEART_SCALE_2": function() {
		if (rt124_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_ROUTE_128_HEART_SCALE_3": function() {
		if (rt124_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_128_PROTEIN": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	"HIDDEN_ITEM_UNDERWATER_128_PEARL": function() {
		if (divespot_access()) {
			return hidden_logic();
		}
	},
	//129
	//130
	//131
	//132
	"ITEM_ROUTE_132_RARE_CANDY": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_132_PROTEIN": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	//133
	"ITEM_ROUTE_133_BIG_PEARL": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_133_STAR_PIECE": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_133_MAX_REVIVE": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	//134
	"ITEM_ROUTE_134_CARBOS": function() {
		if (rt124_access()) {
			return "logical";
		}
	},
	"ITEM_ROUTE_134_STAR_PIECE": function() {
		if (rt124_access()) {
			return "logical";
		}
	}
}