// QuestionsSection.jsx
export default function QuestionsSection({
    questions, answers, handleInputChange, handleCheckboxChange, profileContext, states, offset
}) {
    return (
        <div className="space-y-6 h-auto">
            {questions.map((q,index) => (
                <div key={q.question_id} className="text-sm md:text-base lg:text-base">
                    <p className="font-medium mb-2 text-[#11688F]">
                        {offset + index + 1}. {q.question}
                    </p>
                    {/* Radio */}
                    {q.answer_input_type === "radio" && (
                        <div className="flex flex-wrap gap-3 text-sm md:text-base">
                            {q.options.map((opt) => (
                                <label
                                    key={opt.answer_id}
                                    className="flex items-center gap-2 border rounded-2xl px-1.5 border-[#A9A9A9] bg-[#F4F4F4] pr-2.5"
                                >
                                    <input
                                        type="radio"
                                        name={`q${q.question_id}`}
                                        value={opt.answer_id}
                                        checked={answers[q.question_id] === opt.answer_id}
                                        onChange={() => handleInputChange(q, opt.answer_id)}
                                    />
                                    {opt.answer}
                                </label>
                            ))}
                        </div>
                    )}

                    {/* Text */}
                    {q.answer_input_type === "text" && q.question_id === 1 ? (
                        <input
                            type="text"
                            value={profileContext.mobile || ""}
                            readOnly
                            className="p-2 w-full border rounded-2xl text-[13px] px-1.5 border-[#A9A9A9] bg-[#F4F4F4]"
                        />
                    ) : q.answer_input_type === 'text' ? (
                        <input
                            type="text"
                            value={answers[q.question_id] || ""}
                            onChange={e => handleInputChange(q, e.target.value)}
                            className="p-2 w-full border rounded-2xl text-[13px] px-1.5 border-[#A9A9A9] bg-[#F4F4F4]"
                        />
                    ) : null}

                    {/* Select */}
                    {q.answer_input_type === "select" && (
                        <select
                            value={answers[q.question_id] || ""}
                            onChange={e => handleInputChange(q, e.target.value)}
                            className="border outline-none w-full py-1 text-[13px] rounded-full px-3 border-[#A9A9A9] bg-[#F4F4F4]"
                        >
                            <option value="">Select</option>
                            {q.question === "State" && states.length > 0 ?
                                states.map(state => (
                                    <option key={state.id} value={state.id}>
                                        {state.state_name}
                                    </option>
                                )) :
                                q.options.map(opt =>
                                    <option key={opt.answer_id} value={opt.answer_id}>{opt.answer}</option>
                                )
                            }
                        </select>
                    )}

                    {/* Checkbox */}
                    {q.answer_input_type === "checkbox" && (
                        <div className="flex flex-col gap-3">
                            {q.options.map((opt) => (
                                <label
                                    key={opt.answer_id}
                                    className="flex items-center gap-2 text-[13px] border rounded-full px-1.5 border-[#A9A9A9] bg-[#F4F4F4] py-0.5"
                                >
                                    <input
                                        type="checkbox"
                                        value={opt.answer_id}
                                        checked={Array.isArray(answers[q.question_id]) && answers[q.question_id].includes(opt.answer_id)}
                                        onChange={() => handleCheckboxChange(q, opt.answer_id)}
                                    />
                                    {opt.answer}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
