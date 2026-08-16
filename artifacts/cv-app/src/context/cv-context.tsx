import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CVData, defaultCVData } from '../types/cv';
import { db, hasFirebaseConfig, auth } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

interface CVContextType {
  cvData: CVData;
  setCVData: (data: CVData) => void;
  isAdmin: boolean;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  loading: boolean;
  saveCV: () => Promise<void>;
  hasFirebase: boolean;
  user: User | null;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Auth listener
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email === 'kuta.dominik@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        setEditMode(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch data
  useEffect(() => {
    if (!hasFirebaseConfig || !db) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, 'cv', 'main');
    
    // Realtime sync if not editing, or fetch once
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as CVData;
        setCVData(data);
      } else {
        // Seed default data if not exists
        setDoc(docRef, defaultCVData).catch(console.error);
        setCVData(defaultCVData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching CV data:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveCV = async () => {
    if (!hasFirebaseConfig || !db || !isAdmin) return;
    try {
      const docRef = doc(db, 'cv', 'main');
      await setDoc(docRef, cvData);
    } catch (err) {
      console.error("Error saving CV:", err);
      throw err;
    }
  };

  return (
    <CVContext.Provider value={{
      cvData,
      setCVData,
      isAdmin,
      editMode,
      setEditMode,
      loading,
      saveCV,
      hasFirebase: hasFirebaseConfig,
      user
    }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}
