interface Auth {
  access_token: string;
}

interface TokenPayload {
  email: string;
  role: string;
}

export { Auth, TokenPayload };
