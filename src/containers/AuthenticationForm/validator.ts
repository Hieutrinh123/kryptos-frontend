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
  email: string,
  password: string
): ValidationResult {
  if (!email) {
    return { emailError: "Không được bỏ trống trường email" };
  }
  if (!isEmail(email)) {
    return { emailError: "Email không hợp lệ" };
  }
  if (!password) {
    return { passwordError: "Không được bỏ trống trường mật khẩu" };
  }
  if (!isStrongPassword(password, passwordStrengthOption)) {
    return {
      passwordError:
        "Mật khẩu phải bao gồm ít nhất 8 ký tự, một chữ cái viết hoa, một chữ số, một ký hiệu đặc biệt",
    };
  }

  return {};
}
