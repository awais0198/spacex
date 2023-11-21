import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./components"
import {
  Homepage,
  Error,
} from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
