// import { create } from 'zustand';

// import { getAllTests, getUpcomingTests, getTestById, getTestQuestions } from '../services/tests';

// export const useTestStore = create((set) => ({
//   tests: [],
//   upcomingTests: [],
//   currentTest: null,
//   testQuestions: [],
//   loading: false,
//   error: null,

//   fetchTests: async (params = {}) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await getAllTests(params);
//       console.log(response.tests);
//       set({ tests: response.tests || response });
//     } catch (err) {
//       set({ error: err.message || 'Failed to fetch tests' });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // fetchUpcomingTests: async () => {
//   //   set({ loading: true, error: null });
//   //   try {
//   //     const response = await getUpcomingTests();
//   //     console.log("hii")
//   //     console.log(response)
//   //     set({ upcomingTests: response.tests || response });
//   //   } catch (err) {
//   //     set({ error: err.message || 'Failed to fetch upcoming tests' });
//   //   } finally {
//   //     set({ loading: false });
//   //   }
//   // },

//   fetchUpcomingTests: async () => {
//     set({ loading: true, error: null });
//     try {
//       const response = await getAllTests();
//       const tests = response.tests || response || [];
//       set({ 
//         upcomingTests: tests.filter(t => t.isActive),
//         tests,
//         loading: false 
//       });
//     } catch (error) {
//       set({ 
//         error: error.message || 'Failed to fetch tests', 
//         loading: false,
//         upcomingTests: []
//       });
//     }
//   },

//   fetchTestById: async (testId) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await getTestById(testId);
//       set({ currentTest: response.test || response });
//     } catch (err) {
//       set({ error: err.message || 'Failed to fetch test' });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // fetchTestQuestions: async (testId) => {
//   //   set({ loading: true, error: null });
//   //   try {
//   //     const response = await getTestQuestions(testId);
//   //     set({ testQuestions: response.test.questions || response });
//   //   } catch (err) {
//   //     set({ error: err.message || 'Failed to fetch questions' });
//   //   } finally {
//   //     set({ loading: false });
//   //   }
//   // }


//    fetchTestQuestions: async (testId) => {
//     set({ loading: true, error: null });
//     try {
//       // Fetch test details first
//       const testResponse = await getTestById(testId);
//       const test = testResponse.test || testResponse;
      
//       // Fetch questions
//       const questionsResponse = await getTestQuestions(testId);
//       const questions = questionsResponse.questions || questionsResponse.test?.questions || [];
      
//       // Set both currentTest and testQuestions
//       set({ 
//         currentTest: test,
//         testQuestions: questions,
//         loading: false,
//         error: null
//       });
      
//       return { test, questions };
//     } catch (err) {
//       set({ 
//         error: err.message || 'Failed to fetch test questions',
//         loading: false,
//         currentTest: null,
//         testQuestions: []
//       });
//       throw err;
//     }
//   },


//      clearCurrentTest: () => {
//     set({ 
//       currentTest: null, 
//       testQuestions: [],
//       error: null 
//     });
//   }

// }));



// store/testStore.js - COMPLETELY REWRITTEN
import { create } from 'zustand';
import { 
  getAllTests, 
  getUpcomingTests, 
  getTestById, 
  getTestQuestions, 
  startTestSession,
  saveTestProgress 
} from '../services/tests';

export const useTestStore = create((set, get) => ({
  tests: [],
  upcomingTests: [],
  currentTest: null,
  testQuestions: [],
  currentTestSession: null,
  loading: false,
  error: null,

  // FIXED: Handle all possible response structures
  startTestSession: async (testId) => {
    set({ loading: true, error: null });
    
    try {
      console.log('🔄 [STORE] Starting test session for:', testId);
      
      // Call the API - this might return response object or just data
      const apiResult = await startTestSession(testId);
      
      console.log('🔍 [STORE] Raw API result:', apiResult);
      
      // Handle different response structures:
      // 1. If it's a full axios response { data: { success, session } }
      // 2. If it's just the data { success, session }
      // 3. If it's the session directly { startTime, endTime, serverTime }
      
      let sessionData;
      
      if (apiResult.data) {
        // Case 1: Full axios response
        console.log('📦 [STORE] Full axios response detected');
        sessionData = apiResult.data.session || apiResult.data;
      } else if (apiResult.session) {
        // Case 2: Direct data with session
        console.log('📦 [STORE] Direct data with session detected');
        sessionData = apiResult.session;
      } else if (apiResult.startTime && apiResult.endTime) {
        // Case 3: Session data directly
        console.log('📦 [STORE] Session data directly detected');
        sessionData = apiResult;
      } else {
        // Unknown structure
        console.error('❌ [STORE] Unknown response structure:', apiResult);
        throw new Error('Unknown response structure from server: ' + JSON.stringify(apiResult));
      }
      
      console.log('✅ [STORE] Extracted session data:', sessionData);
      
      if (!sessionData) {
        throw new Error('Could not extract session data from response');
      }
      
      // Validate required fields
      if (!sessionData.startTime || !sessionData.endTime) {
        console.error('❌ [STORE] Session missing required fields:', sessionData);
        throw new Error('Session data missing required fields');
      }
      
      set({ 
        currentTestSession: sessionData,
        loading: false,
        error: null
      });
      
      return sessionData;
      
    } catch (err) {
      console.error('❌ [STORE] startTestSession failed:', err.message);
      
      set({ 
        error: err.message, 
        loading: false,
        currentTestSession: null
      });
      
      throw err;
    }
  },

  // ... keep all other methods the same
  saveTestProgress: async (testId, progressData) => {
    try {
      console.log('💾 [STORE] Saving progress for test:', testId);
      const response = await saveTestProgress(testId, progressData);
      console.log('✅ [STORE] Progress saved successfully');
      return response;
    } catch (err) {
      console.error('❌ [STORE] saveTestProgress failed:', err);
      if (err.message === 'TIME_EXPIRED' || err.code === 'TIME_EXPIRED') {
        const timeError = new Error('TIME_EXPIRED');
        timeError.code = 'TIME_EXPIRED';
        throw timeError;
      }
      throw err;
    }
  },

  fetchTests: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await getAllTests(params);
      set({ tests: response.tests || response });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch tests' });
    } finally {
      set({ loading: false });
    }
  },

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

  fetchTestQuestions: async (testId) => {
    set({ loading: true, error: null });
    try {
      const testResponse = await getTestById(testId);
      const test = testResponse.test || testResponse;
      
      const questionsResponse = await getTestQuestions(testId);
      const questions = questionsResponse.questions || questionsResponse.test?.questions || [];
      
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
      currentTestSession: null,
      error: null 
    });
  },

  clearTestSession: () => {
    set({
      currentTestSession: null
    });
  }
}));