// Sample data for The Cliff News platform

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  publishedAt: string;
  featuredImage: string;
  readTime: number;
  isBreaking: boolean;
  isFeatured: boolean;
}

export interface InshortItem {
  id: string;
  headline: string;
  summary: string;
  image: string;
  source: string;
  category: string;
  publishedAt: string;
  sourceUrl: string;
}

export interface VideoByte {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  category: string;
  likes: number;
  views: number;
  publishedAt: string;
}

export const categories = [
  "National", "Sports", "Technology", "Business", "Entertainment", 
  "Health", "Opinion", "Travel", "Lifestyle", "World"
];

export const articles: Article[] = [
  {
    id: "1",
    title: "Revolutionary Climate Change Technology Breakthrough Promises Hope for Global Warming",
    slug: "climate-technology-breakthrough-global-warming",
    excerpt: "Scientists have developed groundbreaking carbon capture technology that could significantly impact our fight against climate change.",
    content: "In a significant development for environmental science, researchers at leading climate institutes have announced a revolutionary breakthrough in carbon capture technology. This innovative approach promises to dramatically accelerate our ability to combat global warming through advanced atmospheric processing techniques...",
    author: {
      name: "Dr. Sarah Chen",
      avatar: "/api/placeholder/40/40"
    },
    category: "Technology",
    publishedAt: "2024-01-15T08:00:00Z",
    featuredImage: "/src/assets/hero-climate-tech.jpg",
    readTime: 8,
    isBreaking: true,
    isFeatured: true
  },
  {
    id: "2", 
    title: "Major Sports Championship Finals Draw Record Viewership Numbers",
    slug: "sports-championship-record-viewership",
    excerpt: "The championship finals attracted over 150 million viewers worldwide, setting new records for sports broadcasting.",
    content: "The highly anticipated championship finals concluded with unprecedented viewership numbers, demonstrating the global appeal of professional sports. Broadcasting networks reported record-breaking engagement across all demographics...",
    author: {
      name: "Mike Rodriguez",
      avatar: "/api/placeholder/40/40"
    },
    category: "Sports",
    publishedAt: "2024-01-14T18:30:00Z",
    featuredImage: "/src/assets/sports-championship.jpg",
    readTime: 5,
    isBreaking: false,
    isFeatured: true
  },
  {
    id: "3",
    title: "Economic Markets Show Strong Recovery Following Policy Changes",
    slug: "economic-markets-recovery-policy-changes",
    excerpt: "Global markets demonstrate resilience with significant gains across major indices following recent policy implementations.",
    content: "Financial markets worldwide have shown remarkable strength this quarter, with major indices posting substantial gains. The positive momentum appears to be driven by recent policy changes and increased investor confidence...",
    author: {
      name: "Jennifer Walsh",
      avatar: "/api/placeholder/40/40"
    },
    category: "Business",
    publishedAt: "2024-01-14T12:15:00Z",
    featuredImage: "/src/assets/economic-recovery.jpg",
    readTime: 6,
    isBreaking: false,
    isFeatured: true
  },
  {
    id: "4",
    title: "Breakthrough in Medical Research Offers New Treatment Options",
    slug: "medical-research-breakthrough-treatment",
    excerpt: "Researchers announce promising results from clinical trials for innovative treatment approaches.",
    content: "Medical researchers have reported significant progress in developing new treatment protocols that show remarkable promise in early clinical trials. The breakthrough represents years of collaborative research efforts...",
    author: {
      name: "Dr. Amanda Foster", 
      avatar: "/api/placeholder/40/40"
    },
    category: "Health",
    publishedAt: "2024-01-13T14:20:00Z",
    featuredImage: "/src/assets/medical-breakthrough.jpg",
    readTime: 7,
    isBreaking: false,
    isFeatured: false
  },
  {
    id: "5",
    title: "International Summit Addresses Global Cooperation Initiatives",
    slug: "international-summit-global-cooperation",
    excerpt: "World leaders gather to discuss collaborative approaches to addressing shared challenges.",
    content: "The international summit brought together leaders from across the globe to address pressing issues through collaborative initiatives. Key discussions focused on sustainable development and international cooperation...",
    author: {
      name: "David Kim",
      avatar: "/api/placeholder/40/40"
    },
    category: "World",
    publishedAt: "2024-01-13T09:00:00Z",
    featuredImage: "/api/placeholder/800/400",
    readTime: 9,
    isBreaking: false,
    isFeatured: false
  }
];

export const inshorts: InshortItem[] = [
  {
    id: "is1",
    headline: "Tech Giant Announces Major Sustainability Initiative",
    summary: "Leading technology company commits to carbon neutrality by 2025 with massive renewable energy investments and green technology development programs.",
    image: "/src/assets/tech-sustainability.jpg",
    source: "Tech Daily",
    category: "Technology",
    publishedAt: "2024-01-15T10:30:00Z",
    sourceUrl: "#"
  },
  {
    id: "is2",
    headline: "Olympic Preparations Showcase Innovative Sports Technology",
    summary: "Advanced training equipment and performance analytics are transforming athlete preparation for upcoming games, featuring AI-powered coaching systems.",
    image: "/src/assets/olympic-tech.jpg",
    source: "Sports Weekly",
    category: "Sports", 
    publishedAt: "2024-01-15T09:15:00Z",
    sourceUrl: "#"
  },
  {
    id: "is3",
    headline: "New Health Guidelines Released for Digital Wellness",
    summary: "Health experts publish comprehensive guidelines addressing screen time, digital detox practices, and maintaining mental health in the digital age.",
    image: "/api/placeholder/300/200",
    source: "Health Today",
    category: "Health",
    publishedAt: "2024-01-15T08:45:00Z",
    sourceUrl: "#"
  },
  {
    id: "is4",
    headline: "Renewable Energy Sector Reaches New Milestone",
    summary: "Solar and wind power generation exceeds fossil fuel production for the first time in history, marking a significant shift in energy landscape.",
    image: "/api/placeholder/300/200", 
    source: "Energy News",
    category: "Business",
    publishedAt: "2024-01-14T16:20:00Z",
    sourceUrl: "#"
  },
  {
    id: "is5",
    headline: "Cultural Festival Celebrates Global Diversity",
    summary: "International arts festival brings together performers from 50 countries, showcasing traditional and contemporary cultural expressions.",
    image: "/api/placeholder/300/200",
    source: "Culture Beat",
    category: "Entertainment",
    publishedAt: "2024-01-14T13:30:00Z",
    sourceUrl: "#"
  }
];

export const videoBytes: VideoByte[] = [
  {
    id: "vb1",
    title: "60-Second Climate Tech Explained",
    description: "Quick overview of the latest carbon capture breakthrough",
    videoUrl: "/api/placeholder/video/climate-tech",
    thumbnail: "/api/placeholder/400/600",
    duration: 60,
    category: "Technology",
    likes: 1250,
    views: 15600,
    publishedAt: "2024-01-15T11:00:00Z"
  },
  {
    id: "vb2",
    title: "Championship Winning Moment",
    description: "The decisive play that won the championship",
    videoUrl: "/api/placeholder/video/championship",
    thumbnail: "/api/placeholder/400/600",
    duration: 45,
    category: "Sports",
    likes: 2100,
    views: 28400,
    publishedAt: "2024-01-14T20:00:00Z"
  },
  {
    id: "vb3",
    title: "Market Recovery in Numbers",
    description: "Visual breakdown of economic recovery trends",
    videoUrl: "/api/placeholder/video/markets",
    thumbnail: "/api/placeholder/400/600",
    duration: 75,
    category: "Business",
    likes: 890,
    views: 12300,
    publishedAt: "2024-01-14T15:30:00Z"
  }
];

export const breakingNews = [
  "Revolutionary climate technology breakthrough announced by leading research institute",
  "Championship finals draw record-breaking 150M+ viewers worldwide",
  "Global markets surge following major policy implementation",
  "Medical breakthrough offers new hope for treatment advancement"
];