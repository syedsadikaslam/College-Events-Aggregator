import { useState, useEffect } from 'react';
import { 
    createEvent, createInternship, 
    fetchEvents, fetchInternships, 
    deleteEvent, deleteInternship,
    updateEvent, updateInternship,
    triggerAutoFetch 
} from '../services/api';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('internship');
    const [items, setItems] = useState([]); 
    const [isEditing, setIsEditing] = useState(null); 
    const [message, setMessage] = useState({ text: '', type: '' });
    
    // AI Integration States
    const [aiInput, setAiInput] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    const [eventForm, setEventForm] = useState({ title: '', college: '', date: '', description: '', registrationLink: '' });
    
    // UPDATED: Added description and lastDate in internshipForm state
    const [internshipForm, setInternshipForm] = useState({ 
        role: '', company: '', stipend: '', location: '', applyLink: '', description: '', lastDate: '' 
    });

    useEffect(() => { loadData(); }, [activeTab]);

    const loadData = async () => {
        try {
            const data = activeTab === 'internship' ? await fetchInternships() : await fetchEvents();
            setItems(data);
        } catch (err) { console.error("Load failed"); }
    };

    const handleFormChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'event') setEventForm({ ...eventForm, [name]: value });
        else setInternshipForm({ ...internshipForm, [name]: value });
    };

    const handleAiSubmit = async () => {
        if (!aiInput.trim()) return setMessage({ text: 'Pehle job text paste karein!', type: 'error' });
        
        setIsAiLoading(true);
        setMessage({ text: 'Gemini is processing...', type: 'success' });
        
        try {
            await triggerAutoFetch(aiInput); 
            setMessage({ text: 'Gemini ne detailed job add kar di hai!', type: 'success' });
            setAiInput('');
            loadData();
        } catch (err) {
            setMessage({ text: 'AI processing fail hui', type: 'error' });
        } finally {
            setIsAiLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete karna chahte hain?")) return;
        try {
            activeTab === 'internship' ? await deleteInternship(id) : await deleteEvent(id);
            setMessage({ text: 'Delete ho gaya!', type: 'success' });
            loadData();
        } catch (err) { setMessage({ text: 'Delete fail hua', type: 'error' }); }
    };

    const startEdit = (item) => {
        setIsEditing(item._id);
        if (activeTab === 'internship') setInternshipForm({ ...item });
        else setEventForm({ ...item });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForms = () => {
        setIsEditing(null);
        setEventForm({ title: '', college: '', date: '', description: '', registrationLink: '' });
        setInternshipForm({ role: '', company: '', stipend: '', location: '', applyLink: '', description: '', lastDate: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (activeTab === 'internship') {
                isEditing ? await updateInternship(isEditing, internshipForm) : await createInternship(internshipForm);
            } else {
                isEditing ? await updateEvent(isEditing, eventForm) : await createEvent(eventForm);
            }
            setMessage({ text: `Post ${isEditing ? 'Update' : 'Create'} ho gayi!`, type: 'success' });
            resetForms();
            loadData();
        } catch (err) { setMessage({ text: 'Operation fail hua', type: 'error' }); }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h2>

            <div className="flex max-w-2xl mx-auto mb-6 bg-white rounded shadow overflow-hidden">
                <button onClick={() => { setActiveTab('internship'); resetForms(); }} className={`flex-1 py-3 transition ${activeTab === 'internship' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>Internships</button>
                <button onClick={() => { setActiveTab('event'); resetForms(); }} className={`flex-1 py-3 transition ${activeTab === 'event' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>Events</button>
            </div>

            {message.text && <div className={`max-w-2xl mx-auto p-4 mb-4 rounded text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message.text}</div>}

            {/* --- Gemini AI Section --- */}
            {activeTab === 'internship' && !isEditing && (
                <div className="max-w-2xl mx-auto bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border-2 border-dashed border-purple-200 shadow-sm mb-10 text-center">
                    <h4 className="text-purple-700 font-bold mb-2 flex items-center justify-center gap-2">✨ Gemini AI Magic Post</h4>
                    <p className="text-xs text-gray-500 mb-4">Role ka naam likhein (Ex: React Developer), Gemini internet se dhoondh lega!</p>
                    <textarea 
                        className="w-full p-3 border rounded-lg text-sm mb-3 focus:ring-2 focus:ring-purple-400 outline-none"
                        placeholder="Search role: Ex: Frontend Intern..."
                        rows="2"
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                    />
                    <button 
                        onClick={handleAiSubmit}
                        disabled={isAiLoading}
                        className={`w-full py-2 rounded-lg font-bold text-white shadow-md transition ${isAiLoading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
                    >
                        {isAiLoading ? 'Gemini is Searching...' : 'Auto-Generate Full Job Post'}
                    </button>
                </div>
            )}

            {/* --- Manual Form Section --- */}
            <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mb-10">
                <h4 className="font-bold mb-4 text-gray-700">{isEditing ? 'Edit Post' : 'Manual Add'}</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {activeTab === 'internship' ? (
                        <>
                            <input name="role" placeholder="Role" value={internshipForm.role} onChange={(e) => handleFormChange(e, 'internship')} className="w-full p-2 border rounded" required />
                            <input name="company" placeholder="Company" value={internshipForm.company} onChange={(e) => handleFormChange(e, 'internship')} className="w-full p-2 border rounded" required />
                            <div className="flex gap-2">
                                <input name="stipend" placeholder="Stipend" value={internshipForm.stipend} onChange={(e) => handleFormChange(e, 'internship')} className="w-full p-2 border rounded flex-1" required />
                                <input name="lastDate" placeholder="Last Date (Ex: 30 Jan 2026)" value={internshipForm.lastDate} onChange={(e) => handleFormChange(e, 'internship')} className="w-full p-2 border rounded flex-1" required />
                            </div>
                            <input name="location" placeholder="Location" value={internshipForm.location} onChange={(e) => handleFormChange(e, 'internship')} className="w-full p-2 border rounded" required />
                            <input name="applyLink" type="url" placeholder="Apply URL" value={internshipForm.applyLink} onChange={(e) => handleFormChange(e, 'internship')} className="w-full p-2 border rounded" required />
                            
                            {/* NEW: Description field added */}
                            <textarea name="description" placeholder="Detailed Job Description" value={internshipForm.description} onChange={(e) => handleFormChange(e, 'internship')} className="w-full p-2 border rounded min-h-[100px]" required />
                        </>
                    ) : (
                        <>
                            <input name="title" placeholder="Event Title" value={eventForm.title} onChange={(e) => handleFormChange(e, 'event')} className="w-full p-2 border rounded" required />
                            <input name="college" placeholder="College" value={eventForm.college} onChange={(e) => handleFormChange(e, 'event')} className="w-full p-2 border rounded" required />
                            <input name="date" type="date" value={eventForm.date} onChange={(e) => handleFormChange(e, 'event')} className="w-full p-2 border rounded" required />
                            <textarea name="description" placeholder="Event Description" value={eventForm.description} onChange={(e) => handleFormChange(e, 'event')} className="w-full p-2 border rounded" required />
                            <input name="registrationLink" type="url" placeholder="Reg Link" value={eventForm.registrationLink} onChange={(e) => handleFormChange(e, 'event')} className="w-full p-2 border rounded" required />
                        </>
                    )}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">{isEditing ? 'Update Post' : 'Create Post'}</button>
                    {isEditing && <button type="button" onClick={resetForms} className="w-full bg-gray-400 text-white py-2 rounded mt-2">Cancel Edit</button>}
                </form>
            </div>

            {/* List Section remains same but will fetch new data */}
            <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-bold mb-4">Manage {activeTab}s</h3>
                <div className="grid gap-4">
                    {items.map(item => (
                        <div key={item._id} className="bg-white p-4 rounded shadow flex justify-between items-center border border-transparent hover:border-blue-300 transition">
                            <div>
                                <p className="font-bold">{item.role || item.title}</p>
                                <p className="text-sm text-gray-500">{item.company || item.college}</p>
                                {item.lastDate && <p className="text-xs text-red-500 mt-1">Deadline: {item.lastDate}</p>}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => startEdit(item)} className="text-blue-500 border border-blue-500 px-3 py-1 rounded hover:bg-blue-50">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-50">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;