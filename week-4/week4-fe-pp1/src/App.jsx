import Layout from "./components/Layout";
import About from "./components/About";
import Services from "./components/Services";
import Tours from "./components/Tours";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Registration from "./components/Registration";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SimpleLayout from "./components/SimpleLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/tours" element={<Tours />} />
                    <Route path="/about" element={<About />} />
                </Route>
                <Route path="/" element={<SimpleLayout />}>
                    <Route path="/registration" element={<Registration />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
