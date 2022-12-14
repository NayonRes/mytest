import React, { useState } from "react";
import "./App.css"; 
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import { SnackbarProvider } from "notistack"; 
import Layout from "./Layout";
const theme = createTheme({
  palette: {
    primary: {
      main: "#00A9BE",
      contrastText: "#fff",
    },
    // info: {
    //   main: "#273c75",
    //   contrastText: "#fff",
    // },
    // error: {
    //   main: "#F91351",
    //   contrastText: "#fff",
    // },
  },
});

function App() { 
  

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionComponent={Slide}
      >
        <div style={{ maxWidth: "1920px", padding: "40px", margin: "auto" }}>
          <Layout/>
          
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
