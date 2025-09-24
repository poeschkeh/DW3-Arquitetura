import { pgTable, unique, uuid, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const contatos = pgTable("contatos", {
	id: uuid().primaryKey().notNull(),
	nome: text().notNull(),
	email: text().notNull(),
	telefone: text(),
}, (table) => [
	unique("contatos_email_key").on(table.email),
]);
