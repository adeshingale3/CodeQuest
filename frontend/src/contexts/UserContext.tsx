import { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

interface User {
  id: number;
  username: string;
  email: string;
  points: number;
  solved_challenges: number[];
}

interface UserContextType {
  user: User | null;
  fetchUserData: () => Promise<void>;
  updateUserPoints: (points: number) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const challenges = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    points: 100,
    description: "Find two numbers in an array that add up to a target sum.",
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Medium",
    category: "Stacks",
    points: 200,
    description: "Determine if the input string has valid parentheses ordering.",
  },
  {
    id: 3,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Linked Lists",
    points: 300,
    description: "Merge k sorted linked lists into one sorted linked list.",
  },
  {
    id: 4,
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "Strings",
    points: 75,
    description: "Determine if a string is a palindrome, considering only alphanumeric characters and ignoring case.",
  },
  {
    id: 5,
    title: "Single Number",
    difficulty: "Easy",
    category: "Arrays",
    points: 75,
    description: "Find the number that appears only once in an array where all other numbers appear twice.",
  },
  {
    id: 6,
    title: "Maximum Subarray",
    difficulty: "Easy",
    category: "Arrays",
    points: 100,
    description: "Find the contiguous subarray with the largest sum within an array of integers.",
  },
  {
    id: 7,
    title: "First Unique Character",
    difficulty: "Easy",
    category: "Strings",
    points: 75,
    description: "Find the first non-repeating character in a string and return its index.",
  },
  {
    id: 8,
    title: "Power of Two",
    difficulty: "Easy",
    category: "Math",
    points: 50,
    description: "Determine if a given integer is a power of two.",
  },
  {
    id: 9,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stacks",
    points: 100,
    description: "Determine if a string of parentheses, brackets, and curly braces is valid.",
  },
  {
    id: 10,
    title: "Missing Number",
    difficulty: "Easy",
    category: "Arrays",
    points: 75,
    description: "Find the missing number in an array containing n distinct numbers taken from 0 to n.",
  },
  {
    id: 11,
    title: "Binary Search",
    difficulty: "Easy",
    category: "Searching",
    points: 100,
    description: "Implement binary search to find a target value in a sorted array.",
  },
  {
    id: 12,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    points: 100,
    description: "Count the number of ways to climb n stairs, taking either 1 or 2 steps at a time.",
  },
  {
    id: 15,
    title: "Merge Sorted Arrays",
    difficulty: "Easy",
    category: "Arrays",
    points: 100,
    description: "Merge two sorted arrays into a single sorted array.",
  }
];
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUserData = async () => {
    let token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
        let response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            const newToken = await refreshToken();
            if (newToken) {
                response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE}`, {
                    headers: {
                        'Authorization': `Bearer ${newToken}`
                    }
                });
            }
        }

        if (response.ok) {
            const data = await response.json();
            setUser(data);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
  };

  const updateUserPoints = async (points: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token || !user) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/update-points/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ points })
      });
      if (response.ok) {
        await fetchUserData();
      }
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) return null;

    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REFRESH_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.access);
            return data.access;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUserData, updateUserPoints }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};