import { create } from 'zustand';

import { getAllTests, getUpcomingTests, getTestById, getTestQuestions } from '../services/tests';

export const useTestStore = create((set) => ({
  tests: [],
  upcomingTests: [],
  currentTest: null,
  testQuestions: [],
  loading: false,
  error: null,

  fetchTests: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await getAllTests(params);
      console.log(response.tests);
      set({ tests: response.tests || response });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch tests' });
    } finally {
      set({ loading: false });
    }
  },

  // fetchUpcomingTests: async () => {
  //   set({ loading: true, error: null });
  //   try {
  //     const response = await getUpcomingTests();
  //     console.log("hii")
  //     console.log(response)
  //     set({ upcomingTests: response.tests || response });
  //   } catch (err) {
  //     set({ error: err.message || 'Failed to fetch upcoming tests' });
  //   } finally {
  //     set({ loading: false });
  //   }
  // },

  fetchUpcomingTests: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllTests();
      const tests = response.tests || response || [];
      set({ 
        upcomingTests: tests.filter(t => t.isActive),
        tests,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch tests', 
        loading: false,
        upcomingTests: []
      });
    }
  },

  fetchTestById: async (testId) => {
    set({ loading: true, error: null });
    try {
      const response = await getTestById(testId);
      set({ currentTest: response.test || response });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch test' });
    } finally {
      set({ loading: false });
    }
  },

  // fetchTestQuestions: async (testId) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const response = await getTestQuestions(testId);
  //     set({ testQuestions: response.test.questions || response });
  //   } catch (err) {
  //     set({ error: err.message || 'Failed to fetch questions' });
  //   } finally {
  //     set({ loading: false });
  //   }
  // }


   fetchTestQuestions: async (testId) => {
    set({ loading: true, error: null });
    try {
      // Fetch test details first
      const testResponse = await getTestById(testId);
      const test = testResponse.test || testResponse;
      
      // Fetch questions
      const questionsResponse = await getTestQuestions(testId);
      const questions = questionsResponse.questions || questionsResponse.test?.questions || [];
      
      // Set both currentTest and testQuestions
      set({ 
        currentTest: test,
        testQuestions: questions,
        loading: false,
        error: null
      });
      
      return { test, questions };
    } catch (err) {
      set({ 
        error: err.message || 'Failed to fetch test questions',
        loading: false,
        currentTest: null,
        testQuestions: []
      });
      throw err;
    }
  },


     clearCurrentTest: () => {
    set({ 
      currentTest: null, 
      testQuestions: [],
      error: null 
    });
  }

}));
