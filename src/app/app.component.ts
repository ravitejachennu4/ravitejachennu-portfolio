import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';

interface SkillGroup {
  title: string;
  eyebrow: string;
  icon: string;
  skills: string[];
}

interface Experience {
  period: string;
  role: string;
  company: string;
  type: string;
  bullets: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  readonly email = 'ravitejachennu4@gmail.com';
  readonly phone = '9912710065';
  readonly location = 'Hyderabad, India';
  readonly resumeUrl = 'assets/Ravi_Teja_Resume.pdf';
  readonly totalExperience = '4.7 Years';
  readonly angularExperience = '4+ Years';

  // Replace these three URLs with the exact profile URLs when you want to connect your accounts.
  readonly socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/raviteja.chennu_?stkn=MTh6Ymx1MTJwMWd6eg%3D%3D', icon: 'instagram' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ravi-teja-chennu', icon: 'linkedin' },
    { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100004886144984', icon: 'facebook' },
    { name: 'Naukri', url: 'https://www.naukri.com/mnjuser/homepage', icon: 'naukri' }
  ];

  readonly contactEndpoint = 'https://formsubmit.co/ajax/ravitejachennu4@gmail.com';

  readonly navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  readonly skillGroups: SkillGroup[] = [
    {
      title: 'Frontend Technologies',
      eyebrow: '01 / FRONTEND',
      icon: '</>',
      skills: ['Angular (2+)', 'Angular Material', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'Signals', 'Standalone Components', 'RxJS', 'NgRx', 'Reactive Programming']
    },
    {
      title: 'Web Concepts',
      eyebrow: '02 / WEB',
      icon: 'UI',
      skills: ['Single Page Application (SPA)', 'Lazy Loading', 'Responsive Design', 'Component Architecture', 'Cross-Browser Compatibility', 'Performance Optimization']
    },
    {
      title: 'Backend & APIs',
      eyebrow: '03 / APIs',
      icon: '{}',
      skills: ['RESTful APIs']
    },
    {
      title: 'Version Control',
      eyebrow: '04 / VERSIONING',
      icon: 'git',
      skills: ['Git']
    },
    {
      title: 'Tools & Platforms',
      eyebrow: '05 / TOOLS',
      icon: '⌘',
      skills: ['GitLab', 'Postman', 'AKS', 'Pgadmin', 'ServiceNow']
    },
    {
      title: 'Database',
      eyebrow: '06 / DATA',
      icon: 'DB',
      skills: ['MongoDB', 'PostgreSQL']
    },
    {
      title: 'Methodologies',
      eyebrow: '07 / DELIVERY',
      icon: '↻',
      skills: ['Agile', 'Scrum', 'Code Review']
    },
    {
      title: 'Monitoring Tools',
      eyebrow: '08 / OBSERVABILITY',
      icon: '◌',
      skills: ['Splunk', 'Grafana']
    }
  ];

  readonly experiences: Experience[] = [
    {
      period: 'Jan 2022 — Dec 2022',
      role: 'Assistant System Engineer',
      company: 'TCS',
      type: 'Frontend / Application Development',
      bullets: [
        'Supported application development, maintenance and issue analysis in an enterprise delivery environment.',
        'Strengthened frontend engineering practices through hands-on work with Angular and web technologies.',
        'Participated in team-based delivery, defect resolution and application support activities.'
      ]
    },
    {
      period: 'Jan 2023 — Sep 2026',
      role: 'Systems Engineer',
      company: 'TCS',
      type: 'Application Development & Support',
      bullets: [
        'Developed and maintained enterprise web experiences using Angular, TypeScript, JavaScript, HTML5, CSS3 and SCSS.',
        'Implemented responsive UI components, reusable frontend patterns and application enhancements based on business requirements.',
        'Collaborated with cross-functional teams to troubleshoot defects, improve usability and maintain application quality.'
      ]
    }
  ];

  readonly phrases = [
    'Angular Frontend Developer',
    'TypeScript Developer',
    'UI-Focused Web Developer',
    'Frontend Problem Solver'
  ];

  isDark = true;
  menuOpen = false;
  activeSection = 'home';
  showMoreAbout = false;
  showToast = false;
  notificationMessage = '';
  isSendingMessage = false;
  selectedSocial = '';
  typedText = '';
  codeRotation = '0deg';
  codeTiltX = '0deg';
  codeTiltY = '0deg';
  contact = { name: '', email: '', message: '' };

  @ViewChild('codeCard') codeCard?: ElementRef<HTMLElement>;

  private observer?: IntersectionObserver;
  private typingTimer?: number;
  private typingPauseTimer?: number;
  private toastTimer?: number;
  private phraseIndex = 0;
  private charIndex = 0;
  private deleting = false;

  ngAfterViewInit(): void {
    this.startTyping();
    this.setupSectionObserver();
    this.updateScrollProgress();
  }

  ngOnDestroy(): void {
    if (this.typingTimer !== undefined) window.clearInterval(this.typingTimer);
    if (this.typingPauseTimer !== undefined) window.clearTimeout(this.typingPauseTimer);
    if (this.toastTimer !== undefined) window.clearTimeout(this.toastTimer);
    this.observer?.disconnect();
  }

  onWindowScroll(): void {
    this.updateScrollProgress();
  }

  scrollTo(sectionId: string): void {
    this.menuOpen = false;
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
  }

  selectSocial(icon: string): void {
    this.selectedSocial = icon;
  }

  copyEmail(): void {
    if (!navigator.clipboard) {
      this.showNotification('Copy is not supported by this browser.');
      return;
    }
    navigator.clipboard.writeText(this.email)
      .then(() => this.showNotification('Email copied to clipboard.'))
      .catch(() => this.showNotification('Unable to copy email.'));
  }

  async sendMessage(): Promise<void> {
    const name = this.contact.name.trim();
    const senderEmail = this.contact.email.trim();
    const message = this.contact.message.trim();

    if (!name || !senderEmail || !message) {
      this.showNotification('Please complete all fields before sending.');
      return;
    }

    if (this.isSendingMessage) { return; };
    this.isSendingMessage = true;

    const payload = {
      name,
      email: senderEmail,
      message,
      _subject: `Portfolio enquiry from ${name}`,
      _template: 'table',
      _captcha: 'false',
      _honey: ''
    };

    // Clear the form and give immediate feedback
    this.contact = {
      name: '',
      email: '',
      message: ''
    };

    this.isSendingMessage = false;


    this.showNotification(
      'Message sent successfully. Thank you for reaching out!'
    );

    // Send in the background without blocking the UI
    fetch(this.contactEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(async response => {
        const result = await response.json().catch(() => null);

        if (!response.ok || result?.success === false) {
          throw new Error('Message service rejected the request.');
        }

        console.log('Portfolio message delivered successfully.');
      })
      .catch(error => {
        console.error('Portfolio message delivery error:', error);
      });
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = this.resumeUrl;
    link.download = 'Ravi_Teja_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.remove();
    this.showNotification('Resume download started.');
  }

  onCodeMove(event: MouseEvent): void {
    const element = this.codeCard?.nativeElement;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    this.codeTiltY = `${x * 10}deg`;
    this.codeTiltX = `${-y * 10}deg`;
    this.codeRotation = `${x * 4}deg`;
  }

  resetCodeCard(): void {
    this.codeTiltX = '0deg';
    this.codeTiltY = '0deg';
    this.codeRotation = '0deg';
  }

  trackByTitle(_: number, group: SkillGroup): string {
    return group.title;
  }

  private updateScrollProgress(): void {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;
    document.documentElement.style.setProperty('--scroll-progress', `${percentage}%`);
  }

  private setupSectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((entry: IntersectionObserverEntry) => entry.isIntersecting)
        .sort((a: IntersectionObserverEntry, b: IntersectionObserverEntry) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target.id) this.activeSection = visible.target.id;
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-70px 0px -20% 0px' });

    this.navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) this.observer?.observe(section);
    });
  }

  private startTyping(): void {
    if (this.typingTimer !== undefined) window.clearInterval(this.typingTimer);

    this.typingTimer = window.setInterval(() => {
      const phrase = this.phrases[this.phraseIndex];

      if (!this.deleting) {
        this.charIndex += 1;
        this.typedText = phrase.slice(0, this.charIndex);
        if (this.charIndex >= phrase.length) {
          this.deleting = true;
          if (this.typingTimer !== undefined) window.clearInterval(this.typingTimer);
          this.typingPauseTimer = window.setTimeout(() => this.startTyping(), 1100);
        }
      } else {
        this.charIndex -= 1;
        this.typedText = phrase.slice(0, this.charIndex);
        if (this.charIndex <= 0) {
          this.deleting = false;
          this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        }
      }
    }, 75);
  }

  private showNotification(message: string): void {
    if (this.toastTimer !== undefined) window.clearTimeout(this.toastTimer);
    this.notificationMessage = message;
    this.showToast = true;
    this.toastTimer = window.setTimeout(() => this.showToast = false, 4200);
  }
}
