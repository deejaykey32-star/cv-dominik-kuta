import React, { useState } from 'react';
import { useCV } from '../context/cv-context';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { CVDisplay } from '../components/cv-display';
import { ThemeToggle } from '../components/theme-toggle';
import { Link } from 'wouter';
import { ArrowLeft, LogOut, Save, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Admin() {
  const { user, isAdmin, hasFirebase, editMode, setEditMode, saveCV } = useCV();
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!auth || !googleProvider) return;
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Błąd logowania",
        description: "Nie udało się zalogować. Spróbuj ponownie.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    setEditMode(false);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveCV();
      toast({
        title: "Sukces",
        description: "Zapisano zmiany w CV.",
      });
      setEditMode(false);
    } catch (error) {
      toast({
        title: "Błąd zapisu",
        description: "Nie udało się zapisać zmian. Sprawdź konsolę.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!hasFirebase) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-background p-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Brak konfiguracji Firebase</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Aplikacja działa w trybie tylko do odczytu z domyślnymi danymi. 
          Aby używać panelu admina, dodaj zmienne środowiskowe Firebase.
        </p>
        <Link href="/" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Powrót do CV
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-background p-4 relative">
        <div className="absolute top-4 left-4">
          <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Powrót do CV
          </Link>
        </div>
        
        <div className="bg-card p-8 rounded-xl shadow-lg border border-border max-w-md w-full text-center">
          <h1 className="text-2xl font-bold font-display mb-2">Panel Administratora</h1>
          <p className="text-muted-foreground mb-8 text-sm">
            Zaloguj się kontem kuta.dominik@gmail.com aby edytować CV.
          </p>
          
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-medium transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 bg-white rounded-full p-0.5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Zaloguj się przez Google
          </button>
        </div>
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-background p-4 text-center relative">
        <div className="absolute top-4 left-4">
          <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Powrót do CV
          </Link>
        </div>
        
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Brak dostępu</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Zalogowano jako <strong>{user.email}</strong>. Ten panel jest dostępny tylko dla właściciela CV.
        </p>
        
        <button
          onClick={handleLogout}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-2 rounded-md font-medium transition-colors"
        >
          Wyloguj się
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      
      {/* Admin Toolbar */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border py-3 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 h-auto sm:h-16 shadow-sm">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted" aria-label="Powrót do CV">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="text-sm font-medium">
            Zalogowano: <span className="text-primary font-bold">{user.email}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <ThemeToggle />
          
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="text-sm font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm transition-colors disabled:opacity-70"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Zapisz zmiany
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md font-medium text-sm transition-colors"
            >
              Edytuj CV
            </button>
          )}
          
          <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>
          
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-full hover:bg-destructive/10"
            title="Wyloguj"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Editor Main Area */}
      <div className="py-8 px-4 md:py-12 flex justify-center bg-muted/30">
        <div className="w-full flex flex-col items-center">
          {editMode && (
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-lg mb-8 max-w-5xl w-full text-sm font-medium flex items-center gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>Jesteś w trybie edycji. Kliknij na dowolny tekst, aby go zmienić. Pamiętaj o zapisaniu zmian.</span>
            </div>
          )}
          
          <div className={`transition-all duration-300 ${editMode ? 'ring-2 ring-primary/20 rounded-xl' : ''}`}>
            <CVDisplay />
          </div>
        </div>
      </div>
      
    </div>
  );
}
