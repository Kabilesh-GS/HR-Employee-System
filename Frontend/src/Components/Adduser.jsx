function Adduser() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name : e.target.name.value,
      email : e.target.email.value,
      role : e.target.role.value,
      department_id : e.target.department_id.value
    }
    const postForm = await fetch("http://localhost:3001/api/users", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(formData)
    })
    const data = await postForm.json();
    console.log(data);
    alert("User Added Successfully");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{display: 'flex',flexDirection: 'column'}}>
        <label>Name</label>
        <input type="text" name="name" required placeholder="Name"/>
        <label>Email</label>
        <input type="email" name="email" required placeholder="Email"/>
        <label>Role</label>
        <input type="text" name="role" required placeholder="Role"/>
        <label>Department ID</label>
        <input type="number" name="department_id" min={1} max={3} required placeholder="Department ID"/>
        <p>1.IT / 2.HR / 3.Finance</p>
        <button type="submit">Add User</button>
      </form>
    </div>
  )
}

export default Adduser