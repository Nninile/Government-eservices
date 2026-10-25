import { useState } from 'react'
import './App.css'

function App() {
  const [authPage, setAuthPage] = useState(null)
  const [loggedInCitizen, setLoggedInCitizen] = useState(null)
  const [dashboardPage, setDashboardPage] = useState('dashboard')

  // ==========================================
  // LOGIN PAGE
  // ==========================================

  if (authPage === 'login') {
    return (
      <div className="auth-page">
        <div className="auth-visual">
          <button
            className="back-button"
            onClick={() => setAuthPage(null)}
          >
            ← Back to Home
          </button>

          <div className="auth-visual-content">
            <div className="auth-country">
              🇱🇸 KINGDOM OF LESOTHO
            </div>

            <h1>
              Government services,
              <br />
              closer to you.
            </h1>

            <p>
              One secure digital gateway for accessing Government
              of Lesotho services.
            </p>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-form-container">
            <div className="auth-logo">
              <span>🇱🇸</span>

              <div>
                <strong>Government e-Services</strong>
                <small>Kingdom of Lesotho</small>
              </div>
            </div>

            <div className="auth-heading">
              <span>WELCOME BACK</span>
              <h2>Sign in to your account</h2>

              <p>
                Enter your details to access government services
                and manage your applications.
              </p>
            </div>

            <form
              onSubmit={async (event) => {
                event.preventDefault()

                const form = event.currentTarget

                const loginData = {
                  login_id: form.login_id.value.trim(),
                  password: form.login_password.value,
                }

                try {
                  const response = await fetch(
                    'http://localhost:5000/api/auth/login',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(loginData),
                    }
                  )

                  const data = await response.json()

                  if (response.ok) {
                    setLoggedInCitizen(data.citizen)
                    setDashboardPage('dashboard')
                    setAuthPage('dashboard')
                  } else {
                    alert(data.message || 'Login failed.')
                  }
                } catch (error) {
                  console.error('Login error:', error)

                  alert(
                    'Could not connect to the server. Make sure the backend is running.'
                  )
                }
              }}
            >
              <div className="form-group">
                <label htmlFor="login-id">
                  National ID or Username
                </label>

                <input
                  id="login-id"
                  name="login_id"
                  type="text"
                  placeholder="Enter National ID or username"
                  required
                />
              </div>

              <div className="form-group">
                <div className="password-label">
                  <label htmlFor="login-password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-button"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  id="login-password"
                  name="login_password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <label className="remember-row">
                <input type="checkbox" />
                <span>Remember me on this device</span>
              </label>

              <button
                type="submit"
                className="auth-submit"
              >
                Sign In
              </button>
            </form>

            <div className="auth-switch">
              Don't have an account?{' '}

              <button
                type="button"
                onClick={() => setAuthPage('register')}
              >
                Create Account
              </button>
            </div>

            <div className="secure-note">
              🔒 Your information is protected and transmitted
              securely.
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // REGISTRATION PAGE
  // ==========================================

  if (authPage === 'register') {
    return (
      <div className="auth-page register-page">
        <div className="auth-visual">
          <button
            className="back-button"
            onClick={() => setAuthPage(null)}
          >
            ← Back to Home
          </button>

          <div className="auth-visual-content">
            <div className="auth-country">
              🇱🇸 KINGDOM OF LESOTHO
            </div>

            <h1>
              Your government.
              <br />
              Your digital account.
            </h1>

            <p>
              Create one account to securely access participating
              government e-services.
            </p>
          </div>
        </div>

        <div className="auth-form-side register-form-side">
          <div className="auth-form-container register-container">
            <div className="auth-logo">
              <span>🇱🇸</span>

              <div>
                <strong>Government e-Services</strong>
                <small>Kingdom of Lesotho</small>
              </div>
            </div>

            <div className="auth-heading">
              <span>CITIZEN REGISTRATION</span>

              <h2>Create your account</h2>

              <p>
                Enter your information below to create your
                Government e-Services account.
              </p>
            </div>

            <form
              onSubmit={async (event) => {
                event.preventDefault()

                const form = event.currentTarget

                if (
                  form.password.value !==
                  form.confirm_password.value
                ) {
                  alert('Passwords do not match.')
                  return
                }

                const citizenData = {
                  first_name: form.first_name.value.trim(),
                  surname: form.surname.value.trim(),
                  national_id: form.national_id.value.trim(),
                  date_of_birth: form.date_of_birth.value,
                  phone_number: form.phone_number.value.trim(),
                  email: form.email.value.trim(),
                  username: form.username.value.trim(),
                  nationality: form.nationality.value,
                  password: form.password.value,
                }

                try {
                  const response = await fetch(
                    'http://localhost:5000/api/auth/register',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(citizenData),
                    }
                  )

                  const data = await response.json()

                  if (response.ok) {
                    alert('Account created successfully!')

                    form.reset()
                    setAuthPage('login')
                  } else {
                    alert(
                      data.message ||
                        'Could not create account.'
                    )
                  }
                } catch (error) {
                  console.error(
                    'Registration request failed:',
                    error
                  )

                  alert(
                    'Could not connect to the server. Make sure the backend is running.'
                  )
                }
              }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="first-name">
                    First Name
                  </label>

                  <input
                    id="first-name"
                    name="first_name"
                    type="text"
                    placeholder="First name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="surname">
                    Surname
                  </label>

                  <input
                    id="surname"
                    name="surname"
                    type="text"
                    placeholder="Surname"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="national-id">
                    National ID
                  </label>

                  <input
                    id="national-id"
                    name="national_id"
                    type="text"
                    placeholder="National ID number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date-of-birth">
                    Date of Birth
                  </label>

                  <input
                    id="date-of-birth"
                    name="date_of_birth"
                    type="date"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone_number">
                    Phone Number
                  </label>

                  <input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    placeholder="+266"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="username">
                    Username
                  </label>

                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nationality">
                    Nationality
                  </label>

                  <select
                    id="nationality"
                    name="nationality"
                    defaultValue="Lesotho"
                    required
                  >
                    <option value="Lesotho">
                      Lesotho
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="register-password">
                    Password
                  </label>

                  <input
                    id="register-password"
                    name="password"
                    type="password"
                    placeholder="Create password"
                    minLength="8"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-password">
                    Confirm Password
                  </label>

                  <input
                    id="confirm-password"
                    name="confirm_password"
                    type="password"
                    placeholder="Repeat password"
                    minLength="8"
                    required
                  />
                </div>
              </div>

              <label className="terms-row">
                <input
                  type="checkbox"
                  required
                />

                <span>
                  I agree to the Terms of Use and Privacy Policy.
                </span>
              </label>

              <button
                type="submit"
                className="auth-submit"
              >
                Create Account
              </button>
            </form>

            <div className="auth-switch">
              Already have an account?{' '}

              <button
                type="button"
                onClick={() => setAuthPage('login')}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // CITIZEN PORTAL
  // ==========================================

  if (authPage === 'dashboard' && loggedInCitizen) {
    return (
      <div className="citizen-dashboard">

        {/* HEADER */}

        <header className="dashboard-header">
          <div className="dashboard-brand">
            <span className="dashboard-flag">
              🇱🇸
            </span>

            <div>
              <h2>Government e-Services</h2>
              <small>Kingdom of Lesotho</small>
            </div>
          </div>

          <div className="dashboard-user">
            <div className="user-avatar">
              {loggedInCitizen.name?.charAt(0)}
              {loggedInCitizen.surname?.charAt(0)}
            </div>

            <div>
              <strong>
                {loggedInCitizen.name}{' '}
                {loggedInCitizen.surname}
              </strong>

              <small>Citizen Account</small>
            </div>
          </div>
        </header>

        <div className="dashboard-layout">

          {/* SIDEBAR */}

          <aside className="dashboard-sidebar">
            <nav>

              <button
                className={
                  dashboardPage === 'dashboard'
                    ? 'sidebar-active'
                    : ''
                }
                onClick={() =>
                  setDashboardPage('dashboard')
                }
              >
                🏠 Dashboard
              </button>

              <button
                className={
                  dashboardPage === 'services'
                    ? 'sidebar-active'
                    : ''
                }
                onClick={() =>
                  setDashboardPage('services')
                }
              >
                🏛 Government Services
              </button>

              <button
                className={
                  dashboardPage === 'applications'
                    ? 'sidebar-active'
                    : ''
                }
                onClick={() =>
                  setDashboardPage('applications')
                }
              >
                🗂 My Applications
              </button>

              <button>
                🔎 Track Application
              </button>

              <button
  className={
    dashboardPage === 'notifications'
      ? 'sidebar-active'
      : ''
  }
  onClick={() =>
    setDashboardPage('notifications')
  }
>
  🔔 Notifications
</button>

              <button>
                👤 My Profile
              </button>
            </nav>

            <button
              className="logout-button"
              onClick={() => {
                setLoggedInCitizen(null)
                setDashboardPage('dashboard')
                setAuthPage(null)
              }}
            >
              🚪 Sign Out
            </button>
          </aside>

          {/* ======================================
              PORTAL MAIN CONTENT
          ====================================== */}

          <main className="dashboard-main">

            {/* ======================================
                DASHBOARD PAGE
            ====================================== */}

            {dashboardPage === 'dashboard' && (
              <>
                <section className="dashboard-welcome">
                  <div>
                    <span className="dashboard-label">
                      CITIZEN PORTAL
                    </span>

                    <h1>
                      Welcome back,{' '}
                      {loggedInCitizen.name} 👋
                    </h1>

                    <p>
                      Access government services, manage
                      your applications and track their
                      progress from one secure portal.
                    </p>
                  </div>

                  <button
                    className="new-application-button"
                    onClick={() =>
                      setDashboardPage('services')
                    }
                  >
                    + New Application
                  </button>
                </section>

                {/* DASHBOARD STATISTICS */}

                <section className="dashboard-stats">
                  <div className="stat-card">
                    <div className="stat-icon">
                      📄
                    </div>

                    <div>
                      <span>
                        Total Applications
                      </span>
                      <strong>0</strong>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">
                      ⏳
                    </div>

                    <div>
                      <span>In Progress</span>
                      <strong>0</strong>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">
                      ✓
                    </div>

                    <div>
                      <span>Completed</span>
                      <strong>0</strong>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">
                      🔔
                    </div>

                    <div>
                      <span>Notifications</span>
                      <strong>0</strong>
                    </div>
                  </div>
                </section>

                {/* APPLICATION + PROFILE */}

                <div className="dashboard-content-grid">
                  <section className="dashboard-panel">
                    <div className="panel-heading">
                      <div>
                        <h2>My Applications</h2>

                        <p>
                          Your recent government service
                          applications.
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setDashboardPage(
                            'applications'
                          )
                        }
                      >
                        View All
                      </button>
                    </div>

                    <div className="empty-applications">
                      <div className="empty-icon">
                        📂
                      </div>

                      <h3>
                        No applications yet
                      </h3>

                      <p>
                        You haven't submitted any
                        government service applications
                        yet.
                      </p>

                      <button
                        className="browse-services-button"
                        onClick={() =>
                          setDashboardPage('services')
                        }
                      >
                        Browse Government Services
                      </button>
                    </div>
                  </section>

                  {/* PROFILE */}

                  <section className="dashboard-panel profile-panel">
                    <div className="panel-heading">
                      <div>
                        <h2>My Profile</h2>
                        <p>
                          Citizen account information
                        </p>
                      </div>
                    </div>

                    <div className="profile-avatar">
                      {loggedInCitizen.name?.charAt(0)}
                      {loggedInCitizen.surname?.charAt(0)}
                    </div>

                    <h3>
                      {loggedInCitizen.name}{' '}
                      {loggedInCitizen.surname}
                    </h3>

                    <span className="active-account">
                      ● Active Citizen
                    </span>

                    <div className="profile-details">
                      <div>
                        <span>National ID</span>

                        <strong>
                          {
                            loggedInCitizen.national_id
                          }
                        </strong>
                      </div>

                      <div>
                        <span>Username</span>

                        <strong>
                          {loggedInCitizen.username}
                        </strong>
                      </div>

                      <div>
                        <span>Email Address</span>

                        <strong>
                          {loggedInCitizen.email}
                        </strong>
                      </div>

                      <div>
                        <span>Phone Number</span>

                        <strong>
                          {
                            loggedInCitizen.phone_number
                          }
                        </strong>
                      </div>

                      <div>
                        <span>Nationality</span>

                        <strong>
                          {
                            loggedInCitizen.nationality
                          }
                        </strong>
                      </div>
                    </div>
                  </section>
                </div>

                {/* DASHBOARD SERVICES */}

                <section className="dashboard-services">
                  <div className="panel-heading">
                    <div>
                      <h2>
                        Government Services
                      </h2>

                      <p>
                        Start a new government service
                        application.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setDashboardPage('services')
                      }
                    >
                      View All Services →
                    </button>
                  </div>

                  <div className="dashboard-service-grid">

                    <button
                      className="dashboard-service-card"
                      onClick={() =>
                        setDashboardPage('services')
                      }
                    >
                      <span>🪪</span>

                      <div>
                        <strong>
                          National ID
                        </strong>
                        <small>
                          Identity services
                        </small>
                      </div>

                      <b>→</b>
                    </button>

                    <button
                      className="dashboard-service-card"
                      onClick={() =>
                        setDashboardPage('services')
                      }
                    >
                      <span>🛂</span>

                      <div>
                        <strong>Passport</strong>
                        <small>
                          Passport services
                        </small>
                      </div>

                      <b>→</b>
                    </button>

                    <button
                      className="dashboard-service-card"
                      onClick={() =>
                        setDashboardPage('services')
                      }
                    >
                      <span>🏢</span>

                      <div>
                        <strong>Business</strong>
                        <small>
                          Business services
                        </small>
                      </div>

                      <b>→</b>
                    </button>

                    <button
                      className="dashboard-service-card"
                      onClick={() =>
                        setDashboardPage('services')
                      }
                    >
                      <span>💰</span>

                      <div>
                        <strong>
                          Tax & Revenue
                        </strong>
                        <small>
                          Revenue services
                        </small>
                      </div>

                      <b>→</b>
                    </button>

                  </div>
                </section>
              </>
            )}

            {/* ======================================
                GOVERNMENT SERVICES PAGE
            ====================================== */}

            {dashboardPage === 'services' && (
              <div className="portal-page">
                <div className="portal-page-header">
                  <div>
                    <span className="dashboard-label">
                      GOVERNMENT E-SERVICES
                    </span>

                    <h1>
                      Government Services
                    </h1>

                    <p>
                      Browse and access Government of
                      Lesotho services from one digital
                      gateway.
                    </p>
                  </div>
                </div>

                <div className="services-search">
                  <input
                    type="text"
                    placeholder="Search government services..."
                  />

                  <button>
                    Search
                  </button>
                </div>

                <div className="portal-services-grid">

                  <article className="portal-service">
                    <div className="portal-service-icon">
                      🪪
                    </div>

                    <div>
                      <span className="service-category">
                        IDENTITY
                      </span>

                      <h3>
                        National ID Services
                      </h3>

                      <p>
                        Access National ID registration,
                        replacement and related identity
                        services.
                      </p>
                    </div>

                    <button>
                      View Services →
                    </button>
                  </article>

                  <article className="portal-service">
                    <div className="portal-service-icon">
                      🛂
                    </div>

                    <div>
                      <span className="service-category">
                        IMMIGRATION
                      </span>

                      <h3>
                        Passport Services
                      </h3>

                      <p>
                        Apply for passport services and
                        manage passport-related
                        applications.
                      </p>
                    </div>

                    <button>
                      View Services →
                    </button>
                  </article>

                  <article className="portal-service">
                    <div className="portal-service-icon">
                      🏢
                    </div>

                    <div>
                      <span className="service-category">
                        BUSINESS
                      </span>

                      <h3>
                        Business Registration
                      </h3>

                      <p>
                        Access business registration and
                        other business-related government
                        services.
                      </p>
                    </div>

                    <button>
                      View Services →
                    </button>
                  </article>

                  <article className="portal-service">
                    <div className="portal-service-icon">
                      💰
                    </div>

                    <div>
                      <span className="service-category">
                        REVENUE
                      </span>

                      <h3>
                        Tax & Revenue
                      </h3>

                      <p>
                        Access tax registration, payments
                        and other revenue services.
                      </p>
                    </div>

                    <button>
                      View Services →
                    </button>
                  </article>

                  <article className="portal-service">
                    <div className="portal-service-icon">
                      🚗
                    </div>

                    <div>
                      <span className="service-category">
                        TRANSPORT
                      </span>

                      <h3>
                        Transport Services
                      </h3>

                      <p>
                        Access driver licensing, vehicle
                        and transport-related government
                        services.
                      </p>
                    </div>

                    <button>
                      View Services →
                    </button>
                  </article>

                  <article className="portal-service">
                    <div className="portal-service-icon">
                      🎓
                    </div>

                    <div>
                      <span className="service-category">
                        EDUCATION
                      </span>

                      <h3>
                        Education Services
                      </h3>

                      <p>
                        Access education, student and
                        academic-related government
                        services.
                      </p>
                    </div>

                    <button>
                      View Services →
                    </button>
                  </article>

                  <article className="portal-service">
                    <div className="portal-service-icon">
                      🏥
                    </div>

                    <div>
                      <span className="service-category">
                        HEALTH
                      </span>

                      <h3>
                        Health Services
                      </h3>

                      <p>
                        Access participating public health
                        and healthcare services.
                      </p>
                    </div>

                    <button>
                      View Services →
                    </button>
                  </article>

                  <article className="portal-service">
                    <div className="portal-service-icon">
                      🌾
                    </div>

                    <div>
                      <span className="service-category">
                        AGRICULTURE
                      </span>

                      <h3>
                        Agriculture Services
                      </h3>

                      <p>
                        Access agricultural programmes,
                        registrations and related services.
                      </p>
                    </div>

                    <button>
                      View Services →
                    </button>
                  </article>

                </div>
              </div>
            )}

            {/* ======================================
                MY APPLICATIONS PAGE
            ====================================== */}

            {dashboardPage === 'applications' && (
              <div className="portal-page">

                <div className="portal-page-header">
                  <div>
                    <span className="dashboard-label">
                      MY APPLICATIONS
                    </span>

                    <h1>
                      My Applications
                    </h1>

                    <p>
                      View and manage the government
                      service applications you have
                      submitted.
                    </p>
                  </div>

                  <button
                    className="new-application-button"
                    onClick={() =>
                      setDashboardPage('services')
                    }
                  >
                    + New Application
                  </button>
                </div>

                {/* APPLICATION COUNTERS */}

                <div className="application-summary">
                  <div>
                    <span>Total</span>
                    <strong>0</strong>
                  </div>

                  <div>
                    <span>Pending</span>
                    <strong>0</strong>
                  </div>

                  <div>
                    <span>Processing</span>
                    <strong>0</strong>
                  </div>

                  <div>
                    <span>Completed</span>
                    <strong>0</strong>
                  </div>
                </div>

                {/* APPLICATION LIST */}

                <div className="applications-table-container">
                  <div className="applications-toolbar">
                    <h2>
                      Applications
                    </h2>

                    <select defaultValue="all">
                      <option value="all">
                        All Applications
                      </option>

                      <option value="pending">
                        Pending
                      </option>

                      <option value="processing">
                        Processing
                      </option>

                      <option value="completed">
                        Completed
                      </option>
                    </select>
                  </div>

                  <div className="applications-empty">
                    <div>
                      📂
                    </div>

                    <h3>
                      No applications yet
                    </h3>

                    <p>
                      You haven't submitted any
                      government service applications
                      yet.
                    </p>

                    <button
                      className="new-application-button"
                      onClick={() =>
                        setDashboardPage('services')
                      }
                    >
                      Browse Government Services
                    </button>
                  </div>
                </div>
              </div>
            )}
<main className="dashboard-main">

  {/* DASHBOARD PAGE */}
  {dashboardPage === 'dashboard' && (
    <>
      ...
    </>
  )}

  {/* GOVERNMENT SERVICES PAGE */}
  {dashboardPage === 'services' && (
    <div className="portal-page">
      ...
    </div>
  )}

  {/* MY APPLICATIONS PAGE */}
  {dashboardPage === 'applications' && (
    <div className="portal-page">
      ...
    </div>
  )}

  {/* NOTIFICATIONS PAGE */}
  {dashboardPage === 'notifications' && (
    <div className="portal-page">
      ...
    </div>
  )}

</main>
          </main>
        </div>
      </div>
    )
  }

  // ==========================================
  // PUBLIC HOMEPAGE SERVICES
  // ==========================================

  const services = [
    {
      icon: '🪪',
      title: 'National ID',
      description:
        'Apply for and manage National ID services.',
    },
    {
      icon: '🛂',
      title: 'Passport Services',
      description:
        'Access passport applications and related services.',
    },
    {
      icon: '🏢',
      title: 'Business Registration',
      description:
        'Register and manage your business services.',
    },
    {
      icon: '💰',
      title: 'Tax & Revenue',
      description:
        'Access tax registration, payments and revenue services.',
    },
    {
      icon: '🚗',
      title: 'Transport Services',
      description:
        'Access vehicle and driver-related government services.',
    },
    {
      icon: '🎓',
      title: 'Education',
      description:
        'Find education, student and academic services.',
    },
  ]

  // ==========================================
  // PUBLIC HOMEPAGE
  // ==========================================

  return (
    <div className="app">

      {/* GOVERNMENT BAR */}

      <div className="government-bar">
        <div className="container government-bar-content">
          <span>
            🇱🇸 Government of Lesotho
          </span>

          <span>
            Official Government e-Services Portal
          </span>
        </div>
      </div>

      {/* NAVIGATION */}

      <header className="navbar">
        <div className="container nav-content">

          <div className="brand">
            <div className="brand-mark">
              🇱🇸
            </div>

            <div>
              <h2>
                Government e-Services
              </h2>

              <span>
                Kingdom of Lesotho
              </span>
            </div>
          </div>

          <nav>
            <a href="#home">
              Home
            </a>

            <a href="#services">
              Services
            </a>

            <a href="#ministries">
              Ministries
            </a>

            <a href="#track">
              Track Application
            </a>

            <a href="#help">
              Help
            </a>
          </nav>

          <div className="auth-buttons">
            <button
              className="login-btn"
              onClick={() =>
                setAuthPage('login')
              }
            >
              Sign In
            </button>

            <button
              className="register-btn"
              onClick={() =>
                setAuthPage('register')
              }
            >
              Create Account
            </button>
          </div>
        </div>
      </header>

      <main>

        {/* HERO */}

        <section
          className="hero-section"
          id="home"
        >
          <div className="container hero-content">
            <div className="hero-badge">
              One Government. One Digital Gateway.
            </div>

            <h1>
              Government Services.
              <span>
                {' '}One Digital Gateway.
              </span>
            </h1>

            <p className="hero-description">
              Access Government of Lesotho services
              quickly, securely and conveniently from
              one trusted digital platform.
            </p>

            <div className="search-box">
              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="What government service are you looking for?"
              />

              <button>
                Search
              </button>
            </div>

            <div className="hero-buttons">
              <a
                className="primary-button"
                href="#services"
              >
                Explore Services
              </a>

              <a
                className="secondary-button"
                href="#track"
              >
                Track Application
              </a>
            </div>

            <div className="trust-items">
              <span>
                ✓ Secure Platform
              </span>

              <span>
                ✓ Government Verified
              </span>

              <span>
                ✓ Available Online
              </span>
            </div>
          </div>
        </section>

        {/* POPULAR SERVICES */}

        <section
          className="services-section"
          id="services"
        >
          <div className="container">

            <div className="section-heading">
              <div>
                <span className="section-label">
                  E-SERVICES
                </span>

                <h2>
                  Popular Government Services
                </h2>

                <p>
                  Find and access commonly used
                  government services from one place.
                </p>
              </div>

              <button className="view-all">
                View All Services →
              </button>
            </div>

            <div className="service-grid">
              {services.map((service) => (
                <article
                  className="service-card"
                  key={service.title}
                >
                  <div className="service-icon">
                    {service.icon}
                  </div>

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                  <button className="service-link">
                    Access Service →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORIES */}

        <section className="categories-section">
          <div className="container">

            <div className="center-heading">
              <span className="section-label">
                BROWSE BY CATEGORY
              </span>

              <h2>
                Find the service you need
              </h2>

              <p>
                Government services organised into
                simple categories.
              </p>
            </div>

            <div className="category-grid">
              <div className="category">
                🪪 Identity & Civil Registration
              </div>

              <div className="category">
                🏢 Business & Trade
              </div>

              <div className="category">
                💳 Tax & Revenue
              </div>

              <div className="category">
                🚘 Transport
              </div>

              <div className="category">
                🎓 Education
              </div>

              <div className="category">
                🏥 Health
              </div>

              <div className="category">
                💼 Employment
              </div>

              <div className="category">
                🌾 Agriculture
              </div>
            </div>
          </div>
        </section>

        {/* TRACK APPLICATION */}

        <section
          className="track-section"
          id="track"
        >
          <div className="container track-content">

            <div>
              <span className="light-label">
                APPLICATION TRACKING
              </span>

              <h2>
                Already submitted an application?
              </h2>

              <p>
                Track the progress of your government
                service application using your
                application reference number.
              </p>
            </div>

            <button className="track-button">
              Track My Application →
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER */}

      <footer className="footer">
        <div className="container footer-content">

          <div>
            <h3>
              Government e-Services Gateway
            </h3>

            <p>
              Kingdom of Lesotho
            </p>
          </div>

          <div className="footer-links">
            <a href="#services">
              Services
            </a>

            <a href="#ministries">
              Ministries
            </a>

            <a href="#help">
              Help & Support
            </a>

            <a href="#privacy">
              Privacy
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Government of Lesotho. All rights
          reserved.
        </div>
      </footer>

    </div>
  )
}

export default App