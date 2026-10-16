import { trackEvent } from "../analytics/analytics.js";

// Track answers for the specified question IDs
export const trackRiskAssessmentAnswers = ({
  steps,
  answers,
  states = [],
  questionIds,
}) => {
  // Flatten questions from all steps for lookup
  const allQuestions = steps.flat();

  questionIds.forEach((id) => {
    const answerId = answers[id];

    // Skip unanswered questions
    if (
      answerId === undefined ||
      answerId === null ||
      answerId === "" ||
      (Array.isArray(answerId) && answerId.length === 0)
    ) {
      return;
    }

    const questionData = allQuestions.find((q) => q.question_id === id);

    let answer;

    // Resolve the actual answer based on the question type
    if (id === 1) {
      answer = answerId;
    } else if (id === 5) {
      answer = states.find(
        (state) => state.state_code === answerId,
      )?.state_name;
    } else {
      answer = questionData?.options?.find(
        (option) => option.answer_id === Number(answerId),
      )?.answer;
    }

    // Convert the question text into a lowercase, underscore-separated event name
    const eventName = questionData?.question
      ?.toLowerCase()
      .replace(/[^a-z0-9\s/]/g, "")
      .trim()
      .replace(/[ /\s]+/g, "_");

    // Track the question and answer in GA4
    trackEvent(eventName, {
      question_id: questionData?.question_id ?? id,
      question: questionData?.question,
      answer_id: answerId,
      answer,
    });
  });
};
