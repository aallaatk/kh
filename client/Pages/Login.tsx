import { useRef, useState } from 'react';
import axios from 'axios';
import type { FormEvent } from 'react';

declare global {
  interface Window {
    bootstrap: {
      Modal: typeof import('bootstrap')['Modal'];
    };
  }
}

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

function Login() {
  const [form, setForm] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMsg, setSuccessMsg] = useState<string>('');

  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    if (modalRef.current && window.bootstrap) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    // Clear only the field error on change
    if (formErrors[e.target.id as keyof FormErrors]) {
      setFormErrors({ ...formErrors, [e.target.id]: '' });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMsg('');

    try {
      const res = await axios.post('http://localhost:3000/login', form);
      setSuccessMsg('Login successful!');
      setTimeout(() => setSuccessMsg(''), 2000);
      console.log('Login response:', res.data);
      // Optionally handle login (e.g. save token, redirect)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const response = error.response?.data;
        const errors: FormErrors = {};

        if (typeof response === 'object' && response !== null) {
          if (response.errors?.length > 0) {
            for (const err of response.errors) {
              if (err.path && err.message) {
                errors[err.path as keyof FormErrors] = err.message;
              }
            }
          }
          // Only set general message if there are no field errors
          if (!response.errors?.length && response.message) {
            errors.general = response.message;
          }
        }

        setFormErrors(errors);
        if (errors.general) {
          setTimeout(() => setFormErrors(prev => ({ ...prev, general: '' })), 2000);
        }
      } else {
        setFormErrors({ general: 'An unexpected error occurred.' });
        setTimeout(() => setFormErrors(prev => ({ ...prev, general: '' })), 2000);
      }
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={openModal}>
        Login
      </button>

      <div
        className="modal fade"
        tabIndex={-1}
        ref={modalRef}
        id="loginModal"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" style={{padding:"20px 35px"}}>
              <h5 className="modal-title text-center" id="loginModalLabel">
                Login to Khademni
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {formErrors.general && (
                <div className="alert alert-danger">{formErrors.general}</div>
              )}
              {successMsg && (
                <div className="alert alert-success">{successMsg}</div>
              )}
              <form onSubmit={handleSubmit} className="p-3">
                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    value={form.email}
                    placeholder="Email"
                    onChange={handleChange}
                    style={{
                      padding: '15px 20px',
                      fontSize: 15,
                      color: 'dimgray',
                      backgroundColor: '#f8fafc',
                    }}
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>

                {/* Password Input */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                    id="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    style={{
                      padding: '15px 20px',
                      fontSize: 15,
                      color: 'dimgray',
                      backgroundColor: '#f8fafc',
                    }}
                  />
                  {formErrors.password && (
                    <div className="invalid-feedback">{formErrors.password}</div>
                  )}
                </div>
<div className="mb-3 d-flex justify-content-between align-items-center">
  <div className="form-check">
    <input className="form-check-input" type="checkbox" id="rememberMe" />
    <label className="form-check-label" htmlFor="rememberMe">
      Remember me
    </label>
  </div>
  <a href="/forgot-password" style={{textDecoration: 'none', fontWeight: 500, color: 'dimgray'}}>
    Forgot password?
  </a>
</div>
                <button type="submit" className="btn btn-primary mt-2 p-3 w-100 mb-3">
                  Login
                </button>

                <div className="mb-3 text-center">
                  <p>
                    Don't have an account?{' '}
                    <a href="/signup" style={{ textDecoration: 'none' }}>
                      Sign Up
                    </a>
                  </p>

                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <hr className="flex-grow-1" />
                    <span
                      className="mx-2 text-muted"
                      style={{ whiteSpace: 'nowrap', fontWeight: 500 }}
                    >
                      or
                    </span>
                    <hr className="flex-grow-1" />
                  </div>

                  <div className="d-flex justify-content-between gap-3 mt-2 w-100">
                    <button
                      type="button"
                      className="btn btn-outline-danger flex-fill p-3"
                    >
                      <i className="fa-brands fa-google me-2"></i>Google
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary flex-fill p-3"
                    >
                      <i className="fa-brands fa-facebook-f me-2"></i>Facebook
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
