"use client";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";

export default function SigninPage() {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);
  }
  return (
    <Box>
      <Typography variant="h4">Sign In</Typography>
      <form onSubmit={onSubmit}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <FormControl margin="normal">
            <InputLabel htmlFor="my-email">Email address</InputLabel>
            <Input
              id="my-email"
              name="email"
              aria-describedby="my-email-text"
              type="email"
            />
            <FormHelperText id="my-email-text">
              We&apos;ll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="my-password">Password</InputLabel>
            <Input
              id="my-password"
              name="password"
              aria-describedby="my-password-text"
              type="password"
            />
            <FormHelperText id="my-password-text">
              Your password will be hashed.
            </FormHelperText>
          </FormControl>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
