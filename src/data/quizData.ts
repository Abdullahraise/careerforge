export type Stream = 'Bio-Comp' | 'Bio-Maths' | 'Comp-Maths' | 'Commerce' | 'Arts';

export type Aspect = 'logical' | 'creative' | 'social' | 'analytical' | 'practical';

export interface QuizData {
  id: number;
  question: string;
  streams: Stream[];
  aspect: Aspect;
}

export interface CareerRecommendation {
  id: number;
  title: string;
  description: string;
  streams: Stream[];
  matchScore?: number;
  aspects: Partial<Record<Aspect, number>>;
  courses: string[];
  resources: {
    title: string;
    link: string;
    type: 'article' | 'video' | 'course';
  }[];
}

export const quizQuestions: QuizData[] = [
  {
    id: 1,
    question: "How much do you enjoy solving complex mathematical problems?",
    streams: ['Bio-Maths', 'Comp-Maths', 'Commerce'],
    aspect: 'logical'
  },
  {
    id: 2,
    question: "Do you find yourself drawn to creating art or expressing yourself creatively?",
    streams: ['Arts', 'Bio-Comp'],
    aspect: 'creative'
  },
  {
    id: 3,
    question: "How comfortable are you analyzing financial data and economic trends?",
    streams: ['Commerce', 'Comp-Maths'],
    aspect: 'analytical'
  },
  {
    id: 4,
    question: "Do you enjoy helping others and working directly with people?",
    streams: ['Arts', 'Bio-Comp', 'Bio-Maths', 'Commerce'],
    aspect: 'social'
  },
  {
    id: 5,
    question: "How interested are you in understanding how physical objects and systems work?",
    streams: ['Bio-Maths', 'Comp-Maths'],
    aspect: 'practical'
  },
  {
    id: 6,
    question: "How much do you enjoy writing and communicating through text?",
    streams: ['Arts', 'Commerce'],
    aspect: 'creative'
  },
  {
    id: 7,
    question: "Are you interested in conducting experiments and testing hypotheses?",
    streams: ['Bio-Comp', 'Bio-Maths'],
    aspect: 'analytical'
  },
  {
    id: 8,
    question: "How comfortable are you with public speaking and presentations?",
    streams: ['Arts', 'Commerce'],
    aspect: 'social'
  },
  {
    id: 9,
    question: "Do you enjoy building or fixing things with your hands?",
    streams: ['Bio-Comp', 'Comp-Maths'],
    aspect: 'practical'
  },
  {
    id: 10,
    question: "How interested are you in analyzing human behavior and society?",
    streams: ['Arts', 'Bio-Comp'],
    aspect: 'analytical'
  },
  {
    id: 11,
    question: "Do you find joy in organizing events or managing projects?",
    streams: ['Commerce', 'Arts'],
    aspect: 'practical'
  },
  {
    id: 12,
    question: "How much do you enjoy debates and logical arguments?",
    streams: ['Arts', 'Comp-Maths', 'Commerce'],
    aspect: 'logical'
  },
  {
    id: 13,
    question: "Are you interested in designing solutions to visual problems?",
    streams: ['Arts', 'Comp-Maths'],
    aspect: 'creative'
  },
  {
    id: 14,
    question: "How comfortable are you with working with computer programs and technology?",
    streams: ['Comp-Maths', 'Bio-Comp', 'Commerce'],
    aspect: 'practical'
  },
  {
    id: 15,
    question: "Do you enjoy leading teams and making group decisions?",
    streams: ['Commerce', 'Arts'],
    aspect: 'social'
  }
];

export const careerRecommendations: CareerRecommendation[] = [
  {
    id: 1,
    title: "Software Engineer",
    description: "Design, develop, and maintain software systems and applications that power our digital world.",
    streams: ['Science'],
    aspects: {
      logical: 0.9,
      analytical: 0.8,
      practical: 0.7,
      creative: 0.6,
      social: 0.4
    },
    courses: [
      "B.Tech in Computer Science",
      "B.Sc in Computer Science",
      "BCA (Bachelor of Computer Applications)"
    ],
    resources: [
      {
        title: "Roadmap to becoming a developer",
        link: "https://roadmap.sh",
        type: "article"
      },
      {
        title: "CS50: Introduction to Computer Science",
        link: "https://cs50.harvard.edu/x/",
        type: "course"
      },
      {
        title: "How to Think Like a Programmer",
        link: "https://www.youtube.com/watch?v=azcrPFhaY9k",
        type: "video"
      }
    ]
  },
  {
    id: 2,
    title: "Data Scientist",
    description: "Analyze complex datasets to extract insights and help organizations make data-driven decisions.",
    streams: ['Science'],
    aspects: {
      analytical: 0.9,
      logical: 0.8,
      practical: 0.6,
      creative: 0.5,
      social: 0.4
    },
    courses: [
      "B.Tech in Data Science",
      "B.Sc in Statistics",
      "B.Sc in Mathematics"
    ],
    resources: [
      {
        title: "Data Science Roadmap",
        link: "https://www.kaggle.com/learn",
        type: "course"
      },
      {
        title: "Introduction to Data Science",
        link: "https://www.coursera.org/specializations/data-science",
        type: "course"
      },
      {
        title: "Statistics for Data Science",
        link: "https://www.youtube.com/watch?v=zouPoc49xbk",
        type: "video"
      }
    ]
  },
  {
    id: 3,
    title: "Chartered Accountant",
    description: "Prepare, examine, and ensure accuracy in financial records while providing financial advice to clients.",
    streams: ['Commerce'],
    aspects: {
      analytical: 0.9,
      logical: 0.8,
      practical: 0.7,
      social: 0.5,
      creative: 0.3
    },
    courses: [
      "B.Com (Bachelor of Commerce)",
      "BBA with Finance specialization",
      "Integrated CA course"
    ],
    resources: [
      {
        title: "CA Foundation Course Overview",
        link: "https://www.icai.org",
        type: "article"
      },
      {
        title: "Introduction to Accounting Principles",
        link: "https://www.coursera.org/learn/financial-accounting",
        type: "course"
      },
      {
        title: "Career in Chartered Accountancy",
        link: "https://www.youtube.com/watch?v=3ZyRRDLfBCo",
        type: "video"
      }
    ]
  },
  {
    id: 4,
    title: "Marketing Manager",
    description: "Develop marketing strategies to promote products or services and increase brand awareness.",
    streams: ['Commerce', 'Arts'],
    aspects: {
      creative: 0.8,
      social: 0.8,
      analytical: 0.7,
      practical: 0.6,
      logical: 0.5
    },
    courses: [
      "BBA in Marketing",
      "B.Com with Marketing specialization",
      "BA in Mass Communication"
    ],
    resources: [
      {
        title: "Marketing Fundamentals",
        link: "https://www.hubspot.com/marketing",
        type: "article"
      },
      {
        title: "Digital Marketing Specialization",
        link: "https://www.coursera.org/specializations/digital-marketing",
        type: "course"
      },
      {
        title: "Marketing Career Paths Explained",
        link: "https://www.youtube.com/watch?v=KkC_wYM_Co4",
        type: "video"
      }
    ]
  },
  {
    id: 5,
    title: "Psychologist",
    description: "Study human behavior and mental processes to help people overcome challenges and improve wellbeing.",
    streams: ['Arts', 'Science'],
    aspects: {
      social: 0.9,
      analytical: 0.8,
      logical: 0.6,
      creative: 0.5,
      practical: 0.5
    },
    courses: [
      "BA in Psychology",
      "B.Sc in Psychology",
      "B.Sc in Applied Psychology"
    ],
    resources: [
      {
        title: "Introduction to Psychology",
        link: "https://www.apa.org/education/undergrad/intro-psychology",
        type: "article"
      },
      {
        title: "Psychological First Aid",
        link: "https://www.coursera.org/learn/psychological-first-aid",
        type: "course"
      },
      {
        title: "What is Psychology?",
        link: "https://www.youtube.com/watch?v=vo4pMVb0R6M",
        type: "video"
      }
    ]
  },
  {
    id: 6,
    title: "Journalist",
    description: "Research, write, and report news stories for print, broadcast, or digital media platforms.",
    streams: ['Arts'],
    aspects: {
      creative: 0.8,
      social: 0.8,
      analytical: 0.7,
      practical: 0.6,
      logical: 0.5
    },
    courses: [
      "BA in Journalism",
      "BA in Mass Communication",
      "Bachelor of Journalism and Mass Communication"
    ],
    resources: [
      {
        title: "Principles of Journalism",
        link: "https://www.spj.org/ethicscode.asp",
        type: "article"
      },
      {
        title: "Journalism for Social Change",
        link: "https://www.edx.org/learn/journalism/university-of-california-berkeley-journalism-for-social-change",
        type: "course"
      },
      {
        title: "Day in the Life of a Journalist",
        link: "https://www.youtube.com/watch?v=qpJuGX42StQ",
        type: "video"
      }
    ]
  },
  {
    id: 7,
    title: "Doctor/Physician",
    description: "Diagnose and treat illnesses, injuries, and other health conditions in patients.",
    streams: ['Science'],
    aspects: {
      analytical: 0.9,
      practical: 0.9,
      logical: 0.8,
      social: 0.8,
      creative: 0.4
    },
    courses: [
      "MBBS (Bachelor of Medicine and Bachelor of Surgery)",
      "BDS (Bachelor of Dental Surgery)",
      "BHMS (Bachelor of Homeopathic Medicine and Surgery)"
    ],
    resources: [
      {
        title: "Medical School Requirements",
        link: "https://www.aamc.org/",
        type: "article"
      },
      {
        title: "Anatomy and Physiology",
        link: "https://www.edx.org/learn/anatomy",
        type: "course"
      },
      {
        title: "What's it like to be a Doctor?",
        link: "https://www.youtube.com/watch?v=sGYeP_8chQU",
        type: "video"
      }
    ]
  },
  {
    id: 8,
    title: "Graphic Designer",
    description: "Create visual concepts that communicate ideas and messages for brands and products.",
    streams: ['Arts'],
    aspects: {
      creative: 0.9,
      practical: 0.7,
      analytical: 0.5,
      social: 0.5,
      logical: 0.4
    },
    courses: [
      "BFA in Graphic Design",
      "B.Des (Bachelor of Design)",
      "BA in Visual Communication"
    ],
    resources: [
      {
        title: "Graphic Design Fundamentals",
        link: "https://www.canva.com/learn/graphic-design-basics/",
        type: "article"
      },
      {
        title: "Graphic Design Specialization",
        link: "https://www.coursera.org/specializations/graphic-design",
        type: "course"
      },
      {
        title: "Day in the Life of a Graphic Designer",
        link: "https://www.youtube.com/watch?v=gfHcnig8Lo4",
        type: "video"
      }
    ]
  },
  {
    id: 9,
    title: "Investment Banker",
    description: "Help companies and governments raise capital, provide financial advice, and facilitate mergers and acquisitions.",
    streams: ['Commerce'],
    aspects: {
      analytical: 0.9,
      logical: 0.8,
      social: 0.7,
      practical: 0.6,
      creative: 0.3
    },
    courses: [
      "BBA in Finance",
      "B.Com in Banking and Finance",
      "BS in Finance"
    ],
    resources: [
      {
        title: "Investment Banking Explained",
        link: "https://corporatefinanceinstitute.com/resources/careers/jobs/investment-banking/",
        type: "article"
      },
      {
        title: "Introduction to Financial Markets",
        link: "https://www.coursera.org/learn/financial-markets-global",
        type: "course"
      },
      {
        title: "Investment Banking Career Path",
        link: "https://www.youtube.com/watch?v=nXgyzKkUDV4",
        type: "video"
      }
    ]
  },
  {
    id: 10,
    title: "Civil Engineer",
    description: "Design, build, and maintain infrastructure projects such as buildings, roads, bridges, and water systems.",
    streams: ['Science'],
    aspects: {
      practical: 0.9,
      analytical: 0.8,
      logical: 0.8,
      creative: 0.6,
      social: 0.5
    },
    courses: [
      "B.Tech in Civil Engineering",
      "BE in Civil Engineering",
      "B.Sc in Civil Engineering"
    ],
    resources: [
      {
        title: "Introduction to Civil Engineering",
        link: "https://www.asce.org/career-growth/what-is-civil-engineering",
        type: "article"
      },
      {
        title: "Structural Engineering Basics",
        link: "https://www.edx.org/learn/structural-engineering",
        type: "course"
      },
      {
        title: "A Day in the Life of a Civil Engineer",
        link: "https://www.youtube.com/watch?v=cJaRjI7K-Lw",
        type: "video"
      }
    ]
  }
];
