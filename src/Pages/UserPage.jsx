import Layout from "./Layout/Layout"

export default function UserPage() {
  const username = localStorage.getItem("username");
  return (
    <Layout username={username}>
      <h1>Welcome, User!</h1>
    </Layout>
  );
}

  