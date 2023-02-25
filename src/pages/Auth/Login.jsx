import {
  Box,
  IconButton,
  TextField,
  Button,
  Link,
  useMediaQuery,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { ColorModeContext, tokens } from "./../../theme";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { AdminLogin } from "./../../apis/Auth/Login";
import jwt from "jwt-decode";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  // Variables.

  const theme = useTheme();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const AdminData = useSelector((state) => state.login);

  // Functions.

  const handleFormSubmit = () => {
    dispatch(AdminLogin({ email: email, password: password, phone: phone }));
  };

  const handleLogin = () => {
    if (AdminData.status === 200) {
      if (AdminData.data.role === 5050) {
        const decoded = jwt(AdminData.data.token);
        cookies.set("token", AdminData.data.token, {
          expires: new Date(decoded.exp * 1000),
          secure: false,
        });
        cookies.set("username", AdminData.data.username, {
          expires: new Date(decoded.exp * 1000),
        });
        // setOpen(!open);
        window.location.reload();
      } else {
        // setOpen(false);
        console.log("Invalid, U r a user");
      }
    } else {
      // setOpen(false);
    }
  };

  useEffect(() => {
    // setOpen(!open)
    handleLogin();
  }, [AdminData.status]);

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
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={Uschema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <motion.form
                initial={{ opacity: 0, transition: { duration: 0.5 } }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                onSubmit={handleSubmit}
                style={{ margin: "15% 0", width: "100%" }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  gap="20px"
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="email"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onChangeCapture={(e) => setEmail(e.target.value)}
                    value={values.email}
                    required
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ width: "70%" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onChangeCapture={(e) => setPhone(e.target.value)}
                    value={values.phone}
                    name="phone"
                    required
                    error={!!touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                    sx={{ width: "70%" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onChangeCapture={(e) => setPassword(e.target.value)}
                    value={values.password}
                    name="password"
                    required
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ width: "70%" }}
                  />
                  <Button
                    type="submit"
                    sx={{
                      width: "70%",
                      backgroundColor: "#307a59",
                      padding: "10px",
                    }}
                    variant="filled"
                    // onClick={() => setOpen(true)}
                  >
                    Sign In
                  </Button>
                  {AdminData.loading && (
                    <Backdrop
                      sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                      open={AdminData.loading ? true : false}
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  )}

                  <Link sx={{cursor: "pointer"}} onClick={() => navigator("/forgot")} underline="hover">
                    Forgot Password ?
                  </Link>
                </Box>
              </motion.form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

const initialValues = {
  email: "",
  phone: "",
  password: "",
};

const Uschema = yup.object().shape({
  email: yup.string().email().required("Your Email is required."),
  phone: yup
    .number()
    .positive()
    .integer()
    .required("Phone Required")
    .typeError("Invalid Phone Number.")
    .test(
      "12345678910",
      "Invalid Number",
      (val) => val.toString().length === 10
    ),
  password: yup.string().required("Password is Required.").min(5),
});

export default Login;
