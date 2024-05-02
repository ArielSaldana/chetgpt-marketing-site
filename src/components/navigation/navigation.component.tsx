import React from 'react';

export default function Navigation() {
    return (
        <div className="flex w-full fixed">
            <div className="w-12 h-12 bg-gray-200">
                <button>Open</button>
            </div>

            <div className="flex-grow bg-gray-300">
            </div>

            <div className="w-12 h-12 bg-gray-200">
            </div>
        </div>
    );
}
