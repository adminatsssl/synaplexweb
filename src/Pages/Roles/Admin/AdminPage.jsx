import Layout from "../../Layout/Layout"

export default function AdminPage() {
  const username = localStorage.getItem("username");
  return (
    <Layout username={username}>
      <h1>Welcome, Admin!</h1>
    </Layout>
  );
}

  