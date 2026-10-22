import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  HostListener,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

interface Education {
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  coursework: string[];
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None
})
export class App implements AfterViewInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);

  // ----- live ticking timecode (hero) -----
  liveTC = '00:00:00:00';
  private frame = 0;
  private tcInterval: any;

  // ----- scrub playhead drift -----
  scrubPos = 0;
  private scrubInterval: any;
  scrubTicks = Array.from({ length: 20 });

  // ----- photo parallax tilt -----
  @ViewChild('photoFrame') photoFrame?: ElementRef<HTMLElement>;
  @ViewChild('heroEl') heroEl?: ElementRef<HTMLElement>;
  photoTransform = 'rotateX(0deg) rotateY(0deg)';

  // ----- resume data -----
  experiences: Experience[] = [
    {
      title: 'Software Engineer',
      company: 'AmaliTech Ghana Limited',
      location: 'Accra, Ghana',
      startDate: 'OCT 2024',
      endDate: 'SEP 2025',
      achievements: [
        'Conducted code reviews to maintain clean, efficient, and standards-compliant code.',
        'Troubleshot and resolved software issues to ensure stable and reliable performance.',
        'Actively participated in Agile ceremonies to improve collaboration and delivery efficiency.',
        'Integrated third-party APIs to enhance functionality and elevate user experience.',
        'Created and maintained clear technical documentation for future development and maintenance.',
        'Supported software deployment and provided post-launch monitoring to ensure smooth releases.',
        'Developed responsive web applications using Java, JavaScript, HTML, and CSS.',
        'Collaborated with cross-functional teams to design, test, and deliver high-quality solutions.'
      ]
    },
    {
      title: 'Intern',
      company: 'AmaliTech Ghana Limited',
      location: 'Takoradi, Ghana',
      startDate: 'JUN 2023',
      endDate: 'SEP 2023',
      achievements: [
        'Collaborated with team members to troubleshoot and resolve technical issues.',
        'Participated in code reviews to maintain code quality and consistency with project standards.',
        'Conducted application testing to identify and fix bugs, improving overall functionality.',
        'Supported project managers in monitoring project progress and ensuring timely delivery.'
      ]
    }
  ];

  // non-technical roles, shown as a compact list so the dev work leads
  earlierRoles = [
    { title: 'Intern', company: 'National Health Insurance Scheme', startDate: 'MAR 2022', endDate: 'MAY 2022', summary: 'Client advisory & tailored proposals' },
    { title: 'Intern', company: 'Talamus Health', startDate: 'DEC 2021', endDate: 'FEB 2022', summary: 'Market research & social media content' },
    { title: 'Intern', company: 'Faith Community School', startDate: 'MAR 2021', endDate: 'OCT 2021', summary: 'Teaching support & student engagement' }
  ];

  education: Education[] = [
    {
      degree: 'BTECH in Information Studies (Software Engineering)',
      school: 'Takoradi Technical University',
      startDate: 'JAN 2021',
      endDate: 'SEP 2024',
      coursework: [
        'Public Relations',
        'Marketing of Information Services',
        'Principles of Management',
        'Organizational Information Systems',
        'Human Resource Development and Management'
      ]
    }
  ];

  codeSkills = [
    'Angular',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'HTML / CSS',
    'Tailwind',
    'SCSS / Sass',
    'Bootstrap',
    'Contentful',
    'AWS',
    'Netlify / Vercel',
    'Git & GitHub',
    'Agile / Scrum'
  ];

  filmSkills = [
    'Videography',
    'Shot Composition',
    'Editing & Pacing',
    'Color Grading',
    'Storytelling'
  ];

  navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  services = [
    {
      id: 'SVC_01',
      title: 'Web Apps & Dashboards',
      description: 'Responsive, maintainable frontends in Angular, React or Next.js — from product landing pages to data-heavy dashboards and SaaS tools.',
      accent: 'cyan'
    },
    {
      id: 'SVC_02',
      title: 'Business Websites',
      description: 'Fast, mobile-first marketing sites that explain what you do and turn visitors into enquiries — deployed and ready to share.',
      accent: 'cyan'
    },
    {
      id: 'SVC_03',
      title: 'Video Production',
      description: 'Shooting and editing for events, brands and social — composed, paced and colour graded to tell your story.',
      accent: 'amber'
    }
  ];

  // client-facing projects, strongest first
  workItems = [
    {
      id: 'BUILD_01',
      title: 'Open Base Africa',
      category: 'Corporate website',
      description: 'Website for a company that builds and runs offshore teams in Ghana for international businesses — service packages, implementation roadmap, case studies and consultation booking.',
      href: 'https://openbaseafrica.com/',
      domain: 'openbaseafrica.com'
    },
    {
      id: 'BUILD_02',
      title: 'Smart Data Hub',
      category: 'Fintech · Digital services platform',
      description: 'Platform for buying airtime, WAEC/BECE exam vouchers and utility payments across Ghana\'s networks — MTN MoMo, Telecel Cash and AT Money checkout, live order tracking and an agent/reseller programme.',
      href: 'https://data-hub-steel.vercel.app/',
      domain: 'data-hub-steel.vercel.app'
    },
    {
      id: 'BUILD_03',
      title: 'QuizMasterPro',
      category: 'EdTech · SaaS product site',
      description: 'Product site for an assessment platform for educators — question bank, analytics, class management, secure proctoring and AI question generation.',
      href: 'https://quiz-master-pro-ecru.vercel.app/',
      domain: 'quiz-master-pro-ecru.vercel.app'
    },
    {
      id: 'BUILD_04',
      title: 'ShopVerse',
      category: 'E-commerce storefront',
      description: 'Online store with flash-sale countdowns, category browsing, best-seller listings and add-to-cart product cards.',
      href: 'https://exclusive-commerce-nu.vercel.app/',
      domain: 'exclusive-commerce-nu.vercel.app'
    },
    {
      id: 'BUILD_05',
      title: 'TidyUp 24/7',
      category: 'Service business website',
      description: 'Marketing site for a facility management company — cleaning, landscaping and pest control — with services, gallery, onboarding steps and a request-a-quote flow.',
      href: 'https://tidy-up-henna.vercel.app/',
      domain: 'tidy-up-henna.vercel.app'
    },
    {
      id: 'BUILD_06',
      title: 'Gradcell',
      category: 'Careers platform · React',
      description: 'Internship platform helping students and graduates launch their careers, with filterable listings by category, job type and location.',
      href: 'https://gradell-webpage.vercel.app/',
      domain: 'gradell-webpage.vercel.app'
    }
  ];

  // edited video work, hosted on Google Drive (file must be shared "Anyone with the link")
  reelItems = [
    {
      id: 'REEL_01',
      title: 'Edit 01',
      description: 'Shot and edited by me — composition, pacing and colour.',
      driveId: '1UUmBHxIGHbBE26uTOTURgFdE4Dcbui9T'
    },
    {
      id: 'REEL_02',
      title: 'Edit 02',
      description: 'Shot and edited by me — composition, pacing and colour.',
      driveId: '1y59-b9jO3ztTMGQzXTRQf_licgpzHJVc'
    },
    {
      id: 'REEL_03',
      title: 'Edit 03',
      description: 'Shot and edited by me — composition, pacing and colour.',
      driveId: '1LYKVOinfpMVU2nh4PeHaorIw-5Nz_E5A'
    }
  ].map((reel) => ({
    ...reel,
    href: `https://drive.google.com/file/d/${reel.driveId}/view`,
    embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(`https://drive.google.com/file/d/${reel.driveId}/preview`)
  }));

  contactLinks = [
    { label: 'abeikumagnus@gmail.com', href: 'mailto:abeikumagnus@gmail.com' },
    { label: 'WhatsApp: +233 50 679 0655 ↗', href: 'https://wa.me/233506790655?text=Hi%20Magnus%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.' },
    { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/magnus-kutuson/' },
    // fill in the href and these appear automatically
    { label: 'GitHub ↗', href: '#' },
    { label: 'Instagram / Reel platform ↗', href: '#' }
  ];

  // hide anything still pointing at a placeholder link
  publishedContactLinks = this.contactLinks.filter((l) => l.href !== '#');

  // ----- scroll reveal -----
  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef<HTMLElement>>;
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    // ticking film timecode, ~24fps
    this.tcInterval = setInterval(() => {
      this.frame++;
      const totalSeconds = Math.floor(this.frame / 24);
      const h = this.pad(Math.floor(totalSeconds / 3600));
      const m = this.pad(Math.floor((totalSeconds % 3600) / 60));
      const s = this.pad(totalSeconds % 60);
      const f = this.pad(this.frame % 24);
      this.liveTC = `${h}:${m}:${s}:${f}`;
    }, 1000 / 24);

    // slow drifting playhead across the timeline scrub bar
    this.scrubInterval = setInterval(() => {
      this.scrubPos = (this.scrubPos + 0.15) % 100;
    }, 50);

    // no IntersectionObserver (old browsers, test env) — just show everything
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal, [data-stagger-group] > *').forEach((el) => el.classList.add('in'));
      return;
    }

    // staggered reveal-on-scroll
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset['staggerIndex']
              ? +el.dataset['staggerIndex'] * 60
              : 0;
            setTimeout(() => el.classList.add('in'), delay);
            this.observer?.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    this.revealEls.forEach((ref) => this.observer!.observe(ref.nativeElement));

    // apply stagger index to any group marked [data-stagger-group]
    document.querySelectorAll('[data-stagger-group]').forEach((group) => {
      Array.from(group.children).forEach((child, idx) => {
        (child as HTMLElement).dataset['staggerIndex'] = String(idx);
        this.observer?.observe(child as Element);
      });
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.tcInterval);
    clearInterval(this.scrubInterval);
    this.observer?.disconnect();
  }

  private pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  // mouse-parallax tilt on the profile photo frame — subtle, like adjusting a viewfinder
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (!this.photoFrame || !this.heroEl) return;
    const rect = this.heroEl.nativeElement.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    // only tilt while cursor is roughly within the hero area
    if (e.clientY < rect.top || e.clientY > rect.bottom) return;

    const rotateY = relX * 10;
    const rotateX = relY * -10;
    this.photoTransform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
}
