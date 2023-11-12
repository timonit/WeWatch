import { defineEventHandler } from '#imports';
import { H3Event, EventHandlerRequest, readBody } from 'h3';
import { google } from 'googleapis';

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const {
    GOOGLE_CLIENT_ID: clientId,
    GOOGLE_CLIENT_SECRET: clientSecret,
    GOOGE_AUTH_REDIRECT_URI: redirectUri,
  } = process.env;

  const auth = new google.auth.OAuth2({
    clientId,
    clientSecret,
    redirectUri,
  });

  const body = await readBody(event);
  auth.setCredentials(body);
  const { credentials } = await auth.refreshAccessToken();

  return credentials;
});
