const device = document.querySelector(".device");
const modeButtons = [...document.querySelectorAll("[data-mode-target]")];
const actionSheet = document.querySelector("[data-action-sheet]");
let actionOpener = null;

document.querySelectorAll("svg").forEach((icon) => icon.setAttribute("aria-hidden", "true"));

const controlsScriptUrl = document.currentScript?.src;
if (controlsScriptUrl) {
  const integratedRoutes = {
    Locations: "../../v0.4-management-screens/screens/locations.html",
    "Master Data": "../../v0.4-management-screens/screens/vehicle-masters.html",
    Masters: "../../v0.4-management-screens/screens/vehicle-masters.html",
  };
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    const route = integratedRoutes[link.textContent.trim()];
    if (!route) return;
    link.href = new URL(route, controlsScriptUrl).href;
    link.setAttribute("data-screen-link", "");
  });
}

document.querySelectorAll("time[datetime]").forEach((time) => {
  const label = time.querySelector("span");
  if (label?.textContent.trim() !== "Today") return;
  label.textContent = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(time.dateTime));
});

function setMode(mode) {
  device.dataset.mode = mode;
  modeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.modeTarget === mode));
  });
  document.querySelectorAll("[data-screen-link]").forEach((link) => {
    const target = new URL(link.href, window.location.href);
    target.searchParams.set("mode", mode);
    link.href = target.href;
  });
}

function setBackgroundInert(inert) {
  document.querySelectorAll(".review-header,.sidebar,.workspace > :not([data-action-sheet])").forEach((region) => {
    if (inert) {
      region.setAttribute("inert", "");
      region.setAttribute("aria-hidden", "true");
    } else {
      region.removeAttribute("inert");
      region.removeAttribute("aria-hidden");
    }
  });
}

function closeActionSheet() {
  actionSheet?.setAttribute("hidden", "");
  setBackgroundInert(false);
  actionOpener?.focus();
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.modeTarget));
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".filter-block,.mobile-activity-filter,.filter-bar");
    group?.querySelectorAll("[data-filter]").forEach((peer) => {
      peer.setAttribute("aria-pressed", String(peer === button));
    });
  });
});

document.querySelectorAll("[data-select-row]").forEach((row) => {
  row.setAttribute("tabindex", "0");
  row.setAttribute("aria-selected", String(row.classList.contains("selected")));
  row.querySelectorAll(":scope > :not(.row-action)").forEach((cell) => cell.setAttribute("role", "gridcell"));
  const rowAction = row.querySelector(".row-action");
  const actionCell = document.createElement("span");
  actionCell.className = "row-action-cell";
  actionCell.setAttribute("role", "gridcell");
  rowAction.replaceWith(actionCell);
  actionCell.append(rowAction);
  const select = () => {
    document.querySelectorAll("[data-select-row]").forEach((peer) => {
      peer.classList.toggle("selected", peer === row);
      peer.setAttribute("aria-selected", String(peer === row));
    });
    const cells = [...row.children];
    document.querySelector("[data-detail-title]").textContent = cells[1].querySelector("b").textContent;
    document.querySelector("[data-detail-stock]").textContent = cells[1].querySelector("span").textContent;
    document.querySelector("[data-detail-master]").textContent = cells[2].textContent;
    document.querySelector("[data-detail-age]").textContent = `${cells[3].textContent} · Needs attention`;
    document.querySelector("[data-detail-location]").textContent = cells[4].textContent;
    document.querySelector("[data-detail-action]").textContent = row.dataset.proposedAction;
    const detailLink = document.querySelector("[data-detail-link]");
    const stockNumber = cells[1].querySelector("span").textContent.split(" · ")[0];
    if (row.dataset.detailRoute === "#") {
      detailLink.removeAttribute("href");
      detailLink.removeAttribute("data-screen-link");
      detailLink.textContent = "Detail not composed in this review";
      detailLink.setAttribute("aria-disabled", "true");
    } else {
      const detailTarget = new URL(row.dataset.detailRoute, window.location.href);
      detailTarget.searchParams.set("mode", device.dataset.mode);
      detailLink.href = detailTarget.href;
      detailLink.textContent = `Review ${stockNumber}`;
      detailLink.setAttribute("data-screen-link", "");
      detailLink.removeAttribute("aria-disabled");
    }
  };
  row.addEventListener("click", select);
  row.addEventListener("keydown", (event) => {
    if (event.target !== row) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select();
    }
  });
});

document.querySelectorAll(".ag-head > *").forEach((cell) => cell.setAttribute("role", "columnheader"));

document.querySelectorAll("[data-open-action]").forEach((button) => {
  button.addEventListener("click", () => {
    actionOpener = button;
    actionSheet?.removeAttribute("hidden");
    setBackgroundInert(true);
    actionSheet?.querySelector("button")?.focus();
  });
});

document.querySelectorAll("[data-close-action]").forEach((button) => {
  button.addEventListener("click", closeActionSheet);
});

document.querySelector("[data-save-action]")?.addEventListener("click", () => {
  const action = document.querySelector("[data-action-select]").value;
  const note = document.querySelector("[data-action-note]").value;
  sessionStorage.setItem("precisionPrototypeAction", action);
  sessionStorage.setItem("precisionPrototypeNote", note);
  document.querySelector("[data-action-value]").textContent = action;
  document.querySelector("[data-toast-copy]").textContent = `${action} was added to STK-2048 activity.`;
  closeActionSheet();
  const toast = document.querySelector("[data-toast]");
  toast?.removeAttribute("hidden");
  window.clearTimeout(window.precisionToastTimer);
  window.precisionToastTimer = window.setTimeout(() => toast?.setAttribute("hidden", ""), 5000);
});

actionSheet?.addEventListener("click", (event) => {
  if (event.target === actionSheet) closeActionSheet();
});

actionSheet?.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  const controls = [...actionSheet.querySelectorAll("button,select,textarea")].filter((control) => !control.disabled);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && actionSheet && !actionSheet.hidden) closeActionSheet();
});

const storedAction = sessionStorage.getItem("precisionPrototypeAction");
const storedNote = sessionStorage.getItem("precisionPrototypeNote");
if (storedAction && document.querySelector("[data-action-value]")) {
  document.querySelector("[data-action-value]").textContent = storedAction;
  const actionSelect = document.querySelector("[data-action-select]");
  if (actionSelect) actionSelect.value = storedAction;
  const actionNote = document.querySelector("[data-action-note]");
  if (actionNote) actionNote.value = storedNote || "";
}
if (storedAction && document.querySelector("[data-activity-action]")) {
  document.querySelector("[data-activity-action]").textContent = storedAction;
  document.querySelector("[data-activity-note]").textContent = storedNote || "No manager note recorded.";
}

const requestedMode = new URLSearchParams(window.location.search).get("mode");
setMode(["desktop", "tablet", "mobile"].includes(requestedMode) ? requestedMode : "desktop");
