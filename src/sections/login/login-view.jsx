import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import { getCaptcha, getToken } from "../../api/auth";
import Container from "@mui/material/Container";

// import Logo from "../src/components/logo";
import Iconify from "../../components/iconify";
import { useAuthStore } from "../../hooks/use-auth";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaId, setCaptchaId] = useState("");

  useEffect(() => {
    document.title = "Login";
    if (isAuthenticated()) {
      router.replace("/");
    } else {
      refreshCaptcha();
    }
  }, []);

  const refreshCaptcha = () => {
    getCaptcha().then((response) => {
      setCaptchaId(response.captcha_id);
      setCaptchaImage(`data:image/jpeg;base64,${response.captcha}`);
    });
  };

  const handleClick = () => {
    setError("");
    setLoading(true);
    getToken(username, password, captcha, captchaId)
      .then((response) => {
        setToken(
          response.access_token,
          response.refresh_token,
          response.expires_in,
          response.user
        );
        router.replace("/");
      })
      .catch(() => {
        setError("Wrong user credentials");
        setLoading(false);
      });
  };

  const errorMessage = () => {
    if (error.length > 0) {
      return (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5, width: 1 }}
        >
          <Box
            sx={{
              background: "red",
              borderRadius: 1,
              padding: 1,
              textAlign: "center",
              color: "white",
              width: 1,
              fontSize: 14,
            }}
          >
            {error}
          </Box>
        </Stack>
      );
    }
  };

  const renderForm = (
    <>
      {errorMessage()}
      <Stack spacing={3} alignItems="center">
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleClick() : "")}
          fullWidth
          name="username"
          label="Username"
        />

        <TextField
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleClick() : "")}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Card variant="outlined" sx={{ width: 1 }}>
          <Stack direction="row" spacing={2}>
            <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                sx={{
                  width: 140,
                }}
                alt="captcha image"
                src={captchaImage}
              />
            </Box>
            <IconButton sx={{ width: 50, height: 50 }} onClick={refreshCaptcha}>
              <Iconify width={25} icon="uim:refresh"></Iconify>
            </IconButton>
          </Stack>
        </Card>
        <TextField
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleClick() : "")}
          fullWidth
          name="captcha"
          label="Captcha"
          type="number"
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 2 }}
      ></Stack>

      <LoadingButton
        loading={loading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Container
      dir="rtl"
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Card
        sx={{
          p: 4,
          alignSelf: "center",
          width: 1,
          maxWidth: 380,
        }}
      >
        <Typography variant="h4">Enter dashboard</Typography>

        <Divider sx={{ my: 3 }}></Divider>

        {renderForm}
      </Card>
    </Container>
  );
}
