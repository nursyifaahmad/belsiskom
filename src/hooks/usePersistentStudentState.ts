'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface StudentSessionData {
  studentId: string;
  sessionId: string;
  sessionCode: string;
  fullName: string;
  className: string;
  absentNo: number;
  status: 'DIAGNOSTIC' | 'LEARNING' | 'POSTTEST' | 'COMPLETED';
  diagnosticAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  diagnosticScore?: number;
  diagnosticCorrectCount?: number;
  currentLearningStep: number;
  completedSteps: string[];
  pcSimulatorDone: boolean;
  validationQuizAnswers: Record<string, number>;
  postTestAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  postTestScore?: number;
  postTestCorrectCount?: number;
  nGainScore?: number;
  lastUpdated: number;
}

const STORAGE_KEY = 'belsiskom_student_session_v1';

export function usePersistentStudentState() {
  const [data, setData] = useState<StudentSessionData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as StudentSessionData;
        setData(parsed);
      }
    } catch (e) {
      console.error('Gagal membaca data sesi lokal:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever data changes
  const saveState = useCallback((newData: StudentSessionData) => {
    try {
      const updated = { ...newData, lastUpdated: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setData(updated);

      // Debounced background sync to server (500ms)
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }

      syncTimeoutRef.current = setTimeout(async () => {
        try {
          await fetch('/api/student/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated),
          });
        } catch (err) {
          // If network is offline, data is safely in localStorage!
          console.warn('Sync server offline, data aman di memori HP:', err);
        }
      }, 500);
    } catch (e) {
      console.error('Gagal menyimpan sesi lokal:', e);
    }
  }, []);

  // Clear session (only when student completes post-test or manually resets)
  const clearSession = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setData(null);
    } catch (e) {
      console.error('Gagal menghapus sesi:', e);
    }
  }, []);

  return {
    studentData: data,
    isLoaded,
    saveState,
    clearSession,
  };
}
