import React, { useState } from 'react';
import { useAuth } from '../services/auth';
import './Profile.css';

function Profile() {
    const { user, updateUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email
    });

    function handleSubmit(e) {
        e.preventDefault();
        updateUser(formData);
        setEditing(false);
    }

    return (
        <div>
            <h1>My Profile</h1>
            {editing ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </label>
                    <br />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditing(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <button type="button" onClick={() => setEditing(true)}>Edit</button>
                </>
            )}
        </div>
    );
}

export default Profile;
