export default function CreatePostComponent() {
    return (
        <>
            <div className="create-post-container">
                <div className="post-header">
                    <a>Create Post</a>
                    <button className="cancel-btn">X</button>
                </div>

                <div className="line2"></div>
                <textarea style={{ resize: "none" }} className="user-input" placeholder="what you thinkin' blud"></textarea>
                <button className='new-account-btn'>Create new account</button>
            </div >
        </>
    )
}