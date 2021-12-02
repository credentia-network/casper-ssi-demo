
export const DATA_FIELDS_SHEMA: {title: string, items: any[]}[] = [
    {
        title: 'Personal',
        items: [
            { vcid: 'VC ID' },
            { vcdescription: 'VC Description' },
            { phone1: 'Phone1' },
            { phone2: 'Phone2' },
            { telegram: 'Telegram' },
            { linkedin: 'Linkedin' },
            { whatsup: 'WhatsApp' },
            { viber: 'Viber' },
        ]
    }, {
        title: 'Governament',
        items: [
            { govid: 'ID' },
            { social: '#Social' },
        ]
    }, {
        title: 'Finance',
        items: [
            { finvcid: 'VC ID' },
            { finvcdescription: 'VC Description' },
        ]
    }, {
        title: 'E-Health',
        items: [
            { vacctination: 'Vaccination covid' },
        ]
    }, {
        title: 'Education',
        items: [
            { diplomid: 'Diplom ID' },
            { speciality: 'Speciality' },
            { academicdegree: 'Academic degree' },
            { date: 'Date' },
        ]
    }, {
        title: 'Professional',
        items: [
            { email: 'Email' }
        ]
    }
];
