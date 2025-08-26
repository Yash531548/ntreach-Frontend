// stepsConfig.js

export const steps = [
    {
        id: 1,
        title: "Step 1",
        image: "/images/step1.png", // replace with real image
        questions: [
            {
                id: 1,
                label: "What is your age range?",
                type: "radio",
                options: ["18–24 years", "25–34 years", "35–44 years", "45+ years"],
            },
            {
                id: 2,
                label: "What is your gender identity?",
                type: "select",
                options: ["Male", "Female", "Transgender", "Non-binary", "Prefer not to say"],
            },
            {
                id: 3,
                label: "What is your gender identity?",
                type: "select",
                options: ["Male", "Female", "Transgender", "Non-binary", "Prefer not to say"],
            },
            {
                id: 4,
                label: "What is your gender identity?",
                type: "select",
                options: ["Male", "Female", "Transgender", "Non-binary", "Prefer not to say"],
            },
            {
                id: 5,
                label: "What is your gender identity?",
                type: "select",
                options: ["Male", "Female", "Transgender", "Non-binary", "Prefer not to say"],
            },
            {
                id: 6,
                label: "What is your gender identity?",
                type: "select",
                options: ["Male", "Female", "Transgender", "Non-binary", "Prefer not to say"],
            },
        ],
    },
    {
        id: 2,
        title: "Step 2",
        image: "/images/step2.png",
        questions: [
            {
                id: 3,
                label: "Have you been tested for HIV in the last 6 months?",
                type: "radio",
                options: ["Yes", "No", "Not Sure"],
            },
            {
                id: 4,
                label: "Would you like to book an appointment for HIV testing?",
                type: "radio",
                options: ["Yes", "No"],
            },
        ],
    },
    {
        id: 3,
        title: "Step 3",
        image: "/images/step3.png",
        questions: [
            {
                id: 5,
                label: "Which sexual activities have you performed in the past 30 days?",
                type: "checkbox",
                options: [
                    "Receptive Anal Intercourse (Receiving penetration in the anus)",
                    "Insertive Anal Intercourse (Performing penetration in partner’s anus)",
                    "Receptive Vaginal Intercourse (Receiving penetration in the vagina)",
                    "Insertive Vaginal Intercourse (Performing penetration in partner’s vagina)",
                    "Receptive Oral Intercourse (Receiving oral stimulation of the vagina/penis)",
                    "Insertive Oral Intercourse (Performing oral stimulation on partner’s vagina/penis)",
                ],
            },
            {
                id: 6,
                label: "Did you use a condom during sex in the last 30 days?",
                type: "radio",
                options: ["Yes – All the time", "No", "Sometimes"],
            },
        ],
    },
    {
        id: 4,
        title: "Step 4",
        image: "/images/step4.png",
        questions: [
            {
                id: 7,
                label: "Have you ever taken PrEP (Pre-exposure prophylaxis)?",
                type: "radio",
                options: ["Yes", "No", "Not Sure"],
            },
            {
                id: 8,
                label: "Are you interested in learning more about PrEP?",
                type: "radio",
                options: ["Yes", "No"],
            },
        ],
    },
    {
        id: 5,
        title: "Step 5",
        image: "/images/step5.png",
        questions: [
            {
                id: 9,
                label: "Do you have any existing medical conditions?",
                type: "text",
            },
            {
                id: 10,
                label: "Would you like to receive reminders for future check-ups?",
                type: "radio",
                options: ["Yes", "No"],
            },
        ],
    },
];
