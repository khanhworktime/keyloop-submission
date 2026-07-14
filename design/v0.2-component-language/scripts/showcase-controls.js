const stage = document.querySelector(".device");
const modeButtons = [...document.querySelectorAll("[data-mode-target]")];
const stateButtons = [...document.querySelectorAll("[data-state-target]")];
const viewButtons = [...document.querySelectorAll("[data-view-target]")];

function selectMode(mode) {
  stage.dataset.mode = mode;
  if (mode !== "tablet") {
    stage.classList.remove("drawer-open");
    document.querySelector("[data-drawer-toggle]")?.setAttribute("aria-expanded", "false");
  }
  modeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.modeTarget === mode));
  });
}

function selectState(state) {
  stage.dataset.state = state;
  stage.querySelectorAll("[data-populated-surface]").forEach((surface) => {
    surface.setAttribute("aria-busy", String(state === "loading"));
  });
  stateButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.stateTarget === state));
  });
}

function selectView(view) {
  stage.dataset.view = view;
  viewButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.viewTarget === view));
  });
  const announcer = document.querySelector("[data-view-announcer]");
  if (announcer) announcer.textContent = `${view === "grid" ? "Grid" : "Table"} view shown`;
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => selectMode(button.dataset.modeTarget));
});

stateButtons.forEach((button) => {
  button.addEventListener("click", () => selectState(button.dataset.stateTarget));
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => selectView(button.dataset.viewTarget));
});

document.querySelector("[data-collapse]")?.addEventListener("click", (event) => {
  const collapsed = stage.classList.toggle("is-collapsed");
  event.currentTarget.setAttribute("aria-pressed", String(collapsed));
});

document.querySelector("[data-drawer-toggle]")?.addEventListener("click", (event) => {
  const open = stage.classList.toggle("drawer-open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
  event.currentTarget.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  event.currentTarget.setAttribute("title", open ? "Close navigation" : "Open navigation");
});
