import { Button } from "@/elements";
import Link from "next/link";
import styled from "styled-components";
import { useAuthentication } from "@/hooks";
import { useRouter } from "next/router";

const FooterContent = styled.footer`
  width: 100%;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.wallPaperDark};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
`;
const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.wallPaperDark};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  justify-content: space-around;
  align-items: center;
  padding: 24px 10% 0 10%;
`;
const Logo = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 20px;
  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;
const Ul = styled.ul`
  list-style: none;
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  display: flex;
  align-items: baseline;
`;
const Li = styled.li`
  margin: 0 1rem;
  color: ${({ theme }) => theme.colors.brown800};
  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

function MainNavigation() {
  const { isAuthenticated, logOut } = useAuthentication();
  const route = useRouter();
  return (
    <Header>
      <Link href="/">
        <Logo>Vale Web-App</Logo>
      </Link>
      {isAuthenticated ? (
        <nav>
          <Ul>
            <Li>
              <Button onClick={() => logOut()}>Logout</Button>
            </Li>
          </Ul>
        </nav>
      ) : (
        <nav>
          <Ul>
            <Li>
              <Button onClick={() => route.push("/")}>Login</Button>
            </Li>
            <Li>
              <Button onClick={() => route.push("/sign-up")}>Sign up</Button>
            </Li>
          </Ul>
        </nav>
      )}
    </Header>
  );
}

function Footer() {
  return (
    <FooterContent>
      <Logo style={{ fontSize: "12px" }}>Copyright © Vale Web-App 2023.</Logo>
    </FooterContent>
  );
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: "grid",
        minHeight: "100vh",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <MainNavigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
