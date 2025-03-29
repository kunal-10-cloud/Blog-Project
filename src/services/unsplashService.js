// Unsplash API service
// This service provides functions to fetch images from Unsplash API

// Production API keys
const UNSPLASH_ACCESS_KEY = '5qKDpsPoCaVh-g8nYY1ZWkkC2hlXIhDXJ0gB1qvleeA';
const UNSPLASH_SECRET_KEY = 'c4E_AWwqLQGji-K2JUEQBdQ-M8E18Fd2WkURsvo8v08';
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// For demo purposes, we'll use a mock if no key is provided
const useMock = false; // Set to false since we now have valid API keys

// Mock data for development without an API key
const mockImages = [
  {
    id: '1',
    urls: {
      regular: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
      small: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400',
      thumb: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=200',
    },
    alt_description: 'Travel image with mountains and lake',
    user: { name: 'Unsplash User', username: 'unsplash' }
  },
  {
    id: '2',
    urls: {
      regular: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      small: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
      thumb: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200',
    },
    alt_description: 'Person working on laptop',
    user: { name: 'Unsplash User', username: 'unsplash' }
  },
  {
    id: '3',
    urls: {
      regular: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2',
      small: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
      thumb: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=200',
    },
    alt_description: 'Food with vegetables and herbs',
    user: { name: 'Unsplash User', username: 'unsplash' }
  },
  {
    id: '4',
    urls: {
      regular: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
      small: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
      thumb: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200',
    },
    alt_description: 'Meditation and wellness concept',
    user: { name: 'Unsplash User', username: 'unsplash' }
  },
  {
    id: '5',
    urls: {
      regular: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      small: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200',
    },
    alt_description: 'Beach with clear blue water',
    user: { name: 'Unsplash User', username: 'unsplash' }
  },
  {
    id: '6',
    urls: {
      regular: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e',
      small: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400',
      thumb: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=200',
    },
    alt_description: 'Person writing in a journal',
    user: { name: 'Unsplash User', username: 'unsplash' }
  }
];

// Function to search for images
export const searchImages = async (query, page = 1, perPage = 30) => {
  if (useMock) {
    // Return mock data if we don't have an API key
    console.log('Using mock Unsplash data. For production, get a real API key.');
    return {
      results: mockImages.filter(img => 
        !query || img.alt_description.toLowerCase().includes(query.toLowerCase())
      ),
      total: mockImages.length,
      total_pages: 1
    };
  }
  
  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    // Fall back to mock data on error
    return {
      results: mockImages,
      total: mockImages.length,
      total_pages: 1
    };
  }
};

// Function to get images based on a category
export const getImagesByCategory = async (category, page = 1, perPage = 30) => {
  return searchImages(category, page, perPage);
};

// Function to get a random image
export const getRandomImage = async (query = '') => {
  if (useMock) {
    // Return a random mock image
    const randomIndex = Math.floor(Math.random() * mockImages.length);
    return mockImages[randomIndex];
  }
  
  try {
    const params = query 
      ? `?query=${encodeURIComponent(query)}` 
      : '';
      
    const response = await fetch(
      `${UNSPLASH_API_URL}/photos/random${params}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching random image from Unsplash:', error);
    // Fall back to a random mock image
    const randomIndex = Math.floor(Math.random() * mockImages.length);
    return mockImages[randomIndex];
  }
}; 