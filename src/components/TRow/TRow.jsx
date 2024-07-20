import React from 'react';

const TRow = ({ user, columns, onClick }) => {
    const renderCell = (column, user) => {
        if (column.children) {
            return column.children.map(child => renderCell(child, user));
        }
        const value = column.key.split('.').reduce((obj, key) => obj[key], user);
        return <td key={column.key}>{value}</td>;
    };

    return (
        <tr onClick={onClick}>
            {columns.flatMap(column => renderCell(column, user))}
        </tr>
    );
};

export default TRow;