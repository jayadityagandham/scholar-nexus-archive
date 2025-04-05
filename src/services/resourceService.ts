
import { ResourceProps } from '@/components/ResourceCard';

// Sample data to simulate a database of academic resources
const sampleResources: ResourceProps[] = [
  {
    id: '1',
    title: 'Machine Learning for Beginners: A Comprehensive Overview',
    authors: ['Jane Smith', 'John Doe'],
    type: 'paper',
    year: 2022,
    publisher: 'Journal of Artificial Intelligence',
    category: ['Computer Science', 'Artificial Intelligence', 'Machine Learning'],
    abstract: 'This paper provides a comprehensive overview of machine learning concepts, techniques, and applications for beginners. It covers supervised and unsupervised learning, neural networks, and evaluation metrics.',
    access: 'open',
    citationCount: 45,
    thumbnailUrl: '',
  },
  {
    id: '2',
    title: 'Introduction to Quantum Computing: Principles and Applications',
    authors: ['Robert Chen', 'Maria Garcia', 'David Kim'],
    type: 'book',
    year: 2021,
    publisher: 'Academic Press',
    category: ['Physics', 'Computer Science', 'Quantum Computing'],
    abstract: 'This book introduces the fundamental principles of quantum computing, including quantum bits, gates, and algorithms. It provides practical examples and explores potential applications in cryptography, optimization, and simulation.',
    access: 'student',
    citationCount: 87,
    thumbnailUrl: '',
  },
  {
    id: '3',
    title: 'Advanced Calculus and Its Applications in Engineering',
    authors: ['Michael Johnson'],
    type: 'course',
    year: 2023,
    publisher: 'University of Technology',
    category: ['Mathematics', 'Engineering', 'Calculus'],
    abstract: 'A comprehensive course on advanced calculus techniques and their applications in various engineering disciplines. Covers multivariable calculus, vector analysis, and differential equations with practical examples.',
    access: 'faculty',
    thumbnailUrl: '',
  },
  {
    id: '4',
    title: 'The Role of Microbiomes in Human Health and Disease',
    authors: ['Sarah Williams', 'James Lee', 'Emily Brown', 'Thomas Wilson'],
    type: 'paper',
    year: 2022,
    journal: 'Journal of Microbiology',
    category: ['Biology', 'Medicine', 'Microbiology'],
    abstract: 'This paper reviews the latest research on human microbiomes and their impact on health and disease. It discusses the gut microbiome, skin microbiome, and the potential of microbiome-based therapies.',
    access: 'restricted',
    citationCount: 132,
    thumbnailUrl: '',
  },
  {
    id: '5',
    title: 'Climate Change Impacts on Marine Ecosystems',
    authors: ['Elizabeth Martinez', 'Richard Taylor'],
    type: 'paper',
    year: 2023,
    journal: 'Environmental Science Journal',
    category: ['Environmental Science', 'Marine Biology', 'Climate Science'],
    abstract: 'An analysis of how climate change affects marine ecosystems, including coral reefs, fish populations, and ocean acidification. The paper presents data from long-term studies and models future scenarios.',
    access: 'open',
    citationCount: 28,
    thumbnailUrl: '',
  },
  {
    id: '6',
    title: 'Ethical Considerations in Artificial Intelligence Development',
    authors: ['Daniel Park', 'Olivia Wilson'],
    type: 'paper',
    year: 2021,
    publisher: 'Ethics in Technology Conference',
    category: ['Computer Science', 'Ethics', 'Artificial Intelligence'],
    abstract: 'This paper explores the ethical challenges in AI development, including bias, privacy, transparency, and accountability. It proposes a framework for ethical AI design and implementation.',
    access: 'open',
    citationCount: 76,
    thumbnailUrl: '',
  },
  {
    id: '7',
    title: 'Fundamentals of Organic Chemistry',
    authors: ['Jennifer Adams', 'Christopher Nelson'],
    type: 'book',
    year: 2020,
    publisher: 'Science Publishing House',
    category: ['Chemistry', 'Organic Chemistry'],
    abstract: 'A comprehensive textbook covering the principles of organic chemistry, including molecular structure, reaction mechanisms, and synthesis techniques. Includes practice problems and laboratory experiments.',
    access: 'student',
    citationCount: 104,
    thumbnailUrl: '',
  },
  {
    id: '8',
    title: 'Introduction to International Relations: Theories and Approaches',
    authors: ['Alexander Thompson', 'Sophia Rodriguez'],
    type: 'book',
    year: 2022,
    publisher: 'Global Studies Press',
    category: ['Social Sciences', 'International Relations', 'Political Science'],
    abstract: 'This book introduces major theories and approaches in international relations, including realism, liberalism, constructivism, and critical theory. It applies these frameworks to contemporary global issues.',
    access: 'student',
    citationCount: 53,
    thumbnailUrl: '',
  },
];

// Function to get all resources with optional filtering
export const getResources = async (filters?: any): Promise<ResourceProps[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!filters) {
    return sampleResources;
  }
  
  // Apply filters
  return sampleResources.filter(resource => {
    // Filter by type
    if (filters.types && filters.types.length > 0 && !filters.types.includes(resource.type)) {
      return false;
    }
    
    // Filter by access level
    if (filters.accessLevels && filters.accessLevels.length > 0 && !filters.accessLevels.includes(resource.access)) {
      return false;
    }
    
    // Filter by year range
    if (filters.yearRange && (resource.year < filters.yearRange[0] || resource.year > filters.yearRange[1])) {
      return false;
    }
    
    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      const hasMatchingCategory = resource.category.some(cat => 
        filters.categories.includes(cat)
      );
      if (!hasMatchingCategory) {
        return false;
      }
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = resource.title.toLowerCase().includes(query);
      const matchesAuthors = resource.authors.some(author => 
        author.toLowerCase().includes(query)
      );
      const matchesAbstract = resource.abstract?.toLowerCase().includes(query);
      
      if (!matchesTitle && !matchesAuthors && !matchesAbstract) {
        return false;
      }
    }
    
    return true;
  }).sort((a, b) => {
    // Sort resources based on sortBy parameter
    if (filters.sortBy === 'newest') {
      return b.year - a.year;
    } else if (filters.sortBy === 'oldest') {
      return a.year - b.year;
    } else if (filters.sortBy === 'citations' && a.citationCount && b.citationCount) {
      return b.citationCount - a.citationCount;
    }
    // Default sort (relevance) - we'd implement a more complex algorithm in a real app
    return 0;
  });
};

// Function to get a resource by ID
export const getResourceById = async (id: string): Promise<ResourceProps | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return sampleResources.find(resource => resource.id === id);
};

// Function to get featured/recommended resources
export const getFeaturedResources = async (count: number = 3): Promise<ResourceProps[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, we'd have a more sophisticated algorithm to determine featured resources
  // For now, just return the most cited resources
  return [...sampleResources]
    .sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
    .slice(0, count);
};

// Function to submit a resource request (mock)
export const submitResourceRequest = async (requestData: any): Promise<{ success: boolean; message: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  console.log('Resource request submitted:', requestData);
  
  // Always return success for demo
  return {
    success: true,
    message: 'Your request has been submitted successfully.',
  };
};
