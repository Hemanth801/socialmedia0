# Lokarapu Hemanth - Professional Portfolio Website

A modern, responsive, and professional portfolio website for a B.Tech CSE student specializing in Cybersecurity.

## 🎯 Overview

This portfolio showcases:
- Professional cybersecurity-themed design
- Responsive layout for all devices
- Smooth animations and transitions
- Downloadable resume functionality
- Professional avatar/photo placeholder
- Work experience and internship timeline
- GitHub profile integration
- Organized sections for education, experience, skills, projects, and certifications
- Contact information and social links
- Mobile-optimized navigation menu

## 📁 Project Structure

```
portfolio/
│
├── index.html              # Main HTML file with all sections
├── css/
│   └── style.css          # Comprehensive styling and responsive design
├── js/
│   └── script.js          # Interactivity and animations
├── assets/
│   ├── images/            # Placeholder for profile images
│   ├── icons/             # Placeholder for custom icons
│   └── documents/         # Resume and other downloadable documents
│       └── resume.pdf     # Your professional resume (add this)
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code, Sublime Text, etc.) for customization
- Basic knowledge of HTML, CSS, and JavaScript (optional)

### Running Locally

#### Option 1: Direct File Opening
1. Navigate to the project folder
2. Double-click `index.html` to open in your default browser
3. The website will load and be fully functional

#### Option 2: Local Server (Recommended)
**Using Python 3:**
```bash
cd portfolio
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Using Python 2:**
```bash
cd portfolio
python -m SimpleHTTPServer 8000
```

**Using Node.js (with http-server):**
```bash
npm install -g http-server
cd portfolio
http-server
```

**Using VS Code Live Server:**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎨 Design Features

### Color Scheme
- **Primary Color**: Cyan (#00d4ff)
- **Secondary Color**: Purple (#764ba2)
- **Background**: Dark (#0a0e27 to #050810)
- **Cards**: Semi-transparent with glassmorphism effect

### Key Design Elements
- Cyber security-themed aesthetics
- Smooth scroll animations
- Hover effects on interactive elements
- Sticky navigation bar
- Mobile hamburger menu
- Back-to-top button
- Scroll reveal animations
- Professional typography

### Responsive Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: Below 768px
- Small Mobile: Below 480px

## 📝 Sections

### 1. Navigation
- Fixed sticky navbar with smooth scrolling
- Mobile hamburger menu
- Active section highlighting
- Resume download button
- GitHub profile link
- Professional social media icons

### 2. Hero Section
- Professional avatar/photo placeholder
- Introduction heading with highlight effect
- Professional subtitle
- Call-to-action buttons (Resume, Projects, Contact)
- Social media links (GitHub, LinkedIn, Email)
- Cybersecurity-themed illustration with animations

### 3. About Me
- Professional summary
- Technical interests with icons (8 areas)
- Personal information card
- Interest grid layout with hover effects

### 4. Education
- Timeline layout of educational background
- B.Tech with current pursuing status
- Intermediate and secondary education
- Institution details, duration, and achievements
- Status badges

### 5. Experience & Internships
- Professional experience timeline
- Current research/project work
- Internship details (IBM, Skill Dzire)
- Skills developed per experience
- Type badges for categorization

### 6. Technical Skills
- Categorized skill cards (6 categories):
  - Programming Languages (C, Python, Java, R, Kotlin)
  - Cybersecurity Tools (Kali Linux, Wireshark, Burp Suite, etc.)
  - Cybersecurity Concepts (Network Security, Cryptography, etc.)
  - Operating Systems (Kali Linux, Windows, Linux)
  - Development Tools (Android Studio, Git, VS Code, Compose)
  - Frameworks & Libraries (Android SDK, Jetpack Compose, etc.)
- Hover animations for interactive feel

### 7. Featured Projects
- Android-Based Smart Permission System showcase
- Project description and key features (8 features listed)
- Technology stack with tags
- Architecture workflow diagram
- Research badge for academic projects

### 8. Resume
- Professional resume download section
- PDF format with download button
- Instructions for adding your resume
- File management guide
- Visual resume icon and metadata

### 9. Career Objective
- Professional career goal statement
- Focused on cybersecurity mission
- Motivational blockquote styling

### 10. Certifications & Workshops
- Certificate cards with icons
- Professional and completed badges
- Listed certifications:
  - IBM Data Analytics Internship
  - Google Cybersecurity (Coursera)
  - Java Full Stack Internship
  - Python Internship
  - Ethical Hacking Workshop
  - Art of Hacking Workshop

### 11. Strengths
- Four key strengths with icons:
  - Quick Learner
  - Team Player
  - Analytical Thinker
  - Adaptable
- Professional strength descriptions
- Hover effects and animations

### 12. Contact
- Contact information section
- Quick action buttons (Email, Call, LinkedIn)
- Contact information cards with icons
- Contact form placeholder with instructions
- Integration-ready for email services

### 13. Footer
- Copyright notice
- Social media links (LinkedIn, Email)
- Back-to-top button with smooth scroll

## 🛠️ Customization Guide

### Adding Your Resume

1. **Create a PDF** of your professional resume
2. **Name it** `resume.pdf`
3. **Place it** in the `assets/documents/` folder
4. The download button will automatically link to your resume
5. Update as needed - the website always links to the latest version

### Updating Personal Information

**Edit `index.html`:**

1. **Name**: Replace "LOKARAPU HEMANTH" with your name
2. **Contact Email**: Update `lokarapuhemanth2004@gmail.com`
3. **Phone Number**: Update `+91 8247583544`
4. **LinkedIn**: Update profile URL to your actual LinkedIn profile
5. **GitHub**: Update the GitHub link (line where it says `href="https://github.com"`)
6. **Location**: Update city and state

### Changing Colors

**Edit `css/style.css`:**

Modify the CSS variables in `:root` section:
```css
:root {
    --primary-color: #00d4ff;        /* Change main color */
    --secondary-color: #764ba2;      /* Change accent color */
    --background-dark: #0a0e27;      /* Change background */
    /* ... other colors ... */
}
```

### Adding Your Resume

1. **Create a PDF** of your professional resume
2. **Name it** `resume.pdf`
3. **Place it** in the `assets/documents/` folder
4. The download button will automatically link to your resume
5. Update as needed - the website always links to the latest version

### Adding Your Professional Photo

The hero section includes a professional avatar placeholder. To add your photo:

1. **Prepare a professional photo** (circular crop recommended - at least 200x200px)
2. **Place it** in `assets/images/` folder
3. **Edit `index.html`** and replace the avatar section:
```html
<div class="avatar-placeholder">
    <img src="assets/images/your-photo.jpg" alt="Your Name">
</div>
```

### Updating Work Experience

Add or modify your internships/projects in the Experience section:

```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <div class="experience-card">
            <div class="experience-header">
                <h3>Your Position/Project Title</h3>
                <span class="exp-type-badge">Your Type</span>
            </div>
            <div class="experience-meta">
                <p><strong>Details:</strong> Your details</p>
            </div>
            <div class="experience-details">
                <p>Description of what you did.</p>
                <div class="experience-skills">
                    <span>Skill 1</span>
                    <span>Skill 2</span>
                </div>
            </div>
        </div>
    </div>
</div>
```

### Adding Your GitHub Link

**Edit the navigation bar** in `index.html`:
- Find: `<a href="https://github.com"`
- Replace with your GitHub: `<a href="https://github.com/yourusername"`

Also update in the hero social links with your actual GitHub URL.

### Changing Colors

**Edit `css/style.css`:**

Modify the CSS variables in `:root` section:
```css
:root {
    --primary-color: #00d4ff;        /* Change main color */
    --secondary-color: #764ba2;      /* Change accent color */
    --background-dark: #0a0e27;      /* Change background */
    /* ... other colors ... */
}
```

### Adding Your Own Images

1. Place images in `assets/images/` folder
2. Update image paths in HTML:
```html
<img src="assets/images/your-image.jpg" alt="Description">
```

### Modifying Content Sections

Each section is clearly marked in `index.html`:
```html
<!-- Section Name -->
<section id="section-id">
    <!-- Content here -->
</section>
```

### Adding New Certifications

```html
<div class="cert-card">
    <div class="cert-icon">
        <i class="fas fa-certificate"></i>
    </div>
    <h3>Your Certification Name</h3>
    <p class="cert-type">Issuer/Organization</p>
    <div class="cert-status">Completed</div>
</div>
```

### Connecting the Contact Form

To enable email functionality, integrate with:

**Option 1: EmailJS**
1. Sign up at https://emailjs.com
2. Add to `index.html`:
```html
<script type="text/javascript"
    src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js">
</script>
```

3. Update `js/script.js`:
```javascript
emailjs.init('YOUR_PUBLIC_KEY');
emailjs.send('service_id', 'template_id', formData)
    .then(() => alert('Email sent successfully!'));
```

**Option 2: Formspree**
1. Sign up at https://formspree.io
2. Replace form action: `<form action="https://formspree.io/f/YOUR_ID">`

**Option 3: Firebase**
Set up Cloud Functions to handle form submissions securely.

## 📱 Responsive Design

The website is fully responsive and tested on:
- Desktop (1920x1080, 1366x768)
- Tablet (768x1024)
- Mobile (375x667, 414x896)

Mobile features:
- Hamburger menu
- Touch-friendly buttons
- Optimized font sizes
- Stack layout for cards
- Improved readability

## ♿ Accessibility

The website includes:
- Semantic HTML structure
- ARIA labels for buttons
- Good color contrast
- Keyboard navigation support
- Screen reader compatible
- Focus management
- Reduced motion support

## 🚀 Deployment Options

### GitHub Pages (Free)

1. Create GitHub repository named `username.github.io`
2. Push portfolio files to the repository
3. Access at `https://username.github.io`

```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/username/username.github.io
git push -u origin main
```

### Vercel (Free)

1. Sign up at https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Deploy with one click

### Netlify (Free)

1. Sign up at https://netlify.com
2. Drag and drop your portfolio folder
3. Or connect GitHub repository
4. Automatic deployment on updates

### Custom Domain

1. Purchase domain (GoDaddy, Namecheap, etc.)
2. Update DNS settings to point to hosting
3. Configure SSL certificate (usually automatic)

## 📊 Performance

The website is optimized for:
- **Lighthouse Score**: Aiming for 90+
- **Page Load**: < 2 seconds
- **Mobile Performance**: Optimized for 4G
- **Accessibility**: WCAG 2.1 compliant

Performance tips:
- Compress images before adding
- Minimize external dependencies
- Use CDN for assets
- Enable caching

## 🔒 Privacy & Security

- No personal address displayed
- HTTPS recommended for deployment
- No cookies or tracking by default
- Contact form data not stored locally
- GDPR compliant structure

## 🐛 Troubleshooting

### Navigation Links Not Working
- Ensure `id` attributes match `href` links
- Check spelling of section IDs

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file is properly linked
- Verify media queries for your device

### Mobile Menu Not Opening
- Check JavaScript is enabled
- Verify hamburger button is visible
- Test in incognito mode

### Form Not Submitting
- Form is currently a placeholder
- Integrate with EmailJS, Formspree, or backend
- Check console for JavaScript errors

## 📚 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📖 Additional Resources

### Learn More
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)
- [Web Dev by Google](https://web.dev)

### Tools
- [Font Awesome Icons](https://fontawesome.com)
- [Google Fonts](https://fonts.google.com)
- [ColorHunt](https://colorhunt.co)
- [Figma](https://figma.com) - Design tool

### Hosting
- [GitHub Pages](https://pages.github.com)
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [Firebase Hosting](https://firebase.google.com)

## 💡 Tips for Portfolio Success

1. **Keep It Updated**: Regularly update projects and skills
2. **Quality Over Quantity**: Focus on meaningful projects
3. **Show Your Work**: Include GitHub links and live demos
4. **Professional Content**: Proofread all text
5. **Mobile First**: Test on mobile devices
6. **Performance**: Keep load times fast
7. **SEO**: Use descriptive titles and meta tags
8. **Analytics**: Add Google Analytics for insights

## 📄 File Checklist

- [x] index.html - Main HTML file
- [x] css/style.css - Styling system
- [x] js/script.js - Interactivity
- [x] assets/images/ - Image folder (empty)
- [x] assets/icons/ - Icons folder (empty)
- [x] README.md - Documentation

## 🎓 Learning Notes

This portfolio demonstrates:
- HTML5 semantic markup
- Advanced CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (no frameworks)
- Responsive design principles
- Accessibility best practices
- Performance optimization

Perfect for:
- Learning web development
- Creating a professional online presence
- Showcasing technical skills
- Practicing HTML/CSS/JavaScript

## 📞 Support

For issues or questions:
1. Check this README
2. Review code comments
3. Search browser console for errors
4. Test in different browsers

## 📄 License

This portfolio template is free to use and customize. Feel free to modify and use it for your own portfolio.

---

**Made with ❤️ for aspiring cybersecurity professionals**

**Last Updated**: August 2026
**Version**: 1.0
**Status**: Production Ready
