import jwt from 'jsonwebtoken'
const segredoJwt = process.env.SEGREDO_JWT

const verifyToken = (req, res, next) => {
    try {
        // Importar o token que virá no Header da req
        const { token } = req.headers
        if (!token) {
            return res.status(404).send({ mensagem: 'Acesso Negado!' })
        }

        //Se estiver token, usarmos o pacote jwt para validá-lo (verifica se não expirou, se foi gerado com o mesmo segredo pela mesma API)
        const conteudoDoToken = jwt.verify(token, segredoJwt)
        //Identifica qual usuário foi gerado o token
        const id_usuario = conteudoDoToken.idUsuario
        // registra a requisição o ID identificado
        req.body.id_usuario = id_usuario
        //Enviar para o controller
        next()
    } catch (erro) {
        // Barrar a requisição para não ir ao controller
        return res.status(404).send({ mensagem: 'Acesso Negado!' })
    }
}

export {verifyToken}