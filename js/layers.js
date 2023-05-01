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

    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        "milestones",
        "blank",
        "upgrades",
        "blank",
        "buyables",
        "blank",
        "grid",
        "blank",
        ["layer-proxy", ["pProxy",["grid"]]],
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
        rows: 5, // If these are dynamic make sure to have a max value as well!
        cols: 5,
        
        getStartData(id) {
            if (id == 202) { 
              return "empty"
            }
            else {
                return "empty"
            }
            
          },
        getUnlocked(id) { 
        return true
        },
        getCanClick(data, id) {
            return true
        },
        onClick(data, id) { 
            setGridData("p", id, punt)
            
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

addLayer("pProxy",{
    name: "proxy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "p", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1,
    color: "#4BDC13",
    

    startData() { return {
        unlocked: true,
        number: new Decimal(0),
    }},
    baseAmount() {return player.selez},

    tabFormat: [
        
        "main-display",
        "prestige-button",
        "blank",
        "milestones",
        "blank",
        "upgrades",
        "blank",
        "buyables",
        "blank",
        "grid",
    ],

selez: new String(),

    grid: {
        rows: 1, // If these are dynamic make sure to have a max value as well!
        cols: 5,
        getStartData(id) {
            if (id == 101) { 
                return "pappagallo"
              }
              if (id == 102) { 
                return "cane"
              }
              if (id == 103) { 
                return "gatto"
              }
              if (id == 104) { 
                return "topo"
              }
              if (id == 105) { 
                return "null"
              }
        },
        
        getUnlocked(id) { // Default
return true
        },
        getCanClick(data, id) {
            return true
        },
        onClick(data, id) { 
            punt = data
        },
        getDisplay(data, id) {
            return data 
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)

})
