import type { Project, Stage } from '../types';

export const projects: Project[] = [
  // ── NUCLEATION ───────────────────────────────────────────────────────────
  {
    id: 'iitk-join',
    title: 'Joined IIT Kanpur',
    subtitle: 'Materials Science & Engineering',
    timeframe: 'August 2022',
    category: 'personal',
    stage: 'nucleation',
    branch: 'origin',
    description:
      'Started B.Tech in Materials Science & Engineering at IIT Kanpur. First exposure to computational approaches in materials science.',
    achievements: ['Academic Excellence Award 2023-24', 'CPI: 8.4/10'],
    technologies: ['Materials Science', 'Engineering Fundamentals'],
    featured: false,
    position: [0, 0, 0],
    size: 'medium',
    color: '#8338ec',
  },

  // ── PRIMARY — Computational Materials ───────────────────────────────────
  {
    id: 'mse231',
    title: 'Computational Methods in Materials Science',
    subtitle: 'Course: MSE231',
    timeframe: '2023-2024',
    category: 'course',
    stage: 'primary',
    branch: 'computational-materials',
    description:
      'Introduction to computational techniques for materials modeling and simulation.',
    achievements: ['Foundation in numerical methods for materials science'],
    technologies: ['Computational Modeling', 'Materials Simulation'],
    featured: false,
    position: [-2, 2.5, 1],
    size: 'small',
    color: '#8338ec',
  },
  {
    id: 'surge-2024',
    title: 'Texture Variation Analysis in Copper Microstructures',
    subtitle: 'SURGE Research Internship',
    timeframe: 'May 2024 – July 2024',
    category: 'research',
    stage: 'primary',
    branch: 'computational-materials',
    description:
      'Analyzed texture variation in 2D copper microstructure and predicted textural response parameters. Generated synthetic microstructures with Dream3D, simulated deformation tests using DAMASK, and used RNN-LSTM for strain response predictions.',
    achievements: [
      'Strong visual similarity between predicted and actual IPF & KAM maps at 20% strain',
      'Comprehensive research presentation via report and poster',
    ],
    technologies: ['Python', 'RNN', 'LSTM', 'Dream3D', 'DAMASK', 'Materials Informatics'],
    featured: false,
    position: [-2.5, 3, 1.5],
    size: 'large',
    color: '#8338ec',
  },

  // ── PRIMARY — Machine Learning Fundamentals ──────────────────────────────
  {
    id: 'cs771-course',
    title: 'Introduction to Machine Learning',
    subtitle: 'Course: CS771 | Prof. Purushottam Kar',
    timeframe: '2024',
    category: 'course',
    stage: 'primary',
    branch: 'machine-learning-fundamentals',
    description:
      'Foundational course covering supervised and unsupervised learning, model evaluation, and core ML algorithms.',
    achievements: ['Strong foundation in ML theory and practice'],
    technologies: ['Machine Learning', 'Python', 'Statistics'],
    featured: false,
    position: [0, 2.5, -0.5],
    size: 'small',
    color: '#00f0ff',
  },
  {
    id: 'cs771-project',
    title: 'Cross Connection Physical Unclonable Function',
    subtitle: 'CS771: Introduction to Machine Learning',
    timeframe: 'May 2024 – July 2024',
    category: 'course',
    stage: 'primary',
    branch: 'machine-learning-fundamentals',
    description:
      'Mathematically proved the existence of linear models capable of predicting COCO-PUF responses. Developed a Logistic Regression model to verify theoretical claims through practical implementation.',
    achievements: [
      'Mathematical proof of linear model existence',
      '98.67% accuracy on 10,000 challenge-response pairs',
      'Model completion time: 27.44 seconds',
    ],
    technologies: ['Python', 'Logistic Regression', 'scikit-learn', 'Linear Algebra', 'Cryptography'],
    metrics: [
      { label: 'Accuracy', value: '98.67%' },
      { label: 'Test Pairs', value: '10,000' },
      { label: 'Completion Time', value: '27.44s' },
    ],
    featured: false,
    position: [0, 3, 0],
    size: 'medium',
    color: '#00f0ff',
  },

  // ── PRIMARY — Programming & Probability ──────────────────────────────────
  {
    id: 'eso211-course',
    title: 'Fundamentals of Computing',
    subtitle: 'Course: ESO211',
    timeframe: '2022-2023',
    category: 'course',
    stage: 'primary',
    branch: 'programming-foundations',
    description:
      'Introduction to programming concepts, data structures, and computational thinking.',
    achievements: ['Strong programming foundation'],
    technologies: ['C++', 'Data Structures', 'Algorithms'],
    featured: false,
    position: [2, 2, 0],
    size: 'small',
    color: '#ff006e',
  },
  {
    id: 'mso202-course',
    title: 'Applied Probability & Statistics',
    subtitle: 'Course: MSO202',
    timeframe: '2023-2024',
    category: 'course',
    stage: 'primary',
    branch: 'programming-foundations',
    description: 'Statistical methods and probability theory for data analysis.',
    achievements: ['Foundation in statistical thinking'],
    technologies: ['Statistics', 'Probability Theory'],
    featured: false,
    position: [2.5, 2.5, 0.5],
    size: 'small',
    color: '#ff006e',
  },
  {
    id: 'summer-analytics-2024',
    title: 'Summer Analytics 2024 Bootcamp',
    subtitle: 'Consulting & Analytics Club, IIT Guwahati',
    timeframe: 'Summer 2024',
    category: 'personal',
    stage: 'primary',
    branch: 'programming-foundations',
    description:
      'Intensive bootcamp covering data analytics, machine learning, and statistical modeling.',
    achievements: ['Practical ML and analytics training'],
    technologies: ['Python', 'Data Analytics', 'ML'],
    featured: false,
    position: [2.2, 3, 0.8],
    size: 'small',
    color: '#ff006e',
  },

  // ── SECONDARY — Time Series & Probabilistic ML ───────────────────────────
  {
    id: 'cs772-course',
    title: 'Probabilistic Machine Learning',
    subtitle: 'Course: CS772 | Prof. Piyush Rai',
    timeframe: 'January 2025 – April 2025',
    category: 'course',
    stage: 'secondary',
    branch: 'time-series-probabilistic',
    description:
      'Advanced course on probabilistic models, Bayesian inference, variational methods, and stochastic optimization.',
    achievements: ['Deep expertise in probabilistic ML methods'],
    technologies: ['Bayesian Inference', 'Variational Methods', 'MCMC', 'Probabilistic Programming'],
    featured: false,
    position: [-0.5, 5, -0.5],
    size: 'small',
    color: '#ff006e',
  },
  {
    id: 'uncertainty-forecasting',
    title: 'Uncertainty Aware Microstructural Forecasting',
    subtitle: 'CS772: Probabilistic Machine Learning | Prof. Piyush Rai',
    timeframe: 'January 2025 – April 2025',
    category: 'course',
    stage: 'secondary',
    branch: 'time-series-probabilistic',
    description:
      'Evaluated the role of Bayesian stochasticity in predicting microstructure evolution with accurate uncertainty estimates. Developed four LSTM variants (Deterministic, Fully Stochastic VI, Partially Stochastic VI, Partially Stochastic SGLD) to explore accuracy-uncertainty trade-offs.',
    achievements: [
      'Partially stochastic VI model: RMSE 13.36',
      'Partially stochastic SGLD model: RMSE 14.80',
      'Superior accuracy-uncertainty trade-offs vs. fully stochastic VI (RMSE 19.31)',
      'Applied Bayesian deep learning to a real materials science problem',
    ],
    technologies: [
      'PyTorch', 'LSTM', 'Variational Inference', 'SGLD',
      'Bayesian Deep Learning', 'Uncertainty Quantification', 'Time Series Forecasting',
    ],
    metrics: [
      { label: 'Best RMSE (VI)', value: '13.36' },
      { label: 'Best RMSE (SGLD)', value: '14.80' },
      { label: 'Model Variants', value: '4' },
    ],
    featured: true,
    position: [-1, 5.5, -1],
    size: 'featured',
    color: '#ff006e',
  },
  {
    id: 'lnt-finance',
    title: 'Two-Wheeler Credit Risk Modeling',
    subtitle: 'Data Analytics Intern @ L&T Finance | Received PPO',
    timeframe: 'May 2025 – August 2025',
    category: 'internship',
    stage: 'secondary',
    branch: 'time-series-probabilistic',
    description:
      'Built a comprehensive two-wheeler credit risk model with structured database design, feature engineering, and optimized classifiers. Designed graph-based centrality algorithm for geo-data analysis and created automated validation pipeline.',
    achievements: [
      'Structured credit risk model with feature engineering',
      'Graph-based centrality algorithm using heterogeneous geo-data',
      'Automated validation pipeline for propensity model',
      'Received Pre-Placement Offer (PPO)',
    ],
    technologies: ['Python', 'SQL', 'Machine Learning', 'Graph Algorithms', 'Risk Modeling', 'Data Engineering'],
    featured: false,
    position: [-1.5, 6, -0.5],
    size: 'large',
    color: '#ff006e',
  },

  // ── SECONDARY — Generative Models ───────────────────────────────────────
  {
    id: 'cs779-course',
    title: 'Generative AI',
    subtitle: 'Course: CS779',
    timeframe: 'August 2025 – Present',
    category: 'course',
    stage: 'secondary',
    branch: 'generative-models',
    description:
      'Advanced course on generative models including GANs, VAEs, diffusion models, and large language models.',
    achievements: ['Expertise in modern generative AI techniques'],
    technologies: ['Generative Models', 'Deep Learning', 'PyTorch'],
    featured: false,
    position: [0.8, 5.2, 1.2],
    size: 'small',
    color: '#00ff87',
  },
  {
    id: 'diffusion-images',
    title: 'Diffusion-Based Synthetic Image Generation',
    subtitle: 'MSE650 | Prof. Sandeep Sangal',
    timeframe: 'August 2025 – Present',
    category: 'course',
    stage: 'secondary',
    branch: 'generative-models',
    description:
      'Building Denoising Diffusion Probabilistic Models to generate realistic synthetic materials images. Employing advanced strategies to capture complex structural patterns and evaluating using FID, SSIM, and pixelwise similarity metrics.',
    achievements: [
      'DDPM implementation for materials imaging',
      'Data augmentation pipeline for downstream tasks',
      'Multi-metric evaluation framework (FID, SSIM, pixelwise)',
    ],
    technologies: ['PyTorch', 'Diffusion Models', 'DDPM', 'Computer Vision', 'Image Generation', 'Materials Science'],
    featured: false,
    position: [1.5, 5.5, 1],
    size: 'large',
    color: '#00ff87',
  },
  {
    id: 'handwriting-synthesis',
    title: 'Personalized Handwriting Synthesis',
    subtitle: 'CS787 | Prof. Arnab Bhattacharya',
    timeframe: 'August 2025 – Present',
    category: 'course',
    stage: 'secondary',
    branch: 'generative-models',
    description:
      'Designed a hybrid GAN-VAE architecture with a style encoder for user-personalized handwriting synthesis. Integrated Transformer-based sequence modeling for stroke prediction and typed-to-handwriting translation.',
    achievements: [
      'Hybrid GAN-VAE architecture design',
      'Transformer-based sequence modeling',
      'FID and CER metrics for quality assessment',
    ],
    technologies: ['PyTorch', 'GAN', 'VAE', 'Transformers', 'Sequence Modeling', 'Computer Vision'],
    metrics: [{ label: 'Metrics', value: 'FID, CER' }],
    featured: false,
    position: [1, 6, 1.5],
    size: 'large',
    color: '#00ff87',
  },

  // ── SECONDARY — Domain Applications ─────────────────────────────────────
  {
    id: 'recruitryte',
    title: 'ML-Powered Recruitment Analytics',
    subtitle: 'Data Science Intern @ RecruitRyte',
    timeframe: 'October 2024 – December 2024',
    category: 'internship',
    stage: 'secondary',
    branch: 'domain-applications',
    description:
      'Classified user queries using Random Forest with 96% accuracy. Automated job analytics and candidate lead generation from 16M+ profiles. Built scalable search system using Qdrant vector database.',
    achievements: [
      'Query classification: 96% accuracy (Random Forest)',
      'Processed 16M+ candidate profiles',
      'Qdrant vector database for efficient retrieval',
    ],
    technologies: ['Python', 'Random Forest', 'Qdrant', 'Vector Databases', 'NLP', 'scikit-learn'],
    metrics: [
      { label: 'Accuracy', value: '96%' },
      { label: 'Profiles Processed', value: '16M+' },
    ],
    featured: false,
    position: [2.5, 5, 0.5],
    size: 'medium',
    color: '#00f0ff',
  },

  // ── CONVERGENCE ──────────────────────────────────────────────────────────
  {
    id: 'xyton-current',
    title: 'Circuit Design Automation via Surrogate Modeling',
    subtitle: 'ML Engineer @ Xyton (US-based startup)',
    timeframe: 'Current',
    category: 'internship',
    stage: 'convergence',
    branch: 'professional-convergence',
    description:
      'Building ML surrogates for generic SPICE and Monte Carlo simulations to automate digital, analog, and mixed-signal circuit design. Applying time-series forecasting and uncertainty quantification techniques from materials science to electronic design automation.',
    achievements: [
      'Surrogate models for SPICE simulation acceleration',
      'Monte Carlo uncertainty propagation for circuit parameters',
      'Cross-domain knowledge transfer: microstructure evolution → circuit behavior',
      'Production ML system for circuit design automation',
    ],
    technologies: [
      'PyTorch', 'LSTM', 'Transformers', 'Probabilistic ML',
      'SPICE', 'Circuit Simulation', 'EDA', 'Uncertainty Quantification', 'Monte Carlo Methods',
    ],
    featured: true,
    position: [0, 8, 0],
    size: 'featured',
    color: '#00f0ff',
  },
  {
    id: 'multiscale-framework',
    title: 'Multiscale Materials-ML Integration Framework',
    subtitle: 'Independent Research Project',
    timeframe: '2025 – Present',
    category: 'research',
    stage: 'convergence',
    branch: 'professional-convergence',
    description:
      'Developing a unified framework that connects microstructure evolution models with macroscopic property predictions. Integrating probabilistic ML, generative models, and domain knowledge from materials science to enable accelerated materials design.',
    achievements: [
      'Unified framework for multiscale modeling',
      'Integration of physics-based and data-driven approaches',
      'Open-source toolkit for materials informatics',
    ],
    technologies: [
      'PyTorch', 'Python', 'Generative Models', 'Probabilistic ML',
      'Materials Science', 'Scientific Computing', 'Data Visualization',
    ],
    featured: false,
    position: [-0.5, 8.5, 0.5],
    size: 'large',
    color: '#8338ec',
  },
  {
    id: 'ai-driven-discovery',
    title: 'AI-Driven Materials Discovery Platform',
    subtitle: 'Capstone Project',
    timeframe: '2025 – 2026',
    category: 'course',
    stage: 'convergence',
    branch: 'professional-convergence',
    description:
      'Building an end-to-end platform for AI-driven materials discovery. Combines generative models for candidate generation, probabilistic models for uncertainty quantification, and high-throughput screening using graph neural networks.',
    achievements: [
      'End-to-end ML pipeline for materials discovery',
      'Integration of multiple ML paradigms',
      'Collaboration with experimental groups for validation',
    ],
    technologies: [
      'PyTorch', 'Graph Neural Networks', 'Generative AI', 'Bayesian Optimization',
      'High-Throughput Screening', 'Materials Informatics', 'Cloud Computing',
    ],
    metrics: [
      { label: 'Candidates Generated', value: '10,000+' },
      { label: 'Validation Rate', value: '85%' },
    ],
    featured: false,
    position: [0.5, 8.5, -0.5],
    size: 'large',
    color: '#00ff87',
  },
];

export const getProjectsByStage = (stage: Stage): Project[] =>
  projects.filter((p) => p.stage === stage);

export const getProjectsByBranch = (branch: string): Project[] =>
  projects.filter((p) => p.branch === branch);

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured);
