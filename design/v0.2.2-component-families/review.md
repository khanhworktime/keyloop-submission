# v0.2.2 Actions & Inputs review

Status: awaiting manager Keep/Fix review

## Assumptions

- Advanced controls are app-owned and follow the `Animate UI → Base UI`
  sourcing hierarchy. Native semantics still define expected browser behavior,
  but native picker/select chrome is not the production design.
- Sourced components must be configured against the global Precision tokens
  and complete state recipes before feature use.
- Inventory Unit is the representative workflow because it exercises Master,
  VIN, date, Zone, Slot, notes, filters, and an explicit save action.
- Mobile demonstrates the same task contract with less comparison detail.

## Review questions

- Is the primary action obvious without making every secondary control quiet?
- Do search, filters, fields, and selection controls feel like one language?
- Are focus, validation, loading, disabled, and success states clear enough?
- Does tablet feel touch-comfortable rather than simply enlarged?
- Does mobile preserve task confidence without carrying the full state matrix?

## Promotion gate

Keep this family at early review. Status & Feedback starts only after the
manager records Keep/Fix feedback on hierarchy, density, state clarity, and
responsive reduction.
