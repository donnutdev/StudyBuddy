export const PAPERS: {
    [board: string]: {
        [subject: string]: string[];
    };
} = {
    IGCSE: {
        Biology: ["1 (Core)", "2 (Extended)", "3 (Core)", "4 (Extended)", "5", "6"],
        Chemistry: [
            "1 (Core)",
            "2 (Extended)",
            "3 (Core)",
            "4 (Extended)",
            "5",
            "6",
        ],
        Economics: ["1"],
        Mathematics: ["1 (Core)", "2 (Extended)", "3 (Core)", "4 (Extended)"],
        Physics: ["1 (Core)", "2 (Extended)", "3 (Core)", "4 (Extended)", "5", "6"],
    },
    "A Levels": {
        Biology: ["1", "2", "4"],
        Chemistry: ["1", "2", "4",],
        Physics: ["1", "2", "4"],
        "Computer Science": ["1"],
        "Computer Science (2021)": ["1", "3"],
        Economics: ["1", "2", "3", "4"],
        Mathematics: ["1", "3", "5", "6", "7"],
    },
};
