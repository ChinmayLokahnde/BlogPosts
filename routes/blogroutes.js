const express = require("express");
const BlogPost = require("../models/blogpost"); 
const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const { title, content, author, image } = req.body;
        const newPost = new BlogPost({ title, content, author, image });
        await newPost.save();
        res.status(201).json(newPost); 
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ msg: "Error in creating post", error: error.message });
    }
});

router.get("/", async (req, res) => {  
    try {
        const posts = await BlogPost.find().populate("author", "username");
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({ msg: "Error in collecting data", error: error.message });
    }
});


router.get("/:id", async (req, res) => { 
    try {
        const { id } = req.params;

        if (!id || id.length !== 24) {  
            return res.status(400).json({ error: "Invalid blog ID format" });
        }
        
        const post = await BlogPost.findById(id).populate("author", "username");
        if (!post) return res.status(404).json({ error: "Post not found" });

        res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching a particular post:", error);
        return res.status(500).json({ msg: "Error fetching post", error: error.message });
    }
});



router.put("/:id", async (req, res) => {  
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ error: "Post not found" });
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).json({ msg: "Error in updating the post", error: error.message });
    }
});


router.delete("/:id", async (req, res) => { 
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ error: "Post not found" });
        res.status(200).json({ message: "Blog post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ msg: "Error in deleting the post", error: error.message });
    }
});

module.exports = router;
