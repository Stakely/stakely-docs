import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Card from "../components/Card";



function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
  
    return (
      <Layout title="Homepage" description="Stakely Docs">
        <main className={styles.main}>
          <br />
          <h1
            align="center"
            title="tagline"
            style={{
              fontWeight: "700",
              marginBottom: "0px",
              fontSize: "x-large",
            }}
          >
            <br></br>
            Welcome to the Stakely Documentation Hub
          </h1>
          <section className={styles.features}>
            <div className="container">
              <div className="row cards__container">
                <Card
                  to="staking-api/introduction"
                  header={{
                    label:"Staking API"
                  }}
                  body={{
                    label:"A complete B2B solution for adding staking features to your products and services. Tailored for Web3 protocols, financial institutions, service providers, wallets, and more."
                  }}
                />
  
                <Card
                  to="public-nodes/introduction"
                  header={{
                    label:"Public Nodes"
                  }}
                  body={{
                    label:"A list of public and free-to-use endpoints for various blokchains. Use these nodes to interact with the blockchain without running your own node."
                  }}
                />
  
                <Card
                  href="https://stakely.io"
                  header={{
                    label:"Main Website"
                  }}
                  body={{
                    label:"Visit our main website to learn more about Stakely and our products and services."
                  }}
                />

              </div>
            </div>
          </section>
        </main>

      </Layout>
    );
  }
  
  export default Home;