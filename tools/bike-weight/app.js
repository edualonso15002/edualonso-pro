const DATA_PATHS = {
  frameset: {
    Specialized: "/data/frameset/specialized.json",
    Cannondale: "/data/frameset/cannondale.json",
    Canyon: "/data/frameset/canyon.json",
    Trek: "/data/frameset/trek.json",
    Giant: "/data/frameset/giant.json",
    Scott: "/data/frameset/scott.json",
    Orbea: "/data/frameset/orbea.json",
    BMC: "/data/frameset/bmc.json",
    "Cervélo": "/data/frameset/cervelo.json",
    Colnago: "/data/frameset/colnago.json",
    Pinarello: "/data/frameset/pinarello.json",
    "Argon 18": "/data/frameset/argon-18.json",
    BH: "/data/frameset/bh.json",
    Bianchi: "/data/frameset/bianchi.json",
    Boardman: "/data/frameset/boardman.json",
    BULLS: "/data/frameset/bulls.json",
    CUBE: "/data/frameset/cube.json",
    Devinci: "/data/frameset/devinci.json",
    Factor: "/data/frameset/factor.json",
    Felt: "/data/frameset/felt.json",
    FOCUS: "/data/frameset/focus.json",
    GHOST: "/data/frameset/ghost.json",
    GT: "/data/frameset/gt.json",
    Ibis: "/data/frameset/ibis.json",
    Kona: "/data/frameset/kona.json",
    Lapierre: "/data/frameset/lapierre.json",
    LOOK: "/data/frameset/look.json",
    Marin: "/data/frameset/marin.json",
    Merida: "/data/frameset/merida.json",
    Niner: "/data/frameset/niner.json",
    Norco: "/data/frameset/norco.json",
    Pivot: "/data/frameset/pivot.json",
    Radon: "/data/frameset/radon.json",
    Ridley: "/data/frameset/ridley.json",
    "Rocky Mountain": "/data/frameset/rocky-mountain.json",
    ROSE: "/data/frameset/rose.json",
    "Santa Cruz": "/data/frameset/santa-cruz.json",
    Stevens: "/data/frameset/stevens.json",
    TIME: "/data/frameset/time.json",
    Wilier: "/data/frameset/wilier.json"
  },

  wheels: {
    "DT Swiss": "/data/wheels/dt-swiss.json",
    Zipp: "/data/wheels/zipp.json",
    ENVE: "/data/wheels/enve.json",
    HUNT: "/data/wheels/hunt.json",
    Mavic: "/data/wheels/mavic.json",
    Fulcrum: "/data/wheels/fulcrum.json",
    Campagnolo: "/data/wheels/campagnolo.json",
    Reserve: "/data/wheels/reserve.json",
    Shimano: "/data/wheels/shimano.json",
    Vision: "/data/wheels/vision.json",
    CADEX: "/data/wheels/cadex.json",
    Giant: "/data/wheels/giant.json",
    Scope: "/data/wheels/scope.json"
  },

  cockpit: {
    PRO: "/data/cockpit/pro.json",
    "3T": "/data/cockpit/3t.json",
    Deda: "/data/cockpit/deda.json",
    FSA: "/data/cockpit/fsa.json",
    Zipp: "/data/cockpit/zipp.json",
    ENVE: "/data/cockpit/enve.json",
    Ritchey: "/data/cockpit/ritchey.json",
    Easton: "/data/cockpit/easton.json",
    Specialized: "/data/cockpit/specialized.json",
    Giant: "/data/cockpit/giant.json",
    Bontrager: "/data/cockpit/bontrager.json",
    Syncros: "/data/cockpit/syncros.json",
    Canyon: "/data/cockpit/canyon.json"
  },

  saddles: {
    PRO: "/data/saddles/pro.json",
    Fizik: "/data/saddles/fizik.json",
    Specialized: "/data/saddles/specialized.json",
    "Selle Italia": "/data/saddles/selle-italia.json",
    Prologo: "/data/saddles/prologo.json",
    "Selle San Marco": "/data/saddles/selle-san-marco.json",
    WTB: "/data/saddles/wtb.json",
    SMP: "/data/saddles/smp.json",
    ISM: "/data/saddles/ism.json",
    Bontrager: "/data/saddles/bontrager.json",
    Giant: "/data/saddles/giant.json"
  },

  finishing: {
    Core: "/data/finishing/core.json",
    Continental: "/data/finishing/continental.json",
    Schwalbe: "/data/finishing/schwalbe.json",
    Vittoria: "/data/finishing/vittoria.json",
    "3T": "/data/finishing/3t.json",
    ENVE: "/data/finishing/enve.json",
    Ritchey: "/data/finishing/ritchey.json",
    Easton: "/data/finishing/easton.json",
    Zipp: "/data/finishing/zipp.json",
    Deda: "/data/finishing/deda.json",
    FSA: "/data/finishing/fsa.json",
    Specialized: "/data/finishing/specialized.json",
    Canyon: "/data/finishing/canyon.json",
    BMC: "/data/finishing/bmc.json",
    Factor: "/data/finishing/factor.json"
  },

  components: {
    Shimano: "/data/components/shimano.json",
    SRAM: "/data/components/sram.json"
  }
};

const state = {
  frameset: {},
  wheels: {},
  cockpit: {},
  saddles: {},
  finishing: {},
  components: {},
  build: []
};

const COCKPIT_TYPE_LABELS = {
  integrated_cockpit: "Integrated cockpit",
  handlebar: "Handlebar",
  stem: "Stem"
};

const COMPONENT_BRAND_ORDER = {
  Shimano: 0,
  SRAM: 1
};

const COMPONENT_FAMILY_ORDER = {
  Shimano: ["dura-ace", "ultegra", "105"],
  SRAM: ["red", "force", "rival"]
};

const FINISHING_TYPES = [
  { id: "tires", label: "Tires" },
  { id: "pedals", label: "Pedals" },
  { id: "tape-grips", label: "Bar tape / grips" },
  { id: "tubes-tubeless", label: "Tubes / tubeless" },
  { id: "bottle-cages", label: "Bottle cages" },
  { id: "small-hardware", label: "Small hardware" }
];

const SPECIALIZED_YEAR_RANGES = {
  "specialized-tarmac-sl8-10r": [2023, 2025],
  "specialized-sworks-tarmac-sl8-12r": [2023, 2025],
  "specialized-crux-10r-current": [2023, null],
  "specialized-sworks-crux-12r-current": [2023, null],
  "specialized-sworks-crux-2019": [2019, 2019],
  "specialized-sworks-tarmac-sl3-2011": [2011, 2011],
  "specialized-sworks-tarmac-sl4-measured": [2012, 2014],
  "specialized-sworks-tarmac-sl6-rim-2018": [2018, 2018],
  "specialized-sworks-tarmac-sl7-2021": [2021, 2021],
  "specialized-tarmac-sl7-10r-2021": [2021, 2021],
  "specialized-sworks-aethos": [2020, 2025],
  "specialized-sworks-venge-2019": [2019, 2019],
  "specialized-diverge-fact9r": [2023, null],
  "specialized-sworks-diverge-str": [2023, 2024],
  "specialized-sworks-tarmac-sl5-2015": [2015, 2015],
  "specialized-sworks-roubaix-sl8-2024": [2024, 2025],
  "specialized-sworks-roubaix-2020": [2020, 2020],
  "specialized-allez-sprint-current": [2022, null]
};

const frameBrandSelect = document.getElementById("frame-brand");
const frameModelSelect = document.getElementById("frame-model");

const frameInfo = document.getElementById("frame-info");
const frameName = document.getElementById("frame-name");
const frameConfig = document.getElementById("frame-config");
const frameWeight = document.getElementById("frame-weight");
const frameIncludes = document.getElementById("frame-includes");
const framesetSourceType = document.getElementById("frame-source-type");
const framesetSource = document.getElementById("frame-source");
const addFrameButton = document.getElementById("add-frame");

const wheelBrandSelect = document.getElementById("wheel-brand");
const wheelModelSelect = document.getElementById("wheel-model");

const wheelInfo = document.getElementById("wheel-info");
const wheelName = document.getElementById("wheel-name");
const wheelConfig = document.getElementById("wheel-config");
const wheelWeight = document.getElementById("wheel-weight");
const wheelIncludes = document.getElementById("wheel-includes");
const wheelSourceType = document.getElementById("wheel-source-type");
const wheelSource = document.getElementById("wheel-source");
const addWheelButton = document.getElementById("add-wheel");

const cockpitTypeSelect = document.getElementById("cockpit-type");
const cockpitModelSelect = document.getElementById("cockpit-model");

const cockpitInfo = document.getElementById("cockpit-info");
const cockpitName = document.getElementById("cockpit-name");
const cockpitConfig = document.getElementById("cockpit-config");
const cockpitWeight = document.getElementById("cockpit-weight");
const cockpitIncludes = document.getElementById("cockpit-includes");
const cockpitSourceType = document.getElementById("cockpit-source-type");
const cockpitSource = document.getElementById("cockpit-source");
const addCockpitButton = document.getElementById("add-cockpit");

const seatpostModelSelect = document.getElementById("seatpost-model");

const seatpostInfo = document.getElementById("seatpost-info");
const seatpostName = document.getElementById("seatpost-name");
const seatpostConfig = document.getElementById("seatpost-config");
const seatpostWeight = document.getElementById("seatpost-weight");
const seatpostIncludes = document.getElementById("seatpost-includes");
const seatpostSourceType = document.getElementById("seatpost-source-type");
const seatpostSource = document.getElementById("seatpost-source");
const addSeatpostButton = document.getElementById("add-seatpost");

const saddleBrandSelect = document.getElementById("saddle-brand");
const saddleModelSelect = document.getElementById("saddle-model");

const saddleInfo = document.getElementById("saddle-info");
const saddleName = document.getElementById("saddle-name");
const saddleConfig = document.getElementById("saddle-config");
const saddleWeight = document.getElementById("saddle-weight");
const saddleIncludes = document.getElementById("saddle-includes");
const saddleSourceType = document.getElementById("saddle-source-type");
const saddleSource = document.getElementById("saddle-source");
const addSaddleButton = document.getElementById("add-saddle");

const finishingInfo = document.getElementById("finishing-info");
const finishingName = document.getElementById("finishing-name");
const finishingConfig = document.getElementById("finishing-config");
const finishingWeight = document.getElementById("finishing-weight");
const finishingIncludes = document.getElementById("finishing-includes");
const finishingSourceType = document.getElementById("finishing-source-type");
const finishingSource = document.getElementById("finishing-source");
const addFinishingButton = document.getElementById("add-finishing");
const selectAllFinishing = document.getElementById("select-all-finishing");

const finishingSelectors = FINISHING_TYPES.map((type) => ({
  ...type,
  select: document.getElementById(type.id),
  items: []
}));

// Add categories here to extend the component selectors; data stays in JSON.
const COMPONENT_TYPES = [
  { id: "shifters", label: "Shifters", categories: ["shifters", "shift_brake_levers", "shift_brake_system"] },
  { id: "rear-derailleur", label: "Rear derailleur", categories: ["rear_derailleur"] },
  { id: "front-derailleur", label: "Front derailleur", categories: ["front_derailleur"] },
  { id: "crankset", label: "Crankset", categories: ["crankset", "crankset_power_meter"] },
  { id: "chainrings", label: "Chainrings", categories: ["chainrings", "chainring"] },
  { id: "cassette", label: "Cassette", categories: ["cassette"] },
  { id: "chain", label: "Chain", categories: ["chain"] },
  { id: "bottom-bracket", label: "Bottom bracket", categories: ["bottom_bracket"] },
  { id: "brakes", label: "Brakes / calipers", categories: ["brakes", "brake_caliper", "brake_calipers", "rim_brakes"] },
  { id: "disc-rotors", label: "Disc rotors", categories: ["disc_rotor", "disc_rotors"] },
  { id: "batteries", label: "Batteries", categories: ["battery"] },
  { id: "electronic-connections", label: "Electronic connections", categories: ["di2_junction"] }
];
const componentSelectors = COMPONENT_TYPES.map((type) => ({
  ...type, select: document.getElementById(type.id), items: []
}));

const componentInfo = document.getElementById("component-info");
const componentName = document.getElementById("component-name");
const componentConfig = document.getElementById("component-config");
const componentWeight = document.getElementById("component-weight");
const componentIncludes = document.getElementById("component-includes");
const componentSourceType = document.getElementById("component-source-type");
const componentSource = document.getElementById("component-source");
const addComponentButton = document.getElementById("add-component");

const customNameInput = document.getElementById("custom-name");
const customWeightInput = document.getElementById("custom-weight");
const addCustomButton = document.getElementById("add-custom");

const buildList = document.getElementById("build-list");
const buildCheck = document.getElementById("build-check");
const totalWeight = document.getElementById("total-weight");
const totalGrams = document.getElementById("total-grams");
const resetBuildButton = document.getElementById("reset-build");

let selectedFrame = null;
let selectedComponent = null;
let selectedFinishing = null;
const selectedComponents = new Map();
const selectedFinishingItems = new Map();

async function loadJSON(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }

  return response.json();
}

async function loadData() {
  const errors = [];
  await Promise.all(Object.entries(DATA_PATHS).flatMap(([kind, paths]) =>
    Object.entries(paths).map(async ([brand, path]) => {
      try {
        const records = await loadJSON(path);
        if (!Array.isArray(records)) throw new Error(`Expected an array: ${path}`);
        state[kind][brand] = records;
      } catch (error) {
        console.error(error);
        errors.push(brand);
      }
    })
  ));
  populateFrameBrands();
  populateWheelBrands();
  populateCockpitTypes();
  populateSeatpostSelector();
  populateSaddleBrands();
  populateFinishingSelectors();
  populateComponentSelectors();
  const status = document.getElementById("data-status");
  status.textContent = errors.length
    ? `Some data could not be loaded (${errors.join(", ")}). Available data and custom components can still be used.`
    : "";
  status.classList.toggle("hidden", !errors.length);
}

function populateFrameBrands() {
  Object.keys(DATA_PATHS.frameset).filter((brand) => state.frameset[brand]).forEach((brand) => {
    const option = document.createElement("option");

    option.value = brand;
    option.textContent = brand;

    frameBrandSelect.appendChild(option);
  });
}

function populateWheelBrands() {
  Object.keys(DATA_PATHS.wheels).filter((brand) => state.wheels[brand]).forEach((brand) => {
    const option = document.createElement("option");

    option.value = brand;
    option.textContent = brand;

    wheelBrandSelect.appendChild(option);
  });
}

function populateCockpitTypes() {
  Object.entries(COCKPIT_TYPE_LABELS).forEach(([type, label]) => {
    const option = document.createElement("option");

    option.value = type;
    option.textContent = label;

    cockpitTypeSelect.appendChild(option);
  });
}

function populateSaddleBrands() {
  Object.keys(DATA_PATHS.saddles).filter((brand) => state.saddles[brand]).forEach((brand) => {
    const option = document.createElement("option");

    option.value = brand;
    option.textContent = brand;

    saddleBrandSelect.appendChild(option);
  });
}

function populateSeatpostSelector(frame = null) {
  const seatposts = Object.values(state.finishing)
    .flat()
    .filter((item) => item.componentType === "seatpost")
    .sort(sortFinishingNewestFirst);

  const specificIds = Array.isArray(frame?.seatpostIds)
    ? frame.seatpostIds
    : frame?.seatpostId
      ? [frame.seatpostId]
      : [];
  const specific = specificIds.length
    ? seatposts.filter((item) => specificIds.includes(item.id))
    : [];
  const remaining = specificIds.length
    ? seatposts.filter((item) => !specificIds.includes(item.id))
    : seatposts;
  const records = [...specific, ...remaining];

  seatpostModelSelect.replaceChildren(new Option(
    records.length
      ? (specific.length ? "Select seatpost (frame-specific first)" : "Select seatpost")
      : "No data available yet",
    ""
  ));

  records.forEach((item, index) => {
    const label = specificIds.includes(item.id)
      ? `Frame-specific · ${formatFinishingOption(item)}`
      : formatFinishingOption(item);
    seatpostModelSelect.add(new Option(label, String(index)));
  });

  seatpostModelSelect.disabled = !records.length;
  seatpostModelSelect.dataset.items = JSON.stringify(records);
}

function populateFinishingSelectors() {
  const records = Object.values(state.finishing).flat();

  finishingSelectors.forEach((type) => {
    type.items = records
      .filter((item) => item.componentType === type.id.replaceAll("-", "_"))
      .sort(sortFinishingNewestFirst);

    type.select.replaceChildren(new Option(
      type.items.length ? `Select ${type.label.toLowerCase()}` : "No data available yet",
      ""
    ));

    type.items.forEach((item, index) => {
      type.select.add(new Option(formatFinishingOption(item), String(index)));
    });

    type.select.disabled = !type.items.length;

    if (selectAllFinishing.checked && type.items.length) {
      type.select.value = "0";
      selectedFinishingItems.set(type.id, type.items[0]);
    }
  });

  selectedFinishing = finishingSelectors.find((type) => type.items.length)?.items[0] || null;
  if (selectedFinishing) showFinishing(selectedFinishing);
}

function sortFramesetsNewestFirst(a, b) {
  const aText = `${a.model} ${a.generation}`;
  const bText = `${b.model} ${b.generation}`;
  const aSl = Number(aText.match(/\bSL\s*(\d+)/i)?.[1] || 0);
  const bSl = Number(bText.match(/\bSL\s*(\d+)/i)?.[1] || 0);

  // Keep the Tarmac generations together in the expected order: SL8, SL7...
  if (aSl !== bSl) return bSl - aSl;

  const aTarmac = /tarmac/i.test(a.model) ? 0 : 1;
  const bTarmac = /tarmac/i.test(b.model) ? 0 : 1;
  if (aTarmac !== bTarmac) return aTarmac - bTarmac;

  const aYear = Number(a.yearFrom || a.model_year || a.year || 0);
  const bYear = Number(b.yearFrom || b.model_year || b.year || 0);
  if (aYear !== bYear) return bYear - aYear;

  return `${a.model} ${a.generation}`.localeCompare(`${b.model} ${b.generation}`);
}

function generationRank(value) {
  const match = String(value || "").match(/\b([A-Z])([0-9]+)\b/i);
  if (!match) return 0;
  return (match[1].toUpperCase().charCodeAt(0) * 100) + Number(match[2]);
}

function sortComponentsNewestFirst(a, b) {
  const aBrand = COMPONENT_BRAND_ORDER[a.brand] ?? 99;
  const bBrand = COMPONENT_BRAND_ORDER[b.brand] ?? 99;

  if (aBrand !== bBrand) return aBrand - bBrand;

  const familyRank = (item) => {
    const familyNames = COMPONENT_FAMILY_ORDER[item.brand] || [];
    const text = `${item.series} ${item.model}`.toLowerCase();
    const familyIndex = familyNames.findIndex((family) => text.includes(family));

    return familyIndex === -1 ? 99 : familyIndex;
  };
  const aFamily = familyRank(a);
  const bFamily = familyRank(b);

  if (aFamily !== bFamily) return aFamily - bFamily;

  const aYear = Number(a.year || a.model_year || 0);
  const bYear = Number(b.year || b.model_year || 0);
  if (aYear !== bYear) return bYear - aYear;

  const aGeneration = generationRank(a.generation);
  const bGeneration = generationRank(b.generation);
  if (aGeneration !== bGeneration) return bGeneration - aGeneration;

  const versionNumber = (item) => {
    const match = `${item.model} ${item.series}`.match(/(?:R|XG|FC|ST|RD|FD)[-_]?([0-9]{3,4})/i);
    return Number(match?.[1] || 0);
  };
  const aVersion = versionNumber(a);
  const bVersion = versionNumber(b);
  if (aVersion !== bVersion) return bVersion - aVersion;

  return formatComponentOption(a).localeCompare(formatComponentOption(b));
}

function populateComponentSelectors() {
  const records = Object.values(state.components).flat();
  componentSelectors.forEach((type) => {
    type.items = records
      .filter((item) => type.categories.includes(item.category))
      .sort(sortComponentsNewestFirst);
    type.select.replaceChildren(new Option(
      type.items.length ? `Select ${type.label.toLowerCase()}` : "No data available yet", ""
    ));
    type.items.forEach((item, index) => {
      const weight = validWeight(item.weight_g) ? `${item.weight_g} g` : "Weight unavailable";
      type.select.add(new Option(`${formatComponentOption(item)} · ${weight}`, String(index)));
    });
    type.select.disabled = !type.items.length;
  });
}

componentSelectors.forEach((type) => {
  type.select.addEventListener("change", () => {
    selectedComponent = type.select.value === "" ? null : type.items[Number(type.select.value)];
    if (selectedComponent) {
      selectedComponents.set(type.id, selectedComponent);
    } else {
      selectedComponents.delete(type.id);
    }
    componentInfo.classList.toggle("hidden", !selectedComponent);
    if (selectedComponent) showComponent(selectedComponent);
  });
});

frameBrandSelect.addEventListener("change", () => {
  const brand = frameBrandSelect.value;

  selectedFrame = null;

  frameInfo.classList.add("hidden");

  frameModelSelect.innerHTML = `
    <option value="">Select frameset</option>
  `;
  populateSeatpostSelector();

  if (!brand) {
    frameModelSelect.disabled = true;
    return;
  }

  const frameset = state.frameset[brand]
    .slice()
    .sort(sortFramesetsNewestFirst);

  frameset.forEach((frame, index) => {
    const option = document.createElement("option");

    option.value = index;

    option.textContent = formatFrameOption(frame);

    frameModelSelect.appendChild(option);
  });

  frameModelSelect.disabled = false;
});

frameModelSelect.addEventListener("change", () => {
  const brand = frameBrandSelect.value;
  const index = frameModelSelect.value;

  if (index === "") {
    selectedFrame = null;
    frameInfo.classList.add("hidden");
    populateSeatpostSelector();
    return;
  }

  const frameset = state.frameset[brand]
    .slice()
    .sort(sortFramesetsNewestFirst)[index];

  selectedFrame = frameset;

  populateSeatpostSelector(frameset);
  showFrame(frameset);
});

wheelBrandSelect.addEventListener("change", () => {
  const brand = wheelBrandSelect.value;

  wheelInfo.classList.add("hidden");

  wheelModelSelect.innerHTML = `
    <option value="">Select wheelset</option>
  `;

  if (!brand) {
    wheelModelSelect.disabled = true;
    return;
  }

  state.wheels[brand]
    .slice()
    .sort(sortWheelsNewestFirst)
    .forEach((wheel, index) => {
      const option = document.createElement("option");

      option.value = index;
      option.textContent = formatWheelOption(wheel);

      wheelModelSelect.appendChild(option);
    });

  wheelModelSelect.disabled = false;
});

wheelModelSelect.addEventListener("change", () => {
  const brand = wheelBrandSelect.value;
  const index = wheelModelSelect.value;

  if (index === "") {
    wheelInfo.classList.add("hidden");
    return;
  }

  const wheel = state.wheels[brand]
    .slice()
    .sort(sortWheelsNewestFirst)[index];

  showWheel(wheel);
});

function sortWheelsNewestFirst(a, b) {
  const aYear = Number(a.yearFrom || 0);
  const bYear = Number(b.yearFrom || 0);

  if (aYear !== bYear) return bYear - aYear;

  return formatWheelOption(a).localeCompare(formatWheelOption(b));
}

function formatWheelOption(wheel) {
  const years = wheel.yearFrom
    ? `${wheel.yearFrom}${wheel.yearTo === wheel.yearFrom ? "" : `–${wheel.yearTo || "present"}`}`
    : null;

  return [wheel.model, wheel.rimHeightMm ? `${wheel.rimHeightMm} mm` : null, years]
    .filter(Boolean)
    .join(" · ");
}

function buildWheelDescription(wheel) {
  return [
    wheel.category?.replaceAll("_", " "),
    wheel.brakeType === "disc" ? "disc brake" : "rim brake",
    wheel.rimMaterial?.replaceAll("_", " "),
    wheel.wheelSize,
    wheel.tubelessReady ? "tubeless ready" : null
  ].filter(Boolean).join(" · ");
}

function showWheel(wheel) {
  wheelName.textContent = `${wheel.brand} ${formatWheelOption(wheel)}`;
  wheelConfig.textContent = buildWheelDescription(wheel);
  wheelWeight.textContent = `${wheel.wheelsetWeightG} g`;
  wheelIncludes.textContent = "Juego completo de ruedas";
  wheelSourceType.textContent = wheel.sourceQuality === "manufacturer"
    ? "✓ Manufacturer verified"
    : "Source available";

  setSourceLink(wheelSource, wheel.sourceUrl);
  wheelInfo.classList.remove("hidden");
}

addWheelButton.addEventListener("click", () => {
  const brand = wheelBrandSelect.value;
  const index = wheelModelSelect.value;

  if (index === "" || !brand) return;

  const wheel = state.wheels[brand]
    .slice()
    .sort(sortWheelsNewestFirst)[index];

  addToBuild({
    id: crypto.randomUUID(),
    category: "Wheels",
    name: `${wheel.brand} ${wheel.model}`,
    meta: formatWheelOption(wheel),
    weight_g: wheel.wheelsetWeightG,
    source_type: wheel.sourceType || null
  });

  wheelInfo.classList.add("hidden");
});

cockpitTypeSelect.addEventListener("change", () => {
  const type = cockpitTypeSelect.value;

  cockpitInfo.classList.add("hidden");
  cockpitModelSelect.innerHTML = `
    <option value="">Select component</option>
  `;

  if (!type) {
    cockpitModelSelect.disabled = true;
    return;
  }

  const records = Object.values(state.cockpit)
    .flat()
    .filter((item) => item.cockpitType === type)
    .sort(sortCockpitNewestFirst);

  records.forEach((cockpit, index) => {
    const option = document.createElement("option");

    option.value = index;
    option.textContent = formatCockpitOption(cockpit);

    cockpitModelSelect.appendChild(option);
  });

  cockpitModelSelect.disabled = !records.length;
});

cockpitModelSelect.addEventListener("change", () => {
  const type = cockpitTypeSelect.value;
  const index = cockpitModelSelect.value;

  if (index === "") {
    cockpitInfo.classList.add("hidden");
    return;
  }

  const cockpit = Object.values(state.cockpit)
    .flat()
    .filter((item) => item.cockpitType === type)
    .sort(sortCockpitNewestFirst)[index];

  showCockpit(cockpit);
});

function sortCockpitNewestFirst(a, b) {
  const aYear = Number(a.yearFrom || 0);
  const bYear = Number(b.yearFrom || 0);

  if (aYear !== bYear) return bYear - aYear;

  return formatCockpitOption(a).localeCompare(formatCockpitOption(b));
}

function formatCockpitOption(cockpit) {
  const years = cockpit.yearFrom
    ? `${cockpit.yearFrom}${cockpit.yearTo === cockpit.yearFrom ? "" : `–${cockpit.yearTo || "present"}`}`
    : null;

  return [cockpit.model, cockpit.variant, years]
    .filter(Boolean)
    .join(" · ");
}

function buildCockpitDescription(cockpit) {
  const details = [
    cockpit.material?.replaceAll("_", " "),
    cockpit.widthMm ? `${cockpit.widthMm} mm width` : null,
    cockpit.stemLengthMm ? `${cockpit.stemLengthMm} mm stem` : null,
    cockpit.dropMm ? `${cockpit.dropMm} mm drop` : null,
    cockpit.flareDegrees ? `${cockpit.flareDegrees}° flare` : null
  ];

  return details.filter(Boolean).join(" · ");
}

function showCockpit(cockpit) {
  const includedParts = {
    integrated_cockpit: "Integrated handlebar + stem",
    handlebar: "Handlebar only",
    stem: "Stem only"
  };

  cockpitName.textContent = `${cockpit.brand} ${formatCockpitOption(cockpit)}`;
  cockpitConfig.textContent = buildCockpitDescription(cockpit);
  cockpitWeight.textContent = `${cockpit.weightG} g`;
  cockpitIncludes.textContent = includedParts[cockpit.cockpitType];
  cockpitSourceType.textContent = cockpit.sourceQuality === "manufacturer"
    ? "✓ Manufacturer verified"
    : "Source available";

  setSourceLink(cockpitSource, cockpit.sourceUrl);
  cockpitInfo.classList.remove("hidden");
}

addCockpitButton.addEventListener("click", () => {
  const type = cockpitTypeSelect.value;
  const index = cockpitModelSelect.value;

  if (index === "" || !type) return;

  const cockpit = Object.values(state.cockpit)
    .flat()
    .filter((item) => item.cockpitType === type)
    .sort(sortCockpitNewestFirst)[index];

  addToBuild({
    id: crypto.randomUUID(),
    category: COCKPIT_TYPE_LABELS[type],
    name: `${cockpit.brand} ${cockpit.model}`,
    meta: formatCockpitOption(cockpit),
    weight_g: cockpit.weightG,
    source_type: cockpit.sourceType || null
  });

  cockpitInfo.classList.add("hidden");
});

saddleBrandSelect.addEventListener("change", () => {
  const brand = saddleBrandSelect.value;

  saddleInfo.classList.add("hidden");
  saddleModelSelect.innerHTML = `
    <option value="">Select saddle</option>
  `;

  if (!brand) {
    saddleModelSelect.disabled = true;
    return;
  }

  state.saddles[brand]
    .slice()
    .sort(sortSaddlesNewestFirst)
    .forEach((saddle, index) => {
      const option = document.createElement("option");

      option.value = index;
      option.textContent = formatSaddleOption(saddle);

      saddleModelSelect.appendChild(option);
    });

  saddleModelSelect.disabled = false;
});

saddleModelSelect.addEventListener("change", () => {
  const brand = saddleBrandSelect.value;
  const index = saddleModelSelect.value;

  if (index === "") {
    saddleInfo.classList.add("hidden");
    return;
  }

  const saddle = state.saddles[brand]
    .slice()
    .sort(sortSaddlesNewestFirst)[index];

  showSaddle(saddle);
});

seatpostModelSelect.addEventListener("change", () => {
  const index = seatpostModelSelect.value;
  const seatposts = JSON.parse(seatpostModelSelect.dataset.items || "[]");

  if (index === "") {
    seatpostInfo.classList.add("hidden");
    return;
  }

  showSeatpost(seatposts[Number(index)]);
});

function sortSaddlesNewestFirst(a, b) {
  const aYear = Number(a.yearFrom || 0);
  const bYear = Number(b.yearFrom || 0);

  if (aYear !== bYear) return bYear - aYear;

  return formatSaddleOption(a).localeCompare(formatSaddleOption(b));
}

function formatSaddleOption(saddle) {
  const years = saddle.yearFrom
    ? `${saddle.yearFrom}${saddle.yearTo === saddle.yearFrom ? "" : `–${saddle.yearTo || "present"}`}`
    : null;

  return [saddle.model, `${saddle.widthMm} mm`, years]
    .filter(Boolean)
    .join(" · ");
}

function buildSaddleDescription(saddle) {
  return [
    saddle.category?.replaceAll("_", " "),
    saddle.material?.replaceAll("_", " "),
    saddle.railMaterial?.replaceAll("_", " ")
  ].filter(Boolean).join(" · ");
}

function showSaddle(saddle) {
  saddleName.textContent = `${saddle.brand} ${formatSaddleOption(saddle)}`;
  saddleConfig.textContent = buildSaddleDescription(saddle);
  saddleWeight.textContent = `${saddle.weightG} g`;
  saddleIncludes.textContent = `${saddle.widthMm} mm saddle`;
  saddleSourceType.textContent = saddle.sourceQuality === "manufacturer"
    ? "✓ Manufacturer verified"
    : "Source available";

  setSourceLink(saddleSource, saddle.sourceUrl);
  saddleInfo.classList.remove("hidden");
}

addSaddleButton.addEventListener("click", () => {
  const brand = saddleBrandSelect.value;
  const index = saddleModelSelect.value;

  if (index === "" || !brand) return;

  const saddle = state.saddles[brand]
    .slice()
    .sort(sortSaddlesNewestFirst)[index];

  addToBuild({
    id: crypto.randomUUID(),
    category: "Saddle",
    name: `${saddle.brand} ${saddle.model}`,
    meta: formatSaddleOption(saddle),
    weight_g: saddle.weightG,
    source_type: saddle.sourceType || null
  });

  saddleInfo.classList.add("hidden");
});

function showSeatpost(seatpost) {
  const includedInFrame = Boolean(
    selectedFrame?.seatpostIncludedInFrameset &&
    selectedFrame?.seatpostId === seatpost.id
  );
  seatpostName.textContent = `${seatpost.brand} ${formatFinishingOption(seatpost)}`;
  seatpostConfig.textContent = buildFinishingDescription(seatpost);
  seatpostWeight.textContent = validWeight(seatpost.weightG)
    ? `${seatpost.weightG} g`
    : "Weight unavailable";
  seatpostIncludes.textContent = includedInFrame
    ? `${seatpost.variant || ""} · Included in selected frameset`
    : seatpost.variant || "";
  seatpostSourceType.textContent = seatpost.sourceQuality === "manufacturer"
    ? "✓ Manufacturer verified"
    : "Initial estimate";
  addSeatpostButton.disabled = includedInFrame || !validWeight(seatpost.weightG);

  setSourceLink(seatpostSource, seatpost.sourceUrl);
  seatpostInfo.classList.remove("hidden");
}

addSeatpostButton.addEventListener("click", () => {
  const index = seatpostModelSelect.value;
  const seatposts = JSON.parse(seatpostModelSelect.dataset.items || "[]");
  const seatpost = index === "" ? null : seatposts[Number(index)];

  if (!seatpost || !validWeight(seatpost.weightG)) return;

  addToBuild({
    id: crypto.randomUUID(),
    category: "Seatpost",
    name: `${seatpost.brand} ${seatpost.model}`,
    meta: seatpost.variant || "",
    weight_g: seatpost.weightG,
    source_type: seatpost.sourceType || null
  });

  seatpostInfo.classList.add("hidden");
});

finishingSelectors.forEach((type) => {
  type.select.addEventListener("change", () => {
    const index = type.select.value;
    selectedFinishing = index === "" ? null : type.items[Number(index)];

    if (selectedFinishing) {
      selectedFinishingItems.set(type.id, selectedFinishing);
    } else {
      selectedFinishingItems.delete(type.id);
      selectAllFinishing.checked = false;
    }

    finishingInfo.classList.toggle("hidden", selectedFinishingItems.size === 0);

    if (selectedFinishing) {
      showFinishing(selectedFinishing);
    }
  });
});

selectAllFinishing.addEventListener("change", () => {
  if (!selectAllFinishing.checked) return;

  finishingSelectors.forEach((type) => {
    if (!type.items.length) return;

    type.select.value = "0";
    selectedFinishingItems.set(type.id, type.items[0]);
  });

  selectedFinishing = finishingSelectors.find((type) => type.items.length)?.items[0] || null;
  if (selectedFinishing) showFinishing(selectedFinishing);
});

function sortFinishingNewestFirst(a, b) {
  const aYear = Number(a.yearFrom || 0);
  const bYear = Number(b.yearFrom || 0);

  if (aYear !== bYear) return bYear - aYear;

  return formatFinishingOption(a).localeCompare(formatFinishingOption(b));
}

function formatFinishingOption(item) {
  const weight = validWeight(item.weightG)
    ? `${item.weightG} g`
    : "Weight unavailable";

  return [item.brand, item.model, item.variant, weight]
    .filter(Boolean)
    .join(" · ");
}

function buildFinishingDescription(item) {
  return [
    item.material?.replaceAll("_", " "),
    item.unitWeightG ? `${item.unitWeightG} g each` : null,
    item.quantity ? `quantity ${item.quantity}` : null
  ].filter(Boolean).join(" · ");
}

function showFinishing(item) {
  finishingName.textContent = `${item.brand} ${item.model}`;
  finishingConfig.textContent = buildFinishingDescription(item);
  finishingWeight.textContent = validWeight(item.weightG)
    ? `${item.weightG} g`
    : "Weight unavailable";
  finishingIncludes.textContent = item.variant || "";
  finishingSourceType.textContent = item.sourceQuality === "manufacturer"
    ? "✓ Manufacturer verified"
    : "Initial estimate";
  addFinishingButton.disabled = !Array.from(selectedFinishingItems.values())
    .some((selectedItem) => validWeight(selectedItem.weightG));

  setSourceLink(finishingSource, item.sourceUrl);
  finishingInfo.classList.remove("hidden");
}

addFinishingButton.addEventListener("click", () => {
  selectedFinishingItems.forEach((item, typeId) => {
    if (!validWeight(item.weightG)) return;

    const selectedType = finishingSelectors.find((type) => type.id === typeId);

    addToBuild({
      id: crypto.randomUUID(),
      category: selectedType?.label || "Finishing component",
      name: `${item.brand} ${item.model}`,
      meta: item.variant || "",
      weight_g: item.weightG,
      source_type: item.sourceType || null
    });
  });

  finishingInfo.classList.add("hidden");
});

function showFrame(frame) {
  frameName.textContent =
    `${frame.brand} ${formatFrameOption(frame)}`;

  frameConfig.textContent =
    buildFrameDescription(frame);

  const weight = getFrameWeight(frame);

  if (weight === null) {
    if (validWeight(frame.frameWeight ?? frame.frame_weight_g)) {
      frameWeight.textContent = `${frame.frameWeight ?? frame.frame_weight_g} g`;
      frameIncludes.textContent = "Frame only · Fork weight unavailable";
    } else {
      frameWeight.textContent = "Weight unavailable";
      frameIncludes.textContent = formatFrameIncludes(frame);
    }
    frameConfig.textContent += " · Complete frame + fork weight unavailable";
    addFrameButton.disabled = true;
  } else {
    frameWeight.textContent = `${weight} g`;
    frameIncludes.textContent = formatFrameIncludes(frame);
    addFrameButton.disabled = false;
  }

  framesetSourceType.textContent =
    getSourceLabel(frame);

  setSourceLink(framesetSource, frame.source_url || frame.sourceUrl);

  frameInfo.classList.remove("hidden");
}

function formatFrameOption(frame) {
  const generation = frame.generation
    ? (typeof frame.generation === "number" ? `Gen ${frame.generation}` : frame.generation)
    : null;
  const range = frame.yearFrom
    ? [frame.yearFrom, frame.yearTo]
    : SPECIALIZED_YEAR_RANGES[frame.id] || (frame.model_year ? [frame.model_year, frame.model_year] : null);
  const years = range?.[0]
    ? `${range[0]}${range[1] === range[0] ? "" : `–${range[1] || "present"}`}`
    : null;
  return [frame.model, generation, frame.variant, years].filter(Boolean).join(" · ");
}

function buildFrameDescription(frame) {
  const discipline = frame.category || frame.discipline;
  const size = frame.referenceSize || frame.reference_size;
  const parts = [discipline?.replaceAll("_", " "), size ? `Size ${size}` : null,
    frame.brakeType || frame.brake_type];
  if (frame.weightType) parts.push(frame.weightType.replaceAll("_", " "));
  return parts.filter(Boolean).join(" · ");
}

// Support the new camelCase database and existing Specialized records.
function getFrameParts(frame) {
  return {
    frame: frame.frameWeight ?? frame.frame_weight_g,
    fork: frame.forkWeight ?? frame.fork_weight_g
  };
}

function formatFrameIncludes(frame) {
  const weights = getFrameParts(frame);
  if (validWeight(weights.frame) && validWeight(weights.fork)) {
    return `Frame ${weights.frame} g + fork ${weights.fork} g · Frame + fork`;
  }
  if (validWeight(frame.framesetWeightG) || validWeight(frame.framesetWeight) || validWeight(frame.frame_fork_weight_g) || validWeight(frame.frameset_weight_g)) {
    return "Frame + fork · Complete frameset weight";
  }
  if (getFrameWeight(frame) !== null) return formatWeightIncludes(frame);
  return `Frame: ${validWeight(weights.frame) ? `${weights.frame} g` : "unavailable"} · Fork: ${validWeight(weights.fork) ? `${weights.fork} g` : "unavailable"}`;
}

const INCLUDE_LABELS = {
  frame: "cuadro",
  fork: "horquilla",
  seatpost: "tija",
  seat_clamp: "cierre de tija",
  chainrings: "platos",
  calipers: "pinzas",
  battery: "batería",
  cables: "cables",
  charger: "cargador"
};

function formatWeightIncludes(item) {
  const parts = [];
  const includes = Array.isArray(item.includes)
    ? item.includes.map((value) => INCLUDE_LABELS[value] || String(value).replaceAll("_", " "))
    : [];

  if (includes.length) {
    parts.push(`Incluye ${includes.join(" + ")}`);
  }

  if (item.weight_scope) {
    parts.push(item.weight_scope);
  }

  return parts.join(" · ");
}

function validWeight(weight) {
  return typeof weight === "number" && Number.isFinite(weight) && weight > 0;
}

function getFrameWeight(frame) {
  const weights = getFrameParts(frame);
  if (validWeight(weights.frame) && validWeight(weights.fork)) {
    return weights.frame + weights.fork;
  }
  // Preserve existing combined weights when separate measurements are missing.
  if (validWeight(frame.framesetWeightG)) return frame.framesetWeightG;
  if (validWeight(frame.framesetWeight)) return frame.framesetWeight;
  if (validWeight(frame.frame_fork_weight_g)) return frame.frame_fork_weight_g;
  if (validWeight(frame.frameset_weight_g)) return frame.frameset_weight_g;
  if (validWeight(frame.weight)) return frame.weight;
  return null;
}

function formatComponentOption(component) {
  const pieces = [component.brand];

  if (component.series) {
    pieces.push(component.series);
  }

  if (component.generation) {
    pieces.push(component.generation);
  }

  if (component.model) {
    pieces.push(component.model);
  }

  if (component.configuration) {
    pieces.push(component.configuration);
  }

  return pieces.join(" · ");
}

function showComponent(component) {

  componentName.textContent =
    `${component.brand} ${component.model || component.series}`;

  componentConfig.textContent =
    [component.configuration, component.notes,
      component.category === "shift_brake_system" ? "Includes brake calipers: do not add them again." : ""
    ].filter(Boolean).join(" · ");

  componentWeight.textContent =
    validWeight(component.weight_g) ? `${component.weight_g} g` : "Weight unavailable";
  componentIncludes.textContent = formatWeightIncludes(component);
  addComponentButton.disabled = !validWeight(component.weight_g);

  componentSourceType.textContent =
    getSourceLabel(component);

  setSourceLink(componentSource, component.source_url);

  componentInfo.classList.remove("hidden");
}

function setSourceLink(link, url) {
  const available = typeof url === "string" && /^https?:\/\//i.test(url);
  link.classList.toggle("hidden", !available);
  if (available) link.href = url;
  else link.removeAttribute("href");
}

function getSourceLabel(component) {
  const sourceUrl = component.source_url || component.sourceUrl;
  const sourceType = component.source_type || component.sourceQuality;
  const weightType = component.weight_type || component.weightType;

  if (!sourceUrl) return "Source unavailable";

  if (
    (sourceType === "official" || sourceType === "manufacturer") &&
    (weightType === "manufacturer" || weightType === "manufacturer_tested" || weightType === "manufacturer_approximate")
  ) {
    return "✓ Manufacturer verified";
  }

  if (
    (sourceType === "independent" || sourceType === "independent_measured") &&
    (weightType === "measured" || weightType === "independent_measured")
  ) {
    return "✓ Independently measured";
  }

  if (sourceType === "official" || sourceType === "manufacturer" || sourceType === "manufacturer_archive" || sourceType === "manufacturer_catalog") {
    return "✓ Official source";
  }

  return "Source available";
}

addFrameButton.addEventListener("click", () => {

  if (!selectedFrame) {
    return;
  }

  const weight =
    getFrameWeight(selectedFrame);

  if (weight === null) {
    return;
  }

  addToBuild({
    id: crypto.randomUUID(),
    category: "Frameset",
    name:
      `${selectedFrame.brand} ${formatFrameOption(selectedFrame)}`,
    meta:
      buildFrameDescription(selectedFrame),
    weight_g: weight,
    source_type:
      selectedFrame.source_type || selectedFrame.sourceQuality || null
  });

  frameInfo.classList.add("hidden");

});

addComponentButton.addEventListener("click", () => {
  const componentsToAdd = [...selectedComponents.entries()]
    .filter(([, component]) => validWeight(component.weight_g));

  if (!componentsToAdd.length) {
    return;
  }

  componentsToAdd.forEach(([typeId, component]) => {
    const type = componentSelectors.find((item) => item.id === typeId);
    addToBuild({
      id: crypto.randomUUID(),
      category: type?.label || "Component",
      name:
        `${component.brand} ${
          component.model ||
          component.series
        }`,
      meta: component.configuration || "",
      weight_g: component.weight_g,
      source_type: component.source_type || null
    });
  });

  selectedComponents.clear();
  selectedComponent = null;
  componentInfo.classList.add("hidden");
});

addCustomButton.addEventListener("click", () => {

  const name =
    customNameInput.value.trim();

  const weight =
    Number(customWeightInput.value);

  if (!name) {
    alert("Enter a component name.");
    return;
  }

  if (
    !Number.isFinite(weight) ||
    weight <= 0
  ) {
    alert("Enter a valid weight.");
    return;
  }

  addToBuild({
    id: crypto.randomUUID(),
    category: "Custom",
    name,
    meta: "User entered",
    weight_g: weight,
    source_type: "user"
  });

  customNameInput.value = "";
  customWeightInput.value = "";

});

function addToBuild(item) {

  state.build.push(item);

  renderBuild();
}

function removeFromBuild(id) {

  state.build =
    state.build.filter(
      (item) => item.id !== id
    );

  renderBuild();
}

function renderBuild() {

  buildList.innerHTML = "";

  if (state.build.length === 0) {

    buildList.innerHTML = `
      <div class="empty-build">
        No components added yet.
      </div>
    `;

    renderBuildCheck();
    updateTotal();
    return;
  }

  state.build.forEach((item) => {

    const row =
      document.createElement("div");

    row.className = "build-item";

    row.innerHTML = `
      <div class="build-item-main">

        <span class="build-item-name">
          ${escapeHTML(item.name)}
        </span>

        <span class="build-item-meta">
          ${escapeHTML(item.category)}
          ${
            item.meta
              ? ` · ${escapeHTML(item.meta)}`
              : ""
          }
        </span>

      </div>

      <div class="build-item-right">

        <span class="build-item-weight">
          ${item.weight_g} g
        </span>

        <button
          class="remove-item"
          aria-label="Remove component"
        >
          ×
        </button>

      </div>
    `;

    row
      .querySelector(".remove-item")
      .addEventListener(
        "click",
        () => removeFromBuild(item.id)
      );

    buildList.appendChild(row);

  });

  renderBuildCheck();
  updateTotal();
}

function renderBuildCheck() {
  const requiredParts = [
    {
      label: "Frameset",
      target: "frame-brand",
      matches: (item) => item.category === "Frameset"
    },
    {
      label: "Cockpit",
      target: "cockpit-type",
      matches: (item) => ["Integrated cockpit", "Handlebar", "Stem"].includes(item.category)
    },
    {
      label: "Seatpost",
      target: "seatpost-model",
      matches: (item) => item.category === "Seatpost"
    },
    {
      label: "Drivetrain & brakes",
      target: "shifters",
      matches: (item) => COMPONENT_TYPES.some((type) => type.label === item.category)
    },
    {
      label: "Wheels",
      target: "wheel-brand",
      matches: (item) => item.category === "Wheels"
    },
    {
      label: "Saddle",
      target: "saddle-brand",
      matches: (item) => item.category === "Saddle"
    }
  ];

  const missing = requiredParts.filter((part) => !state.build.some(part.matches));
  const completedCount = requiredParts.length - missing.length;

  if (missing.length === 0) {
    buildCheck.innerHTML = `
      <div class="build-check-complete">
        <strong>Bike check complete</strong>
        <span>All essential sections have a component.</span>
      </div>
    `;
    return;
  }

  buildCheck.innerHTML = `
    <div class="build-check-header">
      <strong>Build check</strong>
      <span>${completedCount}/${requiredParts.length} essential sections</span>
    </div>
    <p class="build-check-message">You can still build a partial bike. Add the missing sections when ready:</p>
    <ul class="build-check-list">
      ${missing.map((part) => `
        <li>
          <a href="#${part.target}">${part.label} not selected</a>
        </li>
      `).join("")}
    </ul>
  `;
}

function updateTotal() {

  const grams =
    state.build.reduce(
      (sum, item) =>
        sum + Number(item.weight_g || 0),
      0
    );

  const kilograms =
    grams / 1000;

  totalWeight.textContent =
    `${kilograms.toFixed(2)} kg`;

  totalGrams.textContent =
    `${Math.round(grams)} g`;
}

resetBuildButton.addEventListener("click", () => {

  state.build = [];

  renderBuild();
});

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

renderBuildCheck();
loadData();
