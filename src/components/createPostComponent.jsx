export default function CreatePostComponent() {
    return (
        <>
            <div className="create-post-container">
                <div className="post-header">
                    <a className="avatar">avatar</a>
                    <button className="cancel-btn">X</button>
                </div>
                <textarea style={{ resize: "none" }} className="user-input" placeholder="what you thinkin' blud"></textarea>
                <button className='post-btn'>Post</button>
            </div >
        </>
    )
}