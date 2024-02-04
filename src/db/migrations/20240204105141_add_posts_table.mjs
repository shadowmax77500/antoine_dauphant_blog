export const up = async (db) => {
  await db.schema.createTable("posts", (table) => {
    table.increments("id")
    table.text("title").notNullable()
    table.text("content").notNullable()
    table.integer("userId").notNullable()
    table.foreign("userId").references("id").inTable("users")
  })
}

export const down = async (db) => {
  await db.schema.dropTable("posts")
}
