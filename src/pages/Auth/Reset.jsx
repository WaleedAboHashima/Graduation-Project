import { useTheme } from "@emotion/react";
import { Box, Button, IconButton, Link, TextField } from "@mui/material";
import { tokens } from "../../theme";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../../theme";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { Formik } from "formik";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AdminReset } from "../../apis/Auth/ResetPassword";
import { AdminForget } from "../../apis/Auth/ForgetPassword";
const Reset = () => {
  // Variables
  const theme = useTheme();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const navigator = useNavigate();
  const State = useSelector((state) => state.reset);
  const [Otp, setOtp] = useState();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  // Functions
  const handleForm = () => {
    dispatch(AdminReset({ Otp }));
  };

  const handleOTP = () => {
    if (State.status === 200) {
      cookies.remove("email");
      cookies.set("userId", State.data.id);
      navigator("/update");
    } else {
      console.log(State.error);
    }
  };

  const handleReset = () => {
    const email = cookies.get("email");
    dispatch(AdminForget({email}))
  }

  useEffect(() => {
    handleOTP();
  }, [State.status]);
  return (
    <Box
      display="flex"
      alignItems="center"
      height="100vh"
      width="100vw"
      justifyContent="center"
    >
      <Box
        backgroundColor={colors.whiteAccent[900]}
        p="10px 10px 10px 10px"
        width="30%"
      >
        <Box textAlign="right">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Box width="100%" height="auto" textAlign="center">
            <img src="../../assets/logo.png" width="50%" />
          </Box>
          {/* Container */}
          <Formik onSubmit={handleForm} initialValues={{ otp: "" }}>
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleBlur,
              handleChange,
            }) => (
              <motion.form
                initial={{ opacity: 0, transition: { duration: 0.5 } }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                onSubmit={handleSubmit}
                style={{ width: "100%", margin: "25% 0" }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap="20px"
                >
                  <TextField
                    autoFocus
                    variant="outlined"
                    title="otp"
                    name="otp"
                    type="number"
                    label="OTP"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onChangeCapture={(e) => setOtp(e.target.value)}
                    error={!!touched.otp && !!errors.otp}
                    value={values.otp}
                    required
                    helperText={touched.otp && errors.otp}
                    sx={{ width: "75%" }}
                  />
                  <Button
                    type="submit"
                    variant="filled"
                    sx={{ backgroundColor: "#307a59", width: "75%" }}
                  >
                    Submit
                  </Button>
                  <Link sx={{cursor: "pointer"}} onClick={handleReset}>Resend OTP?</Link>
                </Box>
              </motion.form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Reset;
