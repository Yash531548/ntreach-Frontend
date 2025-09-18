import axios from "axios";
import { questionStepMap } from "../../libs/questionStepMapper";

export async function fetchQuestionSteps() {
    const resp = await axios.get(`${process.env.REACT_APP_API_URL}api/get_questionaire`);

    const allQuestions = resp.data.data;
    // Step grouping logic
    const groupedSteps = [];
    allQuestions.forEach(q => {
        const stepIdx = questionStepMap[q.question_id];
        groupedSteps[stepIdx] = groupedSteps[stepIdx] || [];
        groupedSteps[stepIdx].push(q);
    });
    return groupedSteps;
}