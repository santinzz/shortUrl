import { db } from "../../db"

export const findByEmail = async (email: string) => {
  return db.user.findFirst({
    where: {
      email
    }
  })
}