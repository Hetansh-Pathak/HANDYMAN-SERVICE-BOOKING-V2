import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { useUser } from '../../context/UserContext'
import { authAPI, emailService } from '../../lib/auth-enhanced'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
    userType: 'customer',
    agreeToTerms: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { login } = useUser()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions')
      setLoading(false)
      return
    }

    try {
      const result = await authAPI.register(formData)

      if (formData.userType === 'provider') {
        setSuccess(result.message + ' You will be notified once approved.')
        // Redirect after delay
        setTimeout(() => {
          router.push(result.redirectUrl || '/dashboard/provider/pending')
        }, 2000)
      } else {
        await login(result.user)
        setSuccess('Registration successful! Redirecting to dashboard...')
        setTimeout(() => {
          router.push(result.redirectUrl || '/dashboard/user')
        }, 1500)
      }
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
    <Layout title="Sign Up - HandyFix">
      <div style={containerStyle}>
        <div style={registerBoxStyle}>
          <div style={headerStyle}>
            <h1 style={titleStyle}>Create Account</h1>
            <p style={subtitleStyle}>Join HandyFix today</p>
          </div>

          <form onSubmit={handleSubmit} style={formStyle}>
            <div className="form-group">
              <label className="form-label">I want to</label>
              <div style={userTypeStyle}>
                <label style={radioLabelStyle}>
                  <input
                    type="radio"
                    name="userType"
                    value="customer"
                    checked={formData.userType === 'customer'}
                    onChange={handleChange}
                    style={radioStyle}
                  />
                  Find Service Providers
                </label>
                <label style={radioLabelStyle}>
                  <input
                    type="radio"
                    name="userType"
                    value="provider"
                    checked={formData.userType === 'provider'}
                    onChange={handleChange}
                    style={radioStyle}
                  />
                  Offer My Services
                </label>
              </div>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="+91 12345 67890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-input"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>
            </div>

            <div className="form-group">
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  style={checkboxStyle}
                  required
                />
                I agree to the{' '}
                <Link href="/terms" style={linkStyle}>Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>
              </label>
            </div>

            {error && (
              <div style={errorStyle}>
                {error}
              </div>
            )}

            {success && (
              <div style={successStyle}>
                {success}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={submitBtnStyle} disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div style={dividerStyle}>
              <span style={dividerTextStyle}>or</span>
            </div>

            <button type="button" className="btn btn-outline" style={googleBtnStyle}>
              <span style={googleIconStyle}>🔍</span>
              Sign up with Google
            </button>
          </form>

          <div style={footerStyle}>
            <p style={footerTextStyle}>
              Already have an account?{' '}
              <Link href="/auth/login" style={linkStyle}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {formData.userType === 'provider' && (
          <div style={providerInfoStyle}>
            <h3 style={infoHeadingStyle}>Become a Service Provider</h3>
            <div style={benefitsStyle}>
              <div style={benefitStyle}>💰 Earn Extra Income</div>
              <div style={benefitStyle}>📅 Flexible Working Hours</div>
              <div style={benefitStyle}>🎯 Choose Your Service Area</div>
              <div style={benefitStyle}>📱 Easy-to-use Dashboard</div>
              <div style={benefitStyle}>💳 Quick Payments</div>
              <div style={benefitStyle}>⭐ Build Your Reputation</div>
            </div>
            <div style={noteStyle}>
              <strong>Note:</strong> Your profile will be reviewed and verified before approval.
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

const containerStyle = {
  minHeight: '80vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '40px 0',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '40px'
}

const registerBoxStyle = {
  flex: '1',
  maxWidth: '600px',
  margin: '0 auto',
  background: 'white',
  borderRadius: '16px',
  padding: '40px',
  boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: '32px'
}

const titleStyle = {
  fontSize: '28px',
  fontWeight: '700',
  marginBottom: '8px',
  color: '#2c3e50'
}

const subtitleStyle = {
  color: '#7f8c8d',
  fontSize: '16px'
}

const formStyle = {
  marginBottom: '24px'
}

const userTypeStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '12px 0'
}

const radioLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500',
  padding: '8px',
  color: '#2c3e50'
}

const radioStyle = {
  width: '18px',
  height: '18px'
}

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#495057'
}

const checkboxStyle = {
  width: '16px',
  height: '16px',
  marginTop: '2px'
}

const submitBtnStyle = {
  width: '100%',
  padding: '14px',
  fontSize: '16px',
  fontWeight: '600'
}

const dividerStyle = {
  position: 'relative',
  textAlign: 'center',
  margin: '24px 0',
  borderTop: '1px solid #eee'
}

const dividerTextStyle = {
  background: 'white',
  padding: '0 16px',
  color: '#7f8c8d',
  fontSize: '14px',
  position: 'relative',
  top: '-10px'
}

const googleBtnStyle = {
  width: '100%',
  padding: '14px',
  fontSize: '16px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px'
}

const googleIconStyle = {
  fontSize: '20px'
}

const footerStyle = {
  textAlign: 'center',
  paddingTop: '24px',
  borderTop: '1px solid #eee'
}

const footerTextStyle = {
  color: '#7f8c8d',
  fontSize: '14px'
}

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: '600'
}

const providerInfoStyle = {
  flex: '0 0 300px',
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '16px',
  padding: '32px',
  color: 'white',
  marginTop: '20px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.2)'
}

const infoHeadingStyle = {
  fontSize: '24px',
  fontWeight: '700',
  marginBottom: '24px',
  textAlign: 'center'
}

const benefitsStyle = {
  display: 'grid',
  gap: '12px',
  marginBottom: '24px'
}

const benefitStyle = {
  fontSize: '16px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}

const noteStyle = {
  fontSize: '14px',
  padding: '16px',
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '8px',
  lineHeight: '1.5',
  borderLeft: '3px solid rgba(255,255,255,0.3)'
}

const errorStyle = {
  background: '#f8d7da',
  color: '#721c24',
  padding: '12px',
  borderRadius: '6px',
  marginBottom: '16px',
  fontSize: '14px',
  border: '1px solid #f5c6cb'
}

const successStyle = {
  background: '#d4edda',
  color: '#155724',
  padding: '12px',
  borderRadius: '6px',
  marginBottom: '16px',
  fontSize: '14px',
  border: '1px solid #c3e6cb'
}
