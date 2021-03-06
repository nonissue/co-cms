import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

// console.log(
//   `${process.env.SITE}  / ${process.env.GITHUB_ID} ${process.env.GITHUB_SECRET}`
// );

const options = {
  site: process.env.SITE || 'http://localhost:3000',
  debug: true,

  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // get user id since email won't always be returned from github
  // https://github.com/iaincollins/next-auth/issues/366
  session: {
    jwt: true,
  },
  // get user id since email won't always be returned from github
  // https://github.com/iaincollins/next-auth/issues/366
  callbacks: {
    async session(session, token) {
      // expose user id
      return Promise.resolve({
        ...session,
        user: { ...session.user, id: token.account.id },
      });
    },
  },

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
