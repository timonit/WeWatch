import { defineEventHandler } from '#imports';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const lang = 'ru-RU';
  const res = await event.$fetch(
    `https://api.themoviedb.org/3/tv/${id}`,
    {
      headers: { accept: 'application/json' },
      query: {
        language: lang,
        api_key: process.env.API_KEY,
        append_to_response: 'credits',
      }
    }
  );
  
  return res;
});
