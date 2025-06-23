import { defineEventHandler } from '#imports';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const lang = 'ru-RU';
  const append_to_response = getRequestURL(event).searchParams.get('append_to_response');
  console.log('Fetching person with ID:', append_to_response);
  const res = await event.$fetch(
    `https://api.themoviedb.org/3/person/${id}`,
    {
      headers: { accept: 'application/json' },
      query: {
        language: lang,
        api_key: process.env.API_KEY,
        append_to_response: append_to_response,
      }
    }
  );
  
  return res;
});
