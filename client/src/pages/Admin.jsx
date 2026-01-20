import { useState, useEffect } from 'react';
import { 
    createEvent, createInternship, 
    fetchEvents, fetchInternships, 
    deleteEvent, deleteInternship,
    updateEvent, updateInternship 
} from '../services/api';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('internship');
    const [items, setItems] = useState([]); 
    const [isEditing, setIsEditing] = useState(null); 
    const [message, setMessage] = useState({ text: '', type: '' });

    const [eventForm, setEventForm] = useState({ title: '', college: '', date: '', description: '', registrationLink: '' });
    const [internshipForm, setInternshipForm] = useState({ role: '', company: '', stipend: '', location: '', applyLink: '' });

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
        setInternshipForm({ role: '', company: '', stipend: '', location: '', applyLink: '' });
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

            <div className="flex max-w-2xl mx-auto mb-6 bg-white rounded shadow">
                <button onClick={() => { setActiveTab('internship'); resetForms(); }} className={`flex-1 py-3 ${activeTab === 'internship' ? 'bg-blue-600 text-white' : ''}`}>Internships</button>
                <button onClick={() => { setActiveTab('event'); resetForms(); }} className={`flex-1 py-3 ${activeTab === 'event' ? 'bg-blue-600 text-white' : ''}`}>Events</button>
            </div>

            {message.text && <div className={`max-w-2xl mx-auto p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>{message.text}</div>}

            <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mb-10">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {activeTab === 'internship' ? (
                        <>
                            <input name="role" placeholder="Role" value={internshipForm.role} onChange={(e) => handleFormChange(e, 'internship')} className="w-full p-2 border rounded" required />
                            <input name="company" placeholder="Company" value={internshipForm.company} onChange={(e) => handleFormChange(e, 'internship')} className="w-full p-2 border rounded" required />
                            <input name="stipend" placeholder="Stipend" value={internshipForm.stipend} onChange={(e) => handleFormChange(e, 'internship')} className="w-full p-2 border rounded" required />
                            <input name="location" placeholder="Location" value={internshipForm.location} onChange={(e) => handleFormChange(e, 'internship')} className="w-full p-2 border rounded" required />
                            <input name="applyLink" type="url" placeholder="Apply URL" value={internshipForm.applyLink} onChange={(e) => handleFormChange(e, 'internship')} className="w-full p-2 border rounded" required />
                        </>
                    ) : (
                        <>
                            <input name="title" placeholder="Event Title" value={eventForm.title} onChange={(e) => handleFormChange(e, 'event')} className="w-full p-2 border rounded" required />
                            <input name="college" placeholder="College" value={eventForm.college} onChange={(e) => handleFormChange(e, 'event')} className="w-full p-2 border rounded" required />
                            <input name="date" type="date" value={eventForm.date} onChange={(e) => handleFormChange(e, 'event')} className="w-full p-2 border rounded" required />
                            <textarea name="description" placeholder="Description" value={eventForm.description} onChange={(e) => handleFormChange(e, 'event')} className="w-full p-2 border rounded" required />
                            <input name="registrationLink" type="url" placeholder="Reg Link" value={eventForm.registrationLink} onChange={(e) => handleFormChange(e, 'event')} className="w-full p-2 border rounded" required />
                        </>
                    )}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">{isEditing ? 'Update Post' : 'Create Post'}</button>
                    {isEditing && <button type="button" onClick={resetForms} className="w-full bg-gray-400 text-white py-2 rounded mt-2">Cancel Edit</button>}
                </form>
            </div>

            <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-bold mb-4">Manage {activeTab}s</h3>
                <div className="grid gap-4">
                    {items.map(item => (
                        <div key={item._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                            <div>
                                <p className="font-bold">{item.role || item.title}</p>
                                <p className="text-sm text-gray-500">{item.company || item.college}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => startEdit(item)} className="text-blue-500 border border-blue-500 px-3 py-1 rounded">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="text-red-500 border border-red-500 px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;