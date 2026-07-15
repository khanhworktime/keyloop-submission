import type {
  Activity,
  InventoryAction,
  InventoryUnit,
  PersistedInventoryStateV1,
  VehicleMaster,
} from "../../domain/inventory-types";

export const SEED_REFERENCE_NOW = new Date("2026-07-15T12:00:00.000Z");

const vehicleMasters: VehicleMaster[] = [
  {
    id: "VM-014",
    make: "Aster",
    model: "A7",
    variant: "Touring",
    type: "Passenger car",
  },
  {
    id: "VM-021",
    make: "Northstar",
    model: "E2",
    variant: "Motion",
    type: "Electric crossover",
  },
  {
    id: "VM-009",
    make: "Vela",
    model: "C4",
    variant: "Urban",
    type: "Compact crossover",
  },
  {
    id: "VM-011",
    make: "Aster",
    model: "A5",
    variant: "Sport",
    type: "Passenger car",
  },
  {
    id: "VM-028",
    make: "Solace",
    model: "C4",
    variant: "Executive",
    type: "Passenger car",
  },
  {
    id: "VM-032",
    make: "Northstar",
    model: "E1",
    variant: "City",
    type: "Electric hatchback",
  },
  { id: "VM-036", make: "Vela", model: "T6", variant: "Trail", type: "SUV" },
  {
    id: "VM-041",
    make: "Aster",
    model: "B3",
    variant: "Core",
    type: "Hatchback",
  },
  {
    id: "VM-045",
    make: "Solace",
    model: "V8",
    variant: "Estate",
    type: "Estate",
  },
];

const priceReview: InventoryAction = {
  type: "price-reduction-planned",
  note: "Review pricing against comparable units before Friday.",
  recordedAt: "2026-07-14T07:32:00.000Z",
  actor: "Manager",
};

const marketingReview: InventoryAction = {
  type: "marketing-campaign-review",
  recordedAt: "2026-07-13T09:15:00.000Z",
  actor: "Manager",
};

const inventoryUnits: InventoryUnit[] = [
  {
    id: "IU-2048",
    vehicleMasterId: "VM-014",
    vin: "WDD2231861A002048",
    stockNumber: "STK-2048",
    arrivalDate: "2026-03-09T10:00:00.000Z",
    inventoryStatus: "available",
    zoneSlot: "North · N-04",
    latestAction: null,
  },
  {
    id: "IU-1934",
    vehicleMasterId: "VM-021",
    vin: "NTH48277P18",
    stockNumber: "STK-1934",
    arrivalDate: "2026-03-20T09:30:00.000Z",
    inventoryStatus: "available",
    latestAction: priceReview,
  },
  {
    id: "IU-1918",
    vehicleMasterId: "VM-009",
    vin: "VEL00419C4U",
    stockNumber: "STK-1918",
    arrivalDate: "2026-04-02T11:00:00.000Z",
    inventoryStatus: "available",
    latestAction: null,
  },
  {
    id: "IU-1886",
    vehicleMasterId: "VM-011",
    vin: "AST9921A5S",
    stockNumber: "STK-1886",
    arrivalDate: "2026-04-10T14:00:00.000Z",
    inventoryStatus: "reserved",
    latestAction: marketingReview,
  },
  {
    id: "IU-2095",
    vehicleMasterId: "VM-028",
    vin: "SLC2026C40002095",
    stockNumber: "STK-2095",
    arrivalDate: "2026-04-15T08:00:00.000Z",
    inventoryStatus: "available",
    latestAction: null,
  },
  {
    id: "IU-2096",
    vehicleMasterId: "VM-032",
    vin: "NST2026E10002096",
    stockNumber: "STK-2096",
    arrivalDate: "2026-04-16T08:00:00.000Z",
    inventoryStatus: "available",
    latestAction: null,
  },
  {
    id: "IU-2097",
    vehicleMasterId: "VM-036",
    vin: "VEL2026T60002097",
    stockNumber: "STK-2097",
    arrivalDate: "2026-04-17T08:00:00.000Z",
    inventoryStatus: "available",
    latestAction: null,
  },
  {
    id: "IU-2072",
    vehicleMasterId: "VM-041",
    vin: "AST2026B30002072",
    stockNumber: "STK-2072",
    arrivalDate: "2026-05-01T12:00:00.000Z",
    inventoryStatus: "available",
    latestAction: null,
  },
  {
    id: "IU-2084",
    vehicleMasterId: "VM-028",
    vin: "SLC2026C40002084",
    stockNumber: "STK-2084",
    arrivalDate: "2026-05-16T12:00:00.000Z",
    inventoryStatus: "sold",
    latestAction: null,
  },
  {
    id: "IU-2104",
    vehicleMasterId: "VM-045",
    vin: "SLC2026V80002104",
    stockNumber: "STK-2104",
    arrivalDate: "2026-05-30T12:00:00.000Z",
    inventoryStatus: "available",
    latestAction: null,
  },
  {
    id: "IU-2112",
    vehicleMasterId: "VM-021",
    vin: "NST2026E20002112",
    stockNumber: "STK-2112",
    arrivalDate: "2026-06-15T12:00:00.000Z",
    inventoryStatus: "reserved",
    latestAction: null,
  },
  {
    id: "IU-2091",
    vehicleMasterId: "VM-032",
    vin: "NST2026E10002091",
    stockNumber: "STK-2091",
    arrivalDate: "2026-07-07T12:00:00.000Z",
    inventoryStatus: "available",
    latestAction: null,
  },
];

function arrivalActivity(unit: InventoryUnit, index: number): Activity {
  return {
    id: `ACT-ARR-${String(index + 1).padStart(3, "0")}`,
    unitId: unit.id,
    eventType: "inventory-arrived",
    timestamp: unit.arrivalDate,
    actor: "Inventory Feed",
    title: "Inventory unit received",
    detail: `${unit.stockNumber} was added to inventory.`,
  };
}

const activities: Activity[] = [
  ...inventoryUnits.map(arrivalActivity),
  {
    id: "ACT-STATUS-001",
    unitId: "IU-2048",
    eventType: "status-changed",
    timestamp: "2026-04-10T02:41:00.000Z",
    actor: "Inventory System",
    title: "Inventory inspection completed",
    detail: "Unit marked available and ready for manager review.",
  },
  {
    id: "ACT-MGR-001",
    unitId: "IU-1934",
    eventType: "manager-action",
    timestamp: priceReview.recordedAt,
    actor: priceReview.actor,
    title: "Price reduction planned",
    detail: "A proposed action was recorded for this aging unit.",
    actionType: priceReview.type,
    note: priceReview.note,
  },
  {
    id: "ACT-MGR-002",
    unitId: "IU-1886",
    eventType: "manager-action",
    timestamp: marketingReview.recordedAt,
    actor: marketingReview.actor,
    title: "Marketing campaign review",
    detail: "A proposed action was recorded for this aging unit.",
    actionType: marketingReview.type,
  },
];

export function createInventorySeed(): PersistedInventoryStateV1 {
  return structuredClone({
    version: 1,
    vehicleMasters,
    inventoryUnits,
    activities,
  });
}
