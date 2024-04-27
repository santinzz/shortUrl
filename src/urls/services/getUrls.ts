import { db } from "../../db"
import { verify } from "../../jwt";

export const getUrlsService = async ({ token }: { token: string }) => {
  const { data } = verify(token);

  return await db.url.findMany({
    where: {
      userId: data
    }
  });
}