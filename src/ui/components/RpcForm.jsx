import React, { useState, useEffect } from 'react';
import { Save, Trash, Play, Square, Image, Type, Link as LinkIcon, Clock } from 'lucide-react';

const InputField = ({ label, value, onChange, placeholder, icon: Icon, type = "text" }) => (
    <div className="input-group">
        <label className="label flex items-center gap-2">
            {Icon && <Icon size={12} />} {label}
        </label>
        <input
            type={type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    </div>
);

export default function RpcForm({ setting, onSave, onDelete, onStart, onStop, rpcStatus }) {
    const [formData, setFormData] = useState(setting);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setFormData(setting);
        setIsDirty(false);
    }, [setting.id]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setIsDirty(true);
    };

    const handleSubmit = () => {
        onSave(formData);
        setIsDirty(false);
    };

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">{formData.name}</h1>
                    <p className="text-sm text-gray-400">Application ID: {formData.clientId}</p>
                </div>
                <div className="flex gap-3">
                    {rpcStatus === 'connected' ? (
                        <button onClick={onStop} className="btn btn-danger">
                            <Square size={16} /> Stop RPC
                        </button>
                    ) : (
                        <button onClick={() => onStart(formData)} className="btn btn-primary">
                            <Play size={16} /> Start RPC
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pb-20">
                {/* Core Settings */}
                <div className="space-y-6">
                    <div className="card">
                        <h3 className="text-lg font-semibold mb-4 text-white">Basic Info</h3>
                        <InputField
                            label="Preset Name"
                            value={formData.name}
                            onChange={v => handleChange('name', v)}
                            icon={Type}
                            placeholder="My Gaming Status"
                        />
                        <InputField
                            label="Application ID (Client ID)"
                            value={formData.clientId}
                            onChange={v => handleChange('clientId', v)}
                            icon={Settings}
                            placeholder="123456789012345678"
                        />
                    </div>

                    <div className="card">
                        <h3 className="text-lg font-semibold mb-4 text-white">Text Status</h3>
                        <InputField
                            label="Details"
                            value={formData.details}
                            onChange={v => handleChange('details', v)}
                            icon={Type}
                            placeholder="Playing Solo"
                        />
                        <InputField
                            label="State"
                            value={formData.state}
                            onChange={v => handleChange('state', v)}
                            icon={Type}
                            placeholder="Ranked Match"
                        />
                    </div>

                    <div className="card">
                        <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                            <Clock size={16} /> Timestamp
                        </h3>
                        <div className="flex items-center gap-4 mb-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.useTimestamp === 1 || formData.useTimestamp === true}
                                    onChange={(e) => handleChange('useTimestamp', e.target.checked ? 1 : 0)}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm">Enable Timestamp</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Images & Buttons */}
                <div className="space-y-6">
                    <div className="card">
                        <h3 className="text-lg font-semibold mb-4 text-white">Images</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="Large Image Key"
                                value={formData.largeImageKey}
                                onChange={v => handleChange('largeImageKey', v)}
                                icon={Image}
                            />
                            <InputField
                                label="Large Image Text"
                                value={formData.largeImageText}
                                onChange={v => handleChange('largeImageText', v)}
                                icon={Type}
                            />
                            <InputField
                                label="Small Image Key"
                                value={formData.smallImageKey}
                                onChange={v => handleChange('smallImageKey', v)}
                                icon={Image}
                            />
                            <InputField
                                label="Small Image Text"
                                value={formData.smallImageText}
                                onChange={v => handleChange('smallImageText', v)}
                                icon={Type}
                            />
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="text-lg font-semibold mb-4 text-white">Buttons</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="Button 1 Label"
                                value={formData.button1Label}
                                onChange={v => handleChange('button1Label', v)}
                                icon={Type}
                            />
                            <InputField
                                label="Button 1 URL"
                                value={formData.button1Url}
                                onChange={v => handleChange('button1Url', v)}
                                icon={LinkIcon}
                            />
                            <InputField
                                label="Button 2 Label"
                                value={formData.button2Label}
                                onChange={v => handleChange('button2Label', v)}
                                icon={Type}
                            />
                            <InputField
                                label="Button 2 URL"
                                value={formData.button2Url}
                                onChange={v => handleChange('button2Url', v)}
                                icon={LinkIcon}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer controls */}
            <div className="fixed bottom-0 left-[250px] right-0 p-4 bg-slate-800/90 backdrop-blur border-t border-slate-700 flex justify-between items-center z-10">
                <div className="flex gap-4">
                    <button onClick={handleSubmit} className="btn btn-primary" disabled={!isDirty}>
                        <Save size={16} /> {isDirty ? 'Save Changes' : 'Saved'}
                    </button>
                </div>
                <button onClick={() => onDelete(setting.id)} className="btn btn-danger">
                    <Trash size={16} /> Delete Preset
                </button>
            </div>
        </div>
    );
}
