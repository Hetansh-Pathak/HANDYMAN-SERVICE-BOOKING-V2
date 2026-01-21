import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { useUser } from '../../context/UserContext'
import { useToast } from '../../components/Toast'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useUser()
  const { showToast } = useToast()
  const [step, setStep] = useState('input') // 'input' | 'otp' | 'password'
  const [loginMethod, setLoginMethod] = useState('email') // 'email' | 'mobile'
  const [emailOrMobile, setEmailOrMobile] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    setEmailOrMobile(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
    setOtp(value)
  }

  const handleInputSubmit = async (e) => {
    e.preventDefault()

    if (!emailOrMobile.trim()) {
      showToast('Please enter your ' + (loginMethod === 'email' ? 'email' : 'mobile number'), 'error')
      return
    }

    // Validate email or mobile
    if (loginMethod === 'email' && !emailOrMobile.includes('@')) {
      showToast('Please enter a valid email address', 'error')
      return
    }

    if (loginMethod === 'mobile' && emailOrMobile.length < 10) {
      showToast('Please enter a valid mobile number', 'error')
      return
    }

    setIsLoading(true)

    // Simulate sending OTP
    setTimeout(() => {
      showToast('OTP sent successfully', 'success')
      setStep('otp')
      setIsLoading(false)
    }, 800)
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()

    if (otp.length !== 6) {
      showToast('Please enter a valid 6-digit OTP', 'error')
      return
    }

    setIsLoading(true)

    // Simulate OTP verification
    setTimeout(async () => {
      const userData = {
        userType: 'customer',
        email: loginMethod === 'email' ? emailOrMobile : `user@handyfix.com`,
        mobile: loginMethod === 'mobile' ? emailOrMobile : '9876543210',
        name: 'User'
      }

      await login(userData)
      showToast('Login successful!', 'success')
      setIsLoading(false)

      // Redirect to return URL or home
      const returnUrl = router.query.redirect || '/'
      router.push(returnUrl)
    }, 800)
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (!password.trim()) {
      showToast('Please enter your password', 'error')
      return
    }

    setIsLoading(true)

    // Simulate password login
    setTimeout(async () => {
      const userData = {
        userType: 'customer',
        email: emailOrMobile,
        name: 'User'
      }

      await login(userData)
      showToast('Login successful!', 'success')
      setIsLoading(false)

      const returnUrl = router.query.redirect || '/'
      router.push(returnUrl)
    }, 800)
  }

  return (
    <Layout title="Login - HandyFix">
      <div style={pageStyle}>
        <div className="container" style={containerStyle}>
          <div style={cardStyle}>
            {/* Header */}
            <div style={headerStyle}>
              <h1 style={titleStyle}>Welcome Back</h1>
              <p style={subtitleStyle}>Please login to continue</p>
            </div>

            {/* Login Form */}
            <form onSubmit={step === 'input' ? handleInputSubmit : step === 'otp' ? handleOtpSubmit : handlePasswordSubmit} style={formStyle}>
              {/* Input Step */}
              {step === 'input' && (
                <>
                  {/* Login Method Tabs */}
                  <div style={tabsStyle}>
                    <button
                      type="button"
                      style={{
                        ...tabStyle,
                        ...(loginMethod === 'email' ? activeTabStyle : {})
                      }}
                      onClick={() => setLoginMethod('email')}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      style={{
                        ...tabStyle,
                        ...(loginMethod === 'mobile' ? activeTabStyle : {})
                      }}
                      onClick={() => setLoginMethod('mobile')}
                    >
                      Mobile
                    </button>
                  </div>

                  {/* Input Field */}
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>
                      {loginMethod === 'email' ? 'Email Address' : 'Mobile Number'}
                    </label>
                    <input
                      type={loginMethod === 'email' ? 'email' : 'tel'}
                      placeholder={loginMethod === 'email' ? 'you@example.com' : '9876543210'}
                      value={emailOrMobile}
                      onChange={handleInputChange}
                      className="form-input"
                      style={inputStyle}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary"
                    style={{ ...submitBtnStyle, opacity: isLoading ? 0.6 : 1 }}
                  >
                    {isLoading ? (
                      <>
                        <span style={spinnerStyle} className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                </>
              )}

              {/* OTP Step */}
              {step === 'otp' && (
                <>
                  <div style={otpHeaderStyle}>
                    <button
                      type="button"
                      style={backBtnStyle}
                      onClick={() => setStep('input')}
                    >
                      ← Back
                    </button>
                    <h2 style={otpTitleStyle}>Enter OTP</h2>
                  </div>

                  <p style={otpSubtitleStyle}>
                    We've sent a 6-digit code to {loginMethod === 'email' ? 'your email' : emailOrMobile}
                  </p>

                  <div style={formGroupStyle}>
                    <label style={labelStyle}>OTP Code</label>
                    <input
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={handleOtpChange}
                      maxLength="6"
                      inputMode="numeric"
                      className="form-input"
                      style={{ ...inputStyle, ...otpInputStyle }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary"
                    style={{ ...submitBtnStyle, opacity: isLoading ? 0.6 : 1 }}
                  >
                    {isLoading ? (
                      <>
                        <span style={spinnerStyle} className="spinner"></span>
                        Verifying...
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </button>

                  <p style={resendStyle}>
                    Didn't receive the code?{' '}
                    <button
                      type="button"
                      style={resendBtnStyle}
                      onClick={() => {
                        setStep('input')
                        showToast('OTP resent successfully', 'info')
                      }}
                    >
                      Resend OTP
                    </button>
                  </p>
                </>
              )}
            </form>

            {/* Divider */}
            <div style={dividerStyle}>
              <span style={dividerTextStyle}>Or</span>
            </div>

            {/* Sign Up Link */}
            <p style={signupLinkStyle}>
              Don't have an account?{' '}
              <Link href="/auth/register" style={signupBtnStyle}>
                Sign Up
              </Link>
            </p>

            {/* Guest Continue */}
            <button
              type="button"
              className="btn btn-outline"
              style={guestBtnStyle}
              onClick={() => router.push('/')}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// ==================== STYLES ====================

const pageStyle = {
  background: '#F7F9FC',
  minHeight: 'calc(100vh - 300px)',
  padding: '60px 0',
  display: 'flex',
  alignItems: 'center'
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const cardStyle = {
  background: 'white',
  borderRadius: '16px',
  border: '1px solid #E8EAED',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  padding: '40px',
  width: '100%',
  maxWidth: '400px',
  animation: 'slideUp 0.4s ease'
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: '32px'
}

const titleStyle = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#111111',
  margin: '0 0 8px'
}

const subtitleStyle = {
  fontSize: '14px',
  color: '#555555',
  margin: 0
}

const formStyle = {
  marginBottom: '24px'
}

const formGroupStyle = {
  marginBottom: '20px'
}

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '600',
  color: '#111111',
  fontSize: '14px'
}

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #E8EAED',
  borderRadius: '10px',
  fontSize: '16px',
  transition: 'all 0.3s ease'
}

const otpInputStyle = {
  letterSpacing: '8px',
  fontWeight: '600',
  textAlign: 'center',
  fontSize: '20px'
}

const tabsStyle = {
  display: 'flex',
  gap: '12px',
  marginBottom: '24px',
  background: '#F7F9FC',
  padding: '4px',
  borderRadius: '10px'
}

const tabStyle = {
  flex: 1,
  padding: '10px 16px',
  border: 'none',
  background: 'transparent',
  color: '#555555',
  fontWeight: '600',
  fontSize: '14px',
  cursor: 'pointer',
  borderRadius: '8px',
  transition: 'all 0.2s ease'
}

const activeTabStyle = {
  background: 'white',
  color: '#0A66FF',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
}

const submitBtnStyle = {
  width: '100%',
  padding: '12px 24px',
  minHeight: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'all 0.3s ease'
}

const spinnerStyle = {
  display: 'inline-block',
  width: '16px',
  height: '16px',
  borderWidth: '2px'
}

const otpHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '20px'
}

const backBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#0A66FF',
  fontSize: '16px',
  cursor: 'pointer',
  fontWeight: '600',
  padding: '0',
  flexShrink: 0
}

const otpTitleStyle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#111111',
  margin: 0,
  flex: 1
}

const otpSubtitleStyle = {
  fontSize: '13px',
  color: '#555555',
  marginBottom: '20px',
  lineHeight: '1.5'
}

const resendStyle = {
  textAlign: 'center',
  fontSize: '13px',
  color: '#555555',
  marginTop: '16px'
}

const resendBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#0A66FF',
  fontWeight: '600',
  cursor: 'pointer',
  padding: '0',
  textDecoration: 'underline'
}

const dividerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  margin: '24px 0',
  position: 'relative'
}

const dividerTextStyle = {
  fontSize: '13px',
  color: '#888888',
  background: 'white',
  padding: '0 8px',
  position: 'relative',
  zIndex: 2
}

const signupLinkStyle = {
  textAlign: 'center',
  fontSize: '14px',
  color: '#555555',
  marginBottom: '16px'
}

const signupBtnStyle = {
  color: '#0A66FF',
  fontWeight: '600',
  textDecoration: 'none',
  cursor: 'pointer',
  borderBottom: '1px solid #0A66FF'
}

const guestBtnStyle = {
  width: '100%'
}
