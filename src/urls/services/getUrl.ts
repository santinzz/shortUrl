import { error, redirect } from "elysia";
import { findByTinyUrl } from "./findByTinyUrl";

export const getUrlService = async ({
  params
} : {
  params : { tinyUrl: string }
}) => {
  const { tinyUrl } = params;

  try {
    const url = await findByTinyUrl(tinyUrl);
  
    if (!url) {
      return error(404, {
        message: 'URL not found'
      });
    }

    return redirect(url.url);
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}