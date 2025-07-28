addLayer("p", {
    name: "first age", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ab821ab7",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "first age points", // Name of prestige currency
    baseResource: "experience", // Name of resource prestige is based on
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
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "1", description: "1: Reset for A1 points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Look around",
            description: "Unlock wood",
            cost: new Decimal(1),
        },

        12: {
            title: "get an idea",
            description: "Unlock crafting tab",
            cost: new Decimal(2),

            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },

            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
        },

        13: {
            title: "upgrade 3",
            description: "still thinking",
            cost: new Decimal(5),

            effect() {
                return player.points.add(1).pow(15)
            },

            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
        },
    },

    layerShown(){return true}
})
