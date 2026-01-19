import { supabase } from './supabase-client'

export const authAPI = {
  // Enhanced login with role-based redirects
  async login(credentials) {
    const { email, password, userType } = credentials

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      // Mock user data - replace with Supabase when configured
      const mockUsers = {
        'customer@test.com': {
          id: '1',
          name: 'John Customer',
          email: 'customer@test.com',
          userType: 'customer',
          phone: '+91 98765 43210',
          city: 'Mumbai',
          address: '123 Main Street, Andheri West, Mumbai, 400058',
          verified: true,
          profileImage: null,
          preferences: {
            emailNotifications: true,
            smsNotifications: true,
            pushNotifications: true
          },
          createdAt: '2023-01-15T10:00:00Z',
          loginTime: new Date().toISOString()
        },
        'provider@test.com': {
          id: '2',
          name: 'Jane Provider',
          email: 'provider@test.com',
          userType: 'provider',
          phone: '+91 98765 43211',
          city: 'Mumbai',
          service: 'Plumbing',
          verified: true,
          approved: true,
          rating: 4.8,
          reviewCount: 156,
          completedJobs: 245,
          totalEarnings: 125000,
          basePrice: 500,
          emergencyRate: 750,
          availability: {
            monday: { start: '09:00', end: '18:00', available: true },
            tuesday: { start: '09:00', end: '18:00', available: true },
            wednesday: { start: '09:00', end: '18:00', available: true },
            thursday: { start: '09:00', end: '18:00', available: true },
            friday: { start: '09:00', end: '18:00', available: true },
            saturday: { start: '09:00', end: '15:00', available: true },
            sunday: { start: '10:00', end: '14:00', available: false }
          },
          services: ['Plumbing', 'Pipe Repair', 'Bathroom Fitting', 'Kitchen Plumbing'],
          createdAt: '2023-02-10T10:00:00Z',
          loginTime: new Date().toISOString()
        },
        'admin@test.com': {
          id: '3',
          name: 'Admin User',
          email: 'admin@test.com',
          userType: 'admin',
          role: 'admin',
          verified: true,
          createdAt: '2023-01-01T10:00:00Z',
          loginTime: new Date().toISOString()
        }
      }

      const user = mockUsers[email]
      if (!user || password !== 'password123') {
        throw new Error('Invalid email or password')
      }

      // Save user session
      const sessionData = {
        user,
        token: 'mock_jwt_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }

      // Store in localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('sb-session', JSON.stringify(sessionData))
        localStorage.setItem('handyfix_user', JSON.stringify(user))
      }

      return {
        user,
        token: sessionData.token,
        refreshToken: sessionData.refreshToken,
        redirectUrl: this.getRedirectUrl(user)
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed')
    }
  },

  // Get appropriate redirect URL based on user type
  getRedirectUrl(user) {
    switch (user.userType) {
      case 'provider':
        return '/dashboard/provider'
      case 'admin':
        return '/admin/dashboard'
      case 'customer':
        return '/dashboard/user'
      default:
        return '/dashboard/user'
    }
  },

  // Enhanced registration with role-based handling
  async register(userData) {
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      const newUser = {
        id: 'user_' + Date.now(),
        ...userData,
        verified: false,
        approved: userData.userType === 'provider' ? false : true,
        profileImage: null,
        preferences: {
          emailNotifications: true,
          smsNotifications: true,
          pushNotifications: true
        },
        createdAt: new Date().toISOString(),
        registrationTime: new Date().toISOString()
      }

      // Add role-specific fields
      if (userData.userType === 'provider') {
        newUser.rating = 0
        newUser.reviewCount = 0
        newUser.completedJobs = 0
        newUser.totalEarnings = 0
        newUser.services = userData.services || []
        newUser.basePrice = userData.basePrice || 500
        newUser.emergencyRate = userData.emergencyRate || 750
        newUser.availability = userData.availability || {
          monday: { start: '09:00', end: '18:00', available: true },
          tuesday: { start: '09:00', end: '18:00', available: true },
          wednesday: { start: '09:00', end: '18:00', available: true },
          thursday: { start: '09:00', end: '18:00', available: true },
          friday: { start: '09:00', end: '18:00', available: true },
          saturday: { start: '09:00', end: '15:00', available: true },
          sunday: { start: '10:00', end: '14:00', available: false }
        }
        newUser.verificationDocuments = []
        newUser.bankDetails = {}
      }

      // Send welcome email
      await emailService.sendWelcomeEmail(newUser.email, newUser)

      // Store registration data
      if (typeof localStorage !== 'undefined') {
        const registrations = JSON.parse(localStorage.getItem('handyfix_registrations') || '[]')
        registrations.push(newUser)
        localStorage.setItem('handyfix_registrations', JSON.stringify(registrations))
      }

      return {
        user: newUser,
        token: 'mock_jwt_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        message: userData.userType === 'provider'
          ? 'Registration successful! Your profile is under review. You will receive an email once approved.'
          : 'Registration successful! Please verify your email address.',
        redirectUrl: userData.userType === 'provider' ? '/dashboard/provider/pending' : '/dashboard/user'
      }
    } catch (error) {
      throw new Error(error.message || 'Registration failed')
    }
  },

  async logout() {
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('sb-session')
        localStorage.removeItem('handyfix_user')
      }
    } catch (error) {
      console.warn('Logout error:', error)
    }

    return { success: true }
  },

  async verifyToken(token) {
    await new Promise(resolve => setTimeout(resolve, 500))

    if (!token || !token.startsWith('mock_jwt_token_')) {
      throw new Error('Invalid token')
    }

    return { valid: true }
  },

  async refreshToken(refreshToken) {
    await new Promise(resolve => setTimeout(resolve, 500))

    return {
      token: 'mock_jwt_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
  },

  async forgotPassword(email) {
    await new Promise(resolve => setTimeout(resolve, 1000))

    await emailService.sendPasswordResetEmail(email, 'reset_token_' + Date.now())

    return {
      success: true,
      message: 'Password reset instructions sent to your email'
    }
  },

  async resetPassword(token, newPassword) {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: 'Password reset successfully'
    }
  }
}

// Email service
export const emailService = {
  async sendWelcomeEmail(userEmail, userData) {
    const template = userData.userType === 'provider' ? 'provider-welcome' : 'customer-welcome'
    const subject = userData.userType === 'provider'
      ? 'Welcome to HandyFix Pro - Start Growing Your Business'
      : 'Welcome to HandyFix - Your Home Service Solution'

    console.log('📧 Welcome email sent:', {
      to: userEmail,
      subject,
      template,
      data: {
        name: userData.name,
        userType: userData.userType,
        verificationLink: `https://handyfix.com/verify/${userData.id}`,
        dashboardLink: userData.userType === 'provider'
          ? 'https://handyfix.com/dashboard/provider'
          : 'https://handyfix.com/dashboard/user'
      }
    })

    return { success: true, messageId: 'wel_msg_' + Date.now() }
  },

  async sendPasswordResetEmail(userEmail, resetToken) {
    console.log('📧 Password reset email sent:', {
      to: userEmail,
      subject: 'Reset your HandyFix password',
      resetLink: `https://handyfix.com/reset-password?token=${resetToken}`,
      expiresIn: '1 hour'
    })

    return { success: true, messageId: 'reset_msg_' + Date.now() }
  }
}

export default authAPI
