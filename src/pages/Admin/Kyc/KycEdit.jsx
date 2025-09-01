import React from 'react'

const KycEdit = () => {
  return (
    <div>
        <h1>Edit KYC</h1>
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
                <label>Status</label>
                <input type="text" />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    </div>
  )
}

export default KycEdit