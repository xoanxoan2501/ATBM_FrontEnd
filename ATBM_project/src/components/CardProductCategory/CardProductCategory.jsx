import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";

export default function CardProductCategory(props) {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        backgroundColor: "#f7f7f7",
        height: "100%",
        borderRadius: "15px",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200" // Set chiều cao cố định cho ảnh
          image={props.url}
          alt="Product Image"
        />
        <CardContent>
          {/* Sử dụng Grid để chia thành các cột */}
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {props.content}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button color="primary">Mua ngay</Button>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
