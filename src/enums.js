module.exports = {
    departments: {
        default: 'NTI',
        enum: [
            'NTI',
            'RH',
            'SECRETARIA',
            'FINANCEIRO',
            'CAPTAÇÃO',
            'RETENÇÃO',
            'PÓS GRADUAÇÃO',
        ],
    },
    categories: {
        default: 'PERIFÉRICOS',
        enum: [],
    },
    roles: { default: 'NORMAL', enum: ['ADMIN', 'SUPER', 'NORMAL'] },
};
