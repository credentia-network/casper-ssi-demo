
const DATA_FIELDS_SHEMA: {title: string, credentialType: string, items: any[]}[] = [
    {
        title: 'Personal',
        credentialType: 'PersonalDataCredential',
        items: [
            { phone1: 'Phone1' },
            { phone2: 'Phone2' },
            { telegram: 'Telegram' },
            { linkedin: 'Linkedin' },
            { whatsapp: 'WhatsApp' },
            { viber: 'Viber' },
            { email: 'Email' }
        ]
    }, {
        title: 'Government',
        credentialType: 'PassportCredential',
        items: [
            { passport: 'Passport ID' },
            { nationality: 'Nationality' },
            { surname: 'Surname' },
            { givenName: 'Given names' },
            { sex: 'Sex' },
            { birthDate: 'Date of birth' },
            { birthPlace: 'Place of birth' },
            { issued: 'Issued On' },
            { expiered: 'Expiered On' },
            { photo: 'Photo' },
        ]
    }, {
        title: 'Finance',
        credentialType: 'BankCredential',
        items: [
            { for: 'For (date)' },
            { to: 'To (date)' },
            { balance: 'Opening balance' },
            { withdrawals: 'Withdrawals' },
            { deposits: 'Deposits' },
            { closingBalance: 'Closing balance to date' },
            { currency: 'Currency' },
        ]
    }, {
        title: 'E-Health',
        credentialType: 'EhealthCredential',
        items: [
            { covidPassport: 'Covid Passport ID' },
            { vaccination: 'Date of vaccination' },
            { stages: 'Number of stages' },
            { vaccine: 'Vaccine name' },
            { manufacturer: 'Manufacturer' },
        ]
    }, {
        title: 'Education',
        credentialType: 'EducationCredential',
        items: [
            { diplomid: 'Diplom ID' },
            { speciality: 'Speciality' },
            { academicdegree: 'Academic degree' },
            { date: 'Date' },
        ]
    }, {
        title: 'Professional',
        credentialType: 'ProfessionalCredential',
        items: [
            { position: 'Position' },
            { cooperationStartDate: 'Start of cooperation' },
            { cooperationEndDate: 'End of cooperation' },
            { additionalDescription: 'Additional description' },
        ]
    }
];

export default DATA_FIELDS_SHEMA;