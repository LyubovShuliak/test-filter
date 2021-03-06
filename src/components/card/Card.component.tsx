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
    MuiCardMedia: {
      styleOverrides: {
        img: {
          maxWidth: "220px",
          objectFit: "scale-down",
          margin: "auto",
          padding: "20px",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "16px 16px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          paddingLeft: "8px",
        },
        button: {
          paddingLeft: "16px",
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
    <>
      <ThemeProvider theme={theme}>
        <Card
          sx={{
            height: 500,
            display: "flex",
            width: 400,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <CardMedia
              component="img"
              height="140"
              image={`${image}`}
              alt={`${title}`}
              sx={{ height: 150 }}
            />

            <CardContent
              sx={{
                display: "flex",
                justifyItems: "end",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ justifySelf: "flex-end", fontSize: "20px" }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {title}
              </Typography>
            </CardContent>
          </div>

          <div>
            <Typography variant="body2">
              <Button variant="text" color="error">
                {" "}
                {price} $
              </Button>
            </Typography>
            <CardActions>
              <Button variant="contained">Add to cart</Button>
            </CardActions>
          </div>
        </Card>
      </ThemeProvider>
    </>
  );
}
