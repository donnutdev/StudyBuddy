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
        Biology: ["1", "2", "3", "4", "5"],
        Chemistry: ["1", "2", "3", "4", "5"],
        Physics: ["1", "2", "3", "4", "5"],
        "Computer Science": ["1"],
        Economics: ["1", "3"],
        Mathematics: ["1", "3", "4", "5", "6", "7"],
    },
};
