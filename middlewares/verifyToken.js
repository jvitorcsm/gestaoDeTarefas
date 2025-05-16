import jwt from 'jsonwebtoken'
const segredoJwt = process.env.SEGREDO_JWT

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    if (!authHeader) {
      return res.status(401).send({ mensagem: 'Acesso Negado!' })
    }
    const token = authHeader.split(' ')[1]
    const conteudoDoToken = jwt.verify(token, segredoJwt)

    // Melhor colocar o id_usuario aqui
    req.user = { id_usuario: conteudoDoToken.idUsuario }
    
    next()
  } catch (erro) {
    return res.status(401).send({ mensagem: 'Acesso Negado!' })
  }
}

export { verifyToken }
