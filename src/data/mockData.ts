
export interface User {
  id: number;
  username: string;
  displayName: string;
  reputation: number;
  avatar?: string;
  joinedDate: string;
  location?: string;
  bio?: string;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  author: string;
  authorReputation: number;
  createdAt: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  isAnswered: boolean;
  bounty?: number;
}

export interface Answer {
  id: number;
  questionId: number;
  content: string;
  author: string;
  authorReputation: number;
  createdAt: string;
  votes: number;
  isAccepted: boolean;
  editedAt?: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    username: "sarah_dev",
    displayName: "Sarah Chen",
    reputation: 15420,
    joinedDate: "2021-03-15",
    location: "San Francisco, CA",
    bio: "Full-stack developer with 8+ years experience. Passionate about React and Node.js."
  },
  {
    id: 2,
    username: "mike_architect",
    displayName: "Michael Rodriguez",
    reputation: 8750,
    joinedDate: "2020-11-08",
    location: "Austin, TX",
    bio: "Software architect specializing in microservices and cloud infrastructure."
  },
  {
    id: 3,
    username: "alex_frontend",
    displayName: "Alex Kumar",
    reputation: 12340,
    joinedDate: "2022-01-20",
    location: "London, UK",
    bio: "Frontend engineer with expertise in modern JavaScript frameworks."
  },
  {
    id: 4,
    username: "lisa_security",
    displayName: "Lisa Thompson",
    reputation: 21850,
    joinedDate: "2019-07-12",
    location: "Toronto, Canada",
    bio: "Cybersecurity expert and penetration tester. Author of 'Modern Web Security'."
  },
  {
    id: 5,
    username: "david_mobile",
    displayName: "David Park",
    reputation: 6890,
    joinedDate: "2023-02-14",
    location: "Seoul, South Korea",
    bio: "Mobile app developer focusing on React Native and Flutter."
  }
];

export const mockQuestions: Question[] = [
  {
    id: 1,
    title: "How to implement secure JWT authentication with refresh tokens in React?",
    description: `I'm building a React application that needs robust JWT authentication. I've implemented basic login/logout, but I'm struggling with:

1. **Secure token storage** - localStorage vs httpOnly cookies
2. **Automatic token refresh** - handling expired tokens gracefully  
3. **Route protection** - preventing unauthorized access to protected routes

Here's my current authentication service:

\`\`\`javascript
// authService.js
class AuthService {
  login = async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  };

  refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    // How do I handle this properly?
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Authorization': \`Bearer \${refreshToken}\` }
    });
    
    if (!response.ok) {
      this.logout();
      return null;
    }
    
    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
  };
}
\`\`\`

**Issues I'm facing:**
- Tokens expire before refresh logic triggers
- XSS vulnerability with localStorage
- Race conditions with multiple API calls
- Users get logged out unexpectedly

I've seen recommendations for httpOnly cookies, but how do I manage them in React? Should I use a library like \`axios\` with interceptors?

**What I've tried:**
- Manual token refresh before each API call (too verbose)
- setTimeout to refresh before expiry (unreliable)  
- Using \`react-query\` with custom hooks (still struggling)

Looking for a production-ready solution that balances security with user experience. Any help would be greatly appreciated!`,
    author: "alex_frontend",
    authorReputation: 12340,
    createdAt: "3 hours ago",
    tags: ["React", "JWT", "Authentication", "Security", "JavaScript"],
    votes: 24,
    answers: 7,
    views: 892,
    isAnswered: true,
    bounty: 150
  },
  {
    id: 2,
    title: "Best practices for React component state management in 2024",
    description: `With so many state management options available, I'm confused about the current best practices for React applications.

**My current project:**
- Medium-sized e-commerce app (~50 components)
- User authentication, shopping cart, product catalog
- Real-time inventory updates via WebSocket
- Multiple forms with complex validation

**Options I'm considering:**
1. **Built-in React state** (useState, useReducer, Context)
2. **Redux Toolkit** (traditional choice, but feels heavy?)
3. **Zustand** (heard great things, very lightweight)
4. **Jotai** (atomic approach seems interesting)
5. **TanStack Query** + local state (for server state)

**Specific questions:**
- When should I reach for external state management vs React's built-in options?
- How do you handle server state vs client state separation?
- What about form state? React Hook Form vs library state?
- Performance considerations for frequent updates?

I don't want to over-engineer, but I also don't want to paint myself into a corner as the app grows. What would you recommend for a project like mine?

Currently using just Context + useReducer but running into prop drilling issues and performance concerns with frequent cart updates.`,
    author: "david_mobile",
    authorReputation: 6890,
    createdAt: "6 hours ago",
    tags: ["React", "State Management", "Redux", "Context", "Performance"],
    votes: 18,
    answers: 12,
    views: 1247,
    isAnswered: true
  },
  {
    id: 3,
    title: "TypeScript generic constraints: When to use 'extends' vs 'keyof'?",
    description: `I'm working on a utility library and struggling with TypeScript generics. Specifically, when should I use \`extends\` vs \`keyof\` for constraints?

**Example scenario:**
\`\`\`typescript
// Option 1: Using extends
function updateField<T, K extends keyof T>(
  obj: T, 
  key: K, 
  value: T[K]
): T {
  return { ...obj, [key]: value };
}

// Option 2: Using conditional types
type UpdateField<T, K> = K extends keyof T 
  ? { [P in keyof T]: P extends K ? T[K] : T[P] }
  : never;

// Option 3: Mapped types
type PartialUpdate<T> = {
  [K in keyof T]?: T[K];
};
\`\`\`

**Questions:**
1. Performance implications of different approaches?
2. When does TypeScript's inference break down?
3. How to handle nested object updates type-safely?
4. Best practices for library API design?

I want to create an intuitive API that doesn't fight TypeScript's type system. The utility will be used across multiple projects, so getting the types right is crucial.

**What I've tried:**
- Reading the TypeScript handbook (still confused)
- Looking at popular libraries (inconsistent patterns)
- Experimenting with different approaches (some work, others don't)

Any insights from experienced TypeScript developers would be invaluable!`,
    author: "mike_architect",
    authorReputation: 8750,
    createdAt: "1 day ago",
    tags: ["TypeScript", "Generics", "Type Safety", "Library Design"],
    votes: 31,
    answers: 5,
    views: 2156,
    isAnswered: true
  },
  {
    id: 4,
    title: "GraphQL vs REST: Making the right choice for a new project in 2024",
    description: `Starting a new project and trying to decide between GraphQL and REST for the API architecture. The project involves:

**Project details:**
- Social media platform with feeds, posts, comments
- Real-time features (notifications, chat)
- Mobile apps (iOS, Android) + web dashboard
- Expected to scale to 100k+ users
- Team of 6 developers (mixed experience levels)

**GraphQL pros I see:**
- Single endpoint, flexible queries
- Strong type system
- Excellent tooling (Apollo, etc.)
- Reduced over/under-fetching

**GraphQL concerns:**
- Caching complexity
- N+1 query problems
- Learning curve for team
- File uploads are awkward

**REST pros:**
- Team familiarity
- HTTP caching works well
- Simpler mental model
- Better tooling for testing/monitoring

**REST concerns:**
- Multiple endpoints to maintain
- Over-fetching data for mobile
- API versioning challenges

**Specific questions:**
1. How do you handle real-time updates with GraphQL subscriptions vs WebSockets?
2. What's the performance difference in practice?
3. How much does team experience matter in this decision?
4. Any hybrid approaches worth considering?

I've built REST APIs before but limited GraphQL experience. Don't want to choose based on hype, but also don't want to miss out on genuine benefits.`,
    author: "sarah_dev",
    authorReputation: 15420,
    createdAt: "2 days ago",
    tags: ["GraphQL", "REST", "API Design", "Architecture", "Performance"],
    votes: 42,
    answers: 23,
    views: 3421,
    isAnswered: false
  },
  {
    id: 5,
    title: "Docker multi-stage builds: Optimizing for production React apps",
    description: `I'm trying to optimize my Docker setup for a React application. Currently using a simple Dockerfile but the images are huge (1.2GB+) and builds are slow.

**Current Dockerfile:**
\`\`\`dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

**Issues:**
- Large image size (includes dev dependencies)
- Slow builds (reinstalls everything each time)
- Security concerns (running as root)
- No layer caching optimization

**What I want to achieve:**
- Smaller production images (<100MB)
- Faster builds with better caching
- Security best practices
- Separate development and production configs

I've heard about multi-stage builds but struggling with the implementation. How do you structure them for React apps? Should I use nginx for serving static files in production?

Also considering:
- Using Alpine Linux base images
- Non-root user setup
- .dockerignore optimization
- Build cache strategies

Any examples of well-optimized React Dockerfiles would be extremely helpful!`,
    author: "lisa_security",
    authorReputation: 21850,
    createdAt: "4 days ago",
    tags: ["Docker", "React", "DevOps", "Optimization", "Security"],
    votes: 19,
    answers: 8,
    views: 1567,
    isAnswered: true
  },
  {
    id: 6,
    title: "Handling async operations in React: useEffect vs custom hooks vs libraries",
    description: `I'm refactoring a React app and dealing with a lot of async operations. Currently everything is in useEffect hooks, but it's getting messy.

**Current approach:**
\`\`\`javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await api.getUser(userId);
        if (!cancelled) {
          setUser(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUser();
    
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // ... rest of component
}
\`\`\`

This pattern is repeated everywhere! I'm considering:

1. **Custom hooks** - Extract the async logic
2. **TanStack Query** - Handle server state properly  
3. **SWR** - Similar to React Query but simpler?
4. **Axios + interceptors** - Centralized error handling

**Questions:**
- When is useEffect sufficient vs when do I need a library?
- How do you handle race conditions properly?
- What about error boundaries vs local error state?
- Caching strategies for different types of data?

The app has user profiles, posts, comments, notifications - lots of interdependent data that needs to stay in sync.

Looking for battle-tested patterns that scale well!`,
    author: "alex_frontend",
    authorReputation: 12340,
    createdAt: "1 week ago",
    tags: ["React", "Async", "Hooks", "Data Fetching", "Architecture"],
    votes: 15,
    answers: 11,
    views: 967,
    isAnswered: false
  }
];

export const mockAnswers: Answer[] = [
  {
    id: 1,
    questionId: 1,
    content: `Great question! I've implemented JWT auth in several production React apps. Here's a robust solution that addresses all your concerns:

## 1. Secure Token Storage Strategy

**For maximum security, use httpOnly cookies:**

\`\`\`javascript
// Set cookies on the server side
app.post('/api/auth/login', (req, res) => {
  const { accessToken, refreshToken } = generateTokens(user);
  
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
  
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  
  res.json({ user: sanitizedUserData });
});
\`\`\`

## 2. Axios Interceptor for Automatic Refresh

\`\`\`javascript
// api/client.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true // Include cookies
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return apiClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await apiClient.post('/auth/refresh');
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
\`\`\`

## 3. React Auth Context

\`\`\`javascript
// contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import apiClient from '../api/client';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await apiClient.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    setUser(response.data.user);
    return response.data;
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`

## 4. Protected Route Component

\`\`\`javascript
// components/ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
\`\`\`

## Key Benefits:

✅ **Security**: httpOnly cookies prevent XSS attacks  
✅ **Automatic refresh**: No manual token management  
✅ **Race condition handling**: Queue failed requests during refresh  
✅ **Clean separation**: Auth logic isolated in context  
✅ **Type safety**: Easy to add TypeScript later

This approach has served me well in production apps handling thousands of users. The cookie-based strategy is much more secure than localStorage, and the interceptor handles all the edge cases automatically.`,
    author: "lisa_security",
    authorReputation: 21850,
    createdAt: "2 hours ago",
    votes: 47,
    isAccepted: true
  },
  {
    id: 2,
    questionId: 1,
    content: `I'd add to Lisa's excellent answer with some additional security considerations:

## Content Security Policy (CSP)

Make sure to set proper CSP headers to prevent XSS:

\`\`\`
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
\`\`\`

## Token Rotation Strategy

Consider implementing token rotation for maximum security:

\`\`\`javascript
// Server-side refresh endpoint
app.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.cookies;
  
  // Validate and decode refresh token
  const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
  
  // Generate NEW tokens (rotate both)
  const newAccessToken = generateAccessToken(decoded.userId);
  const newRefreshToken = generateRefreshToken(decoded.userId);
  
  // Invalidate old refresh token in database
  await invalidateRefreshToken(refreshToken);
  
  // Set new cookies
  setCookies(res, newAccessToken, newRefreshToken);
  
  res.json({ success: true });
});
\`\`\`

This prevents replay attacks even if refresh tokens are compromised.

## Development vs Production

For development, you might want to use localStorage for easier debugging:

\`\`\`javascript
const useSecureCookies = process.env.NODE_ENV === 'production';

const tokenStorage = {
  getToken: () => useSecureCookies ? null : localStorage.getItem('token'),
  setToken: (token) => !useSecureCookies && localStorage.setItem('token', token),
  removeToken: () => !useSecureCookies && localStorage.removeItem('token')
};
\`\`\`

Great question - this is exactly the kind of thing that trips up many developers!`,
    author: "mike_architect",
    authorReputation: 8750,
    createdAt: "1 hour ago",
    votes: 23,
    isAccepted: false
  }
];
