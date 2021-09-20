import {VERIFIER} from "./types"

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

    }
}

export const verifierReducer = (state = initState, {type, data}) => {
    switch (type) {
        case VERIFIER:
            return {
                data: {...data}

            };
        default:
            return {...state};
    }
}
export const getVerifier = (state) => state.verefier.data;
