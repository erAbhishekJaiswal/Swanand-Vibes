import React from 'react'

const UserEdit = () => {
  return (
    <div>
        <h1>Edit User</h1>
        <form>
            <div>
                <label>ID</label>
                <input type="text" />
            </div>
            <div>
                <label>Name</label>
                <input type="text" />
            </div>
            <div>
                <label>Email</label>
                <input type="email" />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    </div>
  )
}

export default UserEdit