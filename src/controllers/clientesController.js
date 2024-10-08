import conn from "../config/conn.js"
import { v4 as uuidv4 } from "uuid"

export const getClientes = (request, response) => {
    const selectSQL = /*sql*/`SELECT * FROM clientes`
    connection.query(selectSQL, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao selecionar clientes" });
            return
        }
        const clientes = data
        response.status(200).json(clientes);
    })
};
export const postCliente = (request, response) => {
    const { nome, email } = request.body
    if (!nome) {
        return response.status(400).json({ message: "O nome é obrigatório" })
    }
    if (!email) {
        return response.status(400).json({ message: "O email é obrigatório" })
    }
    if (!email.includes("@")) {
        return response.status(400).json({ message: "O email deve conter '@'" })
    }
    const checkEmailSQL = /*sql*/`SELECT * FROM clientes WHERE ?? = ?`
    const checkData = ["email", email];
    connection.query(checkEmailSQL, checkData, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao verificar email" });
            return
        }
        if (data.length > 0) {
            return response.status(400).json({ message: "Email já está cadastrado." })
        }

        const id = uuidv4();
        const insertSQL = /*sql*/`INSERT INTO clientes (cliente_id, nome, email)
        VALUES ("${id}", "${nome}", "${email}")`
        connection.query(insertSQL, (err, data) => {
            if (err) {
                console.error(err);
                response.status(500).json({ err: "Erro ao cadastrar cliente" });
                return
            }
            response.status(201).json({ message: "Cliente cadastrado com sucesso" });
        });
    });
};
export const putCliente = (request, response) => {
    const { id } = request.params
    const { nome, email } = request.body
    if (!nome) {
        return response.status(400).json({ message: "O nome é obrigatório" })
    }
    if (!email) {
        return response.status(400).json({ message: "O email é obrigatório" })
    }
    if (!email.includes("@")) {
        return response.status(400).json({ message: "O email deve conter '@'" })
    }
    const CheckClienteSQL = /*sql*/`SELECT * FROM clientes WHERE cliente_id = "${id}"`
    connection.query(CheckClienteSQL, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao verificar cliente" });
            return
        }
        if (data.length === 0) {
            return response.status(404).json({ message: "Cliente não encontrado" })
        }
    });
    const checkEmailSQL = /*sql*/`SELECT * FROM clientes WHERE email = "${email}" AND cliente_id != "${id}"`
    connection.query(checkEmailSQL, (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ err: "Erro ao procurar cliente" })
            return
        }
        if (data.length > 0) {
            response.status(409).json({ err: "Email já existe" });
        }
    });
    const updateSQL = /*sql*/`UPDATE clientes SET nome = "${nome}", email = "${email}"
    WHERE cliente_id = "${id}"
    `
    connection.query(updateSQL, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao atualizar cliente" });
            return
        }
        response.status(200).json({ message: "Cliente atualizado com sucesso" });
    });
};
export const deleteCliente = (request, response) => {
    const { id } = request.params
    const deleteClienteSQL = /*sql*/`DELETE FROM clientes WHERE cliente_id = "${id}"
    `
    connection.query(deleteClienteSQL, (err, info) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao deletar cliente" });
            return
        }
        if (info.affectedRows) {
            response.status(404).json({ message: "Cliente não encontrado." })
        }
        response.status(200).json({ message: "Cliente deletado com sucesso." })
    })
};
export const getCliente = (request, response) => {
    const { id } = request.params
    const clienteSQL = /*sql*/`SELECT * FROM clientes WHERE cliente_id = "${id}"`
    connection.query(clienteSQL, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao selecionar cliente" })
            return
        }
        const cliente = data[0]
        response.status(200).json(cliente);

    })

};
export const loginCliente = (request, response) => {
    if (request.body.email && request.body.senha) {
        let email = request.body.email;
        let senha = request.body.senha;
        
        const checkSql = /*sql*/ `SELECT cliente_id, nome, email, senha FROM clientes WHERE email = ? AND senha = ?`;
        const dataSelect = [email, senha];

        conn.query(checkSql, dataSelect, (err, results) => {
            if (err) {
                console.log(err);
                response.status(500).json({ message: "Erro ao buscar dados" })
                return
            }
        })
    }
}

