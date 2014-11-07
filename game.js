var game = {
	isResettingGame: false,
	isDebugServer: false
};
var upgrades = {
	doubleClicker: {
		id: 'doubleClicker',
		name: 'Double Clicker',
		cost: 100,
		tooltip: 'Doubles the cash earned from clicking.',
		icon: 'glyphicon-hand-up',
		apply: function() {
			player.click.power *= 2;
		}
	},
	loggingTruck: {
		id: 'loggingTruck',
		name: 'Logging Truck',
		cost: 400,
		tooltip: 'Increases the supply limit of Wood by 50.',
		icon: 'glyphicon-align-justify',
		apply: function() {
			player.currencies.wood.maxSupply += 50;
		}
	},
	warehouse1: {
		id: 'warehouse1',
		name: 'Warehouse Capacity',
		cost: 800,
		tooltip: 'Increases the capacity of your Commodity Sales warehouse by 50.',
		icon: 'glyphicon-home',
		apply: function() {
			player.currencies.sales1.maxSupply += 50;
		}
	},
	plankDistribution: {
		id: 'plankDistribution',
		name: 'Plank Distribution',
		cost: 650,
		tooltip: 'Increase the base unit price of Wood by $0.10.',
		icon: 'glyphicon-th-large',
		apply: function() {
			player.currencies.wood.baseUnitPrice += 0.10;
			recalculateUnitPrice(player.currencies.wood);
		}
	},
	consultants: {
		id: 'consultants',
		name: 'Consultants',
		cost: 1000,
		tooltip: 'Adds 3 workers.',
		icon: 'glyphicon-user',
		apply: function() {
			player.workers += 3;
		}
	},
	truckUpgrade: {
		id: 'truckUpgrade',
		name: 'Truck Upgrade',
		cost: 1200,
		tooltip: 'Increases the supply limit of Rubber by 50.',
		icon: 'glyphicon-wrench',
		apply: function() {
			player.currencies.rubber.maxSupply += 50;
		}
	},
	tripleClicker: {
		id: 'tripleClicker',
		name: 'Triple Clicker',
		cost: 1500,
		tooltip: 'Triples the cash earned from clicking.',
		icon: 'glyphicon-hand-up',
		apply: function() {
			player.click.power *= 3;
		}
	},
	grainTractor: {
		id: 'grainTractor',
		name: 'Grain Tractor',
		cost: 2100,
		tooltip: 'Increases the supply limit of Food by 50.',
		icon: 'glyphicon-filter',
		apply: function() {
			player.currencies.food.maxSupply += 50;
		}
	},
	massReforestation: {
		id: 'massReforestation',
		name: 'Mass Reforestation',
		cost: 3000,
		tooltip: 'Increases the supply limit of Forest by 25, and unlock another synergy bonus at 40+ supply.',
		icon: 'glyphicon-tree-conifer',
		apply: function() {
			player.currencies.forest.maxSupply += 25;
		}
	},
	advisoryBoard1: {
		id: 'advisoryBoard1',
		name: 'Advisory Board #1',
		cost: 5500,
		tooltip: 'Instantly gain 100 experience on all Forest quadrant nodes.',
		icon: 'glyphicon-thumbs-up',
		apply: function() {
			gainExp(player.currencies.forest, 100);
			gainExp(player.currencies.wood, 100);
			gainExp(player.currencies.rubber, 100);
		}
	},
	// TODO: Add upgrade
	commodityMastery1: {
		id: 'commodityMastery1',
		name: 'Commodity Mastery #1',
		cost: 10000,
		tooltip: 'Commodity Sales now sells 60% of their supply per cycle.',
		icon: 'glyphicon-barcode',
		apply: function() {
			player.currencies.sales1.sellRate = 60;
		}
	},
	contractors: {
		id: 'contractors',
		name: 'Contractors',
		cost: 12100,
		tooltip: 'Adds 3 workers.',
		icon: 'glyphicon-user',
		apply: function() {
			player.workers += 3;
		}
	},
	carefulClicker: {
		id: 'carefulClicker',
		name: 'Careful Clicker',
		cost: 13500,
		tooltip: 'Reduces the number of times you can click per second by 1, but doubles the cash earned from clicking.',
		icon: 'glyphicon-hand-up',
		apply: function() {
			player.click.throttlePerSecond -= 1;
			player.click.power *= 2;
		}
	},
	silos: {
		id: 'silos',
		name: 'Silos',
		cost: 17100,
		tooltip: 'Increases the supply limit of Food by 50.',
		icon: 'glyphicon-tint',
		apply: function() {
			player.currencies.food.maxSupply += 50;
		}
	},
	advisoryBoard2: {
		id: 'advisoryBoard2',
		name: 'Advisory Board #2',
		cost: 9500,
		tooltip: 'Instantly gain 100 experience on all Prairie quadrant nodes.',
		icon: 'glyphicon-thumbs-up',
		apply: function() {
			gainExp(player.currencies.prairie, 100);
			gainExp(player.currencies.livestock, 100);
			gainExp(player.currencies.food, 100);
		}
	},
	supplyChainManagement: {
		id: 'supplyChainManagement',
		name: 'Supply Chain Management',
		cost: 28000,
		tooltip: 'Commodity Sales now transports 60% of their supply per cycle.',
		icon: 'glyphicon-share-alt',
		apply: function() {
			player.currencies.sales1.transportRate = 60;
		}
	},
	irrigationSprinklers: {
		id: 'irrigationSprinklers',
		name: 'Irrigation Sprinklers',
		cost: 23800,
		tooltip: 'Increases the supply limit of Prairie by 25, and unlock another synergy bonus at 40+ supply.',
		icon: 'glyphicon-tint',
		apply: function() {
			player.currencies.prairie.maxSupply += 25;
		}
	},
	manufacturers: {
		id: 'manufacturers',
		name: 'Manufacturers',
		cost: 38000,
		tooltip: 'Adds 3 workers.',
		icon: 'glyphicon-user',
		apply: function() {
			player.workers += 3;
		}
	},
	tireFactory: {
		id: 'tireFactory',
		name: 'Tire Factory',
		cost: 43000,
		tooltip: 'Increase the base unit price of Rubber by $0.80.',
		icon: 'glyphicon-cog',
		apply: function() {
			player.currencies.rubber.baseUnitPrice += 0.80;
			recalculateUnitPrice(player.currencies.rubber);
		}
	},
	functionalMastery1: {
		id: 'functionalMastery1',
		name: 'Functional Mastery #1',
		cost: 50000,
		tooltip: 'Functional Sales now sells 60% of their supply per cycle.',
		icon: 'glyphicon-barcode',
		apply: function() {
			player.currencies.sales2.sellRate = 60;
		}
	},
	foodProcessing: {
		id: 'foodProcessing',
		name: 'Food Processing',
		cost: 58000,
		tooltip: 'Increase the base unit price of Food by $0.25.',
		icon: 'glyphicon-cog',
		apply: function() {
			player.currencies.food.baseUnitPrice += 0.25;
			recalculateUnitPrice(player.currencies.food);
		}
	},
	regionalSales: {
		id: 'regionalSales',
		name: 'Regional Sales',
		cost: 75000,
		tooltip: 'Increases your Sales Multiplier by 0.50x.',
		icon: 'glyphicon-tag',
		apply: function() {
			player.rating = addRoundedCurrencyNum(player.rating, 0.50);
		}
	},
	marbleShaping: {
		id: 'marbleShaping',
		name: 'Marble Shaping',
		cost: 87000,
		tooltip: 'Increase the base unit price of Stone by $2.00.',
		icon: 'glyphicon-fire',
		apply: function() {
			player.currencies.stone.baseUnitPrice += 2.00;
			recalculateUnitPrice(player.currencies.stone);
		}
	},
	chipboardMill: {
		id: 'chipboardMill',
		name: 'Chipboard Mill',
		cost: 105000,
		tooltip: 'Increase the base unit price of Wood by $0.50.',
		icon: 'glyphicon-cog',
		apply: function() {
			player.currencies.wood.baseUnitPrice += 0.50;
			recalculateUnitPrice(player.currencies.wood);
		}
	},
	cattleProds: {
		id: 'cattleProds',
		name: 'Cattle Prods',
		cost: 122000,
		tooltip: 'Increases the supply limit of Livestock by 50.',
		icon: 'glyphicon-fire',
		apply: function() {
			player.currencies.livestock.maxSupply += 50;
		}
	},
	/*dedicatedResources: {
		id: 'dedicatedResources',
		name: 'Dedicated Resources',
		cost: 150000,
		tooltip: 'Increases your global supply multiplier by 200%, but decreases your global speed multiplier by 50%.',
		icon: 'glyphicon-upload',
		apply: function() {
			player.globalSpeedMultiplier -= 0.5;
			player.globalSupplyMultiplier += 2.0;
		}
	},*/
	advisoryBoard3: {
		id: 'advisoryBoard3',
		name: 'Advisory Board #3',
		cost: 163000,
		tooltip: 'Instantly gain 250 experience on all Forest quadrant nodes.',
		icon: 'glyphicon-thumbs-up',
		apply: function() {
			gainExp(player.currencies.forest, 250);
			gainExp(player.currencies.wood, 250);
			gainExp(player.currencies.rubber, 250);
		}
	},
	warehouseConveyers: {
		id: 'warehouseConveyers',
		name: 'Warehouse Conveyers',
		cost: 187000,
		tooltip: 'Functional Sales now transports 60% of their supply per cycle.',
		icon: 'glyphicon-share-alt',
		apply: function() {
			player.currencies.sales2.transportRate = 60;
		}
	},
	butcherShop: {
		id: 'butcherShop',
		name: 'Butcher Shop',
		cost: 191000,
		tooltip: 'Increase the base unit price of Livestock by $5.00.',
		icon: 'glyphicon-home',
		apply: function() {
			player.currencies.livestock.baseUnitPrice += 5.00;
			recalculateUnitPrice(player.currencies.livestock);
		}
	},
	commodityMastery2: {
		id: 'commodityMastery2',
		name: 'Commodity Mastery #2',
		cost: 250000,
		tooltip: 'Commodity Sales now sells 70% of their supply per cycle.',
		icon: 'glyphicon-barcode',
		apply: function() {
			player.currencies.sales1.sellRate = 70;
		}
	},
	passiveIncomeStream: {
		id: 'passiveIncomeStream',
		name: 'Passive Income Stream',
		cost: 50000,
		tooltip: 'You passively generate $250.00 every 5 seconds.',
		icon: 'glyphicon-adjust',
		apply: function() {
			player.passiveMoney += 250.00;
		}
	},
	pneumaticTools: {
		id: 'pneumaticTools',
		name: 'Pneumatic Tools',
		cost: 375000,
		tooltip: 'Increases the speed of your Aqua Tools by 33%.',
		icon: 'glyphicon-transfer',
		apply: function() {
			player.currencies.tools3.speed = 100;
		}
	},
	advisoryBoard4: {
		id: 'advisoryBoard4',
		name: 'Advisory Board #4',
		cost: 150000,
		tooltip: 'Instantly gain 250 experience on all Ocean quadrant nodes.',
		icon: 'glyphicon-thumbs-up',
		apply: function() {
			gainExp(player.currencies.ocean, 250);
			gainExp(player.currencies.oil, 250);
			gainExp(player.currencies.coral, 250);
		}
	},
	coralGarden: {
		id: 'coralGarden',
		name: 'Coral Garden',
		cost: 90000,
		tooltip: 'Increases the supply limit of Coral by 50.',
		icon: 'glyphicon-fire',
		apply: function() {
			player.currencies.coral.maxSupply += 50;
		}
	},
	supplyRouteOptimization: {
		id: 'supplyRouteOptimization',
		name: 'Supply Route Optimization',
		cost: 500000,
		tooltip: 'Commodity Sales now transports 70% of their supply per cycle.',
		icon: 'glyphicon-barcode',
		apply: function() {
			player.currencies.sales1.transportRate = 70;
		}
	},
	seedSpreaders: {
		id: 'seedSpreaders',
		name: 'Seed Spreaders',
		cost: 650000,
		tooltip: 'Increase the base unit price of Food by $1.25.',
		icon: 'glyphicon-unchecked',
		apply: function() {
			player.currencies.food.baseUnitPrice += 1.25;
			recalculateUnitPrice(player.currencies.food);
		}
	},
	cutToolSynergy: {
		id: 'cutToolSynergy',
		name: 'Cut Tool Synergy',
		cost: 1000000,
		tooltip: 'For every other tool at 80%+ supply, your workers create +1 Cut Tool.',
		icon: 'glyphicon-refresh',
		apply: function() {
			player.currencies.tools1.rampCurrencies = ['tools2', 'tools3', 'tools4'];
		}
	},
	rareJewelrySupply: {
		id: 'rareJewelrySupply',
		name: 'Rare Jewelry Supply',
		cost: 1200000,
		tooltip: 'Increase the base unit price of Coral by $5.50.',
		icon: 'glyphicon-fire',
		apply: function() {
			player.currencies.coral.baseUnitPrice += 5.50;
			recalculateUnitPrice(player.currencies.coral);
		}
	},
	durableFlooring: {
		id: 'durableFlooring',
		name: 'Durable Flooring',
		cost: 1400000,
		tooltip: 'Increase the base unit price of Rubber by $2.10.',
		icon: 'glyphicon-unchecked',
		apply: function() {
			player.currencies.rubber.baseUnitPrice += 2.10;
			recalculateUnitPrice(player.currencies.rubber);
		}
	},
	atvs: {
		id: 'atvs',
		name: 'ATVs',
		cost: 1500000,
		tooltip: 'Increases the speed of Forest by 50%.',
		icon: 'glyphicon-remove-sign',
		apply: function() {
			player.currencies.forest.speed = Math.round(player.currencies.forest.speed * 1.5);
		}
	},
	continentalSales: {
		id: 'continentalSales',
		name: 'Continental Sales',
		cost: 1800000,
		tooltip: 'Increases your Sales Multiplier by 1.00x.',
		icon: 'glyphicon-tags',
		apply: function() {
			player.rating = addRoundedCurrencyNum(player.rating, 1.00);
		}
	},
	aquaToolSynergy: {
		id: 'aquaToolSynergy',
		name: 'Aqua Tool Synergy',
		cost: 2000000,
		tooltip: 'For every other tool at 80%+ supply, your workers create +1 Aqua Tool.',
		icon: 'glyphicon-refresh',
		apply: function() {
			player.currencies.tools3.rampCurrencies = ['tools1', 'tools2', 'tools4'];
		}
	},
	advisoryBoard5: {
		id: 'advisoryBoard5',
		name: 'Advisory Board #5',
		cost: 270000,
		tooltip: 'Instantly gain 400 experience on all Mountain quadrant nodes.',
		icon: 'glyphicon-thumbs-up',
		apply: function() {
			gainExp(player.currencies.mountain, 400);
			gainExp(player.currencies.ore, 400);
			gainExp(player.currencies.stone, 400);
		}
	},
	functionalMastery2: {
		id: 'functionalMastery2',
		name: 'Functional Mastery #2',
		cost: 2500000,
		tooltip: 'Functional Sales now sells 70% of their supply per cycle.',
		icon: 'glyphicon-barcode',
		apply: function() {
			player.currencies.sales2.sellRate = 70;
		}
	},
	internationalShipping: {
		id: 'internationalShipping',
		name: 'International Shipping',
		cost: 2800000,
		tooltip: 'Commodity Sales now transports 75% of their supply per cycle.',
		icon: 'glyphicon-barcode',
		apply: function() {
			player.currencies.sales1.transportRate = 75;
		}
	},
	precisionSmelting: {
		id: 'precisionSmelting',
		name: 'Precision Smelting',
		cost: 2900000,
		tooltip: 'Increase the base unit price of Ore by $3.80.',
		icon: 'glyphicon-unchecked',
		apply: function() {
			player.currencies.ore.baseUnitPrice += 3.80;
			recalculateUnitPrice(player.currencies.ore);
		}
	},
	motoToolSynergy: {
		id: 'motoToolSynergy',
		name: 'Moto Tool Synergy',
		cost: 3000000,
		tooltip: 'For every other tool at 80%+ supply, your workers create +1 Moto Tool.',
		icon: 'glyphicon-refresh',
		apply: function() {
			player.currencies.tools2.rampCurrencies = ['tools1', 'tools3', 'tools4'];
		}
	},
	investmentMarket: {
		id: 'investmentMarket',
		name: 'Investment Market',
		cost: 350000,
		tooltip: 'You passively earn $350.00 every 5 seconds.',
		icon: 'glyphicon-list-alt',
		apply: function() {
			player.passiveMoney += 350;
		}
	},
	largeBinCarts: {
		id: 'largeBinCarts',
		name: 'Large Bin Carts',
		cost: 3250000,
		tooltip: 'Increases the supply limit of Mountain by 25, and unlock another synergy bonus at 40+ supply.',
		icon: 'glyphicon-compressed',
		apply: function() {
			player.currencies.mountain.maxSupply += 25;
		}
	},
	outsourcing: {
		id: 'outsourcing',
		name: 'Outsourcing',
		cost: 3500000,
		tooltip: 'Increases your global speed multiplier by 100%, but lowers the unit price of all resources by 30%.',
		icon: 'glyphicon-globe',
		apply: function() {
			player.globalSpeedMultiplier += 1.0;
			_.each(player.currencies, function(currency) {
				currency.baseUnitPrice *= 0.7;
				recalculateUnitPrice(currency);
			});
		}
	},
	globalFreight: {
		id: 'globalFreight',
		name: 'Global Freight',
		cost: 3750000,
		tooltip: 'Functional Sales now transports 75% of their supply per cycle.',
		icon: 'glyphicon-retweet',
		apply: function() {
			player.currencies.sales2.transportRate = 75;
		}
	},
	heatToolSynergy: {
		id: 'heatToolSynergy',
		name: 'Heat Tool Synergy',
		cost: 4000000,
		tooltip: 'For every other tool at 80%+ supply, your workers create +1 Heat Tool.',
		icon: 'glyphicon-refresh',
		apply: function() {
			player.currencies.tools4.rampCurrencies = ['tools1', 'tools2', 'tools3'];
		}
	},
	largeCapacityBarges: {
		id: 'largeCapacityBarges',
		name: 'Large Capacity Barges',
		cost: 4250000,
		tooltip: 'Increases the speed of Ocean by 100%.',
		icon: 'glyphicon-remove-sign',
		apply: function() {
			player.currencies.ocean.speed *= 2;
		}
	},
	commodityMastery3: {
		id: 'commodityMastery3',
		name: 'Commodity Mastery #3',
		cost: 4500000,
		tooltip: 'Commodity Sales now sells 75% of their supply per cycle.',
		icon: 'glyphicon-barcode',
		apply: function() {
			player.currencies.sales1.sellRate = 75;
		}
	},
	unmannedVehicles: {
		id: 'unmannedVehicles',
		name: 'Unmanned Vehicles',
		cost: 4750000,
		tooltip: 'Increases the speed of Prairie by 50%.',
		icon: 'glyphicon-remove-sign',
		apply: function() {
			player.currencies.prairie.speed = Math.round(player.currencies.prairie.speed * 1.5);
		}
	},
	globalSales: {
		id: 'globalSales',
		name: 'Global Sales',
		cost: 5000000,
		tooltip: 'Increases your Sales Multiplier by 1.00x.',
		icon: 'glyphicon-globe',
		apply: function() {
			player.rating = addRoundedCurrencyNum(player.rating, 1.00);
		}
	},
	deepSeaExploration: {
		id: 'deepSeaExploration',
		name: 'Deep Sea Exploration',
		cost: 6250000,
		tooltip: 'Increases the supply limit of Ocean by 25, and unlock another synergy bonus at 40+ supply.',
		icon: 'glyphicon-compressed',
		apply: function() {
			player.currencies.ocean.maxSupply += 25;
		}
	},
	functionalMastery3: {
		id: 'functionalMastery3',
		name: 'Functional Mastery #3',
		cost: 7500000,
		tooltip: 'Functional Sales now sells 75% of their supply per cycle.',
		icon: 'glyphicon-barcode',
		apply: function() {
			player.currencies.sales2.sellRate = 75;
		}
	},
	channelBlasting: {
		id: 'channelBlasting',
		name: 'Channel Blasting',
		cost: 9000000,
		tooltip: 'Increases the speed of Mountain by 50%.',
		icon: 'glyphicon-remove-sign',
		apply: function() {
			player.currencies.mountain.speed = Math.round(player.currencies.mountain.speed * 1.5);
		}
	},
	widespreadDemand: {
		id: 'widespreadDemand',
		name: 'Widespread Demand',
		cost: 10000000,
		tooltip: 'Increases the base unit price of all resources by 50%.',
		icon: 'glyphicon-fire',
		apply: function() {
			_.each(player.currencies, function(currency) {
				currency.baseUnitPrice *= 1.5;
				recalculateUnitPrice(currency);
			});
		}
	},
};

var player = {
	version: "1.1.0",
	currencies: {
		money: {
		    name: 'money',
			supply: 0.00,
			progress: 0,
			power: 1,
			quantity: 1,
			multiplier: 1.0,
			workers: 0
		}
	},
	click: {
		power: 1,
		throttle: 0,
		throttlePerSecond: 5
	},
	passiveMoney: 0.00,
	workers: 0,
	workersUsed: 0,
	workerCost: 15,
	workerCostFactor: 1.15,
	workerCostDecrement: 0.99912,
	rating: 1.00,
	unlocks: {},
	upgrades: {},
	
	globalSpeedMultiplier: 1.00,
	globalSupplyMultiplier: 1.00,
	
	ticks: 0,
	totalTicks: 0
};

var currentGameLoop = null;
var gameLoopCounter = 0;

var model = null;
var currencies = ['tools1', 'wood', 'forest', 'rubber', 'tools2', 'food', 'prairie', 'livestock', 'tools3', 'oil', 'ocean', 'coral', 'tools4', 'ore', 'mountain', 'stone', 'sales1', 'sales2'];
var soldCurrencies = ['wood', 'rubber', 'food', 'livestock', 'oil', 'coral', 'ore', 'stone'];
var toolCurrencies = ['tools1', 'tools2', 'tools3', 'tools4'];
var salesCurrencies = ['sales1', 'sales2'];
var biomeCurrencies = ['forest', 'prairie', 'ocean', 'mountain'];

function initialize() {

	model = new Iugo({
		player: player
	});

	_.each(currencies, function(currency) {
		player.currencies[currency] = {
			level: 1,
			exp: 0,
			exptnl: 40,

			supply: 0,
			maxSupply: 100,
			totalSupplyEarned: 0,
			workers: 0,
			progress: 0,

			power: 1,
			speed: 0,
			quantity: 1,
			multiplier: 1.0,

			baseUnitPrice: 2.00,
			unitPrice: 2.00,
			lastSale: "0.00",
			lastGainMultiplier: 1,
			supplyCost: 0,

			name: currency,
			computedSpeed: 0,
			progressBarFrozen: false,
			isSales: false,
			isTools: false,
			domBar: "#" + currency + "Bar",
			domBadge: "#" + currency + "Badge",
			domSupplyBar: "#" + currency + "SupplyBar",
			domExpBar: "#" + currency + "ExpBar",
			domValue: "#" + currency + "Value"
		};
		
		var curr = player.currencies[currency];
		
		switch(currency) {
			case 'tools1':
				curr.maxSupply = 25;
				curr.isTools = true;
				curr.speed = 100;
				break;
			case 'tools2':
				curr.maxSupply = 25;
				curr.isTools = true;
				curr.speed = 200;
				break;
			case 'tools3':
				curr.maxSupply = 25;
				curr.isTools = true;
				curr.speed = 75;
				break;
			case 'tools4':
				curr.maxSupply = 25;
				curr.isTools = true;
				curr.speed = 150;
				break;

			case 'sales1':
				curr.isSales = true;
				curr.speed = 25;
				curr.sellCurrencies = ['wood', 'rubber', 'ore', 'stone'];
				curr.sellRate = 50;
				curr.transportRate = 50;
				break;
			case 'sales2':
				curr.isSales = true;
				curr.speed = 25;
				curr.sellCurrencies = ['food', 'livestock', 'coral', 'oil'];
				curr.sellRate = 50;
				curr.transportRate = 50;
				break;
			
			case 'wood':
				curr.speed = 200;
				curr.unitPrice = 2;
				curr.bonusCurrencies = ['tools1', 'forest'];
				curr.sales = 'sales1';
				break;
			case 'forest':
				curr.speed = 200;
				curr.maxSupply = 25;
				break;
			case 'rubber':
				curr.speed = 150;
				curr.unitPrice = 2.5;
				curr.bonusCurrencies = ['tools2', 'forest'];
				curr.sales = 'sales1';
				break;

			case 'stone':
				curr.speed = 75;
				curr.unitPrice = 3.5;
				curr.bonusCurrencies = ['tools1', 'mountain'];
				curr.sales = 'sales1';
				break;
			case 'mountain':
				curr.speed = 100;
				curr.maxSupply = 25;
				break;
			case 'ore':
				curr.speed = 50;
				curr.unitPrice = 12;
				curr.bonusCurrencies = ['tools4', 'mountain'];
				curr.sales = 'sales1';
				break;

			case 'food':
				curr.speed = 150;
				curr.unitPrice = 3;
				curr.bonusCurrencies = ['tools2', 'prairie'];
				curr.sales = 'sales2';
				break;
			case 'prairie':
				curr.speed = 100;
				curr.maxSupply = 25;
				break;
			case 'livestock':
				curr.speed = 25;
				curr.unitPrice = 12;
				curr.bonusCurrencies = ['tools3', 'prairie'];
				curr.sales = 'sales2';
				break;

			case 'coral':
				curr.speed = 50;
				curr.unitPrice = 8;
				curr.bonusCurrencies = ['tools4', 'ocean'];
				curr.sales = 'sales2';
				break;
			case 'ocean':
				curr.speed = 25;
				curr.maxSupply = 25;
				break;
			case 'oil':
				curr.speed = 5;
				curr.unitPrice = 50;
				curr.bonusCurrencies = ['tools3', 'ocean'];
				curr.sales = 'sales2';
				break;

		}
		
		curr.baseUnitPrice = curr.unitPrice;

		$("#" + currency + "AddWorker").click(function() {
			addWorker(currency);
		});
		$("#" + currency + "RemoveWorker").click(function() {
			removeWorker(currency);
		});
	});
	
	$('[data-toggle="tooltip"]').tooltip({'placement': 'bottom'});
	checkUnlocks();
	updateUpgradesUI();

	$('#clickAuto').click(clickAuto);
	$('#clickMoney').click(clickMoney);
	$('#clickHireWorker').click(hireWorker);
	$('#nightMode').click(toggleNightMode);
	$('#workMode').click(toggleWorkMode);

	$('#saveGame').click(saveGameToStorage);
	$('#loadGame').click(loadGameFromStorage);
	$('#saveGameTextExport').click(saveGameTextExport);
	$('#loadTextSaveData').click(loadGameFromText);
	$('#selectSaveTextData').click(selectSaveTextData);
	$('#resetGame').click(resetGameConfirm);

	_.each(player.currencies, function(currency) {
		$(currency.domBar).click(function() { clickProgressBar(currency.name); });
		$('#' + currency.name + 'BarWrapper').click(function() { clickProgressBar(currency.name); });
	});

	_.each([1,2,3,4,5], function(count) {
		$('#upgrade' + count + 'Button').click(function() { buyUpgrade(count); });
	});
	$('#superDevMode').click(function() {
		$('div').removeClass('invisible');
		clickAuto();
	});
	
	window.onbeforeunload = function(evt) {
		if(!game.isResettingGame) {
			saveGameToStorage();
			console.log('Game saved successfully?');
		}
	};
	
	loadGameFromStorage();
	
	currentGameLoop = setInterval(gameLoop, 100);

	// Hack to enable the dev button only on dev servers
	var url = window.location.href;
	if(url.indexOf('polatrite.c9') > -1) {
		game.isDebugServer = true;
		$('#superDevMode').removeClass('hidden');
		$('#saveGame').removeClass('hidden');
		$('#loadGame').removeClass('hidden');
	}
}

function rot13(s)
{
	return (s ? s : this).split('').map(function(_)
	{
		if (!_.match(/[A-za-z]/)) return _;
		var c = Math.floor(_.charCodeAt(0) / 97);
		var k = (_.toLowerCase().charCodeAt(0) - 83) % 26 || 26;
		return String.fromCharCode(k + ((c == 0) ? 64 : 96));
	}).join('');
}

function resetGameConfirm() {
	var confirm = window.confirm("Are you sure you want to reset your game? This will delete all your data!");
	if(confirm == true) {
		localStorage.removeItem('player');
		game.isResettingGame = true;
		location.reload(true);
	}
}

function selectSaveTextData() {
	var $elem = $('#saveTextData');
	$elem.focus();
	$elem.select();
}

function saveGameTextExport() {
	var playerStr = getSaveGameData();
	playerStr = rot13(btoa(playerStr));

	var $elem = $('#saveTextData');
	$elem.val(playerStr);

	$('#saveLoadModal').on('shown.bs.modal', selectSaveTextData);
	
	$('#loadTextData').val('');
	$('#loadTextDataFailedAlert').addClass('hidden');
	
	console.log('Player save data added to text output');
}

function saveGameToStorage() {
	var playerStr = getSaveGameData();

	localStorage.setItem('player', playerStr);
}

function getSaveGameData() {
	var curatedPlayer = {
		version: player.version,
		currencies: {},
		click: {
		    power: player.click.power,
		    throttle: player.click.throttle,
		    throttlePerSecond: player.click.throttlePerSecond
		},
		passiveMoney: player.passiveMoney,
		workers: player.workers,
		workersUsed: player.workersUsed,
		workerCost: player.workerCost,
		workerCostFactor: player.workerCostFactor,
		workerCostDecrement: player.workerCostDecrement,
		rating: player.rating,
		
		unlocks: player.unlocks,
		upgrades: {},
		
		totalTicks: player.totalTicks
	};
	
	_.each(player.currencies, function(currency) {
		curatedPlayer.currencies[currency.name] = {
			level: currency.level,
			exp: currency.exp,
			exptnl: currency.exptnl,
			
			supply: currency.supply,
			maxSupply: currency.maxSupply,
			totalSupplyEarned: currency.totalSupplyEarned,
			workers: currency.workers,
			progress: currency.progress,

			power: currency.power,
			speed: currency.speed,
			quantity: currency.quantity,
			multiplier: currency.multiplier,

			baseUnitPrice: currency.baseUnitPrice,
			unitPrice: currency.unitPrice,
			supplyCost: currency.supplyCost,
			
			name: currency.name
		}
	});

    _.each(player.upgrades, function(upgrade) {
        curatedPlayer.upgrades[upgrade.id] = true;
    });

	return JSON.stringify(curatedPlayer);
}

function loadGameFromText() {
	var playerStr = $('#loadTextData').val();
	try {
		playerStr = atob(rot13(playerStr));
		parseLoadData(playerStr);
	}
	catch (e) {
		console.log('Failed to load data from text');
		console.log(e);
		$('#loadTextDataFailedAlert').removeClass('hidden');
		return;
	}

	$('#saveLoadModal').modal('hide');
}

function loadGameFromStorage() {
	var playerStr = localStorage.getItem('player');
	parseLoadData(playerStr);
}

function parseLoadData(playerStr) {
	if(playerStr == null) {
		return;
	}
	
	var playerObj = JSON.parse(playerStr);
	
	$.extend(true, player, playerObj);
	
	_.each(player.upgrades, function(value, upgradeId) {
		player.upgrades[upgradeId] = upgrades[upgradeId];
		delete upgrades[upgradeId];
	});
	
	_.each(player.unlocks, function(value, unlockId) {
	    applyUnlock(unlockId);
	});
	
	_.each(player.currencies, function(currency) {
		updateUI(currency);	
		updateGainMultiplier(currency, currency.lastGainMultiplier);
	});
	updateUpgradesUI();
}




function recalculateUnitPrice(currency) {
	currency.unitPrice = getRoundedCurrencyNum(currency.baseUnitPrice + (currency.baseUnitPrice * 0.25 * (currency.level-1)));
}


function buyUpgrade(slot) {
	var $elem = $('#upgrade' + slot);
	var upgrade = $elem.data('upgrade');
	console.log(upgrade);
	
	if(player.currencies.money.supply >= upgrade.cost) {
		addMoney(upgrade.cost * -1);

		player.upgrades[upgrade.id] = upgrade;
		delete upgrades[upgrade.id];
		
		upgrade.apply();
		
		updateUpgradesUI();
	}
}


function updateUpgradesUI() {
	var count = 1;
	_.each(upgrades, function(upgrade) {
		if(count > 5) { return; }
		console.log(upgrade);

		var $elem;
		$elem = $('#upgrade' + count);
		$elem.attr('data-original-title', upgrade.tooltip);
		$elem.data('upgrade', upgrade);
		
		$('#upgrade' + count + 'Label').html(upgrade.name);
		
		$elem = $('#upgrade' + count + 'Icon');
		$elem.removeClass();
		$elem.addClass('glyphicon ' + upgrade.icon);
		
		// TODO: Format as currency
		$('#upgrade' + count + 'Button').html('$' + upgrade.cost);
		

		count++;
	});
	
	while(count <= 5) {
		var $elem;
		$elem = $('#upgrade' + count);
		$elem.attr('data-original-title', "You bought it all, you're quite the tycoon!");
		$elem.data('upgrade', null);
		
		$('#upgrade' + count + 'Label').html('Sold Out');
		
		$elem = $('#upgrade' + count + 'Icon');
		$elem.removeClass();
		$elem.addClass('glyphicon glyphicon-ok');
		
		$('#upgrade' + count + 'Button').addClass('invisible');
		
		count++;
	}
}






var autoClicker = null;
function clickAuto() {
	if(autoClicker) {
		clearInterval(autoClicker);
	}
	autoClicker = setInterval(clickMoney, 250);
}

function progressCurrency(currency, manual) {
	currency.computedSpeed = currency.workers * currency.speed * player.globalSpeedMultiplier;
	if(manual) {
		currency.progress += currency.speed * player.globalSpeedMultiplier / 100;
	}
	else {
		currency.progress += currency.computedSpeed / 100;
	}
	
	if(currency.computedSpeed >= 5000 && currency.progressBarFrozen == false) {
		var $elem = $(currency.domBar);
		$elem.attr("aria-valuenow", 100);
		$elem.width("100%");
		currency.progressBarFrozen = true;
	}
	else if(currency.computedSpeed < 5000 && currency.progressBarFrozen == true) {
		currency.progressBarFrozen = false;
	}
}

function gainCurrency(currency) {
	while(currency.progress >= 100) {
		if(!currency.isSales && currency.supply >= currency.maxSupply) {
			currency.supply = currency.maxSupply;
			currency.progress = 100;
			break;
		}
		else {
			currency.progress -= 100;
			gainExp(currency, 1 * 1/player.globalSpeedMultiplier); // hack to allow exp rate to be the same no matter what the global speed multi is
			
			if(currency.isSales) {
				doSalesGain(currency);
			}
			else {
				doStandardGain(currency);
			}
		}
	}
}

function gainExp(currency, value) {
	currency.exp += value;
	while(currency.exp >= currency.exptnl) {
		currency.level += 1;
		if(currency.isSales) {
			currency.maxSupply += 10;
			player.rating = addRoundedCurrencyNum(player.rating, 0.10);
		}
		else {
			recalculateUnitPrice(currency);
			player.rating = addRoundedCurrencyNum(player.rating, 0.05);
		}
		currency.exp -= currency.exptnl;
		currency.exptnl = currency.exptnl * (1.1 + currency.speed/400);
	}
}

function doStandardGain(currency) {
	var calculatedSupply = currency.quantity * currency.power * currency.multiplier;
    var gainMultiplier = 1;	
	_.each(currency.bonusCurrencies, function(bonusCurrencyName) {
		var bonusCurr = player.currencies[bonusCurrencyName];
		if(bonusCurr.supply >= 20) {
			bonusCurr.supply -= 1;
			calculatedSupply *= 2;
			gainMultiplier *= 2;
		}
		if(bonusCurr.supply >= 40) {
			bonusCurr.supply -= 1;
			calculatedSupply *= 1.5;
			gainMultiplier *= 1.5;
		}
		if(bonusCurr.supply >= 1) {
			bonusCurr.supply -= 1;
			calculatedSupply *= 2;
			gainMultiplier *= 2;
		}
	});
	
	updateGainMultiplier(currency, gainMultiplier);
	
	_.each(currency.rampCurrencies, function(rampCurrencyName) {
		var rampCurr = player.currencies[rampCurrencyName];
		
		if((rampCurr.supply/rampCurr.maxSupply*100) >= 80) {
			calculatedSupply += 1;
		}
		if((rampCurr.supply/rampCurr.maxSupply*100) >= 10) {
			calculatedSupply += 1;
		}
	});
	
	calculatedSupply *= player.globalSupplyMultiplier;
	calculatedSupply = Math.round(Math.min(calculatedSupply, currency.maxSupply - currency.supply));
	
	console.log(currency.name + " gained " + calculatedSupply + " units");
	currency.supply += calculatedSupply;
	currency.totalSupplyEarned += calculatedSupply;
}

function doSalesGain(currency) {
	var soldSupply = 0;
	var soldCost = 0;
	
	soldSupply = currency.supply * currency.sellRate / 100;
	soldSupply = Math.round(soldSupply);
	if(soldSupply >= 1.00) {
		soldCost = getRoundedCurrency(currency.supplyCost * currency.sellRate / 100);

		currency.supply -= soldSupply;
		currency.supplyCost -= soldCost;
		
		soldCost = earnMoney(soldCost);
		currency.lastSale = getRoundedCurrency(soldCost);
		console.log(currency.name + " SOLD " + soldSupply + " units for $" + soldCost);
	}

	var transportedTotalSupply = 0;
	var transportedTotalCost = 0;
	_.each(currency.sellCurrencies, function(sellCurrencyName) {
		var sellCurr = player.currencies[sellCurrencyName];
		
		var transportedSupply = Math.round(Math.min(sellCurr.supply * currency.transportRate / 100, currency.maxSupply - currency.supply - transportedTotalSupply));
		
		if(transportedSupply >= 1) {
			var transportedCost = transportedSupply * sellCurr.unitPrice;
			sellCurr.supply -= transportedSupply;
			transportedTotalSupply += transportedSupply;
			transportedTotalCost += transportedCost;
			
			console.log(currency.name + " shipped " + transportedSupply + " units of " + sellCurr.name + " for $" + transportedCost);
		}
	});
	
	transportedTotalSupply = Math.round(transportedTotalSupply);
	if(transportedTotalSupply >= 1) {
		console.log(currency.name + " shipped " + transportedTotalSupply + " total units for $" + transportedTotalCost);
		currency.supply += transportedTotalSupply;
		currency.supplyCost += transportedTotalCost;
	}
}

function earnMoney(val) {
	val = parseFloat(val) * player.rating;
	addMoney(val);
	return val;
}

function addMoney(val) {
	var money = player.currencies.money;
	money.supply = parseFloat(money.supply/*.replace(/,/g, '')*/);
	money.supply += val;
	money.supply = getRoundedCurrency(money.supply)/*.commafy()*/;
	return val;
}

function clickProgressBar(currencyName) {
	if(player.click.throttle < player.click.throttlePerSecond) {
		progressCurrency(player.currencies[currencyName], true);
		player.click.throttle += 1;		
	}
}

function clickMoney() {
	if(player.click.throttle < player.click.throttlePerSecond) {
		addMoney(player.click.power);
		player.click.throttle += 1;
	}
}

function hireWorker() {
	var money = player.currencies.money;
	if(money.supply >= player.workerCost) {
		player.workers += 1;
		money.supply -= player.workerCost;
		player.workerCost = getNewCost(player.workerCost);
		money.supply = getRoundedCurrency(money.supply);
	}
}

function addWorker(currency) {
	if(player.workersUsed < player.workers) {
		player.currencies[currency].workers += 1;
		player.workersUsed += 1;
	}
}

function removeWorker(currency) {
	if(player.currencies[currency].workers > 0) {
		player.currencies[currency].workers -= 1;
		player.workersUsed -= 1;
	}
}

function getNewCost(cost) {
	player.workerCostFactor *= player.workerCostDecrement
	cost = cost * player.workerCostFactor;
	return Math.round(cost);
}

function updateGainMultiplier(currency, gainMultiplier) {
    if(gainMultiplier != currency.lastGainMultiplier) {
        var $elem = $(currency.domBadge);
        $elem.html(gainMultiplier + "x");
        $elem.removeClass();
        currency.lastGainMultiplier = gainMultiplier;
        
        if(gainMultiplier == 1) {
            $elem.addClass('label label-default pull-right');
        }
        else if(gainMultiplier == 2) {
            $elem.addClass('label label-primary pull-right');
        }
        else if(gainMultiplier >= 3 && gainMultiplier <= 6) {
            $elem.addClass('label label-success pull-right');
        }
        else if(gainMultiplier >= 7) {
            $elem.addClass('label label-info pull-right');
        }
    }
}

function updateUI(currency) {
	var val = 0;
	var $elem = null;
	if(currency.progressBarFrozen == false) {
		$elem = $(currency.domBar);
		$elem.attr("aria-valuenow", currency.progress);
		$elem.width(currency.progress + "%");
	}
	
	$elem = $(currency.domSupplyBar);
	val = currency.supply / currency.maxSupply * 100;
	$elem.attr("aria-valuenow", val);
	$elem.width(val + "%");
	
	$elem = $(currency.domExpBar);
	val = currency.exp / currency.exptnl * 100;
	$elem.attr("aria-valuenow", val);
	$elem.width(val + "%");
}

function gameLoop() {
	gameLoopCounter++;
	if(gameLoopCounter == 1) {
		_.each(player.currencies, function(currency) {
			progressCurrency(currency, false);
			gainCurrency(currency);
			if(player.ticks % 1 == 0) {
				updateUI(currency);
			}
		});

		// 200 milliseconds
		if(player.ticks % 2 == 0) {
			if(player.click.throttle > 0) {
				player.click.throttle -= 1;
			}
		}
		
		if(player.ticks % 50 == 0) {
			addMoney(player.passiveMoney);
		}
		
		// 2 seconds
		if(player.ticks % 20 == 0) {
			checkUnlocks();
		}
		
		// 20 seconds
		if(player.ticks % 200 == 0) {
			saveGameToStorage();
		}

		gameLoopCounter = 0;
		player.ticks++;
		player.totalTicks++;
	}
}

function applyUnlock(id) {
    switch(id) {
        case "words":
 			player.unlocks.words = true;
			$('#output').removeClass('invisible');
            break;
        case "sales1":
			player.unlocks.sales1 = true;
			$('#sales1Div').removeClass('invisible');
			$('#salesMultiplierPanel').removeClass('invisible');
            break;
        case "tools1":
			player.unlocks.tools1 = true;
			$('#tools1Div').removeClass('invisible');
            break;
        case "rubber":
			player.unlocks.rubber = true;
			$('#rubberDiv').removeClass('invisible');
            break;
        case "tools2":
			player.unlocks.tools2 = true;
			$('#tools2Div').removeClass('invisible');
            break;
        case "upgrades":
			player.unlocks.upgrades = true;
			$('#upgradePanel').removeClass('invisible');
            break;
        case "harvestmoon":
			player.unlocks.harvestmoon = true;
			$('#prairieDiv').removeClass('invisible');
			$('#foodDiv').removeClass('invisible');
            break;
        case "sales2":
			player.unlocks.sales2 = true;
			$('#sales2Div').removeClass('invisible');
            break;
        case "stockrock":
			player.unlocks.stockrock = true;
			$('#livestockDiv').removeClass('invisible');
			$('#stoneDiv').removeClass('invisible');
            break;
        case "tools3":
			player.unlocks.tools3 = true;
			$('#tools3Div').removeClass('invisible');
            break;
        case "oceanquad":
			player.unlocks.oceanquad = true;
			$('#oceanDiv').removeClass('invisible');
			$('#coralDiv').removeClass('invisible');
            break;
        case "tools4":
			player.unlocks.tools4 = true;
			$('#mountainDiv').removeClass('invisible');
			$('#tools4Div').removeClass('invisible');
            break;
        case "bigmoney":
			player.unlocks.bigmoney = true;
			$('#oilDiv').removeClass('invisible');
			$('#oreDiv').removeClass('invisible');
            break;
    }
}

function checkUnlocks() {
	if(!("words" in player.unlocks)) {
		if(player.currencies.wood.supply >= 10) {
		    applyUnlock("words");
		}
	}
	if(!("sales1" in player.unlocks)) {
		if(player.currencies.wood.supply >= 30) {
		    applyUnlock("sales1");
		}
	}
	if(!("tools1" in player.unlocks)) {
		if(player.currencies.sales1.supply > 0 && player.currencies.sales1.progress >= 80) {
		    applyUnlock("tools1");
		}
	}
	if(!("rubber" in player.unlocks)) {
		if(player.currencies.forest.level >= 3) {
		    applyUnlock("rubber");
		}
	}
	if(!("upgrades" in player.unlocks)) {
		if(player.rating >= 1.25) {
		    applyUnlock("upgrades");
		}
	}
	if(!("tools2" in player.unlocks)) {
		if(player.currencies.rubber.level >= 3) {
		    applyUnlock("tools2");
		}
	}
	if(!("harvestmoon" in player.unlocks)) {
		if(player.rating >= 1.40) {
		    applyUnlock("harvestmoon");
		}
	}
	if(!("sales2" in player.unlocks)) {
		if(player.currencies.food.supply >= 20) {
		    applyUnlock("sales2");
		}
	}
	if(!("stockrock" in player.unlocks)) {
		if(player.currencies.food.level >= 3) {
		    applyUnlock("stockrock");
		}
	}
	if(!("tools3" in player.unlocks)) {
		if(player.currencies.food.level >= 3) {
		    applyUnlock("tools3");
		}
	}
	if(!("oceanquad" in player.unlocks)) {
		if(player.rating >= 3.00) {
		    applyUnlock("oceanquad");
		}
	}
	if(!("tools4" in player.unlocks)) {
		if(player.rating >= 4.00) {
		    applyUnlock("tools4");
		}
	}
	if(!("bigmoney" in player.unlocks)) {
		if(player.rating >= 5.00) {
		    applyUnlock("bigmoney");
		}
	}
}

function toggleNightMode() {
    var $elem = $('body');
    
    if($elem.hasClass('night-theme')) {
	    $elem.removeClass('night-theme');
    }
    else {
	    $elem.addClass('night-theme');
    }
}

function toggleWorkMode() {
    var $elem = $('body');
    
    if($elem.hasClass('work-theme')) {
	    $('body').removeClass('work-theme');
    }
    else {
	    $('body').addClass('work-theme');
    }
}

String.prototype.commafy = function () {
	return this.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
		return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
	});
}

Number.prototype.commafy = function () {
	return String(this).commafy();
}

// TODO: Candidate for some refactoring. Should write some regex to optimize this so we don't parseFloat() multiple times in the same stack.
function getRoundedCurrency(value) {
	value = parseFloat(value);
	value = value.toFixed(2);
	return value;
}

function getRoundedCurrencyNum(value) {
	value = getRoundedCurrency(value);
	value = parseFloat(value);
	return value;
}

function addRoundedCurrencyNum(input, value) {
	input = getRoundedCurrencyNum(input);
	input += value;
	return getRoundedCurrency(input);
}
