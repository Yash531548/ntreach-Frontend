
import axios from "axios";
import { questionStepMap } from "../../libs/questionStepMapper";

export async function fetchQuestionSteps() {
    const resp = await axios.get(`${import.meta.env.VITE_API_URL}api/get_questionaire`);

    const allQuestions = resp.data.data;

    // Step grouping logic
    const groupedSteps = [];
    allQuestions.forEach(q => {
        const stepIdx = questionStepMap[q.question_id];
        groupedSteps[stepIdx] = groupedSteps[stepIdx] || [];
        groupedSteps[stepIdx].push(q);
    });

    // Swap question_id 22 and question_id 5 in step 0 (assuming step 0 exists)
    const step0 = groupedSteps[0]; // Assuming the first step is at index 0
    if (step0) {
        const idx_22 = step0.findIndex(q => q.question_id === 22);
        const idx_5 = step0.findIndex(q => q.question_id === 5);

        if (idx_22 !== -1 && idx_5 !== -1) {
            // Swap the questions
            const temp = step0[idx_22];
            step0[idx_22] = step0[idx_5];
            step0[idx_5] = temp;
        }
    }

    return groupedSteps;
}
