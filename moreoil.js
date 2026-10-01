// 1. THE MAIN MIXTURE
elements.crude_oil = {
    color: "#14110f",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 800,
    density: 880,
    state: "liquid",
    tempHigh: 40,            // First boiling threshold
    stateHigh: "petroleum_gas"
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
    fireColor: "#0055ff"
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
    stateHigh: "gasoline_vapor"
};
elements.gasoline_vapor = {
    color: "#f2ebd5",
    behavior: behaviors.GAS,
    category: "gases",
    density: 3,
    burn: 100,
    burnTime: 5,
    tempLow: 119,
    stateLow: "gasoline_liquid"
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
    stateHigh: "kerosene_vapor"
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
    stateLow: "diesel_liquid"
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
    density: 1050
};
