import Layout from "../../Layout/Layout";

export default function LegalPage() {
  const username = localStorage.getItem("username");
  return (
    <Layout username={username}>
      <h1>Welcome, Legal!</h1>
    </Layout>
  );
}
