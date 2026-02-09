import login1 from "../assets/images/login1.png";
import login2 from "../assets/images/login2.png";
import login3 from "../assets/images/login3.png";
import signup1 from "../assets/images/signup1.png";
import signup2 from "../assets/images/signup2.png";
import signup3 from "../assets/images/signup3.png";
import forgotusername1 from "../assets/images/forgotusername1.png";
import forgotusername2 from "../assets/images/forgotusername2.png";
import forgotpwd1 from "../assets/images/forgotpwd1.png";
import forgotpwd2 from "../assets/images/forgotpwd2.png";
import forgotpwd3 from "../assets/images/forgotpwd3.png";

export const AUTH_SLIDES = {
  login: [
    {
      id: 0,
      type: "image",
      image: login1,
      title: "Secure. Fast. Reliable email",
      description:
        "Your messages are protected with industry-grade security, so you can communicate with confidence",
    },
    {
      id: 1,
      type: "image",
      image: login2,
      title: "Your email, organized and secure",
      description:
        "Access your inbox, manage conversations, and stay connected with a fast, reliable, and secure email.",
    },

    {
      id: 2,
      type: "image",
      image: login3,
      title: "Email that works the way you do",
      description:
        "Stay focused with smart inbox management, quick search, and seamless communication.",
    },
  ],

  signup: [
    {
      id: 0,
      type: "image",
      image: signup1,
      title: "Create your secure email account",
      description:
        "Get started with a fast, reliable, and secure email service designed for modern communication.",
    },
    {
      id: 1,
      type: "image",
      image: signup2,
      title: "Set up your email in minutes",
      description:
        "Create your account and start sending, receiving, and managing emails effortlessly.",
    },
    {
      id: 2,
      type: "image",
      image: signup3,
      title: "Email built for focus and efficiency",
      description:
        "Sign up to experience a smarter inbox with powerful organization and search tools.",
    },
  ],

  forgotPassword: [
    {
      id: 0,
      type: "image",
      image: forgotpwd1,
      title: "Reset your password",
      description:
        "Enter your registered email address and we’ll send you instructions to reset your password securely.",
    },
    {
      id: 1,
      type: "image",
      image: forgotpwd2,
      title: "Forgot your password?",
      description:
        "No worries. We’ll help you get back into your account in just a few steps.",
    },
    {
      id: 2,
      type: "image",
      image: forgotpwd3,
      title: "Let’s get you back in",
      description:
        "Verify your mobile number to receive a secure password reset link.",
    },
  ],

  forgotUsername: [
    {
      id: 0,
      type: "image",
      image: forgotusername1,
      title: "Forgot your username?",
      description:
        "Enter your registered email address and we’ll help you recover your username.",
    },
    {
      id: 1,
      type: "image",
      image: forgotusername2,
      title: "Select your email",
      description:
        "Select the email where you’d like to receive account details.",
    },
  ],
};
