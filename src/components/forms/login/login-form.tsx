import {FormEvent, useState, ChangeEvent} from 'react';
import {getEmailErrorFromInput, getPasswordError} from '../../../utils/validation.ts';
import './validation.css';

type LoginFormProps = {
  onSubmit: (data: { email: string; password: string }) => void;
};

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormErrors = {
  email: string | null;
  password: string | null;
};

type LoginFieldName = keyof LoginFormData;

const validateField = (
  name: LoginFieldName,
  value: string,
  input?: HTMLInputElement | null,
): string | null => {
  if (name === 'email') {
    return input ? getEmailErrorFromInput(input) : null;
  }
  if (name === 'password') {
    return getPasswordError(value);
  }

  return null;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginFormErrors>({
    email: null,
    password: null,
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    const fieldName = name as LoginFieldName;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    const error = validateField(fieldName, value, evt.target);
    setErrors((prev) => ({...prev, [fieldName]: error}));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const newErrors: LoginFormErrors = {
      email: null,
      password: null,
    };
    (Object.keys(formData) as LoginFieldName[]).forEach((fieldName) => {
      const input = evt.currentTarget.elements.namedItem(fieldName) as HTMLInputElement | null;
      newErrors[fieldName] = validateField(fieldName, formData[fieldName], input);
    });
    setErrors(newErrors);

    if (errors.email || errors.password) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className={`login__input form__input ${errors.email ? 'form__input--error' : ''}`}
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (<p className="form__error form__error--login-email">{errors.email}</p>)}
      </div>

      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className={`login__input form__input ${errors.password ? 'form__input--error' : ''}`}
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="form__error form__error--login-password">
            {errors.password}
          </p>
        )}
      </div>

      <button className="login__submit form__submit button" type="submit">
        Sign in
      </button>
    </form>
  );
}
