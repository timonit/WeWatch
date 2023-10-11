export default defineEventHandler(async (event) => {
  const search = getRequestURL(event).searchParams;
  if (!search.get('query')) throw new Error('query required'); 
  const query = search.get('query');
  const lang = 'ru-RU';
  const res = await event.$fetch(
    `https://api.themoviedb.org/3/search/movie`,
    {
      headers: { accept: 'application/json' },
      query: {
        language: lang,
        query: query,
        api_key: process.env.API_KEY,
      }
    }
  );

  return res;
});
