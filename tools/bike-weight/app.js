const DATA_PATHS = {
  frames: {
    Specialized: "../../data/frames/specialized.json"
  },

  groupsets: {
    Shimano: "../../data/groupsets/shimano.json",
    SRAM: "../../data/groupsets/sram.json"
  }
};


const state = {
  frames: {},
  groupsets: {},
  build: []
};


const frameBrandSelect = document.getElementById("frame-brand");
const frameModelSelect = document.getElementById("frame-model");

const frameInfo = document.getElementById("frame-info");
const frameName = document.getElementById("frame-name");
const frameConfig = document.getElementById("frame-config");
const frameWeight = document.getElementById("frame-weight");
const frameSourceType = document.getElementById("frame-source-type");
const frameSource = document.getElementById("frame-source");
const addFrameButton = document.getElementById("add-frame");


const groupsetBrandSelect = document.getElementById("groupset-brand");
const groupsetComponentSelect = document.getElementById("groupset-component");

const groupsetInfo = document.getElementById("groupset-info");
const groupsetName = document.getElementById("groupset-name");
const groupsetConfig = document.getElementById("groupset-config");
const groupsetWeight = document.getElementById("groupset-weight");
const groupsetSourceType = document.getElementById("groupset-source-type");
const groupsetSource = document.getElementById("groupset-source");
const addGroupsetButton = document.getElementById("add-groupset");


const customNameInput = document.getElementById("custom-name");
const customWeightInput = document.getElementById("custom-weight");
const addCustomButton = document.getElementById("add-custom");


const buildList = document.getElementById("build-list");
const totalWeight = document.getElementById("total-weight");
const totalGrams = document.getElementById("total-grams");
const resetBuildButton = document.getElementById("reset-build");


let selectedFrame = null;
let selectedGroupsetComponent = null;



async function loadJSON(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }

  return response.json();
}



async function loadData() {
  try {

    for (const [brand, path] of Object.entries(DATA_PATHS.frames)) {
      state.frames[brand] = await loadJSON(path);
    }

    for (const [brand, path] of Object.entries(DATA_PATHS.groupsets)) {
      state.groupsets[brand] = await loadJSON(path);
    }

    populateFrameBrands();
    populateGroupsetBrands();

  } catch (error) {
    console.error(error);

    alert(
      "Some component data could not be loaded. Check the JSON paths and run the site through a local server."
    );
  }
}



function populateFrameBrands() {
  Object.keys(state.frames).forEach((brand) => {
    const option = document.createElement("option");

    option.value = brand;
    option.textContent = brand;

    frameBrandSelect.appendChild(option);
  });
}



function populateGroupsetBrands() {
  Object.keys(state.groupsets).forEach((brand) => {
    const option = document.createElement("option");

    option.value = brand;
    option.textContent = brand;

    groupsetBrandSelect.appendChild(option);
  });
}



frameBrandSelect.addEventListener("change", () => {
  const brand = frameBrandSelect.value;

  selectedFrame = null;

  frameInfo.classList.add("hidden");

  frameModelSelect.innerHTML = `
    <option value="">Select frame</option>
  `;

  if (!brand) {
    frameModelSelect.disabled = true;
    return;
  }

  const frames = state.frames[brand];

  frames.forEach((frame, index) => {
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

  const frame = state.frames[brand][index];

  selectedFrame = frame;

  showFrame(frame);
});



function showFrame(frame) {
  frameName.textContent =
    `${frame.brand} ${frame.model}`;

  frameConfig.textContent =
    buildFrameDescription(frame);

  const weight = getFrameWeight(frame);

  if (weight === null) {
    frameWeight.textContent = "Weight unavailable";
    addFrameButton.disabled = true;
  } else {
    frameWeight.textContent = `${weight} g`;
    addFrameButton.disabled = false;
  }

  frameSourceType.textContent =
    getSourceLabel(frame);

  frameSource.href =
    frame.source_url || "#";

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



function getFrameWeight(frame) {

  if (
    typeof frame.frameset_weight_g === "number"
  ) {
    return frame.frameset_weight_g;
  }

  if (
    typeof frame.frame_weight_g === "number" &&
    typeof frame.fork_weight_g === "number"
  ) {
    return (
      frame.frame_weight_g +
      frame.fork_weight_g
    );
  }

  if (
    typeof frame.frame_weight_g === "number"
  ) {
    return frame.frame_weight_g;
  }

  return null;
}



groupsetBrandSelect.addEventListener("change", () => {
  const brand = groupsetBrandSelect.value;

  selectedGroupsetComponent = null;

  groupsetInfo.classList.add("hidden");

  groupsetComponentSelect.innerHTML = `
    <option value="">Select component</option>
  `;

  if (!brand) {
    groupsetComponentSelect.disabled = true;
    return;
  }

  const components =
    state.groupsets[brand];

  const usableComponents =
    components.filter((component) => {
      return (
        typeof component.weight_g === "number" &&
        component.category !== "groupset_reference"
      );
    });

  usableComponents.forEach((component) => {

    const option =
      document.createElement("option");

    option.value = component.id;

    option.textContent =
      formatComponentOption(component);

    groupsetComponentSelect.appendChild(option);

  });

  groupsetComponentSelect.disabled = false;
});



groupsetComponentSelect.addEventListener("change", () => {
  const brand = groupsetBrandSelect.value;
  const id = groupsetComponentSelect.value;

  if (!id) {
    selectedGroupsetComponent = null;
    groupsetInfo.classList.add("hidden");
    return;
  }

  const component =
    state.groupsets[brand].find(
      (item) => item.id === id
    );

  selectedGroupsetComponent = component;

  showGroupsetComponent(component);
});



function formatComponentOption(component) {
  const pieces = [];

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



function showGroupsetComponent(component) {

  groupsetName.textContent =
    `${component.brand} ${component.model || component.series}`;

  groupsetConfig.textContent =
    component.configuration || "";

  groupsetWeight.textContent =
    `${component.weight_g} g`;

  groupsetSourceType.textContent =
    getSourceLabel(component);

  groupsetSource.href =
    component.source_url || "#";

  groupsetInfo.classList.remove("hidden");
}



function getSourceLabel(component) {

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
    id: `build-${Date.now()}`,
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



addGroupsetButton.addEventListener("click", () => {

  if (!selectedGroupsetComponent) {
    return;
  }

  addToBuild({
    id: `build-${Date.now()}`,
    category:
      selectedGroupsetComponent.category || "Groupset",
    name:
      `${selectedGroupsetComponent.brand} ${
        selectedGroupsetComponent.model ||
        selectedGroupsetComponent.series
      }`,
    meta:
      selectedGroupsetComponent.configuration || "",
    weight_g:
      selectedGroupsetComponent.weight_g,
    source_type:
      selectedGroupsetComponent.source_type || null
  });

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
    id: `build-${Date.now()}`,
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