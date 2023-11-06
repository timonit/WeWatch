import { defineEventHandler } from '#imports';
import { H3Event, EventHandlerRequest } from 'h3';
import { google } from 'googleapis';

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const {
    GOOGLE_CLIENT_ID: clientId,
    GOOGLE_CLIENT_SECRET: clientSecret,
  } = process.env;
  const redirectUri='http://localhost:5173/google-auth';

  const auth = new google.auth.OAuth2({
    clientId,
    clientSecret,
    redirectUri,
  });

  const r = getRequestURL(event);
  const { tokens } = await auth.getToken(r.searchParams.get('code') as string);

  return tokens;
});