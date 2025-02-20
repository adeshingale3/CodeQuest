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