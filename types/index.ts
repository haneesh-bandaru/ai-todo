export interface Task {
    id: string;
    title: string;
    completed: boolean;
    date?: Date;
    isDaily: boolean;
    time?: string;
  }
  
  export interface User {
    username: string;
    email: string;
    profileImage?: string;
    preferences: {
      notifications: boolean;
      defaultView: 'daily' | 'calendar';
      theme: 'light' | 'dark';
    }
  }
  