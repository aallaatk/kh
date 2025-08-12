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

interface SignUpFormData {
  email: string;
  password: string;
  role: 'Candidate' | 'Recruiter' | '';
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

function SignUp() {
  const [form, setForm] = useState<SignUpFormData>({
    email: '',
    password: '',
    role: 'Candidate',
  });
  const [hovered, setHovered] = useState<'Candidate' | 'Recruiter' | ''>('');
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

  const handleRole = (role: 'Candidate' | 'Recruiter') => {
    setForm({ ...form, role });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMsg('');

    try {
      await axios.post('http://localhost:3000/register', form);
      setSuccessMsg('Registration successful!');
      setTimeout(() => setSuccessMsg(''), 2000);
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
        Sign Up
      </button>

      <div
        className="modal fade"
        tabIndex={-1}
        ref={modalRef}
        id="signupModal"
        aria-labelledby="signupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header " style={{padding:"20px 35px"}}>
              <h5 className="modal-title text-center" id="signupModalLabel">
                Create a free Khademni account
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
                <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mb-3 w-100">
                  {/* Role Buttons */}
                  <button
                    type="button"
                    style={{
                      backgroundColor:
                        form.role === 'Candidate'
                          ? '#34a853'
                          : hovered === 'Candidate'
                          ? '#0146a6'
                          : '#e2eaf8',
                      color:
                        form.role === 'Candidate'
                          ? '#fff'
                          : hovered === 'Candidate'
                          ? '#fff'
                          : '#0146a6',
                      border: 'none',
                      fontWeight: 600,
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onClick={() => handleRole('Candidate')}
                    onMouseEnter={() => setHovered('Candidate')}
                    onMouseLeave={() => setHovered('')}
                    className="btn p-3 flex-fill"
                  >
                    <i className="fa-regular fa-user me-2"></i>Candidate
                  </button>
                  <button
                    type="button"
                    style={{
                      backgroundColor:
                        form.role === 'Recruiter'
                          ? '#34a853'
                          : hovered === 'Recruiter'
                          ? '#0146a6'
                          : '#e2eaf8',
                      color:
                        form.role === 'Recruiter'
                          ? '#fff'
                          : hovered === 'Recruiter'
                          ? '#fff'
                          : '#0146a6',
                      border: 'none',
                      fontWeight: 600,
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onClick={() => handleRole('Recruiter')}
                    onMouseEnter={() => setHovered('Recruiter')}
                    onMouseLeave={() => setHovered('')}
                    className="btn p-3 flex-fill"
                  >
                    <i className="fa-solid fa-suitcase me-2"></i>Employer
                  </button>
                </div>

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

                <button type="submit" className="btn btn-primary mt-2 p-3 w-100 mb-3">
                  Register
                </button>

                <div className="mb-3 text-center">
                  <p>
                    Already have an account?{' '}
                    <a href="/login" style={{ textDecoration: 'none' }}>
                      Login
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

export default SignUp;
