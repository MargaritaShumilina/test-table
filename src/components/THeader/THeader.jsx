import React, { useState, useRef } from 'react';
import './THeader.css'

const THeader = ({ columns, onSort, sortConfig, onFilter, filters, filter }) => {
    const [columnWidths, setColumnWidths] = useState({});
    const startX = useRef(0);
    const startWidth = useRef(0);
    const resizableColumn = useRef(null);

    const handleSortClick = (key) => {
        onSort(key);
    };

    const handleMouseDown = (e, columnKey) => {
        startX.current = e.clientX;
        startWidth.current = columnWidths[columnKey] || e.target.parentElement.offsetWidth;
        resizableColumn.current = columnKey;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        const newWidth = startWidth.current + (e.clientX - startX.current);
        setColumnWidths(prevWidths => ({
            ...prevWidths,
            [resizableColumn.current]: newWidth > 50 ? newWidth : 50
        }));
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const renderHeader = (column) => {
        if (column.children) {
            return (
                <th key={column.key} colSpan={column.children.length}>
                    {column.name}
                    <div className="resize-handle" onMouseDown={(e) => handleMouseDown(e, column.key)} />
                </th>
            );
        }
        if (!column.key) {
            return null;
        }
        return (
            <th key={column.key}>
                {column.name}
                {column.sortable && (
                    <button className='table_button-sort' onClick={() => handleSortClick(column.key)}>
                        {sortConfig.key === column.key ? (sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : '↕') : '↕'}
                    </button>
                )}
                {filter && column.filterable && (
                    <input
                        type="text"
                        placeholder={`Введите ${column.name}`}
                        value={filters[column.key] || ''}
                        onChange={e => onFilter(column.key, e.target.value)}
                    />
                )}
                <div className="resize-handle" onMouseDown={(e) => handleMouseDown(e, column.key)} />
            </th>
        );
    };

    return (
        <tr>
            {columns.flatMap(column => renderHeader(column))}
        </tr>
    );
};

export default THeader;