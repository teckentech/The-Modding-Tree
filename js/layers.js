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
   update(diff){
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          const id = row*100 + col
  // setGridData('p', 202, getEffect(data, id))
  
  //   player['p'].grid[202] = player['p'].grid[202].gridEffect('p', 202).times(diff)
     setGridData('p', 202, getGridData('p', 101).plus(gridEffect('p', 101).times(diff)));  
    
        }
    }
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

 //   gridThings: {
   //     cane: {
   //       name: "Cane",
   //       description: "A cane"
   //     }
   //   },

    grid: {
        rows: 5, // If these are dynamic make sure to have a max value as well!
        cols: 5,
        
        getStartData(id) {
            const nome = ''
            let descrizione = ''
                valore = 0
            let funzione = ''

            arr = [nome, descrizione, valore, funzione]
            return arr
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
            
            p1 = data[0]+"\n"+data[2] 
            return p1
            
        },

        getEffect(data, id){
            if(data = "cane"){
           val = data[2] += 1
            return val
            }
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
                const nome = 'pappagallo'
             let descrizione = 'pappagallo descrizione'
                 valore = 0
             let funzione = 'pappagallo funzione'
                 const arr = [nome, descrizione, valore, funzione]

                 return [arr[0], arr[1], arr[2], arr[3]]
              }
              if (id == 102) { 
                let nome = "cane"
             let descrizione = "cane descrizione"
                const valore = 0
             let funzione = "cane funzione"
                 const arr = [nome, descrizione, valore, funzione]

                 return [arr[0], arr[1], arr[2], arr[3]]
              }
              if (id == 103) { 
                let nome = "gatto"
             let descrizione = "gatto descrizione"
             const valore = 0
             let funzione = "gatto funzione"
                 const arr = [nome, descrizione, valore, funzione]

                 return [arr[0], arr[1], arr[2], arr[3]]
              }
              if (id == 104) { 
                let nome = "topo"
             let descrizione = "topo descrizione"
             const valore = 0
             let funzione = "topo funzione"
                 const arr = [nome, descrizione, valore, funzione]

                 return [arr[0], arr[1], arr[2], arr[3]]
              }
              if (id == 105) { 
                let nome = ""
             let descrizione = ""
             const valore = null
             let funzione = ""
                 const arr = [nome, descrizione, valore, funzione]

                 return [arr[0], arr[1], arr[2], arr[3]]
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
            return data[0]
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)

})
