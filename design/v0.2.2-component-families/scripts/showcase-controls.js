const stage = document.querySelector(".device");
const modeButtons = [...document.querySelectorAll("[data-mode-target]")];
const demoButtons = [...document.querySelectorAll("[data-demo-target]")];
const railLinks = [...document.querySelectorAll(".rail-tab")];
const form = document.querySelector("#inventory-form");
const vin = document.querySelector("#vin");
const vinField = vin.closest(".field");
const vinMessage = document.querySelector("[data-vin-message]");
const zoneField = document.querySelector("#zone").closest(".field");
const zoneMessage = document.querySelector("[data-zone-message]");
const formStatus = document.querySelector("[data-form-status]");
const liveRegion = document.querySelector("[data-live-region]");
const saveButtons = [...document.querySelectorAll("[data-save-label]")].map((label) => label.closest("button"));
let saveTimer;

function selectMode(mode) {
  stage.dataset.mode = mode;
  modeButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.modeTarget === mode)));
}

function setValidation(visible) {
  vinField.classList.toggle("is-error", visible);
  zoneField.classList.toggle("is-success", visible);
  vin.setAttribute("aria-invalid", String(visible));
  vinMessage.textContent = visible ? "Enter a complete 17-character VIN." : "17-character vehicle identifier.";
  zoneMessage.textContent = visible ? "North Zone is available." : "Choose a Zone before its Slot.";
}

function setBusy(busy) {
  stage.setAttribute("aria-busy", String(busy));
  formStatus.classList.remove("is-saved");
  saveButtons.forEach((button) => { button.disabled = busy; });
  document.querySelectorAll("[data-save-label]").forEach((label) => { label.textContent = busy ? "Saving…" : label.closest(".header-save") ? "Save unit" : "Save inventory unit"; });
  formStatus.innerHTML = `<span></span>${busy ? "Saving" : "Draft"}`;
}

function selectDemo(state) {
  clearTimeout(saveTimer);
  stage.dataset.demoState = state;
  demoButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.demoTarget === state)));
  setValidation(state === "validation");
  setBusy(state === "busy");
  liveRegion.textContent = state === "validation" ? "Validation examples shown." : state === "busy" ? "Saving state shown." : "Normal component state shown.";
}

const requestedMode = new URLSearchParams(window.location.search).get("mode");
if (["desktop", "tablet", "mobile"].includes(requestedMode)) selectMode(requestedMode);

modeButtons.forEach((button) => button.addEventListener("click", () => selectMode(button.dataset.modeTarget)));
demoButtons.forEach((button) => button.addEventListener("click", () => selectDemo(button.dataset.demoTarget)));
railLinks.forEach((link) => link.addEventListener("click", () => {
  railLinks.forEach((item) => {
    item.classList.toggle("active", item === link);
    if (item === link) item.setAttribute("aria-current", "location");
    else item.removeAttribute("aria-current");
  });
}));
document.querySelectorAll("[data-filter-chip]").forEach((button) => button.addEventListener("click", () => button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"))));
document.querySelector("[data-clear-filters]").addEventListener("click", () => {
  document.querySelectorAll("[data-filter-chip]").forEach((button) => button.setAttribute("aria-pressed", "false"));
  liveRegion.textContent = "Inventory filters cleared.";
});

const switchControl = document.querySelector("[data-switch]");
switchControl.addEventListener("click", () => {
  const checked = switchControl.getAttribute("aria-checked") !== "true";
  switchControl.setAttribute("aria-checked", String(checked));
  document.querySelector("[data-switch-copy]").textContent = checked ? "On · archived records included" : "Off · current records only";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const valid = /^[A-Z0-9]{17}$/i.test(vin.value.trim());
  if (!valid) {
    selectDemo("validation");
    vin.focus();
    liveRegion.textContent = "Inventory unit not saved. Correct the VIN field.";
    return;
  }
  selectDemo("busy");
  saveTimer = window.setTimeout(() => {
    selectDemo("normal");
    formStatus.innerHTML = "<span></span>Saved";
    formStatus.classList.add("is-saved");
    liveRegion.textContent = "Inventory unit saved in this local demonstration.";
  }, 900);
});

form.addEventListener("reset", () => window.setTimeout(() => {
  selectDemo("normal");
  formStatus.classList.remove("is-saved");
  liveRegion.textContent = "Form reset to its specimen values.";
}, 0));
