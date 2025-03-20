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
  careerOptions: string[];
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
    title: "Arts Stream",
    description: "Suitable for students interested in creativity, humanities, and social sciences.",
    streams: ['Arts'],
    aspects: {
      creative: 0.9,
      social: 0.8,
      analytical: 0.6,
      logical: 0.5,
      practical: 0.5
    },
    courses: [
      "B.A. English Literature",
      "B.A. Journalism & Mass Communication",
      "B.A. Psychology",
      "B.A. Political Science",
      "B.A. Sociology",
      "B.A. Fine Arts",
      "B.A. History",
      "B.A. Philosophy",
      "BFA (Bachelor of Fine Arts)",
      "B.Des (Bachelor of Design)"
    ],
    careerOptions: [
      "Journalist / News Reporter",
      "Psychologist / Counselor",
      "Social Worker / NGO Manager",
      "Historian / Archaeologist",
      "Political Analyst",
      "Lawyer (LLB after B.A.)",
      "Graphic Designer",
      "Writer / Content Creator",
      "Photographer / Filmmaker",
      "Fashion Designer"
    ],
    resources: [
      {
        title: "Careers in Liberal Arts",
        link: "https://www.coursera.org/articles/liberal-arts-degree-jobs",
        type: "article"
      },
      {
        title: "Introduction to Psychology",
        link: "https://www.edx.org/learn/psychology",
        type: "course"
      },
      {
        title: "Journalism in the Digital Age",
        link: "https://www.youtube.com/watch?v=qpJuGX42StQ",
        type: "video"
      }
    ]
  },
  {
    id: 2,
    title: "Commerce Stream",
    description: "Suitable for students interested in business, finance, and management.",
    streams: ['Commerce'],
    aspects: {
      analytical: 0.9,
      logical: 0.8,
      practical: 0.7,
      social: 0.6,
      creative: 0.5
    },
    courses: [
      "B.Com (Bachelor of Commerce)",
      "BBA (Bachelor of Business Administration)",
      "BBM (Bachelor of Business Management)",
      "BMS (Bachelor of Management Studies)",
      "CA (Chartered Accountant)",
      "CFA (Chartered Financial Analyst)",
      "CS (Company Secretary)",
      "BHM (Bachelor of Hotel Management)",
      "B.Sc in Banking & Finance"
    ],
    careerOptions: [
      "Accountant / Auditor (CA, CMA)",
      "Investment Banker",
      "Business Analyst",
      "Marketing Manager",
      "Human Resource Manager",
      "Entrepreneur / Startup Founder",
      "Stock Market Analyst",
      "E-Commerce Manager",
      "Financial Consultant",
      "Hotel Manager"
    ],
    resources: [
      {
        title: "Financial Accounting Fundamentals",
        link: "https://www.coursera.org/learn/financial-accounting",
        type: "course"
      },
      {
        title: "Introduction to Marketing",
        link: "https://www.edx.org/learn/marketing",
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
    id: 3,
    title: "Computer Science Stream",
    description: "Suitable for students interested in technology, software, and data science.",
    streams: ['Comp-Maths'],
    aspects: {
      logical: 0.9,
      analytical: 0.9,
      practical: 0.8,
      creative: 0.6,
      social: 0.4
    },
    courses: [
      "B.Tech / B.E. in Computer Science & Engineering",
      "B.Sc. Computer Science",
      "BCA (Bachelor of Computer Applications)",
      "B.Sc. Data Science",
      "B.Sc. Artificial Intelligence & Machine Learning"
    ],
    careerOptions: [
      "Software Developer",
      "Data Scientist",
      "Cybersecurity Analyst",
      "AI/ML Engineer",
      "Cloud Computing Engineer",
      "Ethical Hacker",
      "Web Developer",
      "Mobile App Developer",
      "IT Consultant",
      "Game Developer"
    ],
    resources: [
      {
        title: "CS50: Introduction to Computer Science",
        link: "https://cs50.harvard.edu/x/",
        type: "course"
      },
      {
        title: "Web Development Roadmap",
        link: "https://roadmap.sh/frontend",
        type: "article"
      },
      {
        title: "Introduction to Machine Learning",
        link: "https://www.youtube.com/watch?v=ua-CiDNNj30",
        type: "video"
      }
    ]
  },
  {
    id: 4,
    title: "Biology + Computer Science Stream",
    description: "Suitable for students interested in biotechnology, bioinformatics, and medical technology.",
    streams: ['Bio-Comp'],
    aspects: {
      analytical: 0.9,
      logical: 0.8,
      practical: 0.7,
      creative: 0.6,
      social: 0.5
    },
    courses: [
      "B.Tech Biotechnology",
      "B.Sc. Bioinformatics",
      "B.Sc. Computational Biology",
      "B.Sc. Biomedical Engineering",
      "B.Sc. Genetics",
      "B.Sc. Microbiology",
      "B.Sc. Forensic Science",
      "MBBS (if interested in medicine)"
    ],
    careerOptions: [
      "Bioinformatics Scientist",
      "Medical Data Analyst",
      "Genetic Engineer",
      "Biomedical Researcher",
      "Forensic Scientist",
      "Healthcare Software Developer",
      "Pharmacist",
      "Medical Lab Technician"
    ],
    resources: [
      {
        title: "Introduction to Bioinformatics",
        link: "https://www.coursera.org/learn/bioinformatics",
        type: "course"
      },
      {
        title: "Genomic Data Science",
        link: "https://www.edx.org/learn/genomics",
        type: "course"
      },
      {
        title: "Careers in Biomedical Engineering",
        link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        type: "video"
      }
    ]
  },
  {
    id: 5,
    title: "Biology + Maths Stream",
    description: "Suitable for students interested in medical sciences, engineering, and life sciences.",
    streams: ['Bio-Maths'],
    aspects: {
      analytical: 0.9,
      practical: 0.9,
      logical: 0.8,
      social: 0.7,
      creative: 0.5
    },
    courses: [
      "MBBS (Bachelor of Medicine & Surgery)",
      "BDS (Dentistry)",
      "BAMS (Ayurveda Medicine)",
      "BHMS (Homeopathy Medicine)",
      "B.Sc. Biotechnology",
      "B.Sc. Biochemistry",
      "B.Sc. Agriculture",
      "B.Pharm (Pharmacy)",
      "B.Tech Biotechnology",
      "B.Tech Biomedical Engineering"
    ],
    careerOptions: [
      "Doctor (MBBS, BDS)",
      "Biotechnologist",
      "Biomedical Engineer",
      "Pharmacist",
      "Medical Researcher",
      "Agricultural Scientist",
      "Genetic Engineer",
      "Nutritionist / Dietitian"
    ],
    resources: [
      {
        title: "Introduction to Human Anatomy",
        link: "https://www.coursera.org/learn/anatomy",
        type: "course"
      },
      {
        title: "Preparing for Medical School",
        link: "https://www.aamc.org/students/aspiring-doctors",
        type: "article"
      },
      {
        title: "Day in the Life of a Doctor",
        link: "https://www.youtube.com/watch?v=sGYeP_8chQU",
        type: "video"
      }
    ]
  },
  {
    id: 6,
    title: "Computer Science + Maths Stream",
    description: "Suitable for students interested in software, AI, and mathematical modeling.",
    streams: ['Comp-Maths'],
    aspects: {
      logical: 0.9,
      analytical: 0.9,
      practical: 0.7,
      creative: 0.6,
      social: 0.4
    },
    courses: [
      "B.Tech / B.E. in Computer Science & Engineering",
      "B.Sc. Mathematics & Computing",
      "B.Sc. Data Science & AI",
      "BCA (Bachelor of Computer Applications)",
      "B.Sc. Statistics"
    ],
    careerOptions: [
      "AI Engineer",
      "Data Scientist",
      "Software Developer",
      "Blockchain Developer",
      "Cloud Computing Engineer",
      "Financial Analyst",
      "Actuarial Scientist",
      "Statistician",
      "Business Intelligence Analyst"
    ],
    resources: [
      {
        title: "Mathematics for Machine Learning",
        link: "https://www.coursera.org/specializations/mathematics-machine-learning",
        type: "course"
      },
      {
        title: "Artificial Intelligence Roadmap",
        link: "https://roadmap.sh/ai-data-scientist",
        type: "article"
      },
      {
        title: "Statistical Learning",
        link: "https://www.youtube.com/watch?v=5N9V07EIfIg",
        type: "video"
      }
    ]
  }
];
