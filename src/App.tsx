import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./app/router/AppRouter";
import { queryClient } from "./app/queryClient";

function App() {
 
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  ) 
}

export default App
