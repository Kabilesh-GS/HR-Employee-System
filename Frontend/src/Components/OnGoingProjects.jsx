import { useEffect,useState } from "react"
import style from "./OnGoingProjects.module.css"

function OnGoingProjects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/projects")
      .then(response => response.json())
      .then(data => setProjects(data))
  },[])

  return (
    <div>
      <h2 className={style.headingProjects}>Ongoing Projects</h2>
      <div>
        {
          projects.length > 0 ? (
            <div>
              {projects.map((e) => (
                <div className={style.projectContainer} key={e.project_id}>
                  <p><strong>Project Name :</strong> {e.project_name}</p>
                  <p><strong>Start Date :</strong> {(e.start_date).slice(0,10)}</p>
                  <p><strong>Status :</strong> {e.status}</p>
                </div>
              ))}
            </div>
          ) : (<p>no Projects on going</p>)
        }
      </div>
    </div>
  )
}

export default OnGoingProjects