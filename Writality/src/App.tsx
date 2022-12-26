import { AuthContextWrapper } from "./contexts/AuthContext";
import { ComponentLoader } from "./components/ComponentLoader";
import { MantineProvider } from "@mantine/core";
function App() {
  return (
    <AuthContextWrapper>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <ComponentLoader>
          <div className="App"></div>
        </ComponentLoader>
      </MantineProvider>
    </AuthContextWrapper>
  );
}

export default App;
