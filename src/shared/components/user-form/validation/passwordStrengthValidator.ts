import { userFormValidationConstants } from './userFormValidationConstants.ts';

export const passwordStrengthValidator = (
  password: string,
): { isValid: boolean; message: string } => {
  const upperCaseCharacters = /[A-Z]+/g;
  const lowerCaseCharacters = /[a-z]+/g;
  const numberCharacters = /[0-9]+/g;
  const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

  let errorMessage = '';

  if (password.length < userFormValidationConstants.MIN_PASSWORD_LENGTH) {
    errorMessage += `at least ${userFormValidationConstants.MIN_PASSWORD_LENGTH} characters, `;
  }

  if (password.length > userFormValidationConstants.MAX_PASSWORD_LENGTH) {
    errorMessage += `no more than ${userFormValidationConstants.MAX_PASSWORD_LENGTH} characters, `;
  }
  if (!upperCaseCharacters.test(password)) {
    errorMessage += 'uppercase character, ';
  }
  if (!lowerCaseCharacters.test(password)) {
    errorMessage += 'lowercase character, ';
  }
  if (!numberCharacters.test(password)) {
    errorMessage += 'number, ';
  }
  if (!specialCharacters.test(password)) {
    errorMessage += 'special character, ';
  }

  if (errorMessage === '') {
    return { isValid: true, message: '' };
  } else {
    return {
      isValid: false,
      message: 'Missing: ' + errorMessage.replace(/,\s*$/, ''),
    };
  }
};
