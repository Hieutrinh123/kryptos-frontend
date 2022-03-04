import {
  Avatar,
  Button,
  Grid,
  Paper,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";

import React from "react";
import { interactiveGroup } from "./data";
interface AuthorInformationProps {}

const AuthorInformation: React.FC<AuthorInformationProps> = ({}) => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Paper
      elevation={1}
      sx={(theme) => ({
        padding: theme.spacing(3),
      })}
    >
      <Grid
        container
        direction={{ md: "row", xs: "column" }}
        columnSpacing={{ md: 8, xs: 0 }}
        sx={{
          flexWrap: "nowrap",
        }}
      >
        <Grid item container direction="row" sm={5} xs={12}>
          <Grid item xs={5}>
            <Avatar
              sx={(theme) => ({
                maxWidth: "145px",
                maxHeight: "145px",
                width: "100%",
                height: "100%",
                flexShrink: "0",
                [theme.breakpoints.down("sm")]: {
                  maxWidth: "80px",
                  maxHeight: "80px",
                },
              })}
            />
          </Grid>

          <Grid
            item
            container
            xs={7}
            direction="column"
            paddingLeft={{ sm: 2 }}
          >
            <Typography
              sx={(theme) => ({
                fontSize: "18px",
                fontWeight: "700",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "16px",
                },
              })}
            >
              Tác giả
            </Typography>
            <Typography
              gutterBottom={true}
              sx={{
                fontSize: "24px",
                fontWeight: "900",
              }}
            >
              Lorem ipsum
            </Typography>
            <Stack
              direction="row"
              sx={(theme) => ({
                "& > div ~ div": {
                  ml: theme.spacing(2),
                },
              })}
            >
              {interactiveGroup.map((item, index) => (
                <Stack direction="row" alignItems="center" key={index}>
                  <Image src={item.image} alt={item.title} />
                  <Typography
                    color="secondary"
                    sx={(theme) => ({
                      ml: theme.spacing(1),
                      fontSize: "14px",
                      fontWeight: "400",
                    })}
                  >
                    {item.numInteractive}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            {!isMobile && (
              <Button
                variant="contained"
                sx={(theme) => ({
                  my: theme.spacing(2),
                  height: "48px",
                  borderRadius: "12px",
                })}
              >
                <span>Đã theo dõi</span>
              </Button>
            )}
          </Grid>
        </Grid>
        {isMobile && (
          <Button
            variant="contained"
            sx={(theme) => ({
              my: theme.spacing(2),
              height: "48px",
              borderRadius: "12px",
            })}
          >
            <span>Đã theo dõi</span>
          </Button>
        )}
        <Grid item sm={7} xs={12} marginTop={{ xs: 3, md: 0 }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            Giới thiêụ
          </Typography>
          <Typography
            component="sub"
            sx={{
              fontSize: "16px",
              lineHeight: "19px",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            repellendus et. Veniam blanditiis fuga cupiditate tempore,
            laboriosam asperiores rerum eius, quis tenetur quasi, id ad
            recusandae! Voluptas nobis alias incidunt! Possimus asperiores et
            fuga ut iusto laborum natus, ipsam sint delectus nulla magni neque
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AuthorInformation;
