import { auth } from "../auth";

export const fetchClient = async (url, options) => {
  const session = await auth();
  console.log(`From the fetchClientt ${JSON.stringify(session.accessToken)}`);

  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { Authrization: `Bearer ${session.accessToken}` }),
    },
  });
};
