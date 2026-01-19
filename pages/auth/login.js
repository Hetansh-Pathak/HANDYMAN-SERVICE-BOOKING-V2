import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { useUser } from '../../context/UserContext'
import { authAPI } from '../../lib/auth-enhanced'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'customer'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useUser()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await authAPI.login(formData)
      await login(result.user)

      // Redirect based on user type
      const redirectPath = result.redirectUrl || (result.user.userType === 'provider'
        ? '/dashboard/provider'
        : result.user.userType === 'admin'
        ? '/admin/dashboard'
        : '/dashboard/user')

      // Use replace to avoid back button issues
      router.push(redirectPath)
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Layout title="Login - HandyFix">
      <div style={containerStyle}>
        <div style={loginBoxStyle}>
          <div style={headerStyle}>
            <h1 style={titleStyle}>Welcome Back</h1>
            <p style={subtitleStyle}>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} style={formStyle}>
            <div className="form-group">
              <label className="form-label">Login As</label>
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
                  Customer
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
                  Service Provider
                </label>
              </div>
            </div>

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
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div style={forgotStyle}>
              <Link href="/auth/forgot-password" style={forgotLinkStyle}>
                Forgot your password?
              </Link>
            </div>

            {error && (
              <div style={errorStyle}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={submitBtnStyle} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div style={demoCredentialsStyle}>
              <h4 style={demoTitleStyle}>Demo Credentials:</h4>
              <div style={demoListStyle}>
                <div style={demoItemStyle}>
                  <strong>Customer:</strong> customer@test.com / password123
                </div>
                <div style={demoItemStyle}>
                  <strong>Provider:</strong> provider@test.com / password123
                </div>
                <div style={demoItemStyle}>
                  <strong>Admin:</strong> admin@test.com / password123
                </div>
              </div>
            </div>

            <div style={dividerStyle}>
              <span style={dividerTextStyle}>or</span>
            </div>

            <button type="button" className="btn btn-outline" style={googleBtnStyle}>
              <span style={googleIconStyle}>🔍</span>
              Continue with Google
            </button>
          </form>

          <div style={footerStyle}>
            <p style={footerTextStyle}>
              Don't have an account?{' '}
              <Link href="/auth/register" style={linkStyle}>
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <div style={sideImageStyle}>
          <div style={sideContentStyle}>
            <h2 style={sideHeadingStyle}>Find Trusted Service Providers</h2>
            <p style={sideTextStyle}>
              Connect with verified plumbers, electricians, carpenters and more in your area.
            </p>
            <div style={featuresStyle}>
              <div style={featureStyle}>✓ Verified Professionals</div>
              <div style={featureStyle}>✓ 24/7 Support</div>
              <div style={featureStyle}>✓ Secure Payments</div>
              <div style={featureStyle}>✓ Real-time Tracking</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const containerStyle = {
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '40px 0'
}

const loginBoxStyle = {
  flex: '1',
  maxWidth: '450px',
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
  gap: '24px',
  padding: '12px 0'
}

const radioLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500',
  color: '#2c3e50'
}

const radioStyle = {
  width: '18px',
  height: '18px'
}

const forgotStyle = {
  textAlign: 'right',
  marginBottom: '24px'
}

const forgotLinkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '14px'
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
  margin: '24px 0'
}

const dividerTextStyle = {
  background: 'white',
  padding: '0 16px',
  color: '#7f8c8d',
  fontSize: '14px'
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

const sideImageStyle = {
  flex: '1',
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '16px',
  margin: '20px',
  padding: '60px 40px',
  color: 'white',
  display: 'flex',
  alignItems: 'center'
}

const sideContentStyle = {
  width: '100%'
}

const sideHeadingStyle = {
  fontSize: '32px',
  fontWeight: '700',
  marginBottom: '20px',
  lineHeight: '1.2'
}

const sideTextStyle = {
  fontSize: '18px',
  marginBottom: '32px',
  opacity: '0.9',
  lineHeight: '1.6'
}

const featuresStyle = {
  display: 'grid',
  gap: '16px'
}

const featureStyle = {
  fontSize: '16px',
  fontWeight: '500'
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

const demoCredentialsStyle = {
  marginTop: '24px',
  padding: '16px',
  background: '#e8f4fd',
  borderRadius: '8px',
  border: '1px solid #bee5eb'
}

const demoTitleStyle = {
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '12px',
  color: '#0c5460'
}

const demoListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}

const demoItemStyle = {
  fontSize: '14px',
  color: '#0c5460',
  fontFamily: 'monospace'
}
