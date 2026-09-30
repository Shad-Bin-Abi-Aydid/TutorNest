import { headers } from "next/headers";
import { authClient } from "./auth-client";
import { cache } from "react";

export const getServerSession = cache(async () => {
  const requestHeaders = await headers();

  const session = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: requestHeaders.get("cookie") ?? "",
      },
    },
  });

  return session;
});


