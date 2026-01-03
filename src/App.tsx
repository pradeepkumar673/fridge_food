import { Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { ThemeProvider } from "./components/theme-provider"
import Layout from "./components/layout"
import HomePage from "./pages/home"
import JournalPage from "./pages/journal"
import PlannerPage from "./pages/planner"

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="fridge-feast-theme">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/planner" element={<PlannerPage />} />
        </Routes>
      </Layout>
      <Toaster position="top-center" />
    </ThemeProvider>
  )
}
