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
    let spots = [[0,-1], [-1,-1], [1,-1], [-1,0]];
    let spot = spots[Math.floor(Math.random() * spots.length)];
    let tx = pixel.x + spot[0];
    let ty = pixel.y + spot[1];

    if (isEmpty(tx, ty) && Math.random() < 0.1) {
        if (pixel.temp >= 350) {
            createPixel("diesel_vapor", tx, ty);
            changePixel(pixel, "heavy_fuel_oil");
        } else if (pixel.temp >= 200) {
            createPixel("kerosene_vapor", tx, ty);
        } else if (pixel.temp >= 120) {
            createPixel("gasoline_vapor", tx, ty);
        } else if (pixel.temp >= 40) {
            createPixel("petroleum_gas", tx, ty);
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
    fireColor: "#0055ff", // Burns hot blue
    reactions: {
        "oxygen": { elem1: "carbon_dioxide", elem2: "steam", chance: 0.2 },
        "chlorine": { elem1: "hydrochloric_acid", elem2: "plastic_slurry", chance: 0.05 } // Making plastic precursors
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
        "fire": { elem1: "explosion", chance: 0.1 }, // Highly explosive vapor ignition
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
        "spark": { elem1: "explosion", chance: 0.8 } // Spark plugs ignite gasoline vapor
    }
};

// --- Kerosene ---
elements.kerosene_liquid = {
    color: "#b0d4de",
    behavior: behaviors.LIQUID,
    category: "liquids",
    density: 810,
    burn: 80,
    burnTime: 80, // Burns longer, steady lamp fuel
    tempHigh: 200,
    stateHigh: "kerosene_vapor",
    reactions: {
        "water": { elem1: "kerosene_liquid", elem2: "water", chance: 1, color1: "#b0d4de" } // Separates completely, floats
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
    burnTime: 120, // Slow, high energy output
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
        "pressure": { elem1: "fire", chance: 0.2 } // Diesel ignites under pressure alone (compression ignition)
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
    burnTime: 300, // Very slow burning
    tempHigh: 450,
    stateHigh: "bitumen"
};
elements.bitumen = {
    color: "#0a0908",
    behavior: behaviors.MUD, // Slowly oozes like thick asphalt
    category: "solids",
    density: 1050,
    reactions: {
        "sand": { elem1: "asphalt_pavement", elem2: "asphalt_pavement", chance: 0.1 }, // Combine with sand to pave roads
        "gravel": { elem1: "asphalt_pavement", elem2: "asphalt_pavement", chance: 0.1 }
    }
};

// 3. CHEMICAL DERIVATIVES (BONUS NEW REACTION PRODUCTS)

// --- Asphalt Pavement ---
elements.asphalt_pavement = {
    color: "#333333",
    behavior: behaviors.WALL, // Hardened durable floor
    category: "solids",
    tempHigh: 150,
    stateHigh: "bitumen" // Melts back into hot sludge
};

// --- Plastic Slurry & Solid Plastic ---
elements.plastic_slurry = {
    color: "#e1e6e1",
    behavior: behaviors.LIQUID,
    category: "liquids",
    density: 900,
    tempLow: 60,
    stateLow: "petroleum_plastic" // hardens when cooled
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
