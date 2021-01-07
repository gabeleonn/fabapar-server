module.exports = {
    department: {
        default: 'NTI',
        enum: ['NTI', 'RH', 'MARKETING', 'FINANCEIRO', 'CAPTAÇÃO'],
    },
    categories: {
        default: 'PERIFÉRICOS',
        enum: ['PERIFÉRICOS'],
    },
    status: {
        default: 'DISPONÍVEL',
        enum: ['DISPONÍVEL', 'MANUTENÇÃO', 'EM USO'],
    },
    roles: { default: 'NORMAL', enum: ['SUPER', 'ADMIN', 'NORMAL'] },
};
