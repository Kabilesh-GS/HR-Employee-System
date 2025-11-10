import { useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";

function userDetails() {
  const { id } = useParams();
  const [userdata, setUserData] = useState([]);
  const [userproject, setUserproject] = useState([]);
  const [userskill, setUserskill] = useState([]);
  const [userseval, setUserseval] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/projects/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUserproject(data));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/skills/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUserskill(data));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/evaluations/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUserseval(data));
  }, [id]);

  return (
    <div>
      <h1>{userdata.name}</h1>
      <br />
      <h3>Projects</h3>
      <div>
        {userproject.length > 0 ? (
          userproject.map((project) => (
            <div key={project.project_id}>
              <p>{project.project_name}</p>
              <p>{project.role_in_project}</p>
            </div>
          ))
        ) : (
          <p>No projects found</p>
        )}
      </div>
      <br/>
      <h3>Skills</h3>
      <div>
        {userskill.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Skill</th>
                <th>Proficiency</th>
                <th>Experience</th>
              </tr>
            </thead>
            <tbody>
              {userskill.map((e) => (
                <tr key={e.skill_id}>
                  <td>{e.skill_name}</td>
                  <td>{e.proficiency_level}</td>
                  <td>{e.years_of_experience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No skills found</p>
        )}
      </div>
      <br/>
      <h3>Evaluation</h3>
      <div>{
        userseval.length > 0 ? (
          userseval.map((e) => (
            <>
              <p>{e.year}</p>
              <p>
                <strong>{e.quarter}</strong>
                <p>{e.rating}</p>
              </p>
            </>
          ))
        ) : (<p>No Evaluations found</p>) 
      }</div>
    </div>
  );
}

export default userDetails;
