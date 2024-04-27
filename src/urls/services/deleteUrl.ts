import { error } from "elysia"
import { db } from "../../db"
import { verify } from "../../jwt"

export const deleteUrlService = async ({
  params, token
} : {
  params: { id: string }
  token: string
}) => {
  if (!params.id) {
    return error(400, {
      message: 'Bad Request'
    })
  }

  const tokenVerification = verify(token)

  if (!tokenVerification) {
    return error(401, {
      message: 'Unauthorized'
    })
  }

  await db.url.delete({
    where: {
      id: params.id
    }
  })
}