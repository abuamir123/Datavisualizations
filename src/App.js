import "./App.css";
import {Layout, Menu} from "antd";
import MainLayout from "./MainLayout";
const { Header, Content, Footer } = Layout;

function App() {
  const items = new Array(1).fill(null).map((_, index) => ({
    key: index + 1,
    label: "Home",
  }));

  return (
    <>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        </Header>
        <Content
          style={{
            padding: "0 48px",
          }}
        >
          <div
            style={{
              background: "white",
              minHeight: 600,

              padding: 24,
              marginTop: "50px",
              borderRadius: 4,
            }}
          >
            <MainLayout />
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default App;
