import React, { useState, useEffect } from 'react';
import Map from '../Map';
import { useProjects } from '../services/project';
import { useLocation } from 'react-router-dom';
import { useDatabase } from '../services/database';
import './Projects.css';

function Projects() {
    const location = useLocation();
    const { projects, setProjects } = useProjects();
    const { database } = useDatabase();
    const [currentProject, setCurrentProject] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        address: '',
        city: '',
        province: '',
        type: '',
        status: 'pending'
    });

    useEffect(() => {
        // fetch the projects data from the database
        fetchProjects();
    }, [location.pathname]);

    function fetchProjects() {
        // logic to fetch the projects data from the database
        console.log("Fetching projects data...");
        database.collection("projects")
            .where("status", "==", "approved")
            .get()
            .then(function (querySnapshot) {
                let fetchedProjects = [];
                querySnapshot.forEach(function (doc) {
                    let project = doc.data();
                    project.id = doc.id;
                    fetchedProjects.push(project);
                });
                setProjects(fetchedProjects);
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    function handleSelectProject(id) {
        // logic to handle the project selection
        const selectedProject = projects.find(project => project.id === id);
        setCurrentProject(selectedProject);
    }

    function handleFormChange(event) {
        event.persist();
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }));
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        // logic to submit the form and store the project in the database
        console.log("Submitting form data: ", formData);
        database.collection("projects").add(formData)
            .then(function (docRef) {
                console.log("Project submitted with ID: ", docRef.id);
                setFormData({
                    name: '',
                    description: '',
                    location: '',
                    address: '',
                    city: '',
                    province: '',
                    type: '',
                    status: 'pending'
                });
            })
            .catch(function (error) {
                console.error("Error adding project: ", error);
            });
    }

    return (
        <div>
            <h1>Our Projects</h1>
            <Map projects={projects} onSelectProject={handleSelectProject} currentProject={currentProject} />
            <div>
                {projects.map(project => (
                    <div key={project.id}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <p>Location: {project.location}</p>
                        <p>Address: {project.address}</p>
                        <p>City: {project.city}</p>
                        <p>Province: {project.province}</p>
                        <p>Type: {project.type}</p>
                        <p>Status: {project.status}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} on Change={handleFormChange} required />
                </label>
                <br />
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleFormChange} required />
                </label>
                <br />
                <label>
                    Location:
                    <input type="text" name="location" value={formData.location} onChange={handleFormChange} required />
                </label>
                <br />
                <label>
                    Address:
                    <input type="text" name="address" value={formData.address} onChange={handleFormChange} required />
                </label>
                <br />
                <label>
                    City:
                    <input type="text" name="city" value={formData.city} onChange={handleFormChange} required />
                </label>
                <br />
                <label>
                    Province:
                    <input type="text" name="province" value={formData.province} onChange={handleFormChange} required />
                </label>
                <br />
                <label>
                    Type:
                    <input type="text" name="type" value={formData.type} onChange={handleFormChange} required />
                </label>
                <br />
                <button type="submit">Submit Project</button>
            </form>
        </div>
    );
}

export default Projects;


               
