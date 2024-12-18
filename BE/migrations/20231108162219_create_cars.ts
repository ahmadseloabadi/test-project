import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.bigIncrements("id").primary();
    table.string("car_name", 30).notNullable();
    table.integer("car_rentperday", 30).notNullable();
    table.string("car_size", 30).notNullable();
    table.text("car_img");
    table.bigInteger("create_by");
    table.bigInteger("update_by");
    table.bigInteger("delete_by");
    table.timestamp("create_at");
    table.timestamp("update_at");
    table.timestamp("delete_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
