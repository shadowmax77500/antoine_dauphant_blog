export const up = async (db) => {
  await db.schema.createTable("permissions", (table) => {
    table.increments("id")
    table.text("name")
  })
  await db.schema.alterTable("users", (table) => {
    table.integer("permissionId").notNullable()
    table.foreign("permissionId").references("id").inTable("permissions")
  })
}

export const down = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("permissionId")
  })
  await db.schema.dropTable("permissions")
}
