const DATA_PATHS = {
  frameset: {
    Specialized: "/data/frameset/specialized.json"
  },

  components: {
    Shimano: "/data/components/shimano.json",
    SRAM: "/data/components/sram.json"
  }
};

const state = {
  frameset: {},
  components: {},
  build: []
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
const totalWeight = document.getElementById("total-weight");
const totalGrams = document.getElementById("total-grams");
const resetBuildButton = document.getElementById("reset-build");

let selectedFrame = null;
let selectedComponent = null;
const selectedComponents = new Map();

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
  populateComponentSelectors();
  const status = document.getElementById("data-status");
  status.textContent = errors.length
    ? `Some data could not be loaded (${errors.join(", ")}). Available data and custom components can still be used.`
    : "";
  status.classList.toggle("hidden", !errors.length);
}

function populateFrameBrands() {
  Object.keys(state.frameset).forEach((brand) => {
    const option = document.createElement("option");

    option.value = brand;
    option.textContent = brand;

    frameBrandSelect.appendChild(option);
  });
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

  const aYear = Number(a.model_year || a.year || 0);
  const bYear = Number(b.model_year || b.year || 0);
  if (aYear !== bYear) return bYear - aYear;

  return `${a.model} ${a.generation}`.localeCompare(`${b.model} ${b.generation}`);
}

function generationRank(value) {
  const match = String(value || "").match(/\b([A-Z])([0-9]+)\b/i);
  if (!match) return 0;
  return (match[1].toUpperCase().charCodeAt(0) * 100) + Number(match[2]);
}

function sortComponentsNewestFirst(a, b) {
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

    const generation = frame.generation
      ? ` · ${frame.generation}`
      : "";

    option.textContent =
      `${frame.model}${generation}`;

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
    return;
  }

  const frameset = state.frameset[brand]
    .slice()
    .sort(sortFramesetsNewestFirst)[index];

  selectedFrame = frameset;

  showFrame(frameset);
});

function showFrame(frame) {
  frameName.textContent =
    `${frame.brand} ${frame.model}`;

  frameConfig.textContent =
    buildFrameDescription(frame);

  const weight = getFrameWeight(frame);

  if (weight === null) {
    frameWeight.textContent = "Weight unavailable";
    frameIncludes.textContent = formatWeightIncludes(frame);
    frameConfig.textContent += " · Complete frame + fork weight unavailable";
    addFrameButton.disabled = true;
  } else {
    frameWeight.textContent = `${weight} g`;
    frameIncludes.textContent = formatWeightIncludes(frame);
    addFrameButton.disabled = false;
  }

  framesetSourceType.textContent =
    getSourceLabel(frame);

  setSourceLink(framesetSource, frame.source_url);

  frameInfo.classList.remove("hidden");
}

function buildFrameDescription(frame) {
  const parts = [];

  if (frame.generation) {
    parts.push(frame.generation);
  }

  if (frame.discipline) {
    parts.push(
      frame.discipline
        .replaceAll("_", " ")
    );
  }

  if (frame.reference_size) {
    parts.push(`Size ${frame.reference_size}`);
  }

  return parts.join(" · ");
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
  if (validWeight(frame.frame_fork_weight_g)) return frame.frame_fork_weight_g;
  if (validWeight(frame.frameset_weight_g)) return frame.frameset_weight_g;
  if (validWeight(frame.frame_weight_g) && validWeight(frame.fork_weight_g)) {
    return frame.frame_weight_g + frame.fork_weight_g;
  }
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
  if (!component.source_url) return "Source unavailable";

  if (
    component.source_type === "official" &&
    component.weight_type === "manufacturer"
  ) {
    return "✓ Manufacturer verified";
  }

  if (
    component.source_type === "independent" &&
    component.weight_type === "measured"
  ) {
    return "✓ Independently measured";
  }

  if (
    component.source_type === "official"
  ) {
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
      `${selectedFrame.brand} ${selectedFrame.model}`,
    meta:
      buildFrameDescription(selectedFrame),
    weight_g: weight,
    source_type:
      selectedFrame.source_type || null
  });

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
  componentSelectors.forEach((type) => {
    type.select.value = "";
  });
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

  updateTotal();
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

loadData();
