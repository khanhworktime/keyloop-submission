const activityScreen = document.querySelector("[data-activity-screen]");
if (activityScreen) {
  const events = [...document.querySelectorAll(".event[data-unit]")];
  const comboboxes = [...document.querySelectorAll("[data-unit-combobox]")];
  const filterLayer = document.querySelector("[data-activity-filter-layer]");
  const filterSheet = document.querySelector(".activity-filter-sheet");
  const advancedForm = document.querySelector("[data-advanced-filter-form]");
  const defaultAdvanced = { eventType: "all", date: "any", zone: "all", actor: "all" };
  const units = [...new Map([...document.querySelectorAll("[data-stock]")].map((option) => [option.dataset.stock, { stock: option.dataset.stock, model: option.dataset.model, vin: option.dataset.vin }])).values()];
  const labels = { eventType: { manager: "Manager actions", location: "Location changes", system: "System events" }, date: { 7: "Last 7 days", 120: "Last 120 days" }, zone: { north: "North Zone", east: "East Zone", unassigned: "Unassigned" }, actor: { krist: "Krist Manager", inventory: "Inventory service", system: "System" } };
  let selectedUnit = null;
  let appliedAdvanced = { ...defaultAdvanced };
  let filterOpener = null;
  let unitSnapshot = null;
  const isVisible = (element) => !element.hidden && element.getClientRects().length > 0;
  function setUrlUnit(stock) {
    const url = new URL(window.location.href); stock ? url.searchParams.set("unit", stock) : url.searchParams.delete("unit"); window.history.replaceState({}, "", url);
  }
  function setBackgroundInert(inert) {
    document.querySelectorAll(".review-header,.sidebar,.workspace > :not([data-activity-filter-layer])").forEach((region) => {
      region.toggleAttribute("inert", inert);
      region.toggleAttribute("aria-hidden", inert);
    });
  }
  function updateAdvancedChips() {
    const active = Object.entries(appliedAdvanced).filter(([key, value]) => value !== defaultAdvanced[key]);
    document.querySelectorAll("[data-active-filter-count]").forEach((counter) => {
      counter.textContent = active.length;
      counter.hidden = active.length === 0;
    });
    const chipList = document.querySelector("[data-applied-filters]");
    chipList.replaceChildren(...active.map(([key, value]) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.dataset.removeAdvanced = key;
      chip.textContent = `${labels[key][value]} ×`;
      chip.setAttribute("aria-label", `Remove ${labels[key][value]} filter`);
      return chip;
    }));
  }
  function renderActivity() {
    const visible = events.filter((event) => {
      const unitMatch = !selectedUnit || event.dataset.unit === selectedUnit.stock;
      const typeMatch = appliedAdvanced.eventType === "all" || event.dataset.eventType === appliedAdvanced.eventType;
      const dateMatch = appliedAdvanced.date === "any" || Number(event.dataset.daysAgo) <= Number(appliedAdvanced.date);
      const zoneMatch = appliedAdvanced.zone === "all" || event.dataset.zone === appliedAdvanced.zone;
      const actorMatch = appliedAdvanced.actor === "all" || event.dataset.actor === appliedAdvanced.actor;
      return unitMatch && typeMatch && dateMatch && zoneMatch && actorMatch;
    });
    events.forEach((event) => { event.hidden = !visible.includes(event); });
    const specific = Boolean(selectedUnit);
    document.querySelector("[data-feed-context]").textContent = specific ? `Filtered by Inventory Unit · ${selectedUnit.stock}` : "All inventory · Review fixture";
    document.querySelector("[data-event-count]").textContent = `${visible.length} ${visible.length === 1 ? "event" : "events"}`;
    document.querySelector("[data-activity-live]").textContent = `${visible.length} activity ${visible.length === 1 ? "event" : "events"} shown.`;
    document.querySelector("[data-activity-empty]").hidden = visible.length > 0;
    document.querySelector("[data-mobile-scope]").textContent = specific ? `Inventory: ${selectedUnit.stock}` : "Inventory: All";
    updateAdvancedChips();
  }
  function syncUnitUi() {
    const specific = Boolean(selectedUnit);
    comboboxes.forEach((combobox) => { combobox.hidden = false; });
    document.querySelectorAll("[data-selected-unit]").forEach((token) => {
      token.hidden = !specific;
      token.querySelector("[data-selected-stock]").textContent = selectedUnit?.stock || "";
      token.querySelector("[data-selected-model]").textContent = selectedUnit?.model || "";
    });
    document.querySelectorAll("[data-unit-search]").forEach((input) => { input.value = ""; input.setAttribute("aria-expanded", "false"); });
    document.querySelectorAll("[data-clear-search]").forEach((button) => { button.hidden = true; });
    document.querySelectorAll("[data-unit-options]").forEach((list) => { list.hidden = true; });
    document.querySelectorAll("[data-unit-no-results]").forEach((status) => { status.hidden = true; });
    setUrlUnit(selectedUnit?.stock);
    renderActivity();
  }
  function selectUnit(stock) {
    selectedUnit = units.find((unit) => unit.stock === stock) || null; syncUnitUi();
  }
  function configureCombobox(combobox, index) {
    const input = combobox.querySelector("[data-unit-search]");
    const list = combobox.querySelector("[data-unit-options]");
    const options = [...list.querySelectorAll("[data-stock]")];
    const clear = combobox.querySelector("[data-clear-search]");
    const noResults = combobox.querySelector("[data-unit-no-results]");
    let activeIndex = -1;
    options.forEach((option, optionIndex) => { option.id = `activity-unit-${index}-${optionIndex}`; option.tabIndex = -1; });
    noResults.className = "unit-no-results"; noResults.setAttribute("role", "status"); noResults.setAttribute("aria-live", "polite"); list.after(noResults);
    const filterOptions = () => {
      const query = input.value.trim().toLowerCase();
      const visible = options.filter((option) => `${option.dataset.stock} ${option.dataset.model} ${option.dataset.vin}`.toLowerCase().includes(query));
      options.forEach((option) => { option.hidden = !visible.includes(option); option.setAttribute("aria-selected", "false"); });
      noResults.hidden = visible.length > 0;
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
      clear.hidden = query.length === 0;
      activeIndex = -1;
      input.removeAttribute("aria-activedescendant");
      return visible;
    };
    input.addEventListener("input", filterOptions);
    input.addEventListener("focus", filterOptions);
    input.addEventListener("keydown", (event) => {
      const visible = options.filter((option) => !option.hidden);
      if (["ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        activeIndex = event.key === "ArrowDown" ? Math.min(activeIndex + 1, visible.length - 1) : Math.max(activeIndex - 1, 0);
        visible.forEach((option, optionIndex) => option.setAttribute("aria-selected", String(optionIndex === activeIndex)));
        if (visible[activeIndex]) input.setAttribute("aria-activedescendant", visible[activeIndex].id);
      } else if (event.key === "Enter" && visible[activeIndex]) {
        event.preventDefault();
        selectUnit(visible[activeIndex].dataset.stock);
      } else if (event.key === "Escape" && !list.hidden) {
        event.stopPropagation(); list.hidden = true;
        noResults.hidden = true;
        input.setAttribute("aria-expanded", "false");
      }
    });
    options.forEach((option) => option.addEventListener("click", () => { input.focus({ preventScroll: true }); selectUnit(option.dataset.stock); }));
    clear.addEventListener("click", () => { input.value = ""; input.focus(); filterOptions(); });
  }
  function syncAdvancedForm() {
    Object.entries(appliedAdvanced).forEach(([name, value]) => [...advancedForm.elements[name]].forEach((radio) => { radio.checked = radio.value === value; }));
  }
  function openFilters(opener) {
    filterOpener = opener; unitSnapshot = selectedUnit; syncAdvancedForm(); filterLayer.hidden = false; setBackgroundInert(true);
    [...filterSheet.querySelectorAll("button,input")].find((control) => !control.disabled && isVisible(control))?.focus();
  }
  function closeFilters(commitUnit = false) {
    if (!commitUnit) selectedUnit = unitSnapshot;
    filterLayer.hidden = true; setBackgroundInert(false); syncUnitUi(); filterOpener?.focus();
  }
  comboboxes.forEach(configureCombobox);
  document.querySelectorAll("[data-clear-unit]").forEach((button) => button.addEventListener("click", () => selectUnit(null)));
  document.querySelector("[data-mobile-scope]").addEventListener("click", (event) => openFilters(event.currentTarget));
  document.querySelectorAll("[data-open-activity-filters]").forEach((button) => button.addEventListener("click", () => openFilters(button)));
  document.querySelectorAll("[data-close-activity-filters]").forEach((button) => button.addEventListener("click", () => closeFilters()));
  document.querySelector("[data-reset-advanced]").addEventListener("click", () => {
    Object.entries(defaultAdvanced).forEach(([name, value]) => { advancedForm.querySelector(`[name="${name}"][value="${value}"]`).checked = true; });
  });
  advancedForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(advancedForm);
    appliedAdvanced = Object.fromEntries(Object.keys(defaultAdvanced).map((key) => [key, formData.get(key)]));
    renderActivity();
    closeFilters(true);
  });
  document.querySelector("[data-applied-filters]").addEventListener("click", (event) => {
    const chip = event.target.closest("[data-remove-advanced]");
    if (!chip) return;
    appliedAdvanced[chip.dataset.removeAdvanced] = defaultAdvanced[chip.dataset.removeAdvanced];
    renderActivity();
  });
  document.querySelector("[data-reset-all-filters]").addEventListener("click", () => { appliedAdvanced = { ...defaultAdvanced }; selectUnit(null); });
  filterLayer.addEventListener("click", (event) => { if (event.target === filterLayer) closeFilters(); });
  filterSheet.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const controls = [...filterSheet.querySelectorAll("button,input")].filter((control) => !control.disabled && isVisible(control));
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-unit-combobox]")) return;
    document.querySelectorAll("[data-unit-options]").forEach((list) => { list.hidden = true; });
    document.querySelectorAll("[data-unit-no-results]").forEach((status) => { status.hidden = true; });
    document.querySelectorAll("[data-unit-search]").forEach((input) => input.setAttribute("aria-expanded", "false"));
  });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !filterLayer.hidden) closeFilters(); });
  const requestedUnit = new URLSearchParams(window.location.search).get("unit");
  requestedUnit && units.some((unit) => unit.stock === requestedUnit) ? selectUnit(requestedUnit) : syncUnitUi();
}
