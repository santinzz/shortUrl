import { db } from "../../db"

export const findByTinyUrl = async (tinyUrl: string) => {
  return db.url.findFirst({
    where: {
      tinyUrl
    }
  })
}