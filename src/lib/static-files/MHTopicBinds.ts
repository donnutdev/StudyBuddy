export interface Topic {
    _id: string;
    name: string;
    topicNumber: number;
    subject: string;
}

const getTopicNumber = (topic: string) => {
    return Number(topic.split(" - ")[0].split(" ")[1]);
};

export const TOPICS: {
    [board: string]: {
        [subject: string]: Topic[];
    };
} = {
    "A Levels": {
        Mathematics: [
            {
                _id: "c4f9c9fd-7740-4114-9216-f22779bfa703",
                name: "CH 1 - COORDINATE GEOMETRY",
                topicNumber: 336,
                subject: "Mathematics",
            },
            {
                _id: "c7bcb6f7-a278-432c-8774-ddd2f0028d93",
                name: "CH 2 - FUNCTIONS",
                topicNumber: 337,
                subject: "Mathematics",
            },
            {
                _id: "48c04eb9-be74-4e8a-bfc7-9021d99ab511",
                name: "CH 3 - INTERSECTION POINTS",
                topicNumber: 338,
                subject: "Mathematics",
            },
            {
                _id: "7344a066-c509-4013-89f0-6dffb491e1ae",
                name: "CH 4 - DIFFERENTIATION",
                topicNumber: 339,
                subject: "Mathematics",
            },
            {
                _id: "53673d51-83dc-4388-abf7-ea8c4cd71396",
                name: "CH 5 - SEQUENCES & SERIES",
                topicNumber: 340,
                subject: "Mathematics",
            },
            {
                _id: "2b51e1a6-2a69-47d4-8e73-c569cba1d92d",
                name: "CH 6 - BINOMIAL THEOREM",
                topicNumber: 341,
                subject: "Mathematics",
            },
            {
                _id: "13dfa41e-6362-4f6a-bcc6-0f8af63f647e",
                name: "CH 7 - TRIGONOMETRY",
                topicNumber: 342,
                subject: "Mathematics",
            },
            {
                _id: "a1144d7b-3445-4f32-984b-c232d0068b07",
                name: "CH 8 - VECTORS",
                topicNumber: 343,
                subject: "Mathematics",
            },
            {
                _id: "e553d599-dbbc-4b02-9b94-656448d6592f",
                name: "CH 9 - INTEGRATION",
                topicNumber: 344,
                subject: "Mathematics",
            },
            {
                _id: "fb16d570-75ea-46d1-a213-15dde3d7fb92",
                name: "CH 10 - RADIANS",
                topicNumber: 345,
                subject: "Mathematics",
            },
        ],
        Physics: [
            {
                _id: "62c89286ba0f91aff17fa973",
                name: " CH 1 - PHYSICAL QUANTITIES & UNITS",
                topicNumber: 330,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa974",
                name: " CH 2 - MEASUREMENT TECHNIQUES",
                topicNumber: 331,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa975",
                name: " CH 3 - KINEMATICS",
                topicNumber: 490,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa976",
                name: " CH 4 - DYNAMICS",
                topicNumber: 491,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa977",
                name: " CH 5 - FORCES, DENSITY & PRESSURE",
                topicNumber: 492,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa978",
                name: " CH 6 - WORK, ENERGY & POWER",
                topicNumber: 493,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa979",
                name: " CH 7 - MOTION IN A CIRCLE",
                topicNumber: 494,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa97a",
                name: " CH 8 - GRAVITATIONAL FIELDS",
                topicNumber: 495,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa97b",
                name: " CH 9 - DEFORMATION OF SOLIDS",
                topicNumber: 496,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa97c",
                name: " CH 10 - IDEAL GASES",
                topicNumber: 497,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa97d",
                name: " CH 11 - TEMPERATURE",
                topicNumber: 498,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa97e",
                name: " CH 12 - THERMAL PROPERTIES OF MATERIALS",
                topicNumber: 499,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa97f",
                name: " CH 13 - OSCILLATIONS",
                topicNumber: 500,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa980",
                name: " CH 14 - WAVES",
                topicNumber: 501,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa981",
                name: " CH 15 - SUPERPOSITION",
                topicNumber: 502,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa982",
                name: " CH 16 - COMMUNICATION",
                topicNumber: 503,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa983",
                name: " CH 17 - ELECTRIC FIELDS",
                topicNumber: 504,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa984",
                name: " CH 18 - CAPACITANCE",
                topicNumber: 505,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa985",
                name: " CH 19 - CURRENT OF ELECTRICITY",
                topicNumber: 506,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa986",
                name: " CH 20 - D.C. CIRCUITS",
                topicNumber: 507,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa987",
                name: " CH 21 - ELECTRONICS",
                topicNumber: 508,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa988",
                name: " CH 22 - MAGNETIC FIELDS",
                topicNumber: 509,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa989",
                name: " CH 23 - ELECTROMAGNETIC INDUCTION",
                topicNumber: 510,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa98a",
                name: " CH 24 - ALTERNATING CURRENTS",
                topicNumber: 511,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa98b",
                name: " CH 25 - QUANTUM PHYSICS",
                topicNumber: 512,
                subject: "Physics",
            },
            {
                _id: "62c89286ba0f91aff17fa98c",
                name: " CH 26 - PARTICLE & NUCLEAR PHYSICS",
                topicNumber: 513,
                subject: "Physics",
            },
        ].sort((a, b) => getTopicNumber(a.name) - getTopicNumber(b.name)),
        Biology: [
            {
                _id: "62c892700b710748bc197f86",
                name: "CH 1 - CELL STRUCTURE",
                topicNumber: 332,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f87",
                name: "CH 2 - BIOLOGICAL MOLECULES",
                topicNumber: 333,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f88",
                name: "CH 3 - ENZYMES",
                topicNumber: 523,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f89",
                name: "CH 4 - CELL MEMBRANES AND TRANSPORT",
                topicNumber: 524,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f8a",
                name: "CH 5 - THE MITOTIC CELL CYCLE",
                topicNumber: 525,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f8b",
                name: "CH 6 - NUCLEIC ACIDS AND PROTEIN SYNTHESIS",
                topicNumber: 526,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f8c",
                name: "CH 7 - TRANSPORT IN PLANTS",
                topicNumber: 527,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f8d",
                name: "CH 8 - TRANSPORT IN MAMMALS",
                topicNumber: 528,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f8e",
                name: "CH 9 - GAS EXCHANGE AND SMOKING",
                topicNumber: 529,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f8f",
                name: "CH 10 - INFECTIOUS DISEASE",
                topicNumber: 530,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f90",
                name: "CH 11 - IMMUNITY",
                topicNumber: 531,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f91",
                name: "CH 12 - ENERGY AND RESPIRATION",
                topicNumber: 532,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f92",
                name: "CH 13 - PHOTOSYNTHESIS",
                topicNumber: 533,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f93",
                name: "CH 14 - HOMEOSTASIS",
                topicNumber: 534,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f94",
                name: "CH 15 - CONTROL AND CO-ORDINATION",
                topicNumber: 535,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f95",
                name: "CH 16 - INHERITED CHANGE",
                topicNumber: 536,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f96",
                name: "CH 17 - SELECTION AND EVOLUTION",
                topicNumber: 537,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f97",
                name: "CH 18 - BIODIVERSITY, CLASSIFICATION AND CONSERVATION",
                topicNumber: 538,
                subject: "Biology",
            },
            {
                _id: "62c892700b710748bc197f98",
                name: "CH 19 - GENETIC TECHNOLOGY",
                topicNumber: 539,
                subject: "Biology",
            },
        ].sort((a, b) => getTopicNumber(a.name) - getTopicNumber(b.name)),
        Chemistry: [
            {
                _id: "62c89278b024d15a844c4cf6",
                name: " CH 1 - ATOMS,MOLECULES & STOICHIOMETRY",
                topicNumber: 334,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4cf7",
                name: " CH 2 - ATOMIC STRUCTURE",
                topicNumber: 335,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4cf8",
                name: " CH 3 - CHEMICAL BONDING",
                topicNumber: 414,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4cf9",
                name: " CH 4 - STATES OF MATTER",
                topicNumber: 415,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4cfa",
                name: " CH 5 - CHEMICAL ENERGETICS",
                topicNumber: 416,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4cfb",
                name: " CH 6 - ELECTROCHEMISTRY",
                topicNumber: 417,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4cfc",
                name: " CH 7 - EQUILIBRIA",
                topicNumber: 418,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4cfd",
                name: " CH 8 - REACTION KINETICS",
                topicNumber: 419,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4cfe",
                name: " CH 9 - THE PERIODIC TABLE : CHEMICAL PERIODICITY",
                topicNumber: 420,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4cff",
                name: " CH 10 - GROUP 2",
                topicNumber: 421,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d00",
                name: " CH 11 - GROUP 17",
                topicNumber: 422,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d01",
                name: " CH 12 - AN INTRODUCTION TO THE CHEMISTRY OF TRANSITION ELEMENTS",
                topicNumber: 423,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d02",
                name: " CH 13 - NITROGEN & SULFUR",
                topicNumber: 424,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d03",
                name: " CH 14 - AN INTRODUCTION TO ORGANIC CHEMISTRY",
                topicNumber: 425,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d04",
                name: " CH 15 - HYDROCARBONS",
                topicNumber: 426,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d05",
                name: " CH 16 - HALOGEN DERIVATIVES",
                topicNumber: 427,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d06",
                name: " CH 17 - HYDROXY COMPOUNDS",
                topicNumber: 428,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d07",
                name: " CH 18 - CARBONYL COMPOUNDS",
                topicNumber: 429,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d08",
                name: " CH 19 - CARBOXYLIC ACIDS AND DERIVATIVES",
                topicNumber: 430,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d09",
                name: " CH 20 - NITROGEN COMPOUNDS",
                topicNumber: 431,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d0a",
                name: " CH 21 - POLYMERISATTION",
                topicNumber: 432,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d0b",
                name: " CH 22 - ANALYTICAL TECHNIQUES",
                topicNumber: 433,
                subject: "Chemistry",
            },
            {
                _id: "62c89278b024d15a844c4d0c",
                name: " CH 23 - ORGANIC SYNTHESIS",
                topicNumber: 434,
                subject: "Chemistry",
            },
        ].sort((a, b) => getTopicNumber(a.name) - getTopicNumber(b.name)),

        "Computer Science (2021)": [
            {
                _id: "1",
                name: " CH1 - Information Representation",
                topicNumber: 1000,
                subject: "Computer Science (2021)"
            },
            {
                _id: "2",
                name: " CH2 - Communication",
                topicNumber: 1001,
                subject: "Computer Science (2021)"
            },
            {
                _id: "3",
                name: " CH3 - Hardware",
                topicNumber: 1002,
                subject: "Computer Science (2021)"
            },
            {
                _id: "4",
                name: " CH4 - Processor Fundamentals",
                topicNumber: 1003,
                subject: "Computer Science (2021)"
            },
            {
                _id: "5",
                name: " CH5 - System Software (OS)",
                topicNumber: 1004,
                subject: "Computer Science (2021)"
            },
            {
                _id: "6",
                name: " CH6 - Security Privacy And Data Integrity",
                topicNumber: 1005,
                subject: "Computer Science (2021)"
            },
            {
                _id: "7",
                name: " CH7 - Ethics And Ownership",
                topicNumber: 1006,
                subject: "Computer Science (2021)"
            },
            {
                _id: "8",
                name: " CH8 - Databases",
                topicNumber: 1007,
                subject: "Computer Science (2021)"
            },
            {
                _id: "9",
                name: " CH9 - Algorithm Design And Problem-Solving",
                topicNumber: 1008,
                subject: "Computer Science (2021)"
            },
            {
                _id: "10",
                name: " CH10 - Data Types And Structures",
                topicNumber: 1009,
                subject: "Computer Science (2021)"
            },
            {
                _id: "11",
                name: " CH11 - Programming",
                topicNumber: 1010,
                subject: "Computer Science (2021)"
            },
            {
                _id: "12",
                name: " CH12 - Software Development",
                topicNumber: 1011,
                subject: "Computer Science (2021)"
            },
            {
                _id: "13",
                name: " CH13 - Data Representation",
                topicNumber: 1012,
                subject: "Computer Science (2021)"
            },
            {
                _id: "14",
                name: " CH14 - Communication And Internet Technologies",
                topicNumber: 1013,
                subject: "Computer Science (2021)"
            },
            {
                _id: "15",
                name: " CH15 - Hardware And Virtual Machines",
                topicNumber: 1014,
                subject: "Computer Science (2021)"
            },
            {
                _id: "16",
                name: " CH16 - System Software (Purposes Of An OS)",
                topicNumber: 1015,
                subject: "Computer Science (2021)"
            },
            {
                _id: "17",
                name: " CH17 - Security",
                topicNumber: 1016,
                subject: "Computer Science (2021)"
            },
            {
                _id: "18",
                name: " CH18 - Artificial Intelligence (AI)",
                topicNumber: 1017,
                subject: "Computer Science (2021)"
            },
            {
                _id: "19",
                name: " CH19 - Computational Thinking And Problem Solving",
                topicNumber: 1018,
                subject: "Computer Science (2021)"
            },
            {
                _id: "20",
                name: " CH20 - Further Programming",
                topicNumber: 1019,
                subject: "Computer Science (2021)"
            },

        ].sort((a, b) => getTopicNumber(a.name) - getTopicNumber(b.name)),
        "Computer Science": [
            {
                _id: "62c8990659731b9139a88593",
                name: " CH 1 - Information Representation ",
                topicNumber: 679,
                subject: "Computer Science",
            },
            {
                _id: "62c8990659731b9139a88594",
                name: " CH 2 - Communication and Internet Technologies",
                topicNumber: 680,
                subject: "Computer Science",
            },
            {
                _id: "62c8990659731b9139a88595",
                name: " CH 3 - Hardware",
                topicNumber: 681,
                subject: "Computer Science",
            },
            {
                _id: "62c8990659731b9139a88596",
                name: " CH 4 - Processor Fundamentals ",
                topicNumber: 682,
                subject: "Computer Science",
            },
            {
                _id: "62c8990659731b9139a88597",
                name: " CH 5 - System Software ",
                topicNumber: 683,
                subject: "Computer Science",
            },
            {
                _id: "62c8990659731b9139a88598",
                name: " CH 6 - Security, Privacy and Data Integrity ",
                topicNumber: 684,
                subject: "Computer Science",
            },
            {
                _id: "62c8990659731b9139a88599",
                name: " CH 7 - Ethics and Ownership",
                topicNumber: 685,
                subject: "Computer Science",
            },
            {
                _id: "62c8990659731b9139a8859a",
                name: " CH 8 - Database and Data Modeling",
                topicNumber: 686,
                subject: "Computer Science",
            },
            {
                _id: "62c8990659731b9139a8859b",
                name: " CH 9 - Algorithm Design and Problem-Solving",
                topicNumber: 687,
                subject: "Computer Science",
            },
            {
                _id: "62c8990659731b9139a8859c",
                name: " CH 10 - Data Representation",
                topicNumber: 688,
                subject: "Computer Science",
            },
            {
                _id: "62c8990659731b9139a8859d",
                name: " CH 11 - Programming",
                topicNumber: 689,
                subject: "Computer Science",
            },
            {
                _id: "62c8990659731b9139a8859e",
                name: " CH 12 - Software Development",
                topicNumber: 690,
                subject: "Computer Science",
            },
            {
                _id: "62c8990659731b9139a8859f",
                name: " CH 13 - Monitoring and Control Systems",
                topicNumber: 691,
                subject: "Computer Science",
            },
        ].sort((a, b) => getTopicNumber(a.name) - getTopicNumber(b.name)),
        Economics: [
            {
                _id: "62c89cde2ad0140fa9a83088",
                name: " CH 1 - Basic Economic Ideas and Resource Allocation",
                topicNumber: 696,
                subject: "Economics",
            },
            {
                _id: "62c89cde2ad0140fa9a83089",
                name: " CH 2 - The Price System and the Micro Economy",
                topicNumber: 697,
                subject: "Economics",
            },
            {
                _id: "62c89cde2ad0140fa9a8308a",
                name: " CH 3 - Government Microeconomic Intervention",
                topicNumber: 698,
                subject: "Economics",
            },
            {
                _id: "62c89cde2ad0140fa9a8308b",
                name: " CH 4 - The Macro Economy",
                topicNumber: 699,
                subject: "Economics",
            },
            {
                _id: "62c89cde2ad0140fa9a8308c",
                name: " CH 5 - Government Macro Intervention",
                topicNumber: 700,
                subject: "Economics",
            },
        ],
    },
    IGCSE: {
        Mathematics: [
            {
                _id: "6f4d51e9-d6aa-4f8e-9fd3-8cd5338472df",
                name: "CH 1 - DECIMALS",
                topicNumber: 89,
                subject: "Mathematics",
            },
            {
                _id: "f7cd0b18-2780-4947-865a-18b1b5d16f0b",
                name: "CH 2 - NUMBER FACTS",
                topicNumber: 90,
                subject: "Mathematics",
            },
            {
                _id: "e2c6115e-697b-4a0c-bfb4-0739d140ef5c",
                name: "CH 3 - RATIONAL AND IRRATIONAL NUMBERS",
                topicNumber: 91,
                subject: "Mathematics",
            },
            {
                _id: "92693158-a3fe-4f7e-a2b8-e9cb3f965b4a",
                name: "CH 4 - APPROXIMATION AND ESTIMATION",
                topicNumber: 92,
                subject: "Mathematics",
            },
            {
                _id: "623305d1-e453-4dc2-9e94-877773eacb88",
                name: "CH 5 - UPPER AND LOWER BOUND",
                topicNumber: 93,
                subject: "Mathematics",
            },
            {
                _id: "4c6644de-87bc-49c0-8fc7-ff560e13bd16",
                name: "CH 6 - STANDARD FORM",
                topicNumber: 94,
                subject: "Mathematics",
            },
            {
                _id: "b701c775-ee89-4f80-96d0-61051ed34381",
                name: "CH 7 - RATIO AND PROPORTION",
                topicNumber: 95,
                subject: "Mathematics",
            },
            {
                _id: "67920270-942d-4c5b-94aa-3c3e1a3ad9b4",
                name: "CH 8 - FOREIGN EXCHANGE",
                topicNumber: 96,
                subject: "Mathematics",
            },
            {
                _id: "abd2ae60-1135-477a-8ad2-71c074ad71e3",
                name: "CH 9 - MAP SCALES",
                topicNumber: 97,
                subject: "Mathematics",
            },
            {
                _id: "aefe06db-f587-4bae-957a-ebcd7c8ff32c",
                name: "CH 10 - PERCENTAGES",
                topicNumber: 98,
                subject: "Mathematics",
            },
            {
                _id: "73cf10ac-38bb-4200-89a2-5b6d689861d9",
                name: "CH 11 - SIMPLE AND COMPOUND INTEREST",
                topicNumber: 99,
                subject: "Mathematics",
            },
            {
                _id: "cfce4741-48f8-42e8-8552-852d86c89800",
                name: "CH 12 - SPEED,DISTANCE AND TIME",
                topicNumber: 100,
                subject: "Mathematics",
            },
            {
                _id: "3c9d1ba9-9bee-4ca2-8345-d10b0541b675",
                name: "CH 13 - FORMULAEE",
                topicNumber: 101,
                subject: "Mathematics",
            },
            {
                _id: "784e79d4-3200-4fc6-83a4-f707f36adc86",
                name: "CH 14 - BRACKETS AND SYMPLIFYING",
                topicNumber: 102,
                subject: "Mathematics",
            },
            {
                _id: "c0fc8dc7-faa2-4a59-97e6-9de211bdfb88",
                name: "CH 15 - LINEAR EQUAETION",
                topicNumber: 103,
                subject: "Mathematics",
            },
            {
                _id: "7e77a244-bad8-4c09-bb99-c9d634ca58dc",
                name: "CH 16 - SIMULTANEOUS EQUATIONS",
                topicNumber: 104,
                subject: "Mathematics",
            },
            {
                _id: "829088ca-3b18-4692-aa4c-de2163822458",
                name: "CH 17 - FACTORISING",
                topicNumber: 105,
                subject: "Mathematics",
            },
            {
                _id: "8b2702dd-307a-44df-856c-d28e5867376e",
                name: "CH 18 - QUADRATIC EQUATIONS",
                topicNumber: 106,
                subject: "Mathematics",
            },
            {
                _id: "f287e2bd-22a3-4b1b-93e9-096ec536b898",
                name: "CH 19 - CHANGING THE SUBJECT",
                topicNumber: 107,
                subject: "Mathematics",
            },
            {
                _id: "ece67f2b-8518-4b59-a70c-14cc551c9729",
                name: "CH 20 - VARIATION",
                topicNumber: 108,
                subject: "Mathematics",
            },
            {
                _id: "6b738fa2-1397-4e14-80f9-41f81074d608",
                name: "CH 21 - INDICES",
                topicNumber: 109,
                subject: "Mathematics",
            },
            {
                _id: "59b8da68-92bf-4f23-b5af-671840238961",
                name: "CH 22 - SOLVING INEQUALITIES",
                topicNumber: 110,
                subject: "Mathematics",
            },
            {
                _id: "dfbc6d32-7408-4dce-840a-511438f01a6e",
                name: "CH 23 - MENSURATION",
                topicNumber: 111,
                subject: "Mathematics",
            },
            {
                _id: "5dcf530e-6be3-42d9-80c4-8c78f1e54e76",
                name: "CH 24 - POLYGONS",
                topicNumber: 112,
                subject: "Mathematics",
            },
            {
                _id: "6f121506-9f1c-4132-85fb-dfcb03526879",
                name: "CH 25 - PARALLEL LINES",
                topicNumber: 113,
                subject: "Mathematics",
            },
            {
                _id: "d82d7f1e-0877-4a5e-b160-88b8bdf68397",
                name: "CH 26 - PYTHAGORAS THEOREM",
                topicNumber: 114,
                subject: "Mathematics",
            },
            {
                _id: "8d59cc3a-67cf-4c83-ada9-ce2b52ee5f27",
                name: "CH 27 - SYMMETRY",
                topicNumber: 115,
                subject: "Mathematics",
            },
            {
                _id: "c68840c2-f8d6-494f-98c6-fb46255e45ec",
                name: "CH 28 - SIMILARITY",
                topicNumber: 116,
                subject: "Mathematics",
            },
            {
                _id: "59c1c687-4580-4dbf-bd6c-89d5ee4bbaf2",
                name: "CH 29 - CONGRUENCE",
                topicNumber: 117,
                subject: "Mathematics",
            },
            {
                _id: "6721c306-2d53-45d9-a58d-e446d135c82a",
                name: "CH 30 - AREAS & VOLUMES OF SIMILAR SHAPES",
                topicNumber: 118,
                subject: "Mathematics",
            },
            {
                _id: "39a7cd37-7ce7-4ea2-9881-ae438d586a16",
                name: "CH 31 - CIRCLE THEOREM",
                topicNumber: 119,
                subject: "Mathematics",
            },
            {
                _id: "67e1b6b1-35f9-4974-8a3c-675d5c89e19c",
                name: "CH 32 - CONSTRUCTIONS AND LOCI",
                topicNumber: 120,
                subject: "Mathematics",
            },
            {
                _id: "e0edb01e-affa-43ef-a487-6e024a56a5ee",
                name: "CH 33 - TRIGONOMETRY",
                topicNumber: 121,
                subject: "Mathematics",
            },
            {
                _id: "9a02f52b-a4bb-4b99-89e9-5c4c7ea073d6",
                name: "CH 34 - LINES",
                topicNumber: 122,
                subject: "Mathematics",
            },
            {
                _id: "19cb35e2-cd53-4d7d-b251-4d869e78b6a3",
                name: "CH 35 - PLOTTING CURVES",
                topicNumber: 123,
                subject: "Mathematics",
            },
            {
                _id: "ec231efa-7b4a-4712-b926-9fa72c1e73be",
                name: "CH 36 - GRAPHICAL SOLUTION OF EQUATIONS",
                topicNumber: 124,
                subject: "Mathematics",
            },
            {
                _id: "9dadae1b-d06c-4b79-bc6a-5db097062b6f",
                name: "CH 37 - DISTANCE-TIME GRAPHS",
                topicNumber: 125,
                subject: "Mathematics",
            },
            {
                _id: "ca4845ba-c1c9-4a74-87b0-1c315c6fa89d",
                name: "CH 38 - SPEED-TIME GRAPHS",
                topicNumber: 126,
                subject: "Mathematics",
            },
            {
                _id: "16e49325-3407-46a7-8856-745998041f7e",
                name: "CH 39 - SETS",
                topicNumber: 127,
                subject: "Mathematics",
            },
            {
                _id: "a5eed29b-38db-4858-acb9-0b959cace212",
                name: "CH 40 - VECTORS",
                topicNumber: 128,
                subject: "Mathematics",
            },
            {
                _id: "ee1eba1a-35aa-442f-b494-4bdd716db292",
                name: "CH 41 - MATRICES",
                topicNumber: 129,
                subject: "Mathematics",
            },
            {
                _id: "1a2b2435-bc0f-44fb-b425-c2ee2b6ba539",
                name: "CH 42 - TRANSFORMATOIN",
                topicNumber: 130,
                subject: "Mathematics",
            },
            {
                _id: "499473db-f533-44eb-8854-366a6e9b670b",
                name: "CH 43 - STATISTICS",
                topicNumber: 131,
                subject: "Mathematics",
            },
            {
                _id: "a0487ff2-2d0e-4c5e-a987-a24315cda78d",
                name: "CH 44 - PROBABILITY",
                topicNumber: 132,
                subject: "Mathematics",
            },
            {
                _id: "d181b236-aae2-4265-8cbc-9999ddd2b439",
                name: "CH 45 - FUNCTIONS",
                topicNumber: 133,
                subject: "Mathematics",
            },
            {
                _id: "33642f04-9ebd-45d2-91f8-622fbfcfe8cb",
                name: "CH 47 - LINEAR PROGRAMMING",
                topicNumber: 134,
                subject: "Mathematics",
            },
            {
                _id: "45f0c14a-c46e-428d-899c-cd3ad70e3900",
                name: "CH 48 - SEQUENCES",
                topicNumber: 135,
                subject: "Mathematics",
            },
            {
                _id: "b0fb5cd6-c5e2-4ddd-9eae-7d6f01bd166b",
                name: "CH 49 - ANGLES",
                topicNumber: 136,
                subject: "Mathematics",
            },
            {
                _id: "bebbcaf5-e54c-4733-8d5d-031c094b0cbd",
                name: "CH 50 - NET",
                topicNumber: 137,
                subject: "Mathematics",
            },
            {
                _id: "ce538757-049b-4a79-b989-ee745cf0bd1b",
                name: "CH 51 - DIFFERENIATION",
                topicNumber: 722,
                subject: "Mathematics",
            },
        ],
        Physics: [
            {
                _id: "61c602e0622259d271604f42",
                name: " CH 1 - MEASUREMENTS AND UNITS",
                topicNumber: 59,
                subject: "Physics",
            },
            {
                _id: "61c602e0622259d271604f45",
                name: " CH 4 - FORCES AND ENERGY",
                topicNumber: 62,
                subject: "Physics",
            },
            {
                _id: "61c602e0622259d271604f44",
                name: " CH 3 - FORCES AND PRESSURE",
                topicNumber: 61,
                subject: "Physics",
            },
            {
                _id: "61c602e0622259d271604f46",
                name: " CH 5 - THERMAL EFFECTS",
                topicNumber: 63,
                subject: "Physics",
            },
            {
                _id: "61c602e0622259d271604f43",
                name: " CH 2 - FORCES AND MOTION",
                topicNumber: 60,
                subject: "Physics",
            },
            {
                _id: "61c602e0622259d271604f48",
                name: " CH 7 - RAYS AND WAVES",
                topicNumber: 65,
                subject: "Physics",
            },
            {
                _id: "61c602e0622259d271604f4a",
                name: " CH 9 - MAGNETS AND CURRENTS",
                topicNumber: 67,
                subject: "Physics",
            },
            {
                _id: "61c602e0622259d271604f4b",
                name: " CH 10 - ELECTRON AND ELECTRONICS",
                topicNumber: 68,
                subject: "Physics",
            },
            {
                _id: "61c602e0622259d271604f47",
                name: " CH 6 - WAVES AND SOUNDS",
                topicNumber: 64,
                subject: "Physics",
            },
            {
                _id: "61c602e0622259d271604f49",
                name: " CH 8 - ELECTRICITY",
                topicNumber: 66,
                subject: "Physics",
            },
            {
                _id: "61c602e0622259d271604f4c",
                name: " CH 11 - ATOMS AND RADIOACTIVITY",
                topicNumber: 69,
                subject: "Physics",
            },
        ].sort((a, b) => getTopicNumber(a.name) - getTopicNumber(b.name)),
        Chemistry: [
            {
                _id: "617b04258d69acda860d77e6",
                name: "CH 1 - STATES OF MATTER",
                topicNumber: 70,
                subject: "Chemistry",
            },
            {
                _id: "617b04258d69acda860d77ea",
                name: "CH 2 - SEPARATING SUBSTANCES",
                topicNumber: 71,
                subject: "Chemistry",
            },
            {
                _id: "617b04258d69acda860d77e8",
                name: "CH 5 - REACTING MASSES AND CHEMICAL EQUATIONS",
                topicNumber: 74,
                subject: "Chemistry",
            },
            {
                _id: "617b04258d69acda860d77ec",
                name: "CH 11 - ACIDS AND BASES",
                topicNumber: 80,
                subject: "Chemistry",
            },
            {
                _id: "617b04258d69acda860d77ee",
                name: "CH 4 - ATOMS COMBINING",
                topicNumber: 73,
                subject: "Chemistry",
            },
            {
                _id: "617b04258d69acda860d77f0",
                name: "CH 7 - REDOX REACTIONS",
                topicNumber: 76,
                subject: "Chemistry",
            },
            {
                _id: "617b04258d69acda860d77f2",
                name: "CH 14 - MAKING USE OF METALS",
                topicNumber: 83,
                subject: "Chemistry",
            },
            {
                _id: "617b04258d69acda860d77f6",
                name: "CH 19 - IN THE LAB (CHEMICAL TEST& SALT ANALYSIS)",
                topicNumber: 88,
                subject: "Chemistry",
            },
            {
                _id: "617b04258d69acda860d77f4",
                name: "CH 12 - THE PERIODIC TABLE",
                topicNumber: 81,
                subject: "Chemistry",
            },
            {
                _id: "617b04268d69acda860d77f8",
                name: "CH 8 - ELECTRICITY AND CHEMICAL CHANGES",
                topicNumber: 77,
                subject: "Chemistry",
            },
            {
                _id: "617b04268d69acda860d77fa",
                name: "CH 9 - ENERGY CHANGES AND REVERSIBLE REACTIONS",
                topicNumber: 78,
                subject: "Chemistry",
            },
            {
                _id: "617b04268d69acda860d77fc",
                name: "CH 15 - AIR AND WATER",
                topicNumber: 84,
                subject: "Chemistry",
            },
            {
                _id: "617b04268d69acda860d77fe",
                name: "CH 6 - USING MOLES",
                topicNumber: 75,
                subject: "Chemistry",
            },
            {
                _id: "617b04268d69acda860d7806",
                name: "CH 13 - THE BEHAVIOR OF METALS",
                topicNumber: 82,
                subject: "Chemistry",
            },
            {
                _id: "617b04268d69acda860d7800",
                name: "CH 3 - ATOMS AND ELEMENTS",
                topicNumber: 72,
                subject: "Chemistry",
            },
            {
                _id: "617b04268d69acda860d7804",
                name: "CH 10 - THE SPEED OF A REACTION",
                topicNumber: 79,
                subject: "Chemistry",
            },
            {
                _id: "617b04268d69acda860d7802",
                name: "CH 18 - POLYMERS",
                topicNumber: 87,
                subject: "Chemistry",
            },
            {
                _id: "617b04268d69acda860d7808",
                name: "CH 16 - SOME NON-METALS AND THEIR COMPOUNDS",
                topicNumber: 85,
                subject: "Chemistry",
            },
            {
                _id: "617b04268d69acda860d780a",
                name: "CH 17 - ORGANIC CHEMISTRY",
                topicNumber: 86,
                subject: "Chemistry",
            },
        ].sort((a, b) => getTopicNumber(a.name) - getTopicNumber(b.name)),
        Economics: [
            {
                _id: "62c89cde2ad0140fa9a83088",
                name: " CH 1 - Basic Economic Ideas and Resource Allocation",
                topicNumber: 696,
                subject: "Economics",
            },
            {
                _id: "62c89cde2ad0140fa9a83089",
                name: " CH 2 - The Price System and the Micro Economy",
                topicNumber: 697,
                subject: "Economics",
            },
            {
                _id: "62c89cde2ad0140fa9a8308a",
                name: " CH 3 - Government Microeconomic Intervention",
                topicNumber: 698,
                subject: "Economics",
            },
            {
                _id: "62c89cde2ad0140fa9a8308b",
                name: " CH 4 - The Macro Economy",
                topicNumber: 699,
                subject: "Economics",
            },
            {
                _id: "62c89cde2ad0140fa9a8308c",
                name: " CH 5 - Government Macro Intervention",
                topicNumber: 700,
                subject: "Economics",
            },
        ].sort((a, b) => getTopicNumber(a.name) - getTopicNumber(b.name)),
        Biology: [
            {
                _id: "618c16d47389c450b648b4a7",
                name: "CH 2 - ORGANIZATION AND MAINTENANCE OF THE ORGANISM",
                topicNumber: 39,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4a6",
                name: "CH 1 - CHARACTERISTICS AND CLASSIFICATION OF LIVING ORGANISMS",
                topicNumber: 38,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4a9",
                name: "CH 4 - BIOLOGICAL MOLECULES",
                topicNumber: 41,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4ab",
                name: "CH 6 - PLANT NUTRITION",
                topicNumber: 43,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4aa",
                name: "CH 5 - ENZYMES",
                topicNumber: 42,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4a8",
                name: "CH 3 - MOVEMENT IN AND OUT OF CELLS",
                topicNumber: 40,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4ad",
                name: "CH 8 - TRANSPORT IN PLANTS",
                topicNumber: 45,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4ae",
                name: "CH 9 - TRANSPORT IN ANIMALS",
                topicNumber: 46,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4af",
                name: "CH 10 - DISEASES AND IMMUNITY",
                topicNumber: 47,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4ac",
                name: "CH 7 - HUMAN NUTRITION",
                topicNumber: 44,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4b0",
                name: "CH 11 - GAS EXCHANGE IN HUMANS",
                topicNumber: 48,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4b2",
                name: "CH 13 - EXCRETION IN HUMANS",
                topicNumber: 50,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4b3",
                name: "CH 14 - CO-ORDINATION AND RESPONSE",
                topicNumber: 51,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4b6",
                name: "CH 17 - INHERITANCE",
                topicNumber: 54,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4b4",
                name: "CH 15 - DRUGS",
                topicNumber: 52,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4b5",
                name: "CH 16 - REPRODUCTION",
                topicNumber: 53,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4b1",
                name: "CH 12 - RESPIRATION",
                topicNumber: 49,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4b9",
                name: "CH 20 - BIOTECHNOLOGY AND GENETIC ENGINEERING",
                topicNumber: 57,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4ba",
                name: "CH 21 - HUMAN INFLUENCES ON ECOSYSTEMS",
                topicNumber: 58,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4b8",
                name: "CH 19 - ORGANISMS AND THEIR ENVIRONMENT",
                topicNumber: 56,
                subject: "Biology",
            },
            {
                _id: "618c16d47389c450b648b4b7",
                name: "CH 18 - VARIATION AND SELECTION",
                topicNumber: 55,
                subject: "Biology",
            },
        ].sort((a, b) => getTopicNumber(a.name) - getTopicNumber(b.name)),
    },
};
