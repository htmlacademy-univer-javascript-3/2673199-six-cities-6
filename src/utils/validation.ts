export function getEmailErrorFromInput(input: HTMLInputElement): string | null {
  const { value, validity, validationMessage } = input;

  if (value === '') {
    return 'email обязателен для заполнения';
  }

  if (!validity.valid) {
    return validationMessage;
  }

  const atIndex = value.indexOf('@');
  const domainPart = value.slice(atIndex + 1);
  const dot = domainPart.lastIndexOf('.');
  if (dot === -1) {
    return 'Должен быть валидный email адрес, в формате value@value.value';
  }
  if (domainPart.length - dot - 1 < 2 || !/^[A-Za-z]{2,}$/.test(domainPart.slice(dot + 1))) {
    return 'Часть после "." должна занимать только буквы и минимум 2';
  }

  return null;
}

export const getPasswordError = (value: string): string | null => {
  if (value === '') {
    return 'Пароль обязателен для заполнения';
  }

  if (value.length < 2) {
    return 'Пароль должен содержать минимум 2 символа';
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return 'Пароль не может состоять только из пробелов';
  }

  if (!/[A-Za-z]/.test(value)) {
    return 'Пароль должен содержать хотя бы одну английскую букву';
  }

  if (!/\d/.test(value)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }

  return null;
};

