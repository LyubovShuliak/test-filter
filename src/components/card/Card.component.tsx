import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type {} from "@mui/lab/themeAugmentation";
import { Link, useParams } from "react-router-dom";
import "./Card.component.scss";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@emotion/react";
interface StandardComponentProps {
  image: string;
  title: string;
  price: string;
  description: string;
}
const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          "&:hover>MuiCardMedia": { width: "600px" },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          "&:hover": {
       
            cursor: "pointer",
            transform: "translateY(80px) scale(1.5)",
            position: "absolute",
            zIndex:"100",
            transition: "transform .3s ease-out",
          },
        },
        img: {
          maxWidth: "220px",
          objectFit: "scale-down",
        },
      },
    },
  },
});
export default function MediaCard({
  image,
  title,
  price,
}: StandardComponentProps) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Card sx={{ height: 500 }}>
          <CardMedia
            component="img"
            height="140"
            image={`${image}`}
            alt={`${title}`}
            sx={{ height: 150 }}
          />

          <CardContent sx={{ maxWidth: 300, height: 220 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ height: 200 }}
            >
              {title}
            </Typography>
            <Typography variant="body2">
              <Button variant="text" color="error">
                {" "}
                {price} $
              </Button>
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained">Add to cart</Button>
          </CardActions>
        </Card>
      </ThemeProvider>
    </div>
  );
}
