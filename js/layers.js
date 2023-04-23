addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    midsection: [
        "grid"
      ],

    upgrades: {
        11: {
            title: "upgrade 1",
            description: "Double your point gain.",
            cost: new Decimal(1),
        },
        21: {
            title: "upgrade 2",
            description: "Double your point gain.",
            cost: new Decimal(2),

            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        13: {
            title: "upgrade 3",
            description: "boost your prestige points",
            cost: new Decimal(5),

        effect() {
            return player.points.add(1).pow(0.15)
        },
    },
    },

    grid: {
        rows: 4, // If these are dynamic make sure to have a max value as well!
        cols: 5,
        getStartData(id) {
            if (id == 203) { // row 2, column 3
              return "tree"
            }
            else {
              return "empty"
            }
          },
        getUnlocked(id) { // Default
var num
            for (var i = 1; i < cols+1; i = i+1){
                for (var j = 1; j < rows+1; j = j+1){
                var num = i*100+j
            if (id == 101)
            return true
                }
            }
        },
        getCanClick(data, id) {
            return true
        },
        onClick(data, id) { 
            player[this.layer].grid[id]++
        },
        getDisplay(data, id) {
            return data 
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
