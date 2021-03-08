import { NowRequest, NowResponse } from '@vercel/node';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default (req: NowRequest, res: NowResponse) =>
  NextAuth(req, res, {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      Providers.Twitter({
        clientId: process.env.TWITTER_ID,
        clientSecret: process.env.TWITTER_SECRET,
      }),
      Providers.Facebook({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
      Providers.LinkedIn({
        clientId: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
    ],

    // debug: process.env.NODE_ENV === 'development',
    debug: true,
    secret: process.env.AUTH_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  });
