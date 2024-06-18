// next
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const returnTo = encodeURI(`${process.env.NEXTAUTH_URL}/api/auth/callback/cognito`);
  const logoutTo = encodeURI(`${process.env.NEXTAUTH_URL}/login`);
  res.redirect(
    `https://${process.env.REACT_APP_COGNITO_DOMAIN}/logout?response_type=code&client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&redirect_uri=${returnTo}&logout_uri=${logoutTo}`
  );
}
