import { DefaultNamespace } from "next-i18next";
import { TFunction } from "react-i18next";
import validator from "validator";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import strongPasswordOptions = validator.strongPasswordOptions;

const passwordStrengthOption: strongPasswordOptions = {
  minLength: 8,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

interface ValidationResult {
  emailError?: string;
  passwordError?: string;
}
export function validateEmailPassword(
  t: TFunction<DefaultNamespace, string>,
  email: string,
  password: string
): ValidationResult {
  if (!email) {
    return { emailError: t("Email must not be empty") };
  }
  if (!isEmail(email)) {
    return { emailError: t("Invalid Email") };
  }
  if (!password) {
    return { passwordError: t("Password must not be empty") };
  }
  if (!isStrongPassword(password, passwordStrengthOption)) {
    return {
      passwordError: t(
        "Password must contains at least 8 characters, one uppercase letter, one lowercase letter, one symbol"
      ),
    };
  }

  return {};
}
