// utils/complexes.js
require('dotenv').config();

const complexes = {
    'desire': {
        'section_a1': process.env.DESIRE_SECTION_A1_URL,
        'section_a2': process.env.DESIRE_SECTION_A2_URL,
        'section_a3': process.env.DESIRE_SECTION_A3_URL,
        // ...
    },
    // 'complex2': {
    //     'section_b1': process.env.COMPLEX2_SECTION_B1_URL,
    //     'section_b2': process.env.COMPLEX2_SECTION_B2_URL,
    //     // ...
    // },
    // ...
};

module.exports = complexes;
