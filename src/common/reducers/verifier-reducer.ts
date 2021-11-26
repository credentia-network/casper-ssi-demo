import { VERIFIER, VERIFIER_VC } from "./types"

const initState = {
    data: {
        personal: {
            vcid: false,
            vcdescription: false,
            phone1: false,
            phone2: false,
            telegram: false,
            linkedin: false,
            whatsup: false,
            viber: false,
        },
        govarnment: {
            id: false,
            social: false,
        },
        finance: {
            finvcid: false,
            finvcdescription: false,
        },
        health: {
            vacctination: false,
        },
        education: {
            id_diplom: false,
            speciality: false,
            academic_degree: false,
            date: false,
        },
        profesional: {
            email: false,
        }

    },
    ipfsHash: null
};

export const verifierReducer = (state = initState, action): any => {
    switch (action.type) {
        case VERIFIER:
            return {
                data: { ...action.data }
            };

        case VERIFIER_VC:
            return {
                ...state,
                ipfsHash: action.payload.ipfsHash
            };

        default:
            return { ...state };
    }
}

export const getVerifier = (state) => state.verefier.data;
