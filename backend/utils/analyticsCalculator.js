// Calculate comprehensive analytics from attempt responses
exports.calculateAnalytics = async (questions, responses) => {
  const subjectMap = {};
  const topicMap = {};
  const chapterMap = {};

  // Process each response
  for (const response of responses) {
    const question = questions.find(q => q._id.toString() === response.question.toString());
    
    if (!question) continue;

    const { subject, topic, chapter } = question;
    const isCorrect = response.isCorrect;

    // Subject-wise analysis
    if (!subjectMap[subject]) {
      subjectMap[subject] = { attempted: 0, correct: 0, wrong: 0 };
    }
    if (response.selectedOption !== null && response.selectedOption !== undefined) {
      subjectMap[subject].attempted++;
      if (isCorrect) {
        subjectMap[subject].correct++;
      } else {
        subjectMap[subject].wrong++;
      }
    }

    // Topic-wise analysis
    if (!topicMap[topic]) {
      topicMap[topic] = { attempted: 0, correct: 0, wrong: 0, subject };
    }
    if (response.selectedOption !== null && response.selectedOption !== undefined) {
      topicMap[topic].attempted++;
      if (isCorrect) {
        topicMap[topic].correct++;
      } else {
        topicMap[topic].wrong++;
      }
    }

    // Chapter-wise analysis
    if (!chapterMap[chapter]) {
      chapterMap[chapter] = { attempted: 0, correct: 0, wrong: 0, subject };
    }
    if (response.selectedOption !== null && response.selectedOption !== undefined) {
      chapterMap[chapter].attempted++;
      if (isCorrect) {
        chapterMap[chapter].correct++;
      } else {
        chapterMap[chapter].wrong++;
      }
    }
  }

  // Calculate accuracy and categorize
  const weakSubjects = [];
  const strongSubjects = [];
  const subjectWiseAnalysis = [];

  for (const [subject, data] of Object.entries(subjectMap)) {
    const accuracy = data.attempted > 0 ? (data.correct / data.attempted) * 100 : 0;
    
    subjectWiseAnalysis.push({
      subject,
      attempted: data.attempted,
      correct: data.correct,
      wrong: data.wrong,
      accuracy
    });

    if (accuracy < 50) {
      weakSubjects.push(subject);
    } else if (accuracy >= 70) {
      strongSubjects.push(subject);
    }
  }

  // Categorize topics
  const weakTopics = [];
  const strongTopics = [];

  for (const [topic, data] of Object.entries(topicMap)) {
    const accuracy = data.attempted > 0 ? (data.correct / data.attempted) * 100 : 0;
    
    if (accuracy < 50) {
      weakTopics.push(topic);
    } else if (accuracy >= 70) {
      strongTopics.push(topic);
    }
  }

  // Categorize chapters
  const weakChapters = [];
  const strongChapters = [];

  for (const [chapter, data] of Object.entries(chapterMap)) {
    const accuracy = data.attempted > 0 ? (data.correct / data.attempted) * 100 : 0;
    
    if (accuracy < 50) {
      weakChapters.push(chapter);
    } else if (accuracy >= 70) {
      strongChapters.push(chapter);
    }
  }

  return {
    weakSubjects,
    strongSubjects,
    weakTopics,
    strongTopics,
    weakChapters,
    strongChapters,
    subjectWiseAnalysis
  };
};
