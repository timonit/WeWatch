import { defineEventHandler } from '#imports';
import { H3Event, EventHandlerRequest, sendRedirect } from 'h3';
import { google } from 'googleapis';

export default defineEventHandler((event: H3Event<EventHandlerRequest>) => {
  const {
    GOOGLE_CLIENT_ID: clientId,
    GOOGLE_CLIENT_SECRET: clientSecret,
    GOOGE_AUTH_REDIRECT_URI: redirectUri,
  } = process.env;
  const scope = 'email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive openid https://www.googleapis.com/auth/userinfo.profile';

  const auth = new google.auth.OAuth2({
    clientId,
    clientSecret,
    redirectUri,
  });

  const url = auth.generateAuthUrl({
    scope,
    include_granted_scopes: true,
    response_type: 'code',
    prompt: 'select_account',
    access_type: 'offline',
  });

  return sendRedirect(event, url, 302);
});
