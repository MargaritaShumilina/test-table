export const columns = [
            { name: 'Имя', key: 'firstName', filterable: true, sortable: true },
            { name: 'Фамилия', key: 'lastName', filterable: true, sortable: true },
    { name: 'Возраст', key: 'age', filterable: true, sortable: true },

            { name: 'Адрес', key: 'address.address', filterable: true, sortable: true },
            { name: 'Город', key: 'address.city', filterable: true, sortable: true },

    { name: 'Пол', key: 'gender', filterable: true, sortable: true },
    { name: 'Телефон', key: 'phone', filterable: true, sortable: true },
];