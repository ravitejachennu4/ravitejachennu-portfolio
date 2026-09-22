import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';


interface Project {
  id: number;
  eyebrow: string;
  title: string;
  domain: string;
  shortDescription: string;
  overview: string;
  role: string;
  technologies: string[];
  capabilities: string[];
  highlights: string[];
  accent: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  

  readonly projects: Project[] = [
    {
      id: 1,
      eyebrow: '01 / ENTERPRISE ERP',
      title: 'ASML AMSPLUS ERP SAP SLM OFF',
      domain: 'Semiconductor Domain',

      shortDescription:
        'Enterprise production support and frontend engineering for a business-critical ERP ecosystem.',

      overview:
        'Developed and maintained an enterprise ERP application, providing full-stack application support across frontend, backend services, APIs and business workflows. Troubleshot and resolved application issues, worked on defect fixes and enhancements, supported API integrations, analyzed production issues, and collaborated with development and functional teams to ensure application stability and smooth business operations.',

      role:
        'Angular Frontend Developer · Production Support',

      technologies: [
        'Angular 17 & 19',
        'Angular Material',
        'TypeScript',
        'Signals',
        'RxJS',
        'Java',
        'Springboot',
        'REST APIs',
        'Gitlab',
        'Azure Kubernetes Service',
        'MongoDB',
        'Postgresql',
        'Splunk',
        'Grafana'
      ],

      capabilities: [
        'Reusable component architecture',
        'Reactive state and asynchronous data handling',
        'Lazy-loaded application areas',
        'API call and rendering optimization',
        'Production issue analysis and support',
        'Application monitoring and log investigation'
      ],

      highlights: [
        'provided end-to-end application support across frontend, backend, APIs, and production issues.',
        'Built reusable Angular components and UI patterns to keep enterprise screens consistent and easier to maintain.',
        'Applied Signals and RxJS operators such as switchMap, mergeMap and combineLatest for predictable asynchronous workflows.',
        'Improved perceived application performance through lazy loading, efficient API usage and focused rendering strategies.',
        'Used Splunk and Grafana to trace production behaviour, investigate logs and monitor application-level metrics.',
        'Contributed to sprint planning, peer reviews and coding standards across the delivery team.'
      ],

      accent: 'cyan'
    },

    {
      id: 2,
      eyebrow: '02 / SERVICE MANAGEMENT',
      title: 'Xerox AMS-ESU',
      domain: 'Customer Service Management',

      shortDescription:
        'ServiceNow integration work connecting enterprise case management with external systems and data sources.',

      overview:
        'Engineered integration workflows around ServiceNow Customer Service Management, with an emphasis on reliable data movement, secure API communication and automated synchronization. The solution connected external enterprise data with CSM workflows so service teams could work with current case information.',

      role:
        'Application Developer · Integration Engineering',

      technologies: [
        'ServiceNow',
        'REST APIs',
        'JavaScript',
        'Data Mapping',
        'Staging Tables',
        'CSM',
        'Incident Management',
        'Service Requests'
      ],

      capabilities: [
        'Inbound and outbound REST integrations',
        'External data ingestion and transformation',
        'Secure target-table mapping',
        'Scheduled data synchronization',
        'CSM workflow support',
        'Enterprise ticket lifecycle management'
      ],

      highlights: [
        'Designed integration flows between ServiceNow and external enterprise systems using REST-based communication.',
        'Created a structured staging-and-mapping approach to validate external data before moving it into target tables.',
        'Automated recurring data synchronization so customer-service records could be refreshed without manual intervention.',
        'Supported incident, service-request and customer-service workflows across the ServiceNow lifecycle.',
        'Focused on reliable data handling, traceability and maintainable integration logic.'
      ],

      accent: 'violet'
    },

    {
      id: 3,
      eyebrow: '03 / FINANCIAL SERVICES',
      title: 'State Street',
      domain: 'BFSI Domain',

      shortDescription:
        'Scalable Angular application engineering with performance, reactive state management and secure API integration.',

      overview:
        'Contributed to a large-scale financial application where page performance, predictable state transitions and secure communication with backend services were key engineering concerns. The frontend was structured around reusable Angular modules and reactive data streams.',

      role:
        'Angular Frontend Developer',

      technologies: [
        'Angular 13',
        'TypeScript',
        'RxJS',
        'NgRx',
        'REST APIs',
        'Lazy Loading',
        'Ivy',
        'GIT',
        'Swagger'
      ],

      capabilities: [
        'Feature-based Angular architecture',
        'Reactive state management',
        'OnPush change detection',
        'Lazy-loaded routes and modules',
        'Token-based API authentication',
        'Unit testing and defect resolution'
      ],

      highlights: [
        'Developed reusable Angular features with a focus on maintainability and scalable component structure.',
        'Used lazy loading, Ivy rendering and OnPush change detection to reduce unnecessary work during navigation and rendering.',
        'Built reactive data streams with RxJS and NgRx to keep shared state predictable and minimize UI race conditions.',
        'Integrated secured REST endpoints using token-based authentication patterns.',
        'Worked in Agile/Scrum delivery cycles with sprint reviews, defect resolution and unit testing.'
      ],

      accent: 'green'
    }
  ];

  selectedProject: Project | null = null;
  isClosing = false;
  private scrollPosition = 0;

  openProject(project: Project): void {
  this.scrollPosition = window.scrollY;

  this.selectedProject = project;
  this.isClosing = false;

  document.body.classList.add('project-modal-open');

  document.body.style.top = `-${this.scrollPosition}px`;
}

  closeProject(): void {
  if (!this.selectedProject || this.isClosing) {
    return;
  }

  this.isClosing = true;

  window.setTimeout(() => {
    this.selectedProject = null;
    this.isClosing = false;

    document.body.classList.remove('project-modal-open');
    document.body.style.top = '';

    window.scrollTo(0, this.scrollPosition);
  }, 280);
}

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeProject();
  }

  ngOnDestroy(): void {
  document.body.classList.remove('project-modal-open');
  document.body.style.top = '';
}

  trackByProject(_: number, project: Project): number {
    return project.id;
  }

}
