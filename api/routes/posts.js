const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");



// router.get("/",(req,res)=>{
//     console.log("post page")
// })

//create a post
 router.post("/",async(req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }catch{
        res.status(500).json(err);
    }
 })




//update a post

router.post("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("Post updated successfully");
        } else{
            res.status(403).json("you can update only your own post");
        }
    } catch(err){
        res.status(500).json(err);
    }
})


//delete a post

router.delete("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("Post has been deleted!");
        } else{
            res.status(403).json("you can only delete your own post");
        }
    } catch(err){
        res.status(500).json(err);
    }
})

//like or dislike a post

router.put("/:id/like", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("The post has been liked");
        } else{
            await post.updateOne({$pull:{likes:req.body.userId}});//dislike a post
            res.status(200).json("Post has been Disliked");
        }

    }catch (err){
        res.status(500).json(err);
    }
});


//get a post

router.get("/:id",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err){
        res.status(500).json(err);
    }
});



//get timeline posts

// router.get("/timeline/all", async (req, res) => {
//     try {
//         const userId = req.query.userId; // Assuming userId is passed as a query parameter

//         const currentUser = await User.findById(userId);

//         if (!currentUser) {
//             return res.status(404).json("User not found");
//         }

//         const userPosts = await Post.find({ userId: currentUser._id });

//         const friendPostsPromises = currentUser.followings.map(async (friendId) => {
//             const friendPosts = await Post.find({ userId: friendId });
//             return friendPosts;
//         });

//         const friendPosts = await Promise.all(friendPostsPromises);

//         const filteredFriendPosts = friendPosts.filter(posts => posts.length > 0);

//         const timelinePosts = userPosts.concat(...filteredFriendPosts);
//         res.json(timelinePosts);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get("/timeline/:userId", async (req,res)=>{
    try{
        const currentUser = await User.findById(req.params.userId);

        if (!currentUser) {
            return res.status(404).json("User not found");
        }
        const userPosts = await Post.find({userId: currentUser._id});



        const friendPosts = await Promise.all(
            currentUser.followings.map(async (friendId)=>{
                return Post.find({userId:friendId});
            })
        );
        // const filteredFriendPosts = friendPosts.filter(posts => posts.length > 0);
        const timelinePosts = userPosts.concat(...friendPosts);
        res.status(200).json(timelinePosts);
    } catch(err){
        res.status(500).json(err);
    }

});

//get user's all post

router.get("/profile/:username", async (req,res)=>{
    try{
        const user = await User.findOne({username:req.params.username});
        const posts = await Post.find({userId: user._id});
        res.status(200).json(posts);
    } catch(err){
        res.status(500).json(err);
    }

});



module.exports=router;