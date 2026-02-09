import React, { useState, useEffect } from "react";
import { AuthLayout } from "../../../layouts/AuthLayout";
import { SignUpForm1 } from "./SignUpForm1";
import { SignUpForm2 } from "./SignUpForm2";
import { SignUpForm3 } from "./SignUpForm3";
import { SignUpForm4 } from "./SignUpForm4";
import { useCreateAnAccount } from "../../../hooks/useCreateAnAccountNew";
import { AuthCardLayout } from "../../../layouts/AuthCardLayout";
import { SlideUpWrapper } from "../../../animations/SlideUpWrapper";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const signUpFormData = useCreateAnAccount();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SignUpForm1 setStep={setStep} signUpFormData={signUpFormData} />
        );
      case 2:
        return (
          <SignUpForm2 setStep={setStep} signUpFormData={signUpFormData} />
        );
      case 3:
        return (
          <SignUpForm3 setStep={setStep} signUpFormData={signUpFormData} />
        );
      case 4:
        return <SignUpForm4 />;
      default:
        return null;
    }
  };

  return (
    <AuthLayout
      step={step}
      showStepper={true}
      left={
        <AuthCardLayout
        variant='signup'
          isVisible={visible}
          //title="Let's get started 👍"
          //description="Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard"
        />
      }
    >
      <SlideUpWrapper isVisible={visible}>{renderStep()}</SlideUpWrapper>
    </AuthLayout>
  );
};

export default SignUpPage;