const id = {
  label: "id", field: "id", width: "30px",
  filter: true, sort: true, type: "number"
};

const sequence = {
  label: "sequence", field: "sequence", width: "50px",
  filter: true, sort: true, type: "number"
};

const is_draft = {
  label: "draft status", field: "is_draft", width: "30px",
  filter: true, sort: true, type: "boolean"
};

const is_active = {
  label: "active status", field: "is_active", width: "50px",
  filter: true, sort: true, type: "boolean"
};

const create_time = {
  label: "create time", field: "create_time", width: "50px",
  filter: false, sort: true, type: "datetime"
};

const last_modify_time = {
  label: "last modify time", field: "last_modify_time", width: "50px",
  filter: false, sort: true, type: "datetime"
};

const state = {
  label: "state", field: "state", width: "30px",
  filter: true, sort: true, type: "string"
};

const audit_state = {
  label: "audit state", field: "audit_state", width: "30px",
  filter: true, sort: true, type: "string"
};

function sequenceColumns(columns) {
  return [id, ...columns, sequence]
}

function historyColumns(columns) {
  return [id, ...columns, create_time, last_modify_time]
}

function baseColumns(columns) {
  return [id, ...columns, is_draft, is_active, create_time, last_modify_time]
}

function dataColumns(columns) {
  return [id, ...columns, sequence, is_draft, is_active, create_time, last_modify_time]
}

function orderColumns(columns) {
  return [id, ...columns, state, is_draft, is_active, create_time, last_modify_time]
}

function auditOrderColumns(columns) {
  return [id, ...columns, audit_state, state, is_draft, is_active, create_time, last_modify_time]
}

export {
  id, sequence, is_active, is_draft, create_time, last_modify_time, state, audit_state,
  sequenceColumns, historyColumns, baseColumns, dataColumns, orderColumns, auditOrderColumns
}
