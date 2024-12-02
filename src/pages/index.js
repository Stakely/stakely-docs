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
              <span style={{color: "#fff"}}>Welcome to the</span> <span className="main-header--gradient"> Stakely Documentation Hub</span>
          </h1>
          <section className={styles.features}>
            <div className="container">
              <div className="row cards__container">
                <Card
                  to="staking-api/what-is-staking"
                  header={{
                    label:"Staking API"
                  }}
                  body={{
                    label:"A complete B2B solution for adding staking features to your products and services. Tailored for Web3 protocols, financial institutions, service providers, wallets, and more."
                  }}
                  productIcon={{
                      light: 'https://img.stakely.io/assets/stakely-icons/staking_api_light.svg',
                      dark: 'https://img.stakely.io/assets/stakely-icons/staking_api_dark.svg'
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
                  productIcon={{
                      light: 'https://img.stakely.io/assets/stakely-icons/load_balancer_light.svg',
                      dark: 'https://img.stakely.io/assets/stakely-icons/load_balancer_dark.svg'
                  }}
                />

                <Card
                  to="obol-portal/introduction"
                  header={{
                    label:"Obol Portal"
                  }}
                  body={{
                    label:"Stake ETH on Obol DVT without the need to manage infrastructure or validator keys. Developed and operated by Stakely, simplifies staking for users by providing an easy-to-use interface while we handle the technical complexities."
                  }}
                  productIcon={{
                      light: 'https://img.stakely.io/assets/stakely-icons/obol_portal_light.svg',
                      dark: 'https://img.stakely.io/assets/stakely-icons/obol_portal_dark.svg'
                  }}
                />
  
                <Card
                  to="https://stakely.io"
                  header={{
                    label:"Main Website"
                  }}
                  body={{
                    label:"Visit our main website to learn more about Stakely, our products and services, team, tools, and educational content."
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