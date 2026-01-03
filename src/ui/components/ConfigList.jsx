import React, { useState, useEffect } from 'react';
import { Plus, Settings, Activity } from 'lucide-react';
import RpcForm from './RpcForm';

export default function ConfigList({ settings, activeId, onSelect, onAdd }) {
    return (
        <div className="sidebar">
            <div className="flex items-center justify-between mb-4">
                <h2 className="label flex items-center gap-2">
                    <Settings size={14} /> Presets
                </h2>
                <button className="window-btn btn-min" style={{ opacity: 0 }} disabled></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
                {settings.map((setting) => (
                    <div
                        key={setting.id}
                        onClick={() => onSelect(setting.id)}
                        className={`config-item ${activeId === setting.id ? 'active' : ''}`}
                    >
                        <span className="truncate font-medium">{setting.name}</span>
                        {/* Show activity indicator if this is the running one? Future feature */}
                    </div>
                ))}
            </div>

            <button onClick={onAdd} className="btn btn-primary w-full mt-4">
                <Plus size={16} /> New Preset
            </button>
        </div>
    );
}
