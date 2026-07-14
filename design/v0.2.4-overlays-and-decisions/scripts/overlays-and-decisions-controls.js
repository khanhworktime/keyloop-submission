const device = document.querySelector('.device');
const layerButtons = [...document.querySelectorAll('[data-layer]')];
const modeButtons = [...document.querySelectorAll('[data-mode]')];
const panels = Object.fromEntries([...document.querySelectorAll('[data-panel]')].map((panel) => [panel.dataset.panel, panel]));
const backdrop = document.querySelector('[data-backdrop]');
const trigger = document.querySelector('[data-trigger]');
const sourceCopy = document.querySelector('[data-source-copy]');
const backgroundRegions = [...document.querySelectorAll('[data-background-region]')];
const drawerAction = document.querySelector('[data-drawer-action]');
const dialogAction = document.querySelector('[data-dialog-action]');
const dialogDestination = document.querySelector('[data-dialog-destination]');
let activeLayer = 'popover';
let restoreTarget = trigger;
let returnLayer = null;

const sources = {
  popover: 'Animate UI Base Popover → Base UI Popover primitives.',
  dialog: 'Animate UI Base Dialog → Base UI Dialog primitives.',
  destructive: 'Animate UI Base Alert Dialog → Base UI Alert Dialog primitives.',
  drawer: 'Base UI Drawer → Precision side drawer and bottom sheet.'
};

function setPressed(buttons, active) {
  buttons.forEach((button) => button.setAttribute('aria-pressed', String(button === active)));
}

function focusables(panel) {
  return [...panel.querySelectorAll('button:not([disabled]),input:not([disabled]),[href]')];
}

function applyLayer(name, shouldFocus = false) {
  activeLayer = panels[name] ? name : 'popover';
  const modal = activeLayer !== 'popover';
  Object.entries(panels).forEach(([key, panel]) => { panel.hidden = key !== activeLayer; });
  device.dataset.layer = activeLayer;
  backdrop.hidden = !modal;
  trigger.setAttribute('aria-expanded', String(activeLayer === 'popover'));
  sourceCopy.textContent = sources[activeLayer];
  backgroundRegions.forEach((region) => region.toggleAttribute('inert', modal));
  if (shouldFocus) {
    const initialTarget = activeLayer === 'destructive'
      ? panels.destructive.querySelector('[data-safe-action]')
      : panels[activeLayer];
    initialTarget.focus();
  }
}

function closeActive() {
  if (returnLayer) {
    const target = restoreTarget;
    const layer = returnLayer;
    returnLayer = null;
    applyLayer(layer);
    target?.focus();
    return;
  }
  Object.values(panels).forEach((panel) => { panel.hidden = true; });
  backdrop.hidden = true;
  trigger.setAttribute('aria-expanded', 'false');
  backgroundRegions.forEach((region) => region.removeAttribute('inert'));
  restoreTarget?.focus();
}

function applyMode(name) {
  device.dataset.mode = ['desktop', 'tablet', 'mobile'].includes(name) ? name : 'desktop';
}

layerButtons.forEach((button) => button.addEventListener('click', () => {
  returnLayer = null;
  restoreTarget = button;
  setPressed(layerButtons, button);
  applyLayer(button.dataset.layer, true);
}));
modeButtons.forEach((button) => button.addEventListener('click', () => {
  setPressed(modeButtons, button);
  applyMode(button.dataset.mode);
}));
trigger.addEventListener('click', () => {
  if (!panels.popover.hidden) { closeActive(); return; }
  returnLayer = null;
  restoreTarget = trigger;
  setPressed(layerButtons, layerButtons[0]);
  applyLayer('popover', true);
});
document.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => {
  returnLayer = activeLayer;
  restoreTarget = button;
  const layerButton = layerButtons.find((item) => item.dataset.layer === button.dataset.open);
  setPressed(layerButtons, layerButton);
  applyLayer(button.dataset.open, true);
}));
document.addEventListener('click', (event) => {
  if (!event.target.closest('[data-close]')) return;
  event.preventDefault();
  closeActive();
});
backdrop.addEventListener('click', () => { if (activeLayer !== 'destructive') closeActive(); });
document.addEventListener('click', (event) => {
  if (activeLayer !== 'popover' || panels.popover.hidden) return;
  if (event.target.closest('[data-layer],[data-mode],[data-close],[data-open]')) return;
  if (panels.popover.contains(event.target) || trigger.contains(event.target)) return;
  closeActive();
});

document.addEventListener('keydown', (event) => {
  const panel = panels[activeLayer];
  if (event.key === 'Escape') {
    event.preventDefault();
    if (activeLayer === 'destructive') return;
    closeActive();
    return;
  }
  if (event.key !== 'Tab' || activeLayer === 'popover') return;
  const items = focusables(panel);
  if (!items.length) return;
  const first = items[0];
  const last = items.at(-1);
  if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) { event.preventDefault(); last.focus(); }
  if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

document.querySelectorAll('input[name="zone"]').forEach((input) => input.addEventListener('change', () => {
  if (!input.checked) return;
  drawerAction.textContent = `View ${input.value} Zone Slots`;
}));
document.querySelectorAll('input[name="slot"]').forEach((input) => input.addEventListener('change', () => {
  if (!input.checked) return;
  dialogDestination.textContent = input.value;
  dialogAction.textContent = `Move to ${input.dataset.slot}`;
}));

const params = new URLSearchParams(location.search);
const requestedLayer = panels[params.get('layer')] ? params.get('layer') : 'popover';
const requestedMode = ['desktop', 'tablet', 'mobile'].includes(params.get('mode')) ? params.get('mode') : 'desktop';
const layerButton = layerButtons.find((button) => button.dataset.layer === requestedLayer);
const modeButton = modeButtons.find((button) => button.dataset.mode === requestedMode);
setPressed(layerButtons, layerButton); setPressed(modeButtons, modeButton);
applyMode(requestedMode); applyLayer(requestedLayer, requestedLayer !== 'popover');
