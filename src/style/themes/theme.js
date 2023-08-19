import { createTheme as createMuiTheme } from "@mui/material/styles";

import typography from "./typography";
import paletteBase from "./paletteBase";
import paletteLight from "./paletteLight";
import shadows from "./shadows";

// default
const createTheme = () => {
  const palette = { ...paletteBase, ...paletteLight };
  return createMuiTheme({
    palette,
    typography,
    shadows,
  });
};

const theme = createTheme(false);

export default theme;
