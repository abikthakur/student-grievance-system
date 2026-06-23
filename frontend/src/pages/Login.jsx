import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Send, 
  ArrowRight, 
  Activity,
  Layers
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="landing-page-container">
      {/* HERO SECTION */}
      <div className="container">
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <Activity size={14} />
              <span>Direct Campus Connection</span>
            </div>
            <h1 className="hero-title">
              Empowering Student <span className="text-gradient">Voices</span>, Shaping Campuses.
            </h1>
            <p className="hero-desc">
              Submit concerns, track resolution progress in real-time, and collaborate directly with your university administration to build a better community.
            </p>
            
            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="hero-stat-value">98%</span>
                <span className="hero-stat-label">Resolved</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-value">&lt; 24h</span>
                <span className="hero-stat-label">Response</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-value">12k+</span>
                <span className="hero-stat-label">Students</span>
              </div>
            </div>
          </div>

          <div className="auth-card glass-panel">
            <h2 className="text-center mb-4">Welcome Back</h2>
            {error && <p style={{ color: 'var(--error-color)', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <span>Login</span>
                <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </button>
            </form>
            <p className="text-center mt-4">
              Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Register</Link>
            </p>
          </div>
        </section>
      </div>

      {/* FEATURES SECTION */}
      <section id="features" className="landing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Key Features</span>
            <h2 className="section-title">Built to resolve student issues</h2>
            <p className="section-desc">We make campus administration smooth, open, and responsive. Here is how we ensure your voice is heard.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card glass-panel">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={24} />
              </div>
              <h3>Secure & Trusted</h3>
              <p>State of the art encryption ensures that your data stays confidential. Submit grievances with total peace of mind.</p>
            </div>
            
            <div className="feature-card glass-panel">
              <div className="feature-icon-wrapper">
                <Clock size={24} />
              </div>
              <h3>Real-Time Tracking</h3>
              <p>Watch your concerns move from submission to investigation, and finally to resolution, with instant notification updates.</p>
            </div>
            
            <div className="feature-card glass-panel">
              <div className="feature-icon-wrapper">
                <Layers size={24} />
              </div>
              <h3>Structured Workflow</h3>
              <p>Grievances are cataloged by department automatically, routing them directly to the authority best equipped to handle them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="landing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Workflow</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-desc">Three simple steps to bridge the gap between students and university management.</p>
          </div>
          
          <div className="steps-grid">
            <div className="step-card glass-panel">
              <div className="step-badge">1</div>
              <Send size={32} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
              <h3>Submit Complaint</h3>
              <p style={{ fontSize: '0.95rem' }}>Select the category, explain your grievance details, attach optional proof, and submit.</p>
            </div>
            
            <div className="step-card glass-panel">
              <div className="step-badge">2</div>
              <Activity size={32} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
              <h3>Admin Review</h3>
              <p style={{ fontSize: '0.95rem' }}>Department heads receive the ticket, assess the request, and set status to processing.</p>
            </div>
            
            <div className="step-card glass-panel">
              <div className="step-badge">3</div>
              <CheckCircle2 size={32} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
              <h3>Swift Resolution</h3>
              <p style={{ fontSize: '0.95rem' }}>The issue is solved, the student receives feedback, and the grievance is resolved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW SECTION */}
      <section className="landing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Dashboard</span>
            <h2 className="section-title">Interactive Interface</h2>
            <p className="section-desc">Experience a dashboard optimized for productivity, tracking, and quick feedback.</p>
          </div>
          
          <div className="preview-wrapper">
            <div className="preview-browser-header">
              <div className="preview-dot red"></div>
              <div className="preview-dot yellow"></div>
              <div className="preview-dot green"></div>
              <div className="preview-address-bar">grievances.campus.edu/dashboard</div>
            </div>
            <div className="preview-content">
              <div className="mock-dashboard">
                <div className="mock-navbar">
                  <span className="mock-logo">Grievance Portal</span>
                  <div className="mock-avatar"></div>
                </div>
                <div className="mock-grid">
                  <div className="mock-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Library AC Leak</span>
                      <span className="mock-badge"></span>
                    </div>
                    <div className="mock-line-sm w-70"></div>
                    <div className="mock-line-sm w-50"></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <span>Dept: Facilities</span>
                      <span>2 hours ago</span>
                    </div>
                  </div>
                  
                  <div className="mock-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Hostel WiFi Speed</span>
                      <span className="mock-badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}></span>
                    </div>
                    <div className="mock-line-sm w-70"></div>
                    <div className="mock-line-sm w-50"></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <span>Dept: IT Support</span>
                      <span>Yesterday</span>
                    </div>
                  </div>
                  
                  <div className="mock-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Classroom Projector</span>
                      <span className="mock-badge"></span>
                    </div>
                    <div className="mock-line-sm w-70"></div>
                    <div className="mock-line-sm w-50"></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <span>Dept: Facilities</span>
                      <span>3 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="landing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Success Stories</span>
            <h2 className="section-title">What students say</h2>
            <p className="section-desc">Real stories from students whose campus experiences were improved by our grievance system.</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card glass-panel">
              <p className="testimonial-quote">
                "Our hostel room had severe dampness, and normal requests were ignored. When I filed a ticket here, the facilities lead resolved it in less than 48 hours. Phenomenal tool!"
              </p>
              <div className="testimonial-user">
                <div className="testimonial-avatar">SP</div>
                <div className="testimonial-meta">
                  <h4>Siddharth Patel</h4>
                  <span>Sophomore, Computer Engineering</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card glass-panel">
              <p className="testimonial-quote">
                "The transparency is what sets this system apart. I could see that my department head was actively reviewing my scholarship concern, which gave me immense reassurance."
              </p>
              <div className="testimonial-user">
                <div className="testimonial-avatar">AR</div>
                <div className="testimonial-meta">
                  <h4>Ananya Rao</h4>
                  <span>Senior, Business School</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs SECTION */}
      <section id="faq" className="landing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Support</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">Got questions about the Grievance System? We have answers.</p>
          </div>
          
          <div className="faq-list">
            <details className="faq-item">
              <summary className="faq-question">
                <span>Who reviews my grievance submission?</span>
              </summary>
              <div className="faq-answer">
                Each grievance is automatically categorized and sent to the specific department head, student welfare officer, or administrator responsible for that sector.
              </div>
            </details>
            
            <details className="faq-item">
              <summary className="faq-question">
                <span>How long does it take for a ticket to be resolved?</span>
              </summary>
              <div className="faq-answer">
                Most grievances receive their initial administrator review within 24 hours. Depending on the complexity of the issue, resolution times usually range between 2 to 5 business days.
              </div>
            </details>
            
            <details className="faq-item">
              <summary className="faq-question">
                <span>Can I submit anonymous reports?</span>
              </summary>
              <div className="faq-answer">
                Yes, safety and confidentiality are key. The system provides a checkbox toggle on grievance submission to submit the ticket anonymously, hiding your identity from regular department staff.
              </div>
            </details>
            
            <details className="faq-item">
              <summary className="faq-question">
                <span>How will I know when my grievance is resolved?</span>
              </summary>
              <div className="faq-answer">
                You will receive instant status changes visible directly on your dashboard dashboard. You can also view action comments and details left by administrators.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="footer-logo">Grievance System</a>
              <p>Ensuring campus safety, academic fairness, and transparency for every student.</p>
            </div>
            
            <div className="footer-col">
              <h4>System Links</h4>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#faq">FAQs</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>University Resources</h4>
              <ul className="footer-links">
                <li><a href="https://github.com/abikthakur/student-grievance-system" target="_blank" rel="noopener noreferrer">Source Code</a></li>
                <li><a href="#">Student Handbook</a></li>
                <li><a href="#">Support Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Legal & Privacy</h4>
              <ul className="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Honor Code</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Campus Student Grievance System. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Status</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;

