"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

// for passing of custom value
const customValue = (val: number) => `${val}px`;

interface IMediaQueriesBreakpoints {
  custom: (maxNumber: number) => string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

const media: IMediaQueriesBreakpoints = {
  custom: customMediaQuery,
  xs: customMediaQuery(330),
  sm: customMediaQuery(592),
  md: customMediaQuery(768),
  lg: customMediaQuery(992),
  xl: customMediaQuery(1024),
  xxl: customMediaQuery(1200),
};

const colors = {
  primary100: "#84FFFF",
  primary200: "#18FFFF",
  primary400: "#00E5FF",
  primary700: "#00B8D4",
  secondary500: "#00BCD4",
  secondary600: "#00ACC1",
  secondary700: "#00838F",
  brown800: "#263238",
  wallPaperLight: "#FAFAFA",
  wallPaper: "#EEEEEE",
  wallPaperDark: "#607D8B",
  black: "#000",
  white: "#fff",
};

const fontSizes = {
  sm: "12px",
  md: "16px",
  lg: "22px",
  custom: customValue,
};

const spacing = {
  xs: "10px",
  sm: "14px",
  md: "22px",
  custom: customValue,
};

export const theme = {
  colors,
  fontSizes,
  spacing,
  media,
};

interface Props {
  children: ReactNode;
}

export const GlobalTheme = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
