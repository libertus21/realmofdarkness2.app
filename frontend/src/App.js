import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkScrollbar from '@mui/material/darkScrollbar';
import Layout from "./routes/Layout";
import Index from "./routes/Index";
import V5Index from "./routes/v5/V5Index";
import V5 from "./routes/v5/V5";
import V5Commands from "./routes/v5/V5Commands";
import Twentieth from "./routes/20th/20th";
import CoD from "./routes/CoD/CoD";
import { useLayoutEffect } from "react";
import TwentiethIndex from "./routes/20th/20thIndex";
import CodIndex from "./routes/CoD/CodIndex";

const darkTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar(),
      },
    },
  },
  palette: {
    mode: 'dark',
  },
});

function ScrollToTop({children}) {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}

function App() {
  return (     
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />            
              <Route path="v5" element={<V5 />}>
                <Route index element={<V5Index />} />
                <Route path='commands' element={<V5Commands />} />
              </Route>
              <Route path="20th" element={<Twentieth />}>
                <Route index element={<TwentiethIndex />} />
                <Route path='commands' element={<V5Commands />} />
              </Route>
              <Route path="cod" element={<CoD />}>
                <Route index element={<CodIndex />} />
                <Route path='commands' element={<V5Commands />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ScrollToTop>          
      </BrowserRouter> 
    </ThemeProvider>
  );
}

export default App;

function NotFound() {
  return (
    <div>
      <h2>Wha, no page here</h2>
      <Outlet />
    </div>
  );
}