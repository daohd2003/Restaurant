import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './LoginPage.css';
import { loginAPI, registerAPI } from '../../api/auth';

const LoginPage = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Thêm confirmPassword
    fullName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Refs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const fullNameRef = useRef(null);

  const navigate = useNavigate();

  const handleFocus = (ref) => () => {
    ref.current?.select();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra confirm password khi đăng ký
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert(t('register.errors.passwords_not_match'));
      return;
    }

    try {
      if (isLogin) {
        const response = await loginAPI({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('token', response.token);
        navigate('/');
      } else {
        await registerAPI({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });
        setIsLogin(true);
      }
    } catch (error) {
      alert('Có lỗi xảy ra: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="login-container">
      <div className={`auth-form ${isLogin ? 'login' : 'register'}`}>
        <h2>{isLogin ? t('login.title') : t('register.title')}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>{t('register.full_name')}</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                ref={fullNameRef}
                onChange={handleChange}
                onFocus={handleFocus(fullNameRef)}
                className="highlightable-input"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>{t('login.email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              ref={emailRef}
              onChange={handleChange}
              onFocus={handleFocus(emailRef)}
              className="highlightable-input"
              required
            />
          </div>

          <div className="form-group password-group">
            <label>{t('login.password')}</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                ref={passwordRef}
                onChange={handleChange}
                onFocus={handleFocus(passwordRef)}
                className="highlightable-input"
                required
                minLength="6"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group password-group">
              <label>{t('register.confirm_password')}</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  ref={confirmPasswordRef}
                  onChange={handleChange}
                  onFocus={handleFocus(confirmPasswordRef)}
                  className="highlightable-input"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="auth-button">
            {isLogin ? t('login.submit') : t('register.submit')}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? (
            <>
              <span>{t('login.no_account')}</span>
              <button onClick={() => setIsLogin(false)} className="switch-button">
                {t('login.register_here')}
              </button>
            </>
          ) : (
            <>
              <span>{t('register.have_account')}</span>
              <button onClick={() => setIsLogin(true)} className="switch-button">
                {t('register.login_here')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;