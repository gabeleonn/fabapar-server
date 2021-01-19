module.exports = {
    department: {
        default: 'NTI',
        enum: ['NTI', 'RH', 'MARKETING', 'FINANCEIRO', 'CAPTAÇÃO'],
    },
    categories: {
        default: 'PERIFÉRICOS',
        enum: ['PERIFÉRICOS', 'DESKTOPS', 'NOTEBOOKS', 'RAMAIS'],
    },
    status: {
        default: 'DISPONÍVEL',
        enum: ['DISPONÍVEL', 'MANUTENÇÃO', 'EMPRESTADO', 'FIXO', 'DESCARTADO'],
    },
    roles: { default: 'NORMAL', enum: ['SUPER', 'ADMIN', 'NORMAL'] },
    ticket: {
        categories: {
            default: 'hardware',
            enum: ['hardware', 'software', 'rede', 'plataforma'],
        },
        priority: {
            default: 'low',
            enum: ['low', 'medium', 'high'],
        },
        status: {
            default: 'entrada',
            enum: [
                'entrada',
                'em progresso',
                'aguardando terceiros',
                'concluído',
                'perdido',
            ],
        },
    },
};
