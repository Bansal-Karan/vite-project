import React, { useEffect, useState } from 'react'
import { ThumbsUp, MessageCircle } from "lucide-react";

const Post = () => {

    const [content, setContent] = useState("")
    const [posts, setPosts] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [editedId, setEditedId] = useState(null)
    const [comment, setComment] = useState("")
    const [showCommentBox, setShowCommentBox] = useState(null)
    // const [comments, setComments] = useState([])

    const fetchPosts = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/post/all", {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()

            setPosts(data.posts.reverse())
        }
        catch (err) {
            console.log("Error in fetchPosts", err);
        }
    }
    const fetchComments = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/comment/all", {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()

            setComments(data.comments.reverse())
        }
        catch (err) {
            console.log("Error while fetching comments", err);
        }
    }

    const startUpdating = (post) => {
        setContent(post.content)
        setEditMode(true)
        setEditedId(post._id)

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {

            const res = await fetch("http://localhost:3000/api/post/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    postId: editedId,
                    content
                })
            });
            const data = await res.json();


            setContent("");
            setEditMode(false);
            setEditedId(null);

            await fetchPosts()

        } catch (err) {
            console.log("error in updating the post", err)
        }
    }

    const handleDelete = async (postId) => {
        try {
            const res = await fetch(`http://localhost:3000/api/post/${postId}`, {
                method: "DELETE",
                credentials: "include"
            });
            const data = await res.json()
            await fetchPosts();
        } catch (error) {
            console.log("error in deleting the post", error)
        }

    }

    const handleLikes = async (postId) => {
        try {
            const res = await fetch("http://localhost:3000/api/like/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    postId
                })
            }
            )
            await fetchPosts()

        } catch (error) {
            console.error('error while fetching the likes', error)
        }
    }

    const handleComments = async (postId) => {
        try {
            const res = await fetch("http://localhost:3000/api/comment/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    postId,
                    content: comment
                })
            })
            setComment("")
            setShowCommentBox(null)
            // await fetchComments()
            await fetchPosts()
        } catch (error) {
            console.error("error while fetching the comments", error)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const data = JSON.stringify({ content })
            const res = await fetch("http://localhost:3000/api/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data,
                credentials: "include"
            })

            setContent("")

            await fetchPosts()

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Error" })
        }

    }

    useEffect(() => {
        fetchPosts()
        fetchComments()
    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-500 to-indigo-600 p-6">
            <form
                onSubmit={editMode ? handleUpdate : submitHandler}
                className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6 animate-fadeIn"
            >
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Create a Post
                </h1>

                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700">
                        Post Content
                    </label>
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                        placeholder="Write something..."
                        className="w-full p-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-200"
                >
                    Post
                </button>
            </form>

            <div className='w-full max-w-xl mt-10 px-4'>
                <h2 className='my-5'>
                    Posts will be displayed here.
                </h2>

                {posts.map((post) => (
                    <div key={post._id} className="bg-white shadow-md w-full rounded-lg p-4 mb-4">
                        <p className="text-gray-800">{post.content}</p>
                        <p className="text-sm text-gray-500 mt-2">Posted by: {post.postBy.email} </p>

                        <div className="flex py-2 gap-2">
                            {/* update button */}

                            <button onClick={() => startUpdating(post)}
                                className=" bg-indigo-600 text-white p-2 rounded-xl text-lg font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-200">update
                            </button>

                            {/* Delete button */}
                            <button onClick={() => handleDelete(post._id)}
                                className=" bg-indigo-600 text-white p-2 rounded-xl text-lg font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-200">
                                delete
                            </button>

                            {/* Like */}
                            <button className=" bg-indigo-600 text-white p-2 rounded-xl  shadow-lg hover:bg-indigo-700 transition-all duration-200"
                                onClick={() => handleLikes(post._id)}

                            >
                                <div className="flex gap-2 p-1">
                                    <ThumbsUp size={18} />
                                    <span className="-mt-1">{post.likes.length}</span></div>
                            </button>

                            {/* Comments */}
                            <button
                                className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-200"
                                onClick={() =>
                                    setShowCommentBox(showCommentBox === post._id ? null : post._id)
                                }
                            >
                                <div className="flex gap-2 p-1">
                                    <MessageCircle size={18} />
                                    <span className="-mt-1">Comment</span>
                                </div>
                            </button>

                        </div>
                        <div>
                            {showCommentBox === post._id && (
                                <div className="mt-3 flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="flex-1 p-2 text-black border border-b-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />

                                    <button
                                        onClick={() => handleComments(post._id)}
                                        className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
                                    >
                                        Send
                                    </button>
                                </div>
                            )}
                        </div>
                        <div>
                            {post.comments.map((comment) => (
                                <div key={comment._id} className="mt-3 p-2 bg-gray-100 rounded-lg">
                                    <p>{comment.text}</p>
                                    <p>Commented by: {comment.user.email}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Post