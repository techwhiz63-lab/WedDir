import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import FamilyExplorerPage from "@/pages/FamilyExplorer";
import WeddingPage from "@/components/WeddingPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/family-explorer" component={FamilyExplorerPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}




// import { Switch, Route } from "wouter";
// import { queryClient } from "./lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import NotFound from "@/pages/not-found";
// import Home from "@/pages/Home";
// import WeddingPage from "@/components/WeddingPage";
// import FamilyExplorerPage from "@/pages/FamilyExplorer";

// function Router() {
//   return (
//     <Switch>
//       <Route path="/" component={Home} />      <Route path="/family-explorer" component={FamilyExplorerPage} />      {/* Fallback to 404 */}
//       <Route component={NotFound} />
//     </Switch>
//   );
// }

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Router />
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;
