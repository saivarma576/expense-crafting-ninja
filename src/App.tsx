
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import DashboardV2 from "./components/Dashboard/DashboardV2";
import Expenses from "./components/Expenses";
import NewExpense from "./components/Expenses/NewExpense";
import Receipts from "./components/Receipts";
import Reports from "./components/Reports";
import ReportDetail from "./components/Reports/ReportDetail";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import NotFound from "./pages/NotFound";
import { TravelInfoProvider } from "./contexts/TravelInfoContext";

// Create a new query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard-v2" element={<DashboardV2 />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="expenses/new" element={
              <TravelInfoProvider>
                <NewExpense />
              </TravelInfoProvider>
            } />
            <Route path="receipts" element={<Receipts />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reports/:reportId" element={<ReportDetail />} />
            <Route path="admin" element={<Admin />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
