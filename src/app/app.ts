import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  HostListener,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None
})
export class App implements AfterViewInit, OnDestroy {
  // ----- live ticking timecode (hero) -----
  liveTC = '00:00:00:00';
  private frame = 0;
  private tcInterval: any;

  // ----- scrub playhead drift -----
  scrubPos = 0;
  private scrubInterval: any;

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
    },
    {
      title: 'Intern',
      company: 'National Health Insurance Scheme',
      location: 'Accra, Ghana',
      startDate: 'MAR 2022',
      endDate: 'MAY 2022',
      achievements: [
        'Analyzed health insurance plans to identify the best benefits and coverage options for clients.',
        'Developed tailored proposals that aligned with each client\'s needs and objectives.',
        'Educated clients on insurance policies, regulations, and compliance requirements.',
        'Guided clients in selecting suitable plans based on their preferences and financial goals.'
      ]
    },
    {
      title: 'Intern',
      company: 'Talamus Health',
      location: 'Accra, Ghana',
      startDate: 'DEC 2021',
      endDate: 'FEB 2022',
      achievements: [
        'Conducted market research to identify emerging trends and customer preferences.',
        'Assisted in creating and scheduling social media content for marketing campaigns.',
        'Collaborated with team members to develop innovative marketing ideas and strategies.',
        'Supported event planning by coordinating logistics and preparing promotional materials.'
      ]
    },
    {
      title: 'Intern',
      company: 'Faith Community School',
      location: 'Accra, Ghana',
      startDate: 'MAR 2021',
      endDate: 'OCT 2021',
      achievements: [
        'Assisted in preparing classroom materials and resources to support teachers.',
        'Helped enhance student engagement through interactive activities and learning programs.',
        'Communicated school policies clearly to students, parents, and faculty members.',
        'Maintained a clean, organized, and supportive learning environment for students.'
      ]
    }
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
    'JavaScript',
    'TypeScript',
    'Angular',
    'Bootstrap',
    'HTML / CSS',
    'Tailwind',
    'SCSS / Sass',
    'AWS',
    'Contentful',
    'Git & GitHub',
    'Netlify / Vercel',
    'Project Support & Coordination',
    'Billing & Reporting',
    'Team Collaboration & Communication',
    'Strong Computer Literacy'
  ];

  filmSkills = [
    'Videography',
    'Shot Composition',
    'Editing & Pacing',
    'Color Grading',
    'Storytelling',
    '+ Add tool'
  ];

  navItems = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  workItems = [
    {
      id: 'BUILD_01',
      title: 'Project Title',
      description: 'One line on what it does and the stack used — e.g. Angular, TypeScript.',
      href: '#',
      linkLabel: 'Add project link',
      accent: 'cyan'
    },
    {
      id: 'BUILD_02',
      title: 'Project Title',
      description: 'One line on what it does and the stack used — e.g. React, Tailwind.',
      href: '#',
      linkLabel: 'Add project link',
      accent: 'cyan'
    },
    {
      id: 'BUILD_03',
      title: 'Project Title',
      description: 'One line on what it does and the stack used.',
      href: '#',
      linkLabel: 'Add project link',
      accent: 'cyan'
    },
    {
      id: 'BUILD_04',
      title: 'Project Title',
      description: 'One line on what it does and the stack used.',
      href: '#',
      linkLabel: 'Add project link',
      accent: 'cyan'
    }
  ];

  reelItems = [
    {
      id: 'REEL_01',
      title: 'Video Title',
      description: 'One line on the shoot — event, style, or story.',
      href: '#',
      linkLabel: 'Add reel link',
      accent: 'amber'
    },
    {
      id: 'REEL_02',
      title: 'Video Title',
      description: 'One line on the shoot — event, style, or story.',
      href: '#',
      linkLabel: 'Add reel link',
      accent: 'amber'
    },
    {
      id: 'REEL_03',
      title: 'Video Title',
      description: 'One line on the shoot — event, style, or story.',
      href: '#',
      linkLabel: 'Add reel link',
      accent: 'amber'
    },
    {
      id: 'REEL_04',
      title: 'Video Title',
      description: 'One line on the shoot — event, style, or story.',
      href: '#',
      linkLabel: 'Add reel link',
      accent: 'amber'
    }
  ];

  contactLinks = [
    { label: 'abeikumagnus@gmail.com', href: 'mailto:abeikumagnus@gmail.com' },
    { label: '+233 50 679 0655', href: 'tel:+233506790655' },
    { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/magnus-kutuson/' },
    { label: 'GitHub ↗', href: '#' },
    { label: 'Instagram / Reel platform ↗', href: '#' }
  ];
 
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
