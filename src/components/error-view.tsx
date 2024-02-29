import { Box, Stack } from "@mui/material";
import PropTypes from "prop-types";

export default function ErrorView({ errors }) {
  if (Object.keys(errors).length > 0) {
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
            textAlign: "left",
            color: "white",
            width: 1,
            fontSize: 14,
          }}
        >
          <ul>
            {Object.values(errors).map((error: any, index) => (
              <li key={index}>
                {translate_error(error.loc)} - {translate_error(error.text)}
              </li>
            ))}
          </ul>
        </Box>
      </Stack>
    );
  } else {
    return <></>;
  }
}

const eMap = {
  "String should have at least 8 characters": "باید حداقل 8 کاراکتر باشد",
  "String should have at least 4 characters": "باید حداقل 4 کاراکتر باشد",
  password: "رمز عبور",
  passwordConfirm: "تکرار رمز عبور",
  name: "نام",
  error: "خطا",
  username: "نام کاربری",
  address: "آدرس",
  "Passwords do not match": "رمز عبور و تکرار آن مطابقت ندارد",
  "Username already exist": "نام کاربری تکراری است",
};

const translate_error = (error: string) => {
  return eMap[error] || error;
};

ErrorView.propTypes = {
  query: PropTypes.object,
};
