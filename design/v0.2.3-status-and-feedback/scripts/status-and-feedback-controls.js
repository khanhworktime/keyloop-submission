const device = document.querySelector('.device');
const stateButtons = [...document.querySelectorAll('[data-state]')];
const modeButtons = [...document.querySelectorAll('[data-mode]')];
const toast = document.querySelector('[data-toast]');
const primaryAction = document.querySelector('[data-primary-action]');
const collectionAction = document.querySelector('[data-collection-action]');
const recoveryPanel = document.querySelector('[data-recovery-panel]');

const stateCopy = {
  normal: { icon: '#i-tick', sync: 'All changes synced', tag: 'Ready', title: 'Move inventory unit', operation: 'Assignment checks are ready. Context remains visible while the operation runs.', primary: 'Move unit', secondary: 'View activity', collectionTitle: 'Inventory is up to date', collectionHeading: '24 units match this view', collection: 'No new exceptions since the last refresh.', action: 'Refresh', toastTitle: 'Inventory ready', toast: 'All manager actions are available.' },
  busy: { icon: '#i-refresh', sync: 'Syncing changes', tag: 'Moving', title: 'Move in progress', operation: 'Checking Slot availability and recording the assignment.', primary: 'Moving…', secondary: 'Keep working', collectionTitle: 'Refreshing inventory', collectionHeading: 'Checking 24 inventory units', collection: 'Existing records stay visible during refresh.', action: 'Refreshing…', toastTitle: 'Move in progress', toast: 'You can continue reviewing this record.' },
  success: { icon: '#i-tick', sync: 'Saved just now', tag: 'Complete', title: 'Inventory unit moved', operation: 'STK-2048 is now assigned to North · N-04.', primary: 'View unit', secondary: 'Undo move', collectionTitle: 'Inventory updated', collectionHeading: '24 units · 3 need attention', collection: 'The new assignment is included in this view.', action: 'View changes', toastTitle: 'Slot assignment saved', toast: 'STK-2048 moved to North · N-04.' },
  error: { icon: '#i-close', sync: '1 change not saved', tag: 'Not moved', title: 'Move could not be saved', operation: 'North · N-04 became occupied. Choose another available Slot or retry.', primary: 'Choose Slot', secondary: 'Retry', collectionTitle: 'Inventory could not refresh', collectionHeading: 'Showing the last available view', collection: 'Data from 14:32 remains visible while you retry.', action: 'Retry refresh', toastTitle: 'Assignment not saved', toast: 'The selected Slot is no longer available.' },
  offline: { icon: '#i-warning', sync: 'Working offline', tag: 'Paused', title: 'Move waiting for connection', operation: 'Your selection is retained locally. Reconnect before the assignment can be confirmed.', primary: 'Reconnect', secondary: 'Cancel move', collectionTitle: 'Offline view', collectionHeading: 'Showing locally available inventory', collection: 'Some status changes may be out of date.', action: 'Reconnect', toastTitle: 'Connection lost', toast: 'Review remains available; changes cannot be saved.' }
};

function setPressed(buttons, active) {
  buttons.forEach((button) => button.setAttribute('aria-pressed', String(button === active)));
}

function applyState(name) {
  const copy = stateCopy[name] || stateCopy.normal;
  device.dataset.demoState = name;
  document.querySelector('[data-sync-copy]').textContent = copy.sync;
  document.querySelector('[data-operation-tag]').textContent = copy.tag;
  document.querySelector('[data-recovery-title]').textContent = copy.title;
  document.querySelector('[data-operation-copy]').textContent = copy.operation;
  primaryAction.textContent = copy.primary;
  document.querySelector('[data-secondary-action]').textContent = copy.secondary;
  document.querySelector('[data-collection-title]').textContent = copy.collectionTitle;
  document.querySelector('[data-collection-heading]').textContent = copy.collectionHeading;
  document.querySelector('[data-collection-copy]').textContent = copy.collection;
  document.querySelector('[data-collection-icon-use]').setAttribute('href', copy.icon);
  collectionAction.textContent = copy.action;
  document.querySelector('[data-toast-title]').textContent = copy.toastTitle;
  document.querySelector('[data-toast-copy]').textContent = copy.toast;
  const isBusy = name === 'busy';
  primaryAction.disabled = isBusy;
  collectionAction.disabled = isBusy;
  recoveryPanel.setAttribute('aria-busy', String(isBusy));
  toast.hidden = false;
  toast.classList.remove('is-hidden');
}

function applyMode(name) {
  const board = document.querySelector('.board-grid');
  const panels = {
    status: document.querySelector('.status-panel'),
    feedback: document.querySelector('.feedback-panel'),
    recovery: document.querySelector('.recovery-panel'),
    collection: document.querySelector('.collection-panel')
  };
  const order = name === 'mobile' ? ['recovery', 'status', 'feedback', 'collection'] : ['status', 'feedback', 'recovery', 'collection'];
  order.forEach((key) => board.append(panels[key]));
  device.dataset.mode = name;
}

stateButtons.forEach((button) => button.addEventListener('click', () => { setPressed(stateButtons, button); applyState(button.dataset.state); }));
modeButtons.forEach((button) => button.addEventListener('click', () => { setPressed(modeButtons, button); applyMode(button.dataset.mode); }));
document.querySelector('[data-dismiss]').addEventListener('click', () => { toast.classList.add('is-hidden'); toast.hidden = true; });

const params = new URLSearchParams(location.search);
const requestedMode = ['desktop', 'tablet', 'mobile'].includes(params.get('mode')) ? params.get('mode') : 'desktop';
const requestedState = Object.hasOwn(stateCopy, params.get('state')) ? params.get('state') : 'normal';
const modeButton = modeButtons.find((button) => button.dataset.mode === requestedMode);
const stateButton = stateButtons.find((button) => button.dataset.state === requestedState);
setPressed(modeButtons, modeButton); setPressed(stateButtons, stateButton);
applyMode(requestedMode); applyState(requestedState);
