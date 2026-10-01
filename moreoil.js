// 1. THE MAIN MIXTURE
elements.crude_oil = {
    color: "#14110f",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 800,
    density: 880,
    state: "liquid",
};

elements.crude_oil.tick = function(pixel) {
    if (Math.random() < 0.1) {
        if (isEmpty(pixel.x, pixel.y - 1)) {
            if (pixel.temp >= 350) {
                createPixel("diesel_vapor", pixel.x, pixel.y - 1);
                changePixel(pixel, "heavy_fuel_oil");
            } else if (pixel.temp >= 200) {
                createPixel("kerosene_vapor", pixel.x, pixel.y - 1);
            } else if (pixel.temp >= 120) {
                createPixel("gasoline_vapor", pixel.x, pixel.y - 1);
            } else if (pixel.temp >= 40) {
                createPixel("petroleum_gas", pixel.x, pixel.y - 1);
            }
        }
    }
};

// 2. THE FRACTIONS (LIQUIDS & VAPORS)

// --- Petroleum Gas ---
elements.petroleum_gas = {
    color: "#f0f5da",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    burn: 100,
    burnTime: 20,
    fireColor: "#0055ff",
    reactions: {
        "oxygen": { elem1: "carbon_dioxide", elem2: "steam", chance: 0.2 },
        "chlorine": { elem1: "hydrochloric_acid", elem2: "plastic_slurry", chance: 0.05 } 
    }
};

// --- Gasoline ---
elements.gasoline_liquid = {
    color: "#e6c963",
    behavior: behaviors.LIQUID,
    category: "liquids",
    density: 740,
    burn: 95,
    burnTime: 40,
    fireColor: "#ff7700",
    tempHigh: 120,
    stateHigh: "gasoline_vapor",
    reactions: {
        "fire": { elem1: "explosion", chance: 0.1 }, 
        "acid": { elem1: "toxic_gas", elem2: "acid", chance: 0.02 }
    }
};
elements.gasoline_vapor = {
    color: "#f2ebd5",
    behavior: behaviors.GAS,
    category: "gases",
    density: 3,
    burn: 100,
    burnTime: 5,
    tempLow: 119,
    stateLow: "gasoline_liquid",
    reactions: {
        "fire": { elem1: "explosion", chance: 0.5 },
        "spark": { elem1: "explosion", chance: 0.8 } 
    }
};

// --- Kerosene ---
elements.kerosene_liquid = {
    color: "#b0d4de",
    behavior: behaviors.LIQUID,
    category: "liquids",
    density: 810,
    burn: 80,
    burnTime: 80, 
    tempHigh: 200,
    stateHigh: "kerosene_vapor",
    reactions: {
        "water": { elem1: "kerosene_liquid", elem2: "water", chance: 1, color1: "#b0d4de" } 
    }
};
elements.kerosene_vapor = {
    color: "#cbdbe0",
    behavior: behaviors.GAS,
    category: "gases",
    burn: 85,
    burnTime: 15,
    tempLow: 199,
    stateLow: "kerosene_liquid"
};

// --- Diesel ---
elements.diesel_liquid = {
    color: "#7fa682",
    behavior: behaviors.LIQUID,
    category: "liquids",
    density: 850,
    burn: 70,
    burnTime: 120, 
    tempHigh: 350,
    stateHigh: "diesel_vapor"
};
elements.diesel_vapor = {
    color: "#b0c2b2",
    behavior: behaviors.GAS,
    category: "gases",
    tempLow: 349,
    stateLow: "diesel_liquid",
    reactions: {
        "pressure": { elem1: "fire", chance: 0.2 } 
    }
};

// --- Heavy Fuel Oil & Bitumen ---
elements.heavy_fuel_oil = {
    color: "#24201c",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 3000,
    density: 920,
    burn: 40,
    burnTime: 300, 
    tempHigh: 450,
    stateHigh: "bitumen"
};
elements.bitumen = {
    color: "#0a0908",
    behavior: behaviors.MUD, 
    category: "solids",
    density: 1050,
    reactions: {
        "sand": { elem1: "asphalt_pavement", elem2: "asphalt_pavement", chance: 0.1 }, 
        "gravel": { elem1: "asphalt_pavement", elem2: "asphalt_pavement", chance: 0.1 }
    }
};

// 3. CHEMICAL DERIVATIVES

// --- Asphalt Pavement ---
elements.asphalt_pavement = {
    color: "#333333",
    behavior: behaviors.WALL, 
    category: "solids",
    tempHigh: 150,
    stateHigh: "bitumen" 
};

// --- Plastic Slurry & Solid Plastic ---
elements.plastic_slurry = {
    color: "#e1e6e1",
    behavior: behaviors.LIQUID,
    category: "liquids",
    density: 900,
    tempLow: 60,
    stateLow: "petroleum_plastic" 
};
elements.petroleum_plastic = {
    color: "#e1e6e1",
    behavior: behaviors.WALL,
    category: "solids",
    burn: 30,
    burnTime: 100,
    fireColor: "#ff0044",
    tempHigh: 180,
    stateHigh: "plastic_slurry",
    reactions: {
        "acid": { elem1: "toxic_gas", chance: 0.01 }
    }
};
