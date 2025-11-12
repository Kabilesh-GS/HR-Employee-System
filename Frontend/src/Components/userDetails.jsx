import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./userDetails.module.css";

function userDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userdata, setUserData] = useState([]);
  const [userproject, setUserproject] = useState([]);
  const [userskill, setUserskill] = useState([]);
  const [userseval, setUserseval] = useState([]);
  const [usercertificates, setUsercertificates] = useState([]);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const currentUser = JSON.parse(savedUser);
      const role = currentUser.role?.toUpperCase();
      if (role === "EMPLOYEE" && currentUser.user_id !== parseInt(id)) {
        navigate(`/user/${currentUser.user_id}`, { replace: true });
        return;
      }
    }
  }, [id, navigate]);

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

  useEffect(() => {
    fetch(`http://localhost:3001/api/certificates/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUsercertificates(data));
  }, [id]);

  const addCertificate = async (e) => {
    e.preventDefault();

    const formData = {
      user_id : id,
      cert_name: e.target.certificateName.value,
      issued_by: e.target.issuedBy.value,
      date_obtained: e.target.date.value,
    }

    const postfrom = await fetch(`http://localhost:3001/api/certificates/user/${id}`, {
      method: 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(formData)
    })
    const data = await postfrom.json();
    console.log(data);
    alert("Certificate Added");
    setPopup(false);
  }

  return (
    <div className={style.container}>
      <h1>{userdata.name}</h1>
      <p>{userdata.department_name}</p>
      <br />
      <h3 className={style.subHeading}>Projects Working On</h3>
      <div>
        {userproject.length > 0 ? (
          userproject.map((project) => (
            <div key={project.project_id} className={style.projectCard}>
              <p>
                <strong>Project Name : </strong>
                {project.project_name}
              </p>
              <p>
                <strong>Role in Project : </strong>
                {project.role_in_project}
              </p>
              <p>
                <strong>Contribution Percentage: </strong>
                <progress
                  className={style.bar}
                  title={`${project.contribution_percentage}%`}
                  value={project.contribution_percentage}
                  max={100}
                >
                  {project.contribution_percentage}%
                </progress>
              </p>
            </div>
          ))
        ) : (
          <p>No projects found</p>
        )}
      </div>
      <br />
      <h3 className={style.subHeading}>Skills</h3>
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
      <br />
      <h3 className={style.subHeading}>Evaluation</h3>
      <div>
        {userseval.length > 0 ? (
          userseval.map((e) => (
            <>
              <p>{e.year}</p>
              <p>
                <strong>{e.quarter}</strong>
                <p>{e.rating}</p>
              </p>
            </>
          ))
        ) : (
          <p>No Evaluations found</p>
        )}
      </div>
      <br />
      <div className={style.subHeading}><h3>Certificates</h3><span onClick={() => {setPopup(true)}}>Add</span></div>
      {
        popup && (
          <form onSubmit={addCertificate}>
            <input type="text" name="certificateName" required placeholder="Certificate Name"/>
            <input type="text" name="issuedBy" required placeholder="Issued By"/> 
            <input type="date" name="date" required /> 
            <div>
              <button type="submit">ADD</button>
              <button onClick={() => {setPopup(false)}}>CLOSE</button>
            </div>
          </form>
        )
      }
      <div>
        {usercertificates.length > 0 ? (
          usercertificates.map((e) => (
            <div className={style.projectCard}>
              <p>
                {e.cert_name} - {e.issued_by}
              </p>
            </div>
          ))
        ) : (
          <p>No Certificates found</p>
        )}
      </div>
    </div>
  );
}

export default userDetails;
