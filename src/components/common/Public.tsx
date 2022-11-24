import { Layout } from "antd";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
import { routes } from "../../routes";

interface PublicProps {
  children: ReactNode;
}

export function Public({ children }: PublicProps) {
  const router = useRouter();
  const { getToken } = useAuth();

  const redirectToPrivate = () => router.push(routes.DASHBOARD);

  useEffect(() => {
    const isLoggedIn = !!getToken();
    if (isLoggedIn) redirectToPrivate();
  });

  return <Layout>{children}</Layout>;
}
