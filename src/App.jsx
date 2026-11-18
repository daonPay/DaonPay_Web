import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import SettingsProvider from './context/SettingsProvider'
import CardPage from './pages/CardPage'
import HomePage from './pages/HomePage'
import MyInfoPage from './pages/MyInfoPage'
import NotFoundPage from './pages/NotFoundPage'
import SupportPage from './pages/SupportPage'
import WhitelistPage from './pages/WhitelistPage'

export default function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="my" element={<MyInfoPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="card" element={<CardPage />} />
            <Route path="whitelist" element={<WhitelistPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  )
}
