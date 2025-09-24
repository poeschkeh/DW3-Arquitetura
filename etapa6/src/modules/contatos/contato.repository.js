
// Importa a função para gerar UUIDs únicos para cada contato
import { randomUUID } from 'node:crypto';

// Importa a instância do banco de dados configurada
import db from '../../infra/database.js';

// Importa a função 'eq' para criar condições de igualdade nas queries
import { eq } from 'drizzle-orm';

// Importa o objeto que representa a tabela 'contatos' do schema do banco
import { contatos } from '../../infra/db/schema.js';


// Classe responsável por acessar e manipular os dados da tabela de contatos
export class ContatoRepository {
  constructor() {
    // Guarda a instância do banco de dados para uso nos métodos
    this.db = db;
    
  }

  // Retorna todos os contatos cadastrados no banco
  async findAll() {
    return this.db.select().from(contatos);
  }


  // Busca um contato pelo seu ID único
  async findById(id) {
    const result = await this.db.select().from(contatos).where(eq(contatos.id, id));
    // Retorna o primeiro resultado ou null se não encontrar
    return result[0] || null;
  }

  // Cria um novo contato no banco de dados
  // Gera um ID único e insere os dados recebidos
  async create(contatoData) {
    const id = randomUUID();
    const result = await this.db.insert(contatos).values({
      id, // ID gerado automaticamente
      ...contatoData, // Demais campos vindos do parâmetro
    }).returning(); // Retorna o registro inserido
    return result[0];
  }


  async create(contatoData) {
  const { nome, email, telefone } = contatoData;
  const id = randomUUID();
  
  const sql = 'INSERT INTO contatos (id, nome, email, telefone) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [id, nome, email, telefone];
  
  const result = await this.db.query(sql, values);
  return result.rows[0];
}

  // Atualiza os dados de um contato existente pelo ID
  async update(id, contatoData) {
    const result = await this.db.update(contatos)
      .set(contatoData) // Define os novos valores
      .where(eq(contatos.id, id)) // Filtra pelo ID
      .returning(); // Retorna o registro atualizado
    return result[0] || null;
  }

  // Remove um contato do banco pelo ID
  // Retorna true se algum registro foi deletado, false caso contrário
  async remove(id) {
    const result = await this.db.delete(contatos)
      .where(eq(contatos.id, id))
      .returning({ id: contatos.id }); // Pede o ID do item deletado de volta

    return result.length > 0;
  }

  // Busca um contato pelo e-mail (útil para evitar duplicidade)
  async findByEmail(email) {
    const result = await this.db.select().from(contatos).where(eq(contatos.email, email));
    return result[0] || null;
  }
}