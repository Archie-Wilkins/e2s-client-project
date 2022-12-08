class AssetObject{
    constructor(tempId, name, typeId, energyEfficiency, energyDemand, emissions){

        // Somehow validate length and type of these for the database input
        this.tempId = tempId;
        this.name = name;
        this.typeId = type;
        this.energyEfficiency = energyEfficiency;
        this.emissions = emissions;

    }

    getJsonFormat() {
        return {
            name: this.name,
            typeId: this.typeId,
            energyEfficiency: this.energyEfficiency,
            emissions: this.emissions
        }
    }


    // Getters and Setters

    getName() {
        return this.name;
    }

    getTypeId() {
        return this.typeId;
    }

    getEnergyEfficiency() {
        return this.energyEfficiency;
    }

    getEmissions() {
        return this.emissions;
    }

    setName(name) {
        this.name = name;
    }

    setTypeId(typeId) {
        this.typeId = typeId;
    }

    setEnergyEfficiency(energyEfficiency) {
        this.energyEfficiency = energyEfficiency;
    }


    setEmissions(emissions) {
        this.emissions = emissions;
    }
}